import React from "react";
import { PokemonCardData } from "@/types/pokemon";
import { PokemonCard } from "./PokemonCard";

interface PokemonGridProps {
  pokemonList: PokemonCardData[];
  emptyMessage?: string;
  onCompare?: (id: number) => void;
}

export function PokemonGrid({
  pokemonList,
  emptyMessage = "No Pokémon found matching your search.",
  onCompare,
}: PokemonGridProps) {
  if (!pokemonList || pokemonList.length === 0) {
    return (
      <div className="py-20 text-center glass-panel rounded-3xl p-8 max-w-lg mx-auto border border-slate-800 space-y-3">
        <div className="text-4xl">🔍</div>
        <p className="text-lg font-bold text-slate-300">
          {emptyMessage}
        </p>
        <p className="text-xs text-slate-500 font-medium">
          Try adjusting your search query or selecting a different elemental type filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} onCompare={onCompare} />
      ))}
    </div>
  );
}

