import React from "react";
import { fetchPokemonList } from "@/lib/api/pokeapi";
import { PokemonExplorerView } from "@/components/pokemon/PokemonExplorerView";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { PokeballWatermark } from "@/components/common/PokeballWatermark";

export default async function HomePage() {
  try {
    const { pokemonList } = await fetchPokemonList(60, 0);

    return (
      <main className="relative min-h-screen bg-[#080C14] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern">
        {/* Ambient Neon Background Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-rose-600/15 rounded-full blur-[130px] pointer-events-none" />

        {/* Giant Watermark Pokeball in Top Right */}
        <div className="absolute -top-24 -right-24 text-blue-500/10 pointer-events-none z-0 rotate-12 animate-pulse-glow">
          <PokeballWatermark size={460} opacity={0.12} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-10">
          {/* Header Hero Section */}
          <div className="text-center space-y-4 pt-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md shadow-inner text-xs font-bold text-blue-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Interactive 3D Pokédex Showcase
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Explore the <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                Pokémon Universe
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed max-w-xl mx-auto">
              Discover stats, elemental type match-ups, movesets, and evolution chains with interactive 3D holographic cards.
            </p>
          </div>

          {/* Interactive Search, Type Filter & Grid View */}
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
