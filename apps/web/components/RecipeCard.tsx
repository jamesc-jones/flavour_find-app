'use client';

import type { Recipe } from '@flavour-find/types';

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="rounded-lg border border-border bg-surface-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-text-primary">
        {recipe.emoji} {recipe.name}
      </h2>
      <p className="mt-2 text-text-secondary">{recipe.description}</p>

      <h3 className="mt-4 font-semibold text-text-primary">Ingredients</h3>
      <ul className="mt-1 list-disc pl-5 text-text-primary">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3 className="mt-4 font-semibold text-text-primary">Instructions</h3>
      <ol className="mt-1 list-decimal pl-5 text-text-primary">
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </article>
  );
}
