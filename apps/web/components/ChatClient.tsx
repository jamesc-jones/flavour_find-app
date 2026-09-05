'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

type SsePayload = { token?: string; done?: boolean; remaining?: number; error?: string };

const MAX_CONTEXT_MESSAGES = 6;

export function ChatClient() {
    const { isSignedIn, getToken } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [remaining, setRemaining] = useState<number | null>(null);
    const [resetAt, setResetAt] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            abortRef.current?.abort();
        };
    }, []);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || isStreaming) {
            return;
        }

        setErrorMessage(null);
        setResetAt(null);

        const userMessage: ChatMessage = { role: 'user', content: trimmed };
        const nextMessages = [...messages, userMessage];
        setMessages([...nextMessages, { role: 'assistant', content: '' }]);
        setInput('');
        setIsStreaming(true);

        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const token = await getToken();
            const response = await fetch('/api/v1/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ messages: nextMessages.slice(-MAX_CONTEXT_MESSAGES) }),
                signal: controller.signal,
            });

            if (response.status === 429) {
                const body = await response.json().catch(() => null) as { resetAt?: string } | null;
                setErrorMessage('Rate limit exceeded.');
                setResetAt(body?.resetAt ?? null);
                setRemaining(0);
                setMessages(nextMessages);
                return;
            }

            if (response.status === 401) {
                setErrorMessage('You need to sign in to chat.');
                setMessages(nextMessages);
                return;
            }

            if (!response.ok || !response.body) {
                setErrorMessage('Something went wrong. Please try again.');
                setMessages(nextMessages);
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let assistantText = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    break;
                }
                buffer += decoder.decode(value, { stream: true });
                const chunks = buffer.split('\n\n');
                buffer = chunks.pop() ?? '';

                for (const chunk of chunks) {
                    const line = chunk.trim();
                    if (!line.startsWith('data:')) {
                        continue;
                    }
                    const jsonStr = line.slice(5).trim();
                    if (!jsonStr) {
                        continue;
                    }

                    let payload: SsePayload;
                    try {
                        payload = JSON.parse(jsonStr) as SsePayload;
                    } catch {
                        continue;
                    }

                    if (typeof payload.token === 'string') {
                        assistantText += payload.token;
                        const text = assistantText;
                        setMessages((prev) => {
                            const updated = [...prev];
                            updated[updated.length - 1] = { role: 'assistant', content: text };
                            return updated;
                        });
                    } else if (payload.done) {
                        if (typeof payload.remaining === 'number') {
                            setRemaining(payload.remaining);
                        }
                    } else if (payload.error) {
                        setErrorMessage('AI service error. Please try again.');
                        setMessages((prev) => {
                            const last = prev[prev.length - 1];
                            if (last && last.role === 'assistant' && last.content === '') {
                                return prev.slice(0, -1);
                            }
                            return prev;
                        });
                    }
                }
            }
        } catch (err) {
            if ((err as Error)?.name !== 'AbortError') {
                setErrorMessage('Network error. Please try again.');
                setMessages(nextMessages);
            }
        } finally {
            setIsStreaming(false);
            abortRef.current = null;
        }
    }

    if (!isSignedIn) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-surface p-8">
                <p className="text-text-secondary">Sign in to chat with the Flavour Find assistant.</p>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col bg-surface p-4 sm:p-8">
            <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4">
                <h1 className="text-xl font-semibold text-text-primary">Flavour Find Assistant</h1>

                <div className="flex flex-1 flex-col gap-3 overflow-y-auto rounded-lg border border-border bg-surface-card p-4">
                    {messages.length === 0 && (
                        <p className="text-text-secondary">
                            Ask for recipe ideas, substitutions, or mood-based meal suggestions.
                        </p>
                    )}
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={
                                message.role === 'user'
                                    ? 'self-end rounded-lg bg-brand-primary px-4 py-2 text-white'
                                    : 'self-start rounded-lg bg-brand-secondary px-4 py-2 text-text-primary'
                            }
                        >
                            {message.content || (isStreaming && index === messages.length - 1 ? '…' : '')}
                        </div>
                    ))}
                </div>

                {errorMessage && (
                    <p className="rounded-md bg-error-surface px-4 py-3 text-error">
                        {errorMessage}
                        {resetAt && <> Try again after {new Date(resetAt).toLocaleString()}.</>}
                    </p>
                )}

                {remaining !== null && !errorMessage && (
                    <p className="text-sm text-text-secondary">{remaining} messages remaining today.</p>
                )}

                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                        disabled={isStreaming}
                        maxLength={2000}
                        placeholder="Ask about a recipe..."
                        className="flex-1 rounded-lg border border-border bg-surface-card px-4 py-2 text-text-primary disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={isStreaming || !input.trim()}
                        className="rounded-lg bg-brand-primary px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
                    >
                        Send
                    </button>
                </form>
            </div>
        </main>
    );
}
