import React from "react";
import { PokemonAbility } from "@/types/pokemon";
import { formatPokemonName } from "@/utils/formatPokemonName";

interface PokemonAbilitiesProps {
  abilities: PokemonAbility[];
}

export function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
        Abilities
      </h3>
      <div className="flex flex-wrap gap-2">
        {abilities.map((item) => (
          <span
            key={item.ability.name}
            className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm border ${
              item.is_hidden
                ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
            }`}
          >
            {formatPokemonName(item.ability.name)}
            {item.is_hidden && (
              <span className="ml-1.5 text-[10px] uppercase font-bold text-amber-500">
                (Hidden)
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
