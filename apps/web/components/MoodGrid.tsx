'use client';

import { useRouter } from 'next/navigation';
import { KNOWN_MOODS } from '@/lib/moods';

export function MoodGrid() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-4 p-8 sm:grid-cols-4">
      {KNOWN_MOODS.map((mood) => (
        <button
          key={mood}
          type="button"
          onClick={() => router.push(`/recipe/${mood}`)}
          className="rounded-lg border border-border bg-surface-card px-4 py-6 text-text-primary capitalize shadow-sm transition hover:border-brand-primary hover:text-brand-primary"
        >
          {mood}
        </button>
      ))}
    </div>
  );
}
