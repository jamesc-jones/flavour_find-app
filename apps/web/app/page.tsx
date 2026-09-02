import type { Metadata } from 'next';
import { MoodGrid } from '@/components/MoodGrid';

export const metadata: Metadata = {
  title: 'Flavour Find',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface">
      <MoodGrid />
    </main>
  );
}
