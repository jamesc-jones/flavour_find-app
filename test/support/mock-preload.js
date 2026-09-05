'use strict';

// Loaded via `node -r <this file> server.js` in a forked child process, BEFORE
// server.js's own require('@anthropic-ai/sdk') / require('@clerk/express') run.
// Intercepts Module._load so those two specifiers resolve to controllable fakes,
// without touching server.js or node_modules. Controlled from the parent test
// process over the fork's IPC channel.

const Module = require('node:module');
const originalLoad = Module._load;

const state = {
    stream: {
        tokens: [],
        delayMs: 0,
        usage: { input_tokens: 0, output_tokens: 0 },
        throwOnCreate: null,
        throwDuringIteration: null,
    },
};

if (typeof process.send === 'function') {
    process.on('message', (msg) => {
        if (!msg || typeof msg !== 'object') {
            return;
        }
        if (msg.type === 'SET_STREAM') {
            state.stream = { ...state.stream, ...msg.stream };
            process.send({ type: 'STREAM_SET' });
        }
    });
}

class FakeStream {
    constructor() {
        this._aborted = false;
        this.controller = {
            abort: () => {
                this._aborted = true;
                if (typeof process.send === 'function') {
                    process.send({ type: 'ABORTED' });
                }
            },
        };
    }

    async *[Symbol.asyncIterator]() {
        const { tokens, delayMs, throwDuringIteration } = state.stream;
        for (const token of tokens) {
            if (this._aborted) {
                return;
            }
            if (delayMs) {
                await new Promise((resolve) => setTimeout(resolve, delayMs));
            }
            if (this._aborted) {
                return;
            }
            yield { type: 'content_block_delta', delta: { type: 'text_delta', text: token } };
        }
        if (throwDuringIteration) {
            throw new Error(throwDuringIteration);
        }
    }

    async finalMessage() {
        if (this._aborted) {
            throw new Error('Request was aborted.');
        }
        return { usage: state.stream.usage };
    }
}

class FakeAnthropic {
    constructor() {
        this.messages = {
            stream: (opts) => {
                if (typeof process.send === 'function') {
                    process.send({ type: 'STREAM_CALLED', opts });
                }
                if (state.stream.throwOnCreate) {
                    throw new Error(state.stream.throwOnCreate);
                }
                return new FakeStream();
            },
        };
    }
}

const fakeClerk = {
    clerkMiddleware: () => (req, res, next) => next(),
    getAuth: (req) => {
        if (req.headers['x-test-auth'] === 'true') {
            return {
                isAuthenticated: true,
                userId: req.headers['x-test-user'] || 'fork-test-user',
            };
        }
        return { isAuthenticated: false, userId: null };
    },
};

Module._load = function patchedLoad(request, parent, isMain) {
    if (request === '@anthropic-ai/sdk') {
        return FakeAnthropic;
    }
    if (request === '@clerk/express') {
        return fakeClerk;
    }
    return originalLoad.apply(this, arguments);
};
