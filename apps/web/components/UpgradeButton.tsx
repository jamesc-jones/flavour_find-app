'use client';

import { useAuth } from '@clerk/react';
import { useEffect, useState } from 'react';
import { createCheckoutSession, createPortalSession } from '@/lib/api';

type Tier = 'free' | 'premium';

export function UpgradeButton() {
    const { isSignedIn, getToken } = useAuth();
    const [tier, setTier] = useState<Tier | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
                // Leave tier unset on failure; no action button is rendered.
            }
        })();
    }, [isSignedIn, getToken]);

    async function handleUpgrade() {
        setErrorMessage(null);
        setIsSubmitting(true);
        try {
            const token = await getToken();
            if (!token) {
                setErrorMessage('You need to sign in to upgrade.');
                return;
            }
            const { url } = await createCheckoutSession(token);
            window.location.href = url;
        } catch {
            setErrorMessage('Could not start checkout. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleManageSubscription() {
        setErrorMessage(null);
        setIsSubmitting(true);
        try {
            const token = await getToken();
            if (!token) {
                setErrorMessage('You need to sign in to manage your subscription.');
                return;
            }
            const { url } = await createPortalSession(token);
            window.location.href = url;
        } catch {
            setErrorMessage('Could not open the billing portal. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!isSignedIn || !tier) {
        return null;
    }

    return (
        <div>
            {tier === 'free' ? (
                <button
                    type="button"
                    onClick={handleUpgrade}
                    disabled={isSubmitting}
                    className="rounded-lg bg-brand-primary px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
                >
                    Upgrade to Premium
                </button>
            ) : (
                <button
                    type="button"
                    onClick={handleManageSubscription}
                    disabled={isSubmitting}
                    className="rounded-lg bg-brand-secondary px-4 py-2 text-text-primary hover:opacity-90 disabled:opacity-50"
                >
                    Manage Subscription
                </button>
            )}

            {errorMessage && (
                <p className="mt-2 rounded-md bg-error-surface px-3 py-2 text-sm text-error">{errorMessage}</p>
            )}
        </div>
    );
}
