'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

interface GroceryListProps {
    weekStart: string;
}

export function GroceryList({ weekStart }: GroceryListProps) {
    const { getToken, isSignedIn } = useAuth();
    const [items, setItems] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isSignedIn) {
            setLoading(false);
            return;
        }

        (async () => {
            try {
                const token = await getToken();

                const res = await fetch(`/api/user/grocery-list?week=${weekStart}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = (await res.json()) as { items: string[] };
                    setItems(data.items);
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [isSignedIn, getToken, weekStart]);

    if (!isSignedIn) {
        return <p>Sign in to see your grocery list.</p>;
    }

    if (loading) {
        return <p>Loading…</p>;
    }

    if (items.length === 0) {
        return <p>No grocery items for this week.</p>;
    }

    return (
        <ul>
            {items.map(item => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}
