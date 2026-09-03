'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

interface SavedRecipe {
    saved_id: number;
    id: number;
    name: string;
    emoji: string;
    description: string;
    saved_at: string;
}

export function SavedRecipes() {
    const { getToken, isSignedIn } = useAuth();
    const [saved, setSaved] = useState<SavedRecipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isSignedIn) {
            setLoading(false);
            return;
        }

        (async () => {
            try {
                const token = await getToken();

                const res = await fetch('/api/user/saved', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    setSaved((await res.json()) as SavedRecipe[]);
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [isSignedIn, getToken]);

    async function handleUnsave(savedId: number) {
        const token = await getToken();

        const res = await fetch(`/api/user/saved/${savedId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            setSaved(prev => prev.filter(r => r.saved_id !== savedId));
        }
    }

    if (!isSignedIn) {
        return <p>Sign in to see saved recipes.</p>;
    }

    if (loading) {
        return <p>Loading…</p>;
    }

    if (saved.length === 0) {
        return <p>No saved recipes yet.</p>;
    }

    return (
        <ul>
            {saved.map(r => (
                <li key={r.saved_id}>
                    {r.emoji} {r.name}
                    <button onClick={() => handleUnsave(r.saved_id)}>
                        Remove
                    </button>
                </li>
            ))}
        </ul>
    );
}
