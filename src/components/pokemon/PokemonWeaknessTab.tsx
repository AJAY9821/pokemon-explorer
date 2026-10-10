"use client";

import React from "react";
import { getPokemonTypeEffectiveness } from "@/utils/typeMatrix";
import { formatPokemonName } from "@/utils/formatPokemonName";
import { DRIBBBLE_TYPE_COLORS } from "@/lib/constants";

interface PokemonWeaknessTabProps {
  types: string[];
}

export function PokemonWeaknessTab({ types }: PokemonWeaknessTabProps) {
  const effectiveness = getPokemonTypeEffectiveness(types);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Weaknesses Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <h3 className="text-xs font-black uppercase tracking-wider text-rose-400">
            Weaknesses (Takes Increased Damage)
          </h3>
        </div>

        {effectiveness.weaknesses.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {effectiveness.weaknesses.map(({ type, multiplier }) => {
              const theme = DRIBBBLE_TYPE_COLORS[type] || DRIBBBLE_TYPE_COLORS.normal;
              return (
                <div
                  key={type}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800"
                >
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${theme.badgeBg}`}>
                    {formatPokemonName(type)}
                  </span>
                  <span className="text-xs font-black text-rose-400">
                    {multiplier}x
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No elemental weaknesses!</p>
        )}
      </div>

      {/* Resistances Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400">
            Resistances (Takes Reduced Damage)
          </h3>
        </div>

        {effectiveness.resistances.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {effectiveness.resistances.map(({ type, multiplier }) => {
              const theme = DRIBBBLE_TYPE_COLORS[type] || DRIBBBLE_TYPE_COLORS.normal;
              return (
                <div
                  key={type}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800"
                >
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${theme.badgeBg}`}>
                    {formatPokemonName(type)}
                  </span>
                  <span className="text-xs font-black text-emerald-400">
                    {multiplier}x
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No elemental resistances.</p>
        )}
      </div>

      {/* Immunities Section */}
      {effectiveness.immunities.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <h3 className="text-xs font-black uppercase tracking-wider text-purple-400">
              Immunities (Takes 0 Damage)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {effectiveness.immunities.map((type) => {
              const theme = DRIBBBLE_TYPE_COLORS[type] || DRIBBBLE_TYPE_COLORS.normal;
              return (
                <div
                  key={type}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800"
                >
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${theme.badgeBg}`}>
                    {formatPokemonName(type)}
                  </span>
                  <span className="text-xs font-black text-purple-300">
                    0x (Immune)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
