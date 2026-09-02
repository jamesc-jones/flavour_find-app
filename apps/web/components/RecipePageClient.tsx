'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Recipe } from '@flavour-find/types';
import { isKnownMood } from '@/lib/moods';
import { fetchRandomRecipe } from '@/lib/api';
import { RecipeCard } from '@/components/RecipeCard';

type RecipePageClientProps = {
  mood: string;
};

export function RecipePageClient({ mood }: RecipePageClientProps) {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecipe = useCallback(() => {
    if (!isKnownMood(mood)) {
      return;
    }
    setIsLoading(true);
    setError(null);
    fetchRandomRecipe(mood)
      .then((data) => setRecipe(data))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load recipe');
      })
      .finally(() => setIsLoading(false));
  }, [mood]);

  useEffect(() => {
    loadRecipe();
  }, [loadRecipe]);

  if (!isKnownMood(mood)) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface p-8">
        <p className="rounded-md bg-error-surface px-4 py-3 text-error">
          Unknown mood: &quot;{mood}&quot;
        </p>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="rounded-lg border border-border bg-surface-card px-4 py-2 text-text-primary hover:border-brand-primary hover:text-brand-primary"
        >
          Back
        </button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 bg-surface p-8">
      {isLoading && <p className="text-text-secondary">Loading...</p>}

      {error && !isLoading && (
        <p className="rounded-md bg-error-surface px-4 py-3 text-error">{error}</p>
      )}

      {recipe && !isLoading && !error && (
        <div className="w-full max-w-xl">
          <RecipeCard recipe={recipe} />
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={loadRecipe}
          disabled={isLoading}
          className="rounded-lg bg-brand-primary px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
        >
          Different recipe
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="rounded-lg border border-border bg-surface-card px-4 py-2 text-text-primary hover:border-brand-primary hover:text-brand-primary"
        >
          Back
        </button>
      </div>
    </main>
  );
}
