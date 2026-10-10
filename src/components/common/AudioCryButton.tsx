"use client";

import React, { useState, useRef } from "react";

interface AudioCryButtonProps {
  pokemonId: number;
  pokemonName: string;
  size?: "sm" | "md" | "lg";
}

export function AudioCryButton({ pokemonId, pokemonName, size = "md" }: AudioCryButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`;

  const playCry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    const audio = new Audio(cryUrl);
    audioRef.current = audio;
    audio.volume = 0.5;

    setIsPlaying(true);
    audio.play().catch(() => {
      setIsPlaying(false);
    });

    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  const sizeClasses = {
    sm: "px-2.5 py-1 text-[10px]",
    md: "px-3.5 py-1.5 text-xs",
    lg: "px-5 py-2.5 text-sm",
  };

  return (
    <button
      onClick={playCry}
      title={`Play ${pokemonName}'s sound cry`}
      className={`group relative inline-flex items-center gap-1.5 rounded-full font-black uppercase tracking-wider transition-all duration-300 border ${
        isPlaying
          ? "bg-rose-500/30 text-rose-300 border-rose-400/80 shadow-[0_0_15px_rgba(244,63,94,0.5)] scale-105"
          : "bg-slate-900/80 text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white hover:bg-slate-800"
      } ${sizeClasses[size]}`}
    >
      <span className={`text-base leading-none ${isPlaying ? "animate-bounce" : "group-hover:scale-110"}`}>
        🔊
      </span>
      <span>{isPlaying ? "Playing..." : "Cry"}</span>
      {isPlaying && (
        <span className="flex items-center gap-0.5 ml-1">
          <span className="w-1 h-3 bg-rose-400 animate-pulse rounded-full" />
          <span className="w-1 h-4 bg-rose-300 animate-pulse delay-75 rounded-full" />
          <span className="w-1 h-2 bg-rose-400 animate-pulse delay-150 rounded-full" />
        </span>
      )}
    </button>
  );
}
