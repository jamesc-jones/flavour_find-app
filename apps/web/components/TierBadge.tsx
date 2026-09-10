'use client';

import { useAuth } from '@clerk/react';
import { useEffect, useState } from 'react';

type Tier = 'free' | 'premium';

export function TierBadge() {
    const { isSignedIn, getToken } = useAuth();
    const [tier, setTier] = useState<Tier | null>(null);

    useEffect(() => {
        if (!isSignedIn) {
            setTier(null);
            return;
        }

        (async () => {
            try {
                const token = await getToken();
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/billing/status`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const body = (await res.json()) as { tier: Tier };
                    setTier(body.tier);
                }
            } catch {
                // Leave tier unset on failure; the badge simply doesn't render.
            }
        })();
    }, [isSignedIn, getToken]);

    if (!isSignedIn || !tier) {
        return null;
    }

    return (
        <span className="inline-block rounded-full bg-brand-secondary px-3 py-1 text-xs font-semibold text-text-primary">
            {tier === 'premium' ? 'Premium' : 'Free'}
        </span>
    );
}
