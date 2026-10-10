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

    if (showFavoritesOnly) {
      list = list.filter((p) => favorites.includes(p.id));
    }

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

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        placeholder="Search Pokémon by name or ID (e.g., Pikachu or #025)..."
      />

      {/* Filter Control Bar */}
      <TypeFilterBar
        selectedType={selectedType}
        onSelectType={setSelectedType}
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
              ? "You haven't added any Pokémon to your favorites yet! Click the ❤️ heart icon on any card to save it."
              : "No Pokémon found matching your criteria."
          }
          onCompare={handleOpenCompare}
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
