import React from "react";
import { fetchPokemonList } from "@/lib/api/pokeapi";
import { PokemonExplorerView } from "@/components/pokemon/PokemonExplorerView";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { PokeballWatermark } from "@/components/common/PokeballWatermark";

export default async function HomePage() {
  try {
    const { pokemonList } = await fetchPokemonList(151, 0);

    return (
      <main className="relative min-h-screen bg-[#080C14] text-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-rose-600/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="absolute -top-24 -right-24 text-blue-500/10 pointer-events-none z-0 rotate-12 animate-pulse-glow">
          <PokeballWatermark size={460} opacity={0.12} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <PokemonExplorerView initialPokemonList={pokemonList} />
        </div>
      </main>
    );
  } catch {
    return (
      <main className="min-h-screen bg-[#080C14] text-slate-100 py-16 px-4">
        <div className="max-w-xl mx-auto">
          <ErrorMessage message="Failed to load Pokemon list from PokeAPI. Please check your network connection and try again." />
        </div>
      </main>
    );
  }
}
