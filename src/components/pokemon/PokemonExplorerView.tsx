"use client";

import React, { useState, useMemo, useTransition, useEffect } from "react";
import { PokemonCardData } from "@/types/pokemon";
import { SearchBar } from "@/components/search/SearchBar";
import { TypeFilterBar } from "./TypeFilterBar";
import { PokemonGrid } from "./PokemonGrid";
import { fetchPokemonDetail, fetchPokemonByType } from "@/lib/api/pokeapi";
import { Loading } from "@/components/common/Loading";

interface PokemonExplorerViewProps {
  initialPokemonList: PokemonCardData[];
}

export function PokemonExplorerView({ initialPokemonList }: PokemonExplorerViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchedPokemon, setSearchedPokemon] = useState<PokemonCardData | null>(null);
  const [typeFetchedList, setTypeFetchedList] = useState<PokemonCardData[] | null>(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Filter local list by name and selected type
  const localFilteredList = useMemo(() => {
    return initialPokemonList.filter((p) => {
      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        String(p.id) === searchQuery.trim();

      const matchesType =
        !selectedType || p.types.some((t) => t.toLowerCase() === selectedType.toLowerCase());

      return matchesSearch && matchesType;
    });
  }, [initialPokemonList, searchQuery, selectedType]);

  // Dynamically fetch from PokeAPI if selected type has 0 local matches or when type filter is clicked
  useEffect(() => {
    if (!selectedType) {
      setTypeFetchedList(null);
      return;
    }

    // Check if local list has matching Pokemon for this type
    const localMatches = initialPokemonList.filter((p) =>
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
  }, [selectedType, initialPokemonList]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setSearchError(null);
    setSearchedPokemon(null);

    if (!query.trim()) return;

    const trimmedQuery = query.trim().toLowerCase();
    const matchInList = initialPokemonList.some(
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
          setSearchError(`No Pokemon found matching "${query}"`);
        } finally {
          setIsLoadingApi(false);
        }
      });
    }
  };

  const displayList = searchedPokemon
    ? [searchedPokemon]
    : typeFetchedList !== null
    ? typeFetchedList
    : localFilteredList;

  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        placeholder="Search Pokémon by name or ID..."
      />

      {/* Type Filter Pill Bar */}
      <TypeFilterBar
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      {/* Loading indicator */}
      {isLoadingApi && <Loading />}

      {/* Error state */}
      {searchError && !isLoadingApi && (
        <div className="py-10 text-center text-red-500 font-semibold text-lg">
          {searchError}
        </div>
      )}

      {/* Pokemon Grid */}
      {!isLoadingApi && (
        <PokemonGrid
          pokemonList={displayList}
          emptyMessage={`No Pokemon found matching your criteria.`}
        />
      )}
    </div>
  );
}
