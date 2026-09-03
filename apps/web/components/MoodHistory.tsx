'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

interface HistoryEntry {
    id: number;
    mood: string;
    recipe_id: number | null;
    recipe_name: string | null;
    recipe_emoji: string | null;
    created_at: string;
}

export function MoodHistory() {
    const { getToken, isSignedIn } = useAuth();
    const [history, setHistory] = useState<HistoryEntry[]>([]);

    useEffect(() => {
        if (!isSignedIn) return;
        (async () => {
            const token = await getToken();
            const res = await fetch('/api/user/mood-history', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) setHistory((await res.json()) as HistoryEntry[]);
        })();
    }, [isSignedIn, getToken]);

    if (!isSignedIn) return null;
    return (
        <ul>
            {history.map(h => (
                <li key={h.id}>
                    {h.mood} — {h.recipe_emoji} {h.recipe_name ?? 'unknown'} ({h.created_at})
                </li>
            ))}
        </ul>
    );
}
