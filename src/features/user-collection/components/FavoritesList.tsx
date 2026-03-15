'use client';

import React, { useEffect, useState } from 'react';
import { ArtCard, MasonryGrid, getArtworks, Artwork, useFavorites } from '@/core';

export const FavoritesList: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    getArtworks().then(data => {
      // Filter only favorited artworks
      const filtered = data.filter(art => favorites.includes(art.id));
      setArtworks(filtered);
      setLoading(false);
    });
  }, [favorites]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-black dark:border-zinc-800 dark:border-t-white" />
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-semibold">Your collection is empty</h2>
        <p className="mt-2 text-zinc-500">Go back to explore and heart some art!</p>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          My Favorites
        </h1>
        <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
          Your personal collection of curated digital excellence.
        </p>
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
