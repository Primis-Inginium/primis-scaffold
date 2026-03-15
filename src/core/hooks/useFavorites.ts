'use client';

import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('lumina-favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Update localStorage when favorites change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('lumina-favorites', JSON.stringify(favorites));
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
