import React from "react";
import Image from "next/image";
import Link from "next/link";
import { EvolutionNode } from "@/types/pokemon";
import { formatPokemonName } from "@/utils/formatPokemonName";

interface PokemonEvolutionTabProps {
  evolutionChain?: EvolutionNode[];
}

export function PokemonEvolutionTab({ evolutionChain }: PokemonEvolutionTabProps) {
  if (!evolutionChain || evolutionChain.length <= 1) {
    return (
      <div className="py-12 text-center text-slate-400 font-medium">
        This Pokémon does not evolve.
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-2">
      <h3 className="text-xs font-black uppercase tracking-wider text-blue-400">
        Evolution Chain
      </h3>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-6">
        {evolutionChain.map((node, index) => (
          <React.Fragment key={node.speciesId}>
            {/* Evolution Stage Item */}
            <Link
              href={`/pokemon/${node.speciesId}`}
              className="group flex flex-col items-center space-y-3 text-center"
            >
              <div className="relative w-28 h-28 p-3 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-2xl group-hover:scale-110 group-hover:border-blue-500/80 transition-all duration-300 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                <Image
                  src={node.image}
                  alt={node.speciesName}
                  width={90}
                  height={90}
                  className="w-20 h-20 object-contain drop-shadow-lg group-hover:animate-float"
                  unoptimized
                />
              </div>

              <div className="space-y-0.5">
                <span className="text-sm font-black text-white group-hover:text-blue-400 transition-colors block">
                  {formatPokemonName(node.speciesName)}
                </span>
                <span className="text-xs font-bold text-slate-400 block">
                  #{String(node.speciesId).padStart(3, "0")}
                </span>
              </div>
            </Link>

            {/* Evolution Arrow Indicator */}
            {index < evolutionChain.length - 1 && (
              <div className="flex flex-col items-center space-y-1 text-slate-500">
                <div className="p-2 rounded-full bg-slate-900 border border-slate-800 text-blue-400">
                  <svg
                    className="w-5 h-5 rotate-90 sm:rotate-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
                {evolutionChain[index + 1].minLevel && (
                  <span className="text-[10px] font-black uppercase bg-blue-950/80 border border-blue-800 text-blue-300 px-2.5 py-0.5 rounded-full">
                    Lvl {evolutionChain[index + 1].minLevel}
                  </span>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
