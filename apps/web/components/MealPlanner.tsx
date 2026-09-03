'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

interface MealPlanEntry {
    id: number;
    planned_date: string;
    meal_slot: string;
    recipe_id: number;
    name: string;
    emoji: string;
    description: string;
}

function todayAsWeekStart(): string {
    const now = new Date();
    return now.toISOString().slice(0, 10);
}

export function MealPlanner() {
    const { getToken, isSignedIn } = useAuth();
    const [plan, setPlan] = useState<MealPlanEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isSignedIn) {
            setLoading(false);
            return;
        }

        (async () => {
            try {
                const token = await getToken();
                const week = todayAsWeekStart();

                const res = await fetch(`/api/user/meal-plan?week=${week}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    setPlan((await res.json()) as MealPlanEntry[]);
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [isSignedIn, getToken]);

    async function handleRemove(id: number) {
        const token = await getToken();

        const res = await fetch(`/api/user/meal-plan/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            setPlan(prev => prev.filter(entry => entry.id !== id));
        }
    }

    if (!isSignedIn) {
        return <p>Sign in to see your meal plan.</p>;
    }

    if (loading) {
        return <p>Loading…</p>;
    }

    if (plan.length === 0) {
        return <p>No meals planned for this week.</p>;
    }

    return (
        <ul>
            {plan.map(entry => (
                <li key={entry.id}>
                    {entry.planned_date} — {entry.meal_slot}: {entry.emoji} {entry.name}
                    <button onClick={() => handleRemove(entry.id)}>
                        Remove
                    </button>
                </li>
            ))}
        </ul>
    );
}
