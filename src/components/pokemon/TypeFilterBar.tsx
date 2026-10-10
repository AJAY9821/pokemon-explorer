"use client";

import React from "react";
import { DRIBBBLE_TYPE_COLORS } from "@/lib/constants";
import { formatPokemonName } from "@/utils/formatPokemonName";
import { useFavorites } from "@/hooks/useFavorites";

interface TypeFilterBarProps {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
  showFavoritesOnly?: boolean;
  onToggleFavoritesOnly?: () => void;
  selectedGen?: number | null;
  onSelectGen?: (gen: number | null) => void;
}

const GENERATIONS = [
  { id: 1, name: "Gen I (Kanto)", offset: 0, limit: 151 },
  { id: 2, name: "Gen II (Johto)", offset: 151, limit: 100 },
  { id: 3, name: "Gen III (Hoenn)", offset: 251, limit: 135 },
  { id: 4, name: "Gen IV (Sinnoh)", offset: 386, limit: 107 },
  { id: 5, name: "Gen V (Unova)", offset: 493, limit: 156 },
];

const TYPES_LIST = [
  "fire",
  "water",
  "grass",
  "electric",
  "dragon",
  "psychic",
  "ice",
  "ghost",
  "poison",
  "ground",
  "rock",
  "flying",
  "bug",
  "steel",
  "fairy",
  "fighting",
  "normal",
];

export function TypeFilterBar({
  selectedType,
  onSelectType,
  showFavoritesOnly = false,
  onToggleFavoritesOnly,
  selectedGen = null,
  onSelectGen,
}: TypeFilterBarProps) {
  const { favorites } = useFavorites();

  return (
    <div className="space-y-4">
      {/* Top Filter Control Bar: Favorites & Generation Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2">
        {/* Favorites Only Toggle */}
        {onToggleFavoritesOnly && (
          <button
            onClick={onToggleFavoritesOnly}
            className={`px-4 py-2 rounded-2xl text-xs font-black tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border ${
              showFavoritesOnly
                ? "bg-rose-600 text-white border-rose-400 shadow-[0_0_20px_rgba(225,29,72,0.5)] scale-105"
                : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
            }`}
          >
            <span className="text-sm">❤️</span>
            <span>Favorites</span>
            <span className="px-2 py-0.5 rounded-full bg-black/40 text-[10px] font-black text-rose-300 border border-white/10">
              {favorites.length}
            </span>
          </button>
        )}

        {/* Region / Generation Selector Tabs */}
        {onSelectGen && (
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none max-w-full">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider mr-1">
              Region:
            </span>
            <button
              onClick={() => onSelectGen(null)}
              className={`px-3 py-1 rounded-xl text-[11px] font-black uppercase transition-all whitespace-nowrap border ${
                selectedGen === null
                  ? "bg-blue-600/30 text-blue-300 border-blue-500/60"
                  : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"
              }`}
            >
              All Gens
            </button>
            {GENERATIONS.map((gen) => (
              <button
                key={gen.id}
                onClick={() => onSelectGen(gen.id === selectedGen ? null : gen.id)}
                className={`px-3 py-1 rounded-xl text-[11px] font-black uppercase transition-all whitespace-nowrap border ${
                  selectedGen === gen.id
                    ? "bg-blue-600 text-white border-blue-400 shadow-md"
                    : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                {gen.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Horizontal Scrolling Elemental Type Pills */}
      <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 pt-1 px-2 scrollbar-none max-w-full justify-start sm:justify-center">
        {/* "All Types" Pill */}
        <button
          onClick={() => onSelectType(null)}
          className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wider transition-all duration-300 whitespace-nowrap shadow-lg flex items-center gap-2 ${
            selectedType === null && !showFavoritesOnly
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white ring-2 ring-blue-400/60 shadow-blue-500/30 scale-105"
              : "bg-slate-900/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          All Types
        </button>

        {/* Individual Type Pills */}
        {TYPES_LIST.map((type) => {
          const isSelected = selectedType === type;
          const color = DRIBBBLE_TYPE_COLORS[type] || DRIBBBLE_TYPE_COLORS.normal;

          return (
            <button
              key={type}
              onClick={() => onSelectType(isSelected ? null : type)}
              style={{
                boxShadow: isSelected ? `0 0 15px ${color.glow}` : undefined,
              }}
              className={`px-4 py-2 rounded-full text-xs font-black tracking-wider transition-all duration-300 uppercase whitespace-nowrap flex items-center space-x-2 border ${
                isSelected
                  ? `${color.bg} text-white border-white/40 scale-105 ring-2 ring-white/30`
                  : `bg-slate-900/60 ${color.border} text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-700`
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shadow-inner"
                style={{ backgroundColor: color.hex }}
              />
              <span>{formatPokemonName(type)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
