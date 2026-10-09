import React from "react";
import { PokemonStat } from "@/types/pokemon";
import { formatPokemonName } from "@/utils/formatPokemonName";

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const STAT_NAMES_MAP: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const STAT_GRADIENTS_MAP: Record<string, string> = {
  hp: "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
  attack: "bg-gradient-to-r from-rose-500 to-amber-400 shadow-[0_0_10px_rgba(244,63,94,0.5)]",
  defense: "bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]",
  "special-attack": "bg-gradient-to-r from-purple-500 to-indigo-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]",
  "special-defense": "bg-gradient-to-r from-fuchsia-500 to-pink-400 shadow-[0_0_10px_rgba(217,70,239,0.5)]",
  speed: "bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_10px_rgba(251,191,36,0.5)]",
};

export function PokemonStats({ stats }: PokemonStatsProps) {
  const maxStatValue = 255;
  const totalStats = stats.reduce((sum, item) => sum + item.base_stat, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-white tracking-wide uppercase">Base Stats</h3>
        <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300">
          Total: <span className="text-blue-400 font-extrabold">{totalStats}</span>
        </div>
      </div>

      <div className="space-y-3.5">
        {stats.map((item) => {
          const statName = STAT_NAMES_MAP[item.stat.name] || formatPokemonName(item.stat.name);
          const statGradient = STAT_GRADIENTS_MAP[item.stat.name] || "bg-gradient-to-r from-blue-500 to-cyan-400";
          const percentage = Math.min(100, Math.round((item.base_stat / maxStatValue) * 100 * 2));

          return (
            <div key={item.stat.name} className="grid grid-cols-12 items-center text-xs sm:text-sm gap-3">
              <span className="col-span-4 font-bold text-slate-300 tracking-wide">{statName}</span>
              <span className="col-span-2 font-black text-right text-white text-base">{item.base_stat}</span>
              <div className="col-span-6 h-3 w-full bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className={`h-full ${statGradient} rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
