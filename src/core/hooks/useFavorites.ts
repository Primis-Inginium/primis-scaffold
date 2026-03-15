'use client';

import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lumina-favorites');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate that parsed is an array of strings
        if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
          setFavorites(Array.from(new Set(parsed))); // De-dupe just in case
        }
      }
    } catch (e) {
      console.error('Failed to load favorites from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Update localStorage when favorites change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('lumina-favorites', JSON.stringify(favorites));
      } catch (e) {
        console.error('Failed to save favorites to localStorage', e);
      }
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      return prev.includes(id) 
        ? prev.filter((favId) => favId !== id) 
        : [...prev, id];
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite, clearFavorites, isLoaded };
};
