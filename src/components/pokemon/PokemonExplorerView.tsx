"use client";

import React, { useState, useMemo, useTransition, useEffect } from "react";
import { PokemonCardData } from "@/types/pokemon";
import { SearchBar } from "@/components/search/SearchBar";
import { TypeFilterBar } from "./TypeFilterBar";
import { PokemonGrid } from "./PokemonGrid";
import { PokemonCompareModal } from "./PokemonCompareModal";
import { fetchPokemonDetail, fetchPokemonByType, fetchPokemonList } from "@/lib/api/pokeapi";
import { Loading } from "@/components/common/Loading";
import { useFavorites } from "@/hooks/useFavorites";

interface PokemonExplorerViewProps {
  initialPokemonList: PokemonCardData[];
}

const GENERATION_OFFSETS: Record<number, { offset: number; limit: number }> = {
  1: { offset: 0, limit: 151 },
  2: { offset: 151, limit: 100 },
  3: { offset: 251, limit: 135 },
  4: { offset: 386, limit: 107 },
  5: { offset: 493, limit: 156 },
};

export function PokemonExplorerView({ initialPokemonList }: PokemonExplorerViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedGen, setSelectedGen] = useState<number | null>(null);

  const [genPokemonList, setGenPokemonList] = useState<PokemonCardData[] | null>(null);
  const [searchedPokemon, setSearchedPokemon] = useState<PokemonCardData | null>(null);
  const [typeFetchedList, setTypeFetchedList] = useState<PokemonCardData[] | null>(null);

  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Compare Modal State
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [comparePokemonId, setComparePokemonId] = useState<number>(1);

  const { favorites } = useFavorites();
  const [, startTransition] = useTransition();

  // Active base dataset (either initial Gen 1 or fetched Gen X)
  const activeDataset = genPokemonList || initialPokemonList;

  // Handle Generation Change
  useEffect(() => {
    if (selectedGen === null) {
      setGenPokemonList(null);
      return;
    }

    const genInfo = GENERATION_OFFSETS[selectedGen];
    if (!genInfo) return;

    startTransition(async () => {
      setIsLoadingApi(true);
      try {
        const { pokemonList } = await fetchPokemonList(genInfo.limit, genInfo.offset);
        setGenPokemonList(pokemonList);
      } catch (err) {
        console.error("Failed to load generation data", err);
      } finally {
        setIsLoadingApi(false);
      }
    });
  }, [selectedGen]);

  // Handle Type Filter
  useEffect(() => {
    if (!selectedType) {
      setTypeFetchedList(null);
      return;
    }

    const localMatches = activeDataset.filter((p) =>
      p.types.some((t) => t.toLowerCase() === selectedType.toLowerCase())
    );

    if (localMatches.length === 0) {
      startTransition(async () => {
        setIsLoadingApi(true);
        try {
          const typeResults = await fetchPokemonByType(selectedType);
          setTypeFetchedList(typeResults);
        } catch {
          setTypeFetchedList([]);
        } finally {
          setIsLoadingApi(false);
        }
      });
    } else {
      setTypeFetchedList(null);
    }
  }, [selectedType, activeDataset]);

  // Filter list by search query, selected type, and favorites
  const filteredList = useMemo(() => {
    let list = searchedPokemon
      ? [searchedPokemon]
      : typeFetchedList !== null
      ? typeFetchedList
      : activeDataset;

    // 1. Filter by favorites if Favorites mode is active
    if (showFavoritesOnly) {
      list = list.filter((p) => favorites.includes(p.id));
    }

    // 2. Filter by search query AND selected elemental type
    return list.filter((p) => {
      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        String(p.id) === searchQuery.trim();

      const matchesType =
        !selectedType || p.types.some((t) => t.toLowerCase() === selectedType.toLowerCase());

      return matchesSearch && matchesType;
    });
  }, [
    searchedPokemon,
    typeFetchedList,
    activeDataset,
    showFavoritesOnly,
    favorites,
    searchQuery,
    selectedType,
  ]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setSearchError(null);
    setSearchedPokemon(null);

    if (!query.trim()) return;

    const trimmedQuery = query.trim().toLowerCase();
    const matchInList = activeDataset.some(
      (p) => p.name.toLowerCase().includes(trimmedQuery) || String(p.id) === trimmedQuery
    );

    if (!matchInList && trimmedQuery.length >= 3) {
      startTransition(async () => {
        setIsLoadingApi(true);
        try {
          const detail = await fetchPokemonDetail(trimmedQuery);
          const cardData: PokemonCardData = {
            id: detail.id,
            name: detail.name,
            image:
              detail.sprites.other?.["official-artwork"]?.front_default ||
              detail.sprites.other?.home?.front_default ||
              detail.sprites.front_default ||
              "",
            animatedImage: detail.sprites.other?.showdown?.front_default,
            types: detail.types.map((t) => t.type.name),
          };
          setSearchedPokemon(cardData);
          setSearchError(null);
        } catch {
          setSearchedPokemon(null);
          setSearchError(`No Pokémon found matching "${query}"`);
        } finally {
          setIsLoadingApi(false);
        }
      });
    }
  };

  const handleOpenCompare = (id: number) => {
    setComparePokemonId(id);
    setIsCompareOpen(true);
  };

  const handleResetFilters = () => {
    setSelectedType(null);
    setShowFavoritesOnly(false);
    setSearchQuery("");
    setSelectedGen(null);
  };

  const handleSelectType = (type: string | null) => {
    setSelectedType(type);
  };

  const isFiltered =
    showFavoritesOnly || selectedType !== null || searchQuery.trim() !== "" || selectedGen !== null;

  return (
    <div className="space-y-8">
      {/* Top Bar Navigation & Hero Title Header */}
      <div className="relative pt-2">
        {/* Top Left Navigation Button at Red Line Position */}
        {isFiltered && (
          <div className="sm:absolute sm:top-2 sm:left-0 z-20 mb-4 sm:mb-0 animate-fade-in">
            <button
              onClick={handleResetFilters}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 transition-all shadow-lg text-xs font-black uppercase tracking-wider"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Explorer</span>
            </button>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center space-y-4 pt-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md shadow-inner text-xs font-bold text-blue-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Interactive 3D Pokédex Showcase
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Explore the <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Pokémon Universe
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed max-w-xl mx-auto">
            Discover stats, elemental type match-ups, movesets, and evolution chains with interactive 3D holographic cards.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        placeholder="Search Pokémon by name or ID (e.g., Pikachu or #025)..."
      />

      {/* Filter Control Bar */}
      <TypeFilterBar
        selectedType={selectedType}
        onSelectType={handleSelectType}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        selectedGen={selectedGen}
        onSelectGen={setSelectedGen}
      />

      {/* Loading Indicator */}
      {isLoadingApi && <Loading />}

      {/* Error state */}
      {searchError && !isLoadingApi && (
        <div className="py-10 text-center text-rose-400 font-semibold text-lg">
          {searchError}
        </div>
      )}

      {/* Pokemon Grid */}
      {!isLoadingApi && (
        <PokemonGrid
          pokemonList={filteredList}
          emptyMessage={
            showFavoritesOnly
              ? selectedType
                ? `You don't have any favorited ${selectedType.toUpperCase()} Pokémon yet!`
                : "You haven't added any Pokémon to your favorites yet! Click the ❤️ heart icon on any Pokémon card to save it."
              : "No Pokémon found matching your criteria."
          }
          onCompare={handleOpenCompare}
          onResetView={handleResetFilters}
        />
      )}

      {/* Side-by-Side Pokémon Battle Compare Modal */}
      <PokemonCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        pokemon1Id={comparePokemonId}
        initialList={activeDataset}
      />
    </div>
  );
}
