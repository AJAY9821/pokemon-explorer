"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PokemonCardData } from "@/types/pokemon";
import { formatPokemonName } from "@/utils/formatPokemonName";
import { DRIBBBLE_TYPE_COLORS } from "@/lib/constants";
import { PokeballWatermark } from "@/components/common/PokeballWatermark";
import { useFavorites } from "@/hooks/useFavorites";

interface PokemonCardProps {
  pokemon: PokemonCardData;
  onCompare?: (id: number) => void;
}

export function PokemonCard({ pokemon, onCompare }: PokemonCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(50);
  const [mouseY, setMouseY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(pokemon.id);

  const primaryType = pokemon.types[0]?.toLowerCase() || "normal";
  const colorTheme = DRIBBBLE_TYPE_COLORS[primaryType] || DRIBBBLE_TYPE_COLORS.normal;

  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;
  const formattedName = formatPokemonName(pokemon.name);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const rotX = -((mouseYPos - height / 2) / (height / 2)) * 10;
    const rotY = ((mouseXPos - width / 2) / (width / 2)) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
    setMouseX((mouseXPos / width) * 100);
    setMouseY((mouseYPos / height) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setMouseX(50);
    setMouseY(50);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(pokemon.id);
  };

  const handleAudioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;
    const audio = new Audio(cryUrl);
    audio.volume = 0.5;
    setIsPlayingAudio(true);
    audio.play().catch(() => setIsPlayingAudio(false));
    audio.onended = () => setIsPlayingAudio(false);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCompare) onCompare(pokemon.id);
  };

  return (
    <div className="perspective-container w-full">
      <Link href={`/pokemon/${pokemon.id}`} className="block">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: isHovered
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
              : "rotateX(0deg) rotateY(0deg) scale(1)",
            transition: isHovered
              ? "transform 0.1s ease-out"
              : "transform 0.5s ease-out, box-shadow 0.5s ease-out",
            boxShadow: isHovered
              ? `0 20px 35px -10px ${colorTheme.glow}, 0 0 20px 2px ${colorTheme.glow}`
              : "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
            ["--mouse-x" as string]: `${mouseX}%`,
            ["--mouse-y" as string]: `${mouseY}%`,
          }}
          className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 preserve-3d border ${colorTheme.border} ${colorTheme.bg} cursor-pointer min-h-[230px]`}
        >
          {/* Holographic Sheen Layer */}
          <div className="pointer-events-none absolute inset-0 holographic-sheen opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

          {/* Ambient Aura */}
          <div
            className="absolute -top-10 -left-10 w-44 h-44 rounded-full blur-2xl opacity-30 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
            style={{ backgroundColor: colorTheme.hex }}
          />

          {/* Watermark Pokeball */}
          <div className="absolute -right-6 -bottom-6 text-white/10 group-hover:text-white/20 transition-all duration-500 pointer-events-none group-hover:scale-110 group-hover:rotate-12">
            <PokeballWatermark size={170} opacity={0.15} />
          </div>

          {/* Header: ID, Cry Button & Favorite Heart */}
          <div
            className="relative z-30 flex items-center justify-between mb-2"
            style={{ transform: "translateZ(20px)" }}
          >
            <span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 border border-white/10 shadow-inner">
              {formattedId}
            </span>

            <div className="flex items-center gap-1.5">
              {/* Audio Cry Trigger */}
              <button
                onClick={handleAudioClick}
                title="Play Audio Cry"
                className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                  isPlayingAudio
                    ? "bg-rose-500/80 text-white animate-bounce"
                    : "bg-black/40 text-white/70 hover:text-white hover:bg-black/70"
                }`}
              >
                🔊
              </button>

              {/* Compare Button Trigger */}
              {onCompare && (
                <button
                  onClick={handleCompareClick}
                  title="Compare with another Pokémon"
                  className="p-1.5 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/70 backdrop-blur-md transition-all text-xs"
                >
                  ⚔️
                </button>
              )}

              {/* Heart Favorite Toggle */}
              <button
                onClick={handleFavoriteClick}
                title={favorite ? "Remove from Favorites" : "Add to Favorites"}
                className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                  favorite
                    ? "bg-rose-500/80 text-white scale-110 shadow-lg shadow-rose-500/40"
                    : "bg-black/40 text-white/50 hover:text-rose-400 hover:bg-black/70"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill={favorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content Layout */}
          <div className="relative z-10 grid grid-cols-12 items-center gap-2 mt-auto">
            <div
              className="col-span-6 space-y-3 transition-transform duration-300"
              style={{ transform: "translateZ(25px)" }}
            >
              <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-md leading-none group-hover:text-white/95">
                {formattedName}
              </h2>

              <div className="flex flex-col items-start gap-1.5">
                {pokemon.types.map((type) => {
                  const typeTheme = DRIBBBLE_TYPE_COLORS[type.toLowerCase()] || colorTheme;
                  return (
                    <span
                      key={type}
                      className={`px-3 py-1 text-[10px] font-extrabold tracking-wider uppercase rounded-full shadow-sm ${typeTheme.badgeBg} transition-transform duration-300 group-hover:scale-105`}
                    >
                      {formatPokemonName(type)}
                    </span>
                  );
                })}
              </div>
            </div>

            <div
              className="col-span-6 flex justify-end items-center relative h-32"
              style={{ transform: "translateZ(45px)" }}
            >
              {pokemon.image ? (
                <div className="relative group-hover:animate-float">
                  <div className="absolute inset-0 bg-black/40 blur-xl rounded-full scale-75 translate-y-4 opacity-50 group-hover:opacity-80 transition-opacity" />
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={130}
                    height={130}
                    className="h-32 w-32 object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-115 group-hover:-translate-y-2"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="h-28 w-28 rounded-2xl bg-black/30 backdrop-blur-md flex items-center justify-center text-white/80 text-xs font-semibold border border-white/10">
                  No Sprite
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div
            className="relative z-10 mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-white/70 group-hover:text-white transition-colors"
            style={{ transform: "translateZ(15px)" }}
          >
            <span className="tracking-wide">View Stats & Abilities</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
