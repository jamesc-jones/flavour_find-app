export const KNOWN_MOODS = [
  'happy', 'sad', 'stressed', 'energetic',
  'cozy', 'adventurous', 'romantic', 'lazy',
] as const;

export type MoodName = typeof KNOWN_MOODS[number];

export function isKnownMood(value: string): value is MoodName {
  return (KNOWN_MOODS as readonly string[]).includes(value);
}
