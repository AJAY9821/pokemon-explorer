"use client";

import React, { useState, useMemo, useTransition } from "react";
import { PokemonCardData } from "@/types/pokemon";
import { SearchBar } from "@/components/search/SearchBar";
import { TypeFilterBar } from "./TypeFilterBar";
import { PokemonGrid } from "./PokemonGrid";
import { fetchPokemonDetail } from "@/lib/api/pokeapi";
import { Loading } from "@/components/common/Loading";

interface PokemonExplorerViewProps {
  initialPokemonList: PokemonCardData[];
}

export function PokemonExplorerView({ initialPokemonList }: PokemonExplorerViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchedPokemon, setSearchedPokemon] = useState<PokemonCardData | null>(null);
  const [isSearchingApi, setIsSearchingApi] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Filter list by name and selected type
  const filteredList = useMemo(() => {
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
        setIsSearchingApi(true);
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
            types: detail.types.map((t) => t.type.name),
          };
          setSearchedPokemon(cardData);
          setSearchError(null);
        } catch {
          setSearchedPokemon(null);
          setSearchError(`No Pokemon found matching "${query}"`);
        } finally {
          setIsSearchingApi(false);
        }
      });
    }
  };

  const displayList = searchedPokemon ? [searchedPokemon] : filteredList;

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
      {isSearchingApi && <Loading />}

      {/* Error state */}
      {searchError && !isSearchingApi && (
        <div className="py-10 text-center text-red-500 font-semibold text-lg">
          {searchError}
        </div>
      )}

      {/* Pokemon Grid */}
      {!isSearchingApi && (
        <PokemonGrid
          pokemonList={displayList}
          emptyMessage={`No Pokemon found matching your criteria.`}
        />
      )}
    </div>
  );
}
