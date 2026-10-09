import React from "react";
import { PokemonDetail } from "@/types/pokemon";

interface PokemonAboutTabProps {
  pokemon: PokemonDetail;
}

export function PokemonAboutTab({ pokemon }: PokemonAboutTabProps) {
  const species = pokemon.species;

  // Height & Weight formatting
  const heightMeters = (pokemon.height / 10).toFixed(1);
  const heightFeet = (pokemon.height * 0.328084).toFixed(1);
  const weightKg = (pokemon.weight / 10).toFixed(1);
  const weightLbs = (pokemon.weight * 0.220462).toFixed(1);

  // Gender calculation: genderRate is eighths female, -1 genderless
  let femalePercent: number | null = null;
  let malePercent: number | null = null;

  if (species && species.genderRate !== -1) {
    femalePercent = (species.genderRate / 8) * 100;
    malePercent = 100 - femalePercent;
  }

  return (
    <div className="space-y-6 pt-2">
      {/* Flavor Text Description */}
      {species?.flavorText && (
        <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-medium bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-inner">
          "{species.flavorText}"
        </p>
      )}

      {/* Attributes Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-blue-400">
          Characteristics
        </h3>

        <div className="grid grid-cols-12 gap-y-3 text-sm">
          <span className="col-span-4 font-bold text-slate-400">Species</span>
          <span className="col-span-8 font-extrabold text-white">
            {species?.genus || "Pokémon"}
          </span>

          <span className="col-span-4 font-bold text-slate-400">Height</span>
          <span className="col-span-8 font-extrabold text-white">
            {heightMeters} m ({heightFeet} ft)
          </span>

          <span className="col-span-4 font-bold text-slate-400">Weight</span>
          <span className="col-span-8 font-extrabold text-white">
            {weightKg} kg ({weightLbs} lbs)
          </span>

          <span className="col-span-4 font-bold text-slate-400">Abilities</span>
          <div className="col-span-8 flex flex-wrap gap-1.5">
            {pokemon.abilities.map((a) => (
              <span
                key={a.ability.name}
                className="px-2.5 py-1 text-xs font-extrabold capitalize rounded-lg bg-slate-800 border border-slate-700 text-slate-200"
              >
                {a.ability.name.replace("-", " ")}
                {a.is_hidden && <span className="text-amber-400 ml-1">(Hidden)</span>}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-xs font-black uppercase tracking-wider text-purple-400 pt-3">
          Breeding & Catch
        </h3>

        <div className="grid grid-cols-12 gap-y-3 text-sm">
          <span className="col-span-4 font-bold text-slate-400">Gender</span>
          <span className="col-span-8 font-extrabold text-white">
            {femalePercent !== null ? (
              <span className="flex items-center space-x-3">
                <span className="text-blue-400 font-bold">♂ {malePercent}%</span>
                <span className="text-pink-400 font-bold">♀ {femalePercent}%</span>
              </span>
            ) : (
              "Genderless"
            )}
          </span>

          <span className="col-span-4 font-bold text-slate-400">Egg Groups</span>
          <span className="col-span-8 font-extrabold text-white capitalize">
            {species?.eggGroups.length ? species.eggGroups.join(", ") : "Unknown"}
          </span>

          {species?.captureRate !== undefined && (
            <>
              <span className="col-span-4 font-bold text-slate-400">Catch Rate</span>
              <span className="col-span-8 font-extrabold text-white">
                {species.captureRate}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
