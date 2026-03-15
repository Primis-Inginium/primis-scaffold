'use client';

import React, { useEffect, useState } from 'react';
import { ArtCard, MasonryGrid, getArtworks, Artwork, useFavorites, Button } from '@/core';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import Link from 'next/link';

export const FavoritesList: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite, isFavorite, clearFavorites, isLoaded } = useFavorites();

  useEffect(() => {
    if (isLoaded) {
      getArtworks().then(data => {
        const filtered = data.filter(art => favorites.includes(art.id));
        setArtworks(filtered);
        setLoading(false);
      });
    }
  }, [favorites, isLoaded]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-black dark:border-zinc-800 dark:border-t-white" />
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 rounded-full bg-zinc-100 p-6 dark:bg-zinc-900">
          <Heart className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Your collection is empty</h2>
        <p className="mt-2 max-w-xs text-zinc-500 dark:text-zinc-400">
          Start exploring the gallery and heart your favorite pieces to build your personal collection.
        </p>
        <Link 
          href="/" 
          className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Browse Gallery
        </Link>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            My Favorites
          </h1>
          <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
            {artworks.length} {artworks.length === 1 ? 'piece' : 'pieces'} curated for your collection.
          </p>
        </div>
        
        <Button 
          variant="ghost" 
          className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
          onClick={clearFavorites}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>
      
      <MasonryGrid>
        {artworks.map((art) => (
          <ArtCard
            key={art.id}
            id={art.id}
            title={art.title}
            artist={art.artist}
            artistId={art.artistId}
            imageUrl={art.imageUrl}
            price={art.price}
            isFavorite={isFavorite(art.id)}
            onFavorite={(id) => toggleFavorite(id)}
          />
        ))}
      </MasonryGrid>
    </section>
  );
};
