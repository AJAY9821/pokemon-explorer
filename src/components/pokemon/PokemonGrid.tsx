import React from "react";
import { PokemonCardData } from "@/types/pokemon";
import { PokemonCard } from "./PokemonCard";

interface PokemonGridProps {
  pokemonList: PokemonCardData[];
  emptyMessage?: string;
  onCompare?: (id: number) => void;
  onResetView?: () => void;
}

export function PokemonGrid({
  pokemonList,
  emptyMessage = "No Pokémon found matching your search.",
  onCompare,
  onResetView,
}: PokemonGridProps) {
  if (!pokemonList || pokemonList.length === 0) {
    return (
      <div className="py-16 text-center glass-panel rounded-3xl p-8 max-w-lg mx-auto border border-slate-800 space-y-4 shadow-xl">
        <div className="text-4xl">❤️</div>
        <p className="text-base font-bold text-slate-300">
          {emptyMessage}
        </p>
        {onResetView && (
          <button
            onClick={onResetView}
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 transition-all shadow-lg text-xs font-black uppercase tracking-wider"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Explorer</span>
          </button>
        )}
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
