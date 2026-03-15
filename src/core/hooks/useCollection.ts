'use client';

import { useState, useEffect } from 'react';

export const useCollection = () => {
  const [collection, setCollection] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lumina-collection');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
          setCollection(Array.from(new Set(parsed)));
        }
      }
    } catch (e) {
      console.error('Failed to load collection from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Update localStorage when collection changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('lumina-collection', JSON.stringify(collection));
      } catch (e) {
        console.error('Failed to save collection to localStorage', e);
      }
    }
  }, [collection, isLoaded]);

  const addToCollection = (id: string) => {
    setCollection((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const isOwned = (id: string) => collection.includes(id);

  const clearCollection = () => {
    setCollection([]);
  };

  return { collection, addToCollection, isOwned, clearCollection, isLoaded };
};
