'use strict';

const { fork } = require('node:child_process');
const path = require('node:path');
const net = require('node:net');

const SERVER_PATH = path.join(__dirname, '..', '..', 'server.js');
const PRELOAD_PATH = path.join(__dirname, 'mock-preload.js');

function waitForPort(port, host, timeoutMs) {
    const deadline = Date.now() + timeoutMs;
    return new Promise((resolve, reject) => {
        function attempt() {
            const socket = net.connect({ port, host }, () => {
                socket.end();
                resolve();
            });
            socket.on('error', () => {
                socket.destroy();
                if (Date.now() > deadline) {
                    reject(new Error(`Server did not open port ${port} within ${timeoutMs}ms`));
                } else {
                    setTimeout(attempt, 100);
                }
            });
        }
        attempt();
    });
}

async function startTestServer({ port, extraEnv = {} }) {
    const child = fork(SERVER_PATH, [], {
        execArgv: ['-r', PRELOAD_PATH],
        env: { ...process.env, PORT: String(port), ...extraEnv },
        stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
    });

    const stderrChunks = [];
    const stdoutChunks = [];
    child.stderr.on('data', (chunk) => stderrChunks.push(chunk));
    child.stdout.on('data', (chunk) => stdoutChunks.push(chunk));

    await waitForPort(port, '127.0.0.1', 10000);

    return {
        child,
        baseUrl: `http://127.0.0.1:${port}`,
        getStderr: () => Buffer.concat(stderrChunks).toString('utf8'),
        getStdout: () => Buffer.concat(stdoutChunks).toString('utf8'),
        waitForMessage(type, timeoutMs = 5000) {
            return new Promise((resolve, reject) => {
                const timer = setTimeout(() => {
                    child.off('message', onMessage);
                    reject(new Error(`Timed out waiting for IPC message type=${type}`));
                }, timeoutMs);
                function onMessage(msg) {
                    if (msg && msg.type === type) {
                        clearTimeout(timer);
                        child.off('message', onMessage);
                        resolve(msg);
                    }
                }
                child.on('message', onMessage);
            });
        },
        async setStream(streamConfig) {
            const ack = this.waitForMessage('STREAM_SET', 2000);
            child.send({ type: 'SET_STREAM', stream: streamConfig });
            await ack;
        },
        async stop() {
            if (child.exitCode !== null || child.killed) {
                return;
            }
            await new Promise((resolve) => {
                child.once('exit', () => resolve());
                child.kill();
                setTimeout(resolve, 2000);
            });
        },
    };
}

module.exports = { startTestServer };
