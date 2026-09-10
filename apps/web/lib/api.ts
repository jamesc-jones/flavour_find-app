import type { Mood, Recipe } from '@flavour-find/types';

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL ?? ''}/api`;

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

export async function createCheckoutSession(token: string): Promise<{ url: string }> {
  const res = await fetch(`${API_BASE}/billing/checkout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to create checkout session: ${res.status}`);
  return res.json() as Promise<{ url: string }>;
}

export async function createPortalSession(token: string): Promise<{ url: string }> {
  const res = await fetch(`${API_BASE}/billing/portal`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to create portal session: ${res.status}`);
  return res.json() as Promise<{ url: string }>;
}
