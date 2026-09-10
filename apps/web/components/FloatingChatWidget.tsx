'use client';

import { useAuth } from '@clerk/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

type SsePayload = { token?: string; done?: boolean; remaining?: number; error?: string };

const MAX_CONTEXT_MESSAGES = 6;

const HIDDEN_PATHNAMES = new Set(['/chat', '/chat/']);

export function FloatingChatWidget() {
    const pathname = usePathname();
    const { isSignedIn, getToken } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [remaining, setRemaining] = useState<number | null>(null);
    const [resetAt, setResetAt] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isRateLimited, setIsRateLimited] = useState(false);

    const fabRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            abortRef.current?.abort();
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen, isSignedIn]);

    function closePanel() {
        setIsOpen(false);
        fabRef.current?.focus();
    }

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                e.preventDefault();
                closePanel();
                return;
            }

            if (e.key !== 'Tab' || !panelRef.current) {
                return;
            }

            const focusable = panelRef.current.querySelectorAll<HTMLElement>(
                'button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusable.length === 0) {
                return;
            }
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    function goToSignIn() {
        window.location.href = '/sign-in/';
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || isStreaming) {
            return;
        }

        setErrorMessage(null);
        setResetAt(null);
        setIsRateLimited(false);

        const userMessage: ChatMessage = { role: 'user', content: trimmed };
        const nextMessages = [...messages, userMessage];
        setMessages([...nextMessages, { role: 'assistant', content: '' }]);
        setInput('');
        setIsStreaming(true);

        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const token = await getToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/v1/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ messages: nextMessages.slice(-MAX_CONTEXT_MESSAGES) }),
                signal: controller.signal,
            });

            if (response.status === 429) {
                const body = (await response.json().catch(() => null)) as { resetAt?: string } | null;
                setErrorMessage("You've reached your chat limit for today.");
                setIsRateLimited(true);
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

    function handleAbort() {
        abortRef.current?.abort();
    }

    if (pathname !== null && HIDDEN_PATHNAMES.has(pathname)) {
        return null;
    }

    return (
        <>
            <button
                ref={fabRef}
                type="button"
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
                onClick={() => (isOpen ? closePanel() : setIsOpen(true))}
                className="fixed bottom-6 right-6 z-50 flex min-h-[56px] min-w-[56px] items-center justify-center rounded-full bg-brand-primary text-white shadow-lg hover:opacity-90"
            >
                <span aria-hidden="true" className="text-2xl">
                    {isOpen ? '✕' : '💬'}
                </span>
            </button>

            {isOpen && (
                <div
                    ref={panelRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="floating-chat-widget-heading"
                    className="fixed bottom-20 right-6 z-50 flex h-[60vh] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface-card shadow-xl sm:h-[32rem] sm:w-96"
                >
                    <div className="flex items-center justify-between border-b border-border px-4 py-3">
                        <h2 id="floating-chat-widget-heading" className="text-sm font-semibold text-text-primary">
                            Flavour Find Assistant
                        </h2>
                    </div>

                    {!isSignedIn ? (
                        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4 text-center">
                            <p className="text-text-secondary">Sign in to chat with the Flavour Find assistant.</p>
                            <button
                                type="button"
                                onClick={goToSignIn}
                                className="rounded-lg bg-brand-primary px-4 py-2 text-white hover:opacity-90"
                            >
                                Sign in
                            </button>
                        </div>
                    ) : (
                        <>
                            <div
                                aria-live="polite"
                                className="flex flex-1 flex-col gap-2 overflow-y-auto p-3"
                            >
                                {messages.length === 0 && (
                                    <p className="text-sm text-text-secondary">
                                        Ask for recipe ideas, substitutions, or mood-based meal suggestions.
                                    </p>
                                )}
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={
                                            message.role === 'user'
                                                ? 'self-end rounded-lg bg-brand-primary px-3 py-2 text-sm text-white'
                                                : 'self-start rounded-lg bg-brand-secondary px-3 py-2 text-sm text-text-primary'
                                        }
                                    >
                                        {message.content || (isStreaming && index === messages.length - 1 ? '…' : '')}
                                    </div>
                                ))}
                            </div>

                            {errorMessage && isRateLimited && (
                                <div className="mx-3 mb-2 rounded-md bg-error-surface px-3 py-2 text-xs text-error">
                                    <p>
                                        {errorMessage} Upgrade to Premium for a higher daily chat limit.
                                        {resetAt && <> Or try again after {new Date(resetAt).toLocaleString()}.</>}
                                    </p>
                                    <a
                                        href="/billing/"
                                        className="mt-1 inline-block rounded-lg bg-brand-primary px-3 py-1 text-white hover:opacity-90"
                                    >
                                        Upgrade to Premium
                                    </a>
                                </div>
                            )}

                            {errorMessage && !isRateLimited && (
                                <p className="mx-3 mb-2 rounded-md bg-error-surface px-3 py-2 text-xs text-error">
                                    {errorMessage}
                                </p>
                            )}

                            {remaining !== null && !errorMessage && (
                                <p className="mx-3 mb-2 text-xs text-text-secondary">{remaining} messages remaining today.</p>
                            )}

                            <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border p-3">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                                    disabled={isStreaming}
                                    maxLength={2000}
                                    placeholder="Ask about a recipe..."
                                    className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary disabled:opacity-50"
                                />
                                {isStreaming ? (
                                    <button
                                        type="button"
                                        onClick={handleAbort}
                                        className="rounded-lg bg-brand-secondary px-3 py-2 text-sm text-text-primary hover:opacity-90"
                                    >
                                        Stop
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={!input.trim()}
                                        className="rounded-lg bg-brand-primary px-3 py-2 text-sm text-white hover:opacity-90 disabled:opacity-50"
                                    >
                                        Send
                                    </button>
                                )}
                            </form>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
