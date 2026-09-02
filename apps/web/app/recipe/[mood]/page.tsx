import type { Metadata } from 'next';
import { RecipePageClient } from '@/components/RecipePageClient';

type PageProps = {
  params: Promise<{ mood: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mood } = await params;
  const title = mood.charAt(0).toUpperCase() + mood.slice(1);
  return { title: `Flavour Find — ${title} Recipe` };
}

export default async function RecipePage({ params }: PageProps) {
  const { mood } = await params;
  return <RecipePageClient mood={mood} />;
}
