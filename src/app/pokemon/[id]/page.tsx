import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPokemonDetail } from "@/lib/api/pokeapi";
import { PokemonDetails } from "@/components/pokemon/PokemonDetails";
import { formatPokemonName } from "@/utils/formatPokemonName";
import { Loading } from "@/components/common/Loading";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Pre-generate static params for the first 151 Pokemon for SSG speed optimization
 */
export async function generateStaticParams() {
  const ids = Array.from({ length: 151 }, (_, i) => ({ id: String(i + 1) }));
  return ids;
}

/**
 * Dynamic Metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const pokemon = await fetchPokemonDetail(id);
    const formattedName = formatPokemonName(pokemon.name);
    return {
      title: `${formattedName} | Pokemon Explorer`,
      description: `View stats, abilities, types, and moves for ${formattedName} on Pokemon Explorer.`,
    };
  } catch {
    return {
      title: "Pokemon Not Found | Pokemon Explorer",
    };
  }
}

async function PokemonDetailContent({ params }: PageProps) {
  const { id } = await params;

  try {
    const pokemon = await fetchPokemonDetail(id);

    return <PokemonDetails pokemon={pokemon} />;
  } catch {
    notFound();
  }
}

export default function PokemonDetailPage({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<Loading />}>
        <PokemonDetailContent params={params} />
      </Suspense>
    </main>
  );
}

