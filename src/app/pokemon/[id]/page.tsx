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

export async function generateStaticParams() {
  const ids = Array.from({ length: 151 }, (_, i) => ({ id: String(i + 1) }));
  return ids;
}

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
    <main className="w-full min-h-screen bg-[#080C14] text-slate-100 m-0 p-0 overflow-x-hidden">
      <Suspense fallback={<Loading />}>
        <PokemonDetailContent params={params} />
      </Suspense>
    </main>
  );
}
