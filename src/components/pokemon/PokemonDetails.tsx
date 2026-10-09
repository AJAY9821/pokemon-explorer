"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PokemonDetail } from "@/types/pokemon";
import { formatPokemonName } from "@/utils/formatPokemonName";
import { DRIBBBLE_TYPE_COLORS } from "@/lib/constants";
import { PokeballWatermark } from "@/components/common/PokeballWatermark";
import { PokemonAboutTab } from "./PokemonAboutTab";
import { PokemonStats } from "./PokemonStats";
import { PokemonEvolutionTab } from "./PokemonEvolutionTab";
import { PokemonMoves } from "./PokemonMoves";

interface PokemonDetailsProps {
  pokemon: PokemonDetail;
}

type TabType = "about" | "stats" | "evolution" | "moves";

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const [isShiny, setIsShiny] = useState(false);

  const primaryType = pokemon.types[0]?.type.name.toLowerCase() || "normal";
  const colorTheme = DRIBBBLE_TYPE_COLORS[primaryType] || DRIBBBLE_TYPE_COLORS.normal;

  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;
  const formattedName = formatPokemonName(pokemon.name);

  const defaultImage =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.other?.home?.front_default ||
    pokemon.sprites.front_default ||
    "";

  const shinyImage =
    pokemon.sprites.other?.["official-artwork"]?.front_shiny ||
    pokemon.sprites.other?.home?.front_shiny ||
    pokemon.sprites.front_shiny ||
    defaultImage;

  const activeImage = isShiny ? shinyImage : defaultImage;

  return (
    <div className="relative min-h-screen bg-[#080C14] text-slate-100 py-6 px-3 sm:px-6 lg:px-8 bg-grid-pattern">
      {/* Dynamic Background Ambient Orbs */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-35 pointer-events-none"
        style={{ backgroundColor: colorTheme.hex }}
      />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        {/* Top Header Controls */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 transition-all shadow-lg"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-xs font-black tracking-wider uppercase">Back to Explorer</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Shiny Sprite Toggle Button */}
            <button
              onClick={() => setIsShiny(!isShiny)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-black tracking-wider uppercase flex items-center gap-2 transition-all duration-300 border ${isShiny
                  ? "bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "bg-slate-900/80 text-slate-400 border-slate-700/60 hover:text-slate-200"
                }`}
            >
              <span className={`text-base ${isShiny ? "animate-spin" : ""}`}>✨</span>
              <span>{isShiny ? "Shiny On" : "Normal"}</span>
            </button>

            <span className="px-3.5 py-1.5 rounded-2xl text-xs font-black tracking-widest bg-slate-900/80 border border-slate-700/60 text-slate-300">
              {formattedId}
            </span>
          </div>
        </div>

        {/* Hero Card Showcase Stage */}
        <div
          className={`relative rounded-3xl p-6 sm:p-10 border ${colorTheme.border} ${colorTheme.bg} shadow-2xl overflow-hidden`}
        >
          {/* Background Watermark */}
          <div className="absolute -right-10 -bottom-10 text-white/10 pointer-events-none rotate-12">
            <PokeballWatermark size={360} opacity={0.15} />
          </div>

          <div className="relative z-10 grid grid-cols-12 items-center gap-6">
            {/* Left Header Info */}
            <div className="col-span-12 md:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-black text-white/90 border border-white/20">
                <span>Generation I</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-lg">
                {formattedName}
              </h1>

              <div className="flex flex-wrap gap-2 pt-1">
                {pokemon.types.map((t) => {
                  const typeTheme = DRIBBBLE_TYPE_COLORS[t.type.name.toLowerCase()] || colorTheme;
                  return (
                    <span
                      key={t.type.name}
                      className={`px-4 py-1.5 text-xs font-black tracking-wider uppercase rounded-full shadow-md ${typeTheme.badgeBg}`}
                    >
                      {formatPokemonName(t.type.name)}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Right Hero Artwork */}
            <div className="col-span-12 md:col-span-6 flex justify-center items-center relative py-4">
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-black/50 blur-2xl rounded-full scale-90 translate-y-6" />
                {activeImage && (
                  <Image
                    src={activeImage}
                    alt={pokemon.name}
                    width={280}
                    height={280}
                    className="w-60 h-60 sm:w-72 sm:h-72 object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-105"
                    priority
                    unoptimized
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Glass Details Section */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800">
          {/* Navigation Bar */}
          <div className="flex items-center justify-start sm:justify-center gap-2 border-b border-slate-800/80 pb-4 mb-6 overflow-x-auto scrollbar-none">
            {(["about", "stats", "evolution", "moves"] as TabType[]).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                    }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="pt-2">
            {activeTab === "about" && <PokemonAboutTab pokemon={pokemon} />}
            {activeTab === "stats" && <PokemonStats stats={pokemon.stats} />}
            {activeTab === "evolution" && <PokemonEvolutionTab evolutionChain={pokemon.evolutionChain} />}
            {activeTab === "moves" && <PokemonMoves moves={pokemon.moves} limit={30} />}
          </div>
        </div>
      </div>
    </div>
  );
}
