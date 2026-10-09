"use client";

import React, { useRef, useEffect } from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  placeholder = "Search Pokemon by name or #ID (e.g. Pikachu, 25)...",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus search input on slash key or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "/" || (e.ctrlKey && e.key === "k")) && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8 group">
      {/* Background Neon Spotlight Glow Ring on Hover/Focus */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-75 group-focus-within:opacity-100 transition duration-500" />

      <div className="relative flex items-center bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Icon */}
        <div className="pl-4 pr-2 text-indigo-400 pointer-events-none flex items-center">
          <svg
            className="w-5 h-5 group-focus-within:scale-110 group-focus-within:text-blue-400 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-2 pr-12 py-4 bg-transparent text-slate-100 placeholder-slate-400/80 focus:outline-none text-base font-medium"
        />

        {/* Shortcut Badge or Clear Button */}
        <div className="pr-4 flex items-center gap-2">
          {searchQuery ? (
            <button
              onClick={() => onSearchChange("")}
              className="text-slate-400 hover:text-slate-100 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 transition-all border border-slate-700"
              aria-label="Clear search"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-semibold text-slate-400 bg-slate-800/80 border border-slate-700/80 rounded-md shadow-sm">
              /
            </kbd>
          )}
        </div>
      </div>
    </div>
  );
}
