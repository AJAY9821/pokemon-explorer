"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchPokemonDetail } from "@/lib/api/pokeapi";
import { PokemonDetail } from "@/types/pokemon";
import { formatPokemonName } from "@/utils/formatPokemonName";
import { DRIBBBLE_TYPE_COLORS } from "@/lib/constants";
import { Loading } from "@/components/common/Loading";

interface PokemonCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon1Id?: number;
  initialList?: { id: number; name: string }[];
}

export function PokemonCompareModal({
  isOpen,
  onClose,
  pokemon1Id = 1,
}: PokemonCompareModalProps) {
  const [p1, setP1] = useState<PokemonDetail | null>(null);
  const [p2, setP2] = useState<PokemonDetail | null>(null);
  const [p2Search, setP2Search] = useState("6"); // Default Charizard (#006)
  const [loadingP1, setLoadingP1] = useState(false);
  const [loadingP2, setLoadingP2] = useState(false);
  const [errorP2, setErrorP2] = useState<string | null>(null);

  // Escape key listener & Body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Fetch Pokemon 1
  useEffect(() => {
    if (!isOpen || !pokemon1Id) return;
    let isMounted = true;
    setLoadingP1(true);
    fetchPokemonDetail(String(pokemon1Id))
      .then((data) => {
        if (isMounted) setP1(data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (isMounted) setLoadingP1(false);
      });
    return () => {
      isMounted = false;
    };
  }, [isOpen, pokemon1Id]);

  // Fetch Pokemon 2
  useEffect(() => {
    if (!isOpen || !p2Search.trim()) return;
    let isMounted = true;
    setLoadingP2(true);
    setErrorP2(null);

    fetchPokemonDetail(p2Search.trim().toLowerCase())
      .then((data) => {
        if (isMounted) setP2(data);
      })
      .catch(() => {
        if (isMounted) setErrorP2(`No Pokémon found for "${p2Search}"`);
      })
      .finally(() => {
        if (isMounted) setLoadingP2(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, p2Search]);

  if (!isOpen) return null;

  const calculateTotal = (pokemon: PokemonDetail | null) => {
    if (!pokemon) return 0;
    return pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0);
  };

  const p1Total = calculateTotal(p1);
  const p2Total = calculateTotal(p2);

  const getStat = (pokemon: PokemonDetail | null, name: string) => {
    return pokemon?.stats.find((s) => s.stat.name === name)?.base_stat || 0;
  };

  const statList = [
    { key: "hp", label: "HP" },
    { key: "attack", label: "Attack" },
    { key: "defense", label: "Defense" },
    { key: "special-attack", label: "Sp. Atk" },
    { key: "special-defense", label: "Sp. Def" },
    { key: "speed", label: "Speed" },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 flex justify-center items-start animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl text-slate-100 shadow-2xl my-4 sm:my-8 max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Sticky Header Bar with Prominent Close Button */}
        <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md px-5 sm:px-8 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚔️</span>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight">
                Pokémon Battle Comparison
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                Side-by-side combat stat breakdown & superiority
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-full bg-rose-600/20 hover:bg-rose-600 border border-rose-500/40 text-rose-300 hover:text-white transition-all text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md"
            title="Close comparison modal (Esc)"
          >
            <span>✕</span>
            <span>Close</span>
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 scrollbar-thin scrollbar-thumb-slate-700">
          {/* Head-to-Head Competitor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Fighter 1 */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden">
              {loadingP1 ? (
                <Loading />
              ) : p1 ? (
                <>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/40 text-[10px] font-black uppercase tracking-wider">
                    Fighter 1
                  </div>
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 my-2">
                    <Image
                      src={
                        p1.sprites.other?.["official-artwork"]?.front_default ||
                        p1.sprites.front_default ||
                        ""
                      }
                      alt={p1.name}
                      fill
                      className="object-contain drop-shadow-xl"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {formatPokemonName(p1.name)}
                  </h3>
                  <div className="flex gap-1.5 mt-2">
                    {p1.types.map((t) => {
                      const theme =
                        DRIBBBLE_TYPE_COLORS[t.type.name.toLowerCase()] ||
                        DRIBBBLE_TYPE_COLORS.normal;
                      return (
                        <span
                          key={t.type.name}
                          className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${theme.badgeBg}`}
                        >
                          {t.type.name}
                        </span>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 w-full flex justify-around text-xs font-bold">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Height</span>
                      <span className="text-white">{(p1.height / 10).toFixed(1)} m</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Weight</span>
                      <span className="text-white">{(p1.weight / 10).toFixed(1)} kg</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Total Stats</span>
                      <span className="text-blue-400 font-black">{p1Total}</span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            {/* Fighter 2 */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden">
              <div className="w-full mb-3">
                <label className="block text-[10px] font-black uppercase tracking-wider text-rose-400 mb-1">
                  Select Competitor
                </label>
                <input
                  type="text"
                  placeholder="Search Pokémon name or ID..."
                  value={p2Search}
                  onChange={(e) => setP2Search(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium"
                />
              </div>

              {loadingP2 ? (
                <Loading />
              ) : errorP2 ? (
                <div className="py-8 text-xs font-semibold text-rose-400">{errorP2}</div>
              ) : p2 ? (
                <>
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 my-2">
                    <Image
                      src={
                        p2.sprites.other?.["official-artwork"]?.front_default ||
                        p2.sprites.front_default ||
                        ""
                      }
                      alt={p2.name}
                      fill
                      className="object-contain drop-shadow-xl"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {formatPokemonName(p2.name)}
                  </h3>
                  <div className="flex gap-1.5 mt-2">
                    {p2.types.map((t) => {
                      const theme =
                        DRIBBBLE_TYPE_COLORS[t.type.name.toLowerCase()] ||
                        DRIBBBLE_TYPE_COLORS.normal;
                      return (
                        <span
                          key={t.type.name}
                          className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${theme.badgeBg}`}
                        >
                          {t.type.name}
                        </span>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 w-full flex justify-around text-xs font-bold">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Height</span>
                      <span className="text-white">{(p2.height / 10).toFixed(1)} m</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Weight</span>
                      <span className="text-white">{(p2.weight / 10).toFixed(1)} kg</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Total Stats</span>
                      <span className="text-rose-400 font-black">{p2Total}</span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* Side-by-Side Stat Breakdown */}
          {p1 && p2 && (
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 text-center">
                Stat Comparison Breakdown
              </h4>

              <div className="space-y-3">
                {statList.map((stat) => {
                  const s1 = getStat(p1, stat.key);
                  const s2 = getStat(p2, stat.key);
                  const p1Adv = s1 > s2;
                  const p2Adv = s2 > s1;

                  return (
                    <div key={stat.key} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className={`w-14 text-left ${p1Adv ? "text-emerald-400 font-black" : "text-slate-300"}`}>
                          {s1} {p1Adv && "👑"}
                        </span>
                        <span className="text-slate-400 font-extrabold uppercase text-[10px]">
                          {stat.label}
                        </span>
                        <span className={`w-14 text-right ${p2Adv ? "text-rose-400 font-black" : "text-slate-300"}`}>
                          {p2Adv && "👑"} {s2}
                        </span>
                      </div>

                      <div className="flex h-2.5 rounded-full overflow-hidden bg-slate-900 border border-slate-800">
                        <div
                          className={`h-full transition-all duration-500 ${p1Adv ? "bg-blue-500" : "bg-slate-600"}`}
                          style={{ width: `${(s1 / (s1 + s2 || 1)) * 100}%` }}
                        />
                        <div
                          className={`h-full transition-all duration-500 ${p2Adv ? "bg-rose-500" : "bg-slate-700"}`}
                          style={{ width: `${(s2 / (s1 + s2 || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Battle Verdict */}
              <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-700 text-xs font-extrabold">
                  <span>🏆 Estimated Superiority:</span>
                  {p1Total > p2Total ? (
                    <span className="text-blue-400">{formatPokemonName(p1.name)} (+{p1Total - p2Total} Total Base Stats)</span>
                  ) : p2Total > p1Total ? (
                    <span className="text-rose-400">{formatPokemonName(p2.name)} (+{p2Total - p1Total} Total Base Stats)</span>
                  ) : (
                    <span className="text-amber-400">Evenly Matched Stats!</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Footer with Close Button */}
          <div className="pt-4 border-t border-slate-800 flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-black uppercase tracking-wider transition-colors border border-slate-700"
            >
              Close Battle Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
