import React from "react";
import { DRIBBBLE_TYPE_COLORS } from "@/lib/constants";
import { formatPokemonName } from "@/utils/formatPokemonName";

interface PokemonTypesProps {
  types: string[];
  size?: "sm" | "md" | "lg";
}

export function PokemonTypes({ types, size = "md" }: PokemonTypesProps) {
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-[11px] font-bold tracking-wide",
    md: "px-3.5 py-1 text-xs font-bold tracking-wider",
    lg: "px-4 py-1.5 text-sm font-extrabold tracking-widest",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {types.map((type) => {
        const typeLower = type.toLowerCase();
        const color = DRIBBBLE_TYPE_COLORS[typeLower] || DRIBBBLE_TYPE_COLORS.normal;

        return (
          <span
            key={type}
            className={`inline-block rounded-full shadow-sm uppercase ${color.bg} ${color.text} ${sizeClasses[size]}`}
          >
            {formatPokemonName(type)}
          </span>
        );
      })}
    </div>
  );
}
