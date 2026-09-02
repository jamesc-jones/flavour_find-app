import type { Mood, Recipe } from '@flavour-find/types';

const API_BASE = '/api';

export async function fetchMoods(): Promise<Mood[]> {
  const res = await fetch(`${API_BASE}/moods`);
  if (!res.ok) throw new Error(`Failed to fetch moods: ${res.status}`);
  return res.json() as Promise<Mood[]>;
}

export async function fetchRandomRecipe(mood: string): Promise<Recipe> {
  const res = await fetch(`${API_BASE}/recipe/${encodeURIComponent(mood)}/random`);
  if (!res.ok) throw new Error(`Failed to fetch recipe for ${mood}: ${res.status}`);
  return res.json() as Promise<Recipe>;
}
