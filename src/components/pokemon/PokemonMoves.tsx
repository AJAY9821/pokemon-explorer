import React from "react";
import { PokemonMove } from "@/types/pokemon";
import { formatPokemonName } from "@/utils/formatPokemonName";

interface PokemonMovesProps {
  moves: PokemonMove[];
  limit?: number;
}

export function PokemonMoves({ moves, limit = 30 }: PokemonMovesProps) {
  const displayedMoves = moves.slice(0, limit);
  const remainingCount = moves.length - limit;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-white uppercase tracking-wide">
          Moveset
        </h3>
        <span className="text-xs text-blue-400 font-bold bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800">
          {moves.length} total moves
        </span>
      </div>

      <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
        {displayedMoves.map((item) => (
          <span
            key={item.move.name}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:border-blue-500 hover:text-white transition-all shadow-sm"
          >
            {formatPokemonName(item.move.name)}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="px-3 py-1.5 rounded-xl text-xs font-black bg-blue-950/80 text-blue-300 border border-blue-700">
            +{remainingCount} more
          </span>
        )}
      </div>
    </div>
  );
}
