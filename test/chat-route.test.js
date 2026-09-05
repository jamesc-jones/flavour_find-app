'use strict';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const Database = require('better-sqlite3');

const { startTestServer } = require('./support/test-server.js');

const dbPath = path.join(__dirname, '..', 'recipes.db');

function readUsageRows(userId) {
    const db = new Database(dbPath);
    const rows = db.prepare(
        'SELECT model, tokens_in, tokens_out, cost_usd FROM chat_usage WHERE user_id = ? ORDER BY id ASC'
    ).all(userId);
    db.close();
    return rows;
}

function cleanupUser(userId) {
    const db = new Database(dbPath);
    db.prepare('DELETE FROM chat_usage WHERE user_id = ?').run(userId);
    db.close();
}

async function collectSSE(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    const events = [];
    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split('\n\n');
        buffer = chunks.pop() ?? '';
        for (const chunk of chunks) {
            const line = chunk.trim();
            if (!line.startsWith('data:')) continue;
            const jsonStr = line.slice(5).trim();
            if (!jsonStr) continue;
            try {
                events.push(JSON.parse(jsonStr));
            } catch {
                // ignore unparsable fragments
            }
        }
    }
    return events;
}

describe('POST /api/v1/chat — default limit instance', () => {
    let server;
    const PORT = 3987;

    before(async () => {
        server = await startTestServer({ port: PORT });
    });

    after(async () => {
        await server.stop();
    });

    it('returns 401 when unauthenticated, with no Anthropic call', async () => {
        const res = await fetch(`${server.baseUrl}/api/v1/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        });
        assert.strictEqual(res.status, 401);
        const body = await res.json();
        assert.strictEqual(body.error, 'Unauthorized');
    });

    it('returns 400 for an invalid body, with no Anthropic call', async () => {
        const res = await fetch(`${server.baseUrl}/api/v1/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-test-auth': 'true',
                'x-test-user': 'test-400-user',
            },
            body: JSON.stringify({ messages: [] }), // violates min(1)
        });
        assert.strictEqual(res.status, 400);
        const body = await res.json();
        assert.ok(body.error, 'expected a Zod-flattened error body');
    });

    it('streams tokens, sends completion, and logs real usage on success', async () => {
        const userId = `test-success-${Date.now()}`;
        await server.setStream({
            tokens: ['Hello', ' world'],
            delayMs: 0,
            usage: { input_tokens: 11, output_tokens: 22 },
            throwOnCreate: null,
            throwDuringIteration: null,
        });

        const res = await fetch(`${server.baseUrl}/api/v1/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-test-auth': 'true',
                'x-test-user': userId,
            },
            body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        });
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.headers.get('content-type'), 'text/event-stream');

        const events = await collectSSE(res);
        const tokenEvents = events.filter((e) => typeof e.token === 'string');
        const doneEvent = events.find((e) => e.done === true);

        assert.strictEqual(tokenEvents.map((e) => e.token).join(''), 'Hello world');
        assert.ok(doneEvent, 'expected a done event');
        assert.strictEqual(typeof doneEvent.remaining, 'number');

        const rows = readUsageRows(userId);
        assert.strictEqual(rows.length, 1);
        assert.strictEqual(rows[0].model, 'claude-haiku-4-5-20251001');
        assert.strictEqual(rows[0].tokens_in, 11);
        assert.strictEqual(rows[0].tokens_out, 22);
        assert.ok(Math.abs(rows[0].cost_usd - (11 * 0.000001 + 22 * 0.000005)) < 1e-12);

        cleanupUser(userId);
    });

    it('emits a generic SSE error and logs zero usage on a provider error, without leaking internals', async () => {
        const userId = `test-provider-error-${Date.now()}`;
        await server.setStream({
            tokens: [],
            delayMs: 0,
            usage: { input_tokens: 0, output_tokens: 0 },
            throwOnCreate: 'SECRET_INTERNAL_DETAIL: invalid_api_key_xyz',
            throwDuringIteration: null,
        });

        const res = await fetch(`${server.baseUrl}/api/v1/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-test-auth': 'true',
                'x-test-user': userId,
            },
            body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        });
        assert.strictEqual(res.status, 200); // headers already committed before the provider error

        const bodyText = await res.text();
        assert.ok(!bodyText.includes('SECRET_INTERNAL_DETAIL'), 'internal error detail must not leak to client');
        assert.ok(bodyText.includes('AI service error'));

        const rows = readUsageRows(userId);
        assert.strictEqual(rows.length, 1);
        assert.strictEqual(rows[0].tokens_in, 0);
        assert.strictEqual(rows[0].tokens_out, 0);
        assert.strictEqual(rows[0].cost_usd, 0);

        cleanupUser(userId);
    });

    it('aborts the upstream stream on client disconnect and logs zero (non-fabricated) usage', async () => {
        const userId = `test-abort-${Date.now()}`;
        await server.setStream({
            tokens: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            delayMs: 150,
            usage: { input_tokens: 99, output_tokens: 99 },
            throwOnCreate: null,
            throwDuringIteration: null,
        });

        const controller = new AbortController();
        const abortedPromise = server.waitForMessage('ABORTED', 5000);

        const fetchPromise = fetch(`${server.baseUrl}/api/v1/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-test-auth': 'true',
                'x-test-user': userId,
            },
            body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
            signal: controller.signal,
        }).catch(() => null); // client-side abort rejects the fetch itself; expected

        // Let one token arrive, then simulate a real client disconnect.
        await new Promise((resolve) => setTimeout(resolve, 200));
        controller.abort();

        await fetchPromise;
        await abortedPromise; // throws/fails the test if the server never called controller.abort()

        // Give the server's finally-block a moment to write the usage row.
        await new Promise((resolve) => setTimeout(resolve, 300));

        const rows = readUsageRows(userId);
        assert.strictEqual(rows.length, 1);
        assert.strictEqual(rows[0].tokens_in, 0);
        assert.strictEqual(rows[0].tokens_out, 0);
        assert.strictEqual(rows[0].cost_usd, 0);

        cleanupUser(userId);
    });
});

describe('POST /api/v1/chat — rate-limited instance (AI_CHAT_LIMIT_FREE=2)', () => {
    let server;
    const PORT = 3988;
    const userId = `test-429-${Date.now()}`;

    before(async () => {
        server = await startTestServer({ port: PORT, extraEnv: { AI_CHAT_LIMIT_FREE: '2' } });
    });

    after(async () => {
        await server.stop();
        cleanupUser(userId);
    });

    it('allows requests under the limit, then returns 429 with an authoritative resetAt', async () => {
        await server.setStream({
            tokens: ['ok'],
            delayMs: 0,
            usage: { input_tokens: 1, output_tokens: 1 },
            throwOnCreate: null,
            throwDuringIteration: null,
        });

        for (let i = 0; i < 2; i++) {
            const res = await fetch(`${server.baseUrl}/api/v1/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-test-auth': 'true',
                    'x-test-user': userId,
                },
                body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
            });
            assert.strictEqual(res.status, 200);
            await collectSSE(res);
        }

        const res = await fetch(`${server.baseUrl}/api/v1/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-test-auth': 'true',
                'x-test-user': userId,
            },
            body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
        });
        assert.strictEqual(res.status, 429);
        const body = await res.json();
        assert.strictEqual(body.error, 'Rate limit exceeded');
        assert.strictEqual(body.remaining, 0);
        assert.strictEqual(typeof body.resetAt, 'string');
        assert.ok(!Number.isNaN(new Date(body.resetAt).getTime()));
    });
});
