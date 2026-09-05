'use strict';

const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const Database = require('better-sqlite3');

const { checkChatLimit, insertChatUsage } = require('../database.js');

const dbPath = path.join(__dirname, '..', 'recipes.db');

function cleanupUser(userId) {
    const db = new Database(dbPath);
    db.prepare('DELETE FROM chat_usage WHERE user_id = ?').run(userId);
    db.close();
}

test('checkChatLimit: zero usage returns allowed with full remaining and no resetAt', (t) => {
    const userId = `__test_ccl_zero_${Date.now()}`;
    t.after(() => cleanupUser(userId));

    const result = checkChatLimit(userId, 20);
    assert.strictEqual(result.allowed, true);
    assert.strictEqual(result.used, 0);
    assert.strictEqual(result.remaining, 20);
    assert.strictEqual(result.resetAt, null);
});

test('checkChatLimit: usage below limit remains allowed', (t) => {
    const userId = `__test_ccl_below_${Date.now()}`;
    t.after(() => cleanupUser(userId));

    insertChatUsage(userId);
    insertChatUsage(userId);

    const result = checkChatLimit(userId, 20);
    assert.strictEqual(result.allowed, true);
    assert.strictEqual(result.used, 2);
    assert.strictEqual(result.remaining, 18);
    assert.strictEqual(result.resetAt, null);
});

test('checkChatLimit: usage at limit is blocked with resetAt derived from oldest request', (t) => {
    const userId = `__test_ccl_atlimit_${Date.now()}`;
    t.after(() => cleanupUser(userId));

    insertChatUsage(userId);
    insertChatUsage(userId);

    const result = checkChatLimit(userId, 2);
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.used, 2);
    assert.strictEqual(result.remaining, 0);
    assert.strictEqual(typeof result.resetAt, 'string');

    const db = new Database(dbPath);
    const oldest = db.prepare(
        'SELECT created_at FROM chat_usage WHERE user_id = ? ORDER BY created_at ASC LIMIT 1'
    ).get(userId);
    db.close();

    const expected = new Date(oldest.created_at.replace(' ', 'T') + 'Z').getTime() + 24 * 60 * 60 * 1000;
    assert.strictEqual(new Date(result.resetAt).getTime(), expected);
});

test('insertChatUsage: backward-compatible single-argument call defaults to pending/zero values', (t) => {
    const userId = `__test_icu_default_${Date.now()}`;
    t.after(() => cleanupUser(userId));

    insertChatUsage(userId);

    const db = new Database(dbPath);
    const row = db.prepare(
        'SELECT model, tokens_in, tokens_out, cost_usd FROM chat_usage WHERE user_id = ?'
    ).get(userId);
    db.close();

    assert.strictEqual(row.model, 'pending');
    assert.strictEqual(row.tokens_in, 0);
    assert.strictEqual(row.tokens_out, 0);
    assert.strictEqual(row.cost_usd, 0);
});

test('insertChatUsage: full call records real usage values', (t) => {
    const userId = `__test_icu_full_${Date.now()}`;
    t.after(() => cleanupUser(userId));

    insertChatUsage(userId, 'claude-haiku-4-5-20251001', 123, 456, 0.000789);

    const db = new Database(dbPath);
    const row = db.prepare(
        'SELECT model, tokens_in, tokens_out, cost_usd FROM chat_usage WHERE user_id = ?'
    ).get(userId);
    db.close();

    assert.strictEqual(row.model, 'claude-haiku-4-5-20251001');
    assert.strictEqual(row.tokens_in, 123);
    assert.strictEqual(row.tokens_out, 456);
    assert.strictEqual(row.cost_usd, 0.000789);
});
