import type { Metadata } from 'next';
import { TierBadge } from '@/components/TierBadge';
import { UpgradeButton } from '@/components/UpgradeButton';

export const metadata: Metadata = {
    title: 'Flavour Find — Billing',
};

export default function BillingPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-surface p-8">
            <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-border bg-surface-card p-6">
                <h1 className="text-xl font-semibold text-text-primary">Billing</h1>

                <div className="flex items-center gap-2">
                    <span className="text-text-secondary">Current plan:</span>
                    <TierBadge />
                </div>

                <UpgradeButton />
            </div>
        </main>
    );
}
