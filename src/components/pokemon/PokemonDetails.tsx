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

  // Physical attributes
  const heightMeters = (pokemon.height / 10).toFixed(1);
  const weightKg = (pokemon.weight / 10).toFixed(1);

  // Top stats for combat preview
  const hpStat = pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat || 0;
  const atkStat = pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat || 0;
  const defStat = pokemon.stats.find((s) => s.stat.name === "defense")?.base_stat || 0;
  const spdStat = pokemon.stats.find((s) => s.stat.name === "speed")?.base_stat || 0;

  // Elemental motion check
  const isFlyingOrDragonOrFire =
    primaryType === "fire" || primaryType === "dragon" || primaryType === "flying";
  const isElectric = primaryType === "electric";
  const isWaterOrIce = primaryType === "water" || primaryType === "ice";

  const motionClass = isFlyingOrDragonOrFire
    ? "animate-fly-glide"
    : isElectric
    ? "animate-zap-hover"
    : isWaterOrIce
    ? "animate-float-bob"
    : "animate-float";

  return (
    <div className="relative min-h-screen bg-[#080C14] text-slate-100 py-6 px-3 sm:px-6 lg:px-8 bg-grid-pattern">
      {/* Dynamic Background Ambient Orbs */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full blur-[150px] opacity-40 pointer-events-none"
        style={{ backgroundColor: colorTheme.hex }}
      />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        {/* Top Header Controls (Back Button, Shiny Toggle & ID) */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 transition-all shadow-lg"
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
            {/* Shiny Form Toggle */}
            <button
              onClick={() => setIsShiny(!isShiny)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-black tracking-wider uppercase flex items-center gap-2 transition-all duration-300 border ${
                isShiny
                  ? "bg-amber-500/25 text-amber-300 border-amber-400/60 shadow-[0_0_18px_rgba(245,158,11,0.5)] scale-105"
                  : "bg-slate-900/90 text-slate-400 border-slate-700/60 hover:text-slate-200"
              }`}
            >
              <span className={`text-base ${isShiny ? "animate-spin" : ""}`}>✨</span>
              <span>{isShiny ? "Shiny On" : "Shiny Form"}</span>
            </button>

            <span className="px-3.5 py-1.5 rounded-2xl text-xs font-black tracking-widest bg-slate-900/90 border border-slate-700/60 text-slate-300 shadow-inner">
              {formattedId}
            </span>
          </div>
        </div>

        {/* Enriched Hero Showcase Stage */}
        <div
          className={`relative rounded-3xl p-6 sm:p-10 border ${colorTheme.border} ${colorTheme.bg} shadow-2xl overflow-hidden`}
        >
          {/* Background Watermark Pokeball */}
          <div className="absolute -right-10 -bottom-10 text-white/10 pointer-events-none rotate-12">
            <PokeballWatermark size={440} opacity={0.14} />
          </div>

          {/* Elemental Flame Embers for Fire/Dragon/Flying */}
          {isFlyingOrDragonOrFire && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <div className="absolute bottom-4 left-1/3 w-3 h-3 rounded-full bg-orange-400/70 blur-xs animate-rise-ember-1" />
              <div className="absolute bottom-2 left-1/2 w-4 h-4 rounded-full bg-rose-500/60 blur-xs animate-rise-ember-2" />
              <div className="absolute bottom-6 left-2/3 w-2.5 h-2.5 rounded-full bg-amber-300/80 blur-xs animate-rise-ember-3" />
            </div>
          )}

          <div className="relative z-10 grid grid-cols-12 items-center gap-8">
            {/* Left Column: Info, Badges & Combat Mini Stats */}
            <div className="col-span-12 lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-black text-white/90 border border-white/20 shadow-sm">
                  {pokemon.species?.genus || "Pokémon"}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-black text-white/70 border border-white/20 tracking-widest shadow-sm">
                  {formattedId}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-xl leading-none">
                {formattedName}
              </h1>

              {/* Type Badges */}
              <div className="flex flex-wrap gap-2.5">
                {pokemon.types.map((t) => {
                  const typeTheme = DRIBBBLE_TYPE_COLORS[t.type.name.toLowerCase()] || colorTheme;
                  return (
                    <span
                      key={t.type.name}
                      className={`px-4 py-1.5 text-xs font-black tracking-wider uppercase rounded-full shadow-lg ${typeTheme.badgeBg}`}
                    >
                      {formatPokemonName(t.type.name)}
                    </span>
                  );
                })}
              </div>

              {/* Pokédex Description Quote */}
              {pokemon.species?.flavorText && (
                <p className="text-xs sm:text-sm text-white/90 font-medium italic line-clamp-2 bg-black/30 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 shadow-inner">
                  "{pokemon.species.flavorText}"
                </p>
              )}

              {/* Physical Attributes Badges (Fills empty card space) */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 text-center shadow-sm">
                  <div className="text-[10px] font-black uppercase text-white/60 tracking-wider">Height</div>
                  <div className="text-sm font-black text-white">{heightMeters} m</div>
                </div>
                <div className="p-3 rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 text-center shadow-sm">
                  <div className="text-[10px] font-black uppercase text-white/60 tracking-wider">Weight</div>
                  <div className="text-sm font-black text-white">{weightKg} kg</div>
                </div>
                <div className="p-3 rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 text-center shadow-sm">
                  <div className="text-[10px] font-black uppercase text-white/60 tracking-wider">Catch Rate</div>
                  <div className="text-sm font-black text-white">{pokemon.species?.captureRate || "N/A"}</div>
                </div>
              </div>

              {/* Combat Preview Mini Bars */}
              <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 space-y-2 shadow-inner">
                <div className="text-xs font-black uppercase tracking-wider text-white/90 flex items-center justify-between">
                  <span>Combat Preview</span>
                  <span className="text-[10px] text-white/60 font-bold">Base Stats</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-bold text-white/95">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/70">HP</span>
                    <span className="font-extrabold">{hpStat}</span>
                    <div className="w-16 h-2 bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${Math.min(100, (hpStat / 180) * 100)}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/70">ATK</span>
                    <span className="font-extrabold">{atkStat}</span>
                    <div className="w-16 h-2 bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-400 rounded-full" style={{ width: `${Math.min(100, (atkStat / 180) * 100)}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/70">DEF</span>
                    <span className="font-extrabold">{defStat}</span>
                    <div className="w-16 h-2 bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full" style={{ width: `${Math.min(100, (defStat / 180) * 100)}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/70">SPD</span>
                    <span className="font-extrabold">{spdStat}</span>
                    <div className="w-16 h-2 bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-300 rounded-full" style={{ width: `${Math.min(100, (spdStat / 180) * 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero HD Artwork Stage in Motion */}
            <div className="col-span-12 lg:col-span-6 flex justify-center items-center relative py-6">
              {/* Rotating Glowing Elemental Energy Ring */}
              <div
                className="absolute w-72 h-72 sm:w-84 sm:h-84 rounded-full border-2 border-dashed border-white/20 animate-rotate-aura pointer-events-none"
              />

              {/* Radial Shadow Drop */}
              <div className="absolute inset-0 bg-black/40 blur-2xl rounded-full scale-90 translate-y-6" />

              {/* Dynamic Animated Motion Artwork */}
              <div className={`relative z-10 ${motionClass} flex items-center justify-center min-h-[260px]`}>
                {activeImage ? (
                  <Image
                    src={activeImage}
                    alt={pokemon.name}
                    width={280}
                    height={280}
                    className="w-56 h-56 sm:w-72 sm:h-72 object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.7)] transition-all duration-500 hover:scale-110"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="h-48 w-48 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 font-bold border border-white/20">
                    No Sprite Available
                  </div>
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
                  className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    isActive
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
