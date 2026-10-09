"use client";

import React from "react";
import { DRIBBBLE_TYPE_COLORS } from "@/lib/constants";
import { formatPokemonName } from "@/utils/formatPokemonName";

interface TypeFilterBarProps {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}

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

export function TypeFilterBar({ selectedType, onSelectType }: TypeFilterBarProps) {
  return (
    <div className="flex items-center space-x-2.5 overflow-x-auto pb-4 pt-1 px-2 scrollbar-none max-w-full justify-start sm:justify-center">
      {/* "All Types" Pill */}
      <button
        onClick={() => onSelectType(null)}
        className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wider transition-all duration-300 whitespace-nowrap shadow-lg flex items-center gap-2 ${
          selectedType === null
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white ring-2 ring-blue-400/60 shadow-blue-500/30 scale-105"
            : "bg-slate-900/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
        All Pokémon
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
  );
}
