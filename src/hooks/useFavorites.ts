"use client";

import { useState, useEffect, useCallback } from "react";

const FAVORITES_STORAGE_KEY = "pokemon_explorer_favorites";
const FAVORITES_EVENT = "pokemon_favorites_updated";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load favorites from localStorage", e);
    } finally {
      setIsLoaded(true);
    }

    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        setFavorites(stored ? JSON.parse(stored) : []);
      } catch (e) {
        console.error("Error reading updated favorites", e);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(FAVORITES_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(FAVORITES_EVENT, handleStorageChange);
    };
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    let nextFavorites: number[] = [];

    setFavorites((prev) => {
      nextFavorites = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];

      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(nextFavorites));
      } catch (e) {
        console.error("Failed to save favorites to localStorage", e);
      }

      return nextFavorites;
    });

    // Defer custom event dispatch to prevent synchronous setState warning during render
    queueMicrotask(() => {
      window.dispatchEvent(new Event(FAVORITES_EVENT));
    });
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  );

  return { favorites, isFavorite, toggleFavorite, isLoaded };
}
