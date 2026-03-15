'use client';

import React, { useEffect, useState } from 'react';
import { ArtCard, MasonryGrid, getArtworksByArtist, Artwork, useFavorites } from '@/core';
import { User, MapPin, Globe, Twitter } from 'lucide-react';

interface ArtistProfileProps {
  artistId: string;
}

export const ArtistProfile: React.FC<ArtistProfileProps> = ({ artistId }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    getArtworksByArtist(artistId).then(data => {
      setArtworks(data);
      setLoading(false);
    });
  }, [artistId]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-black dark:border-zinc-800 dark:border-t-white" />
      </div>
    );
  }

  const artistName = artworks[0]?.artist || artistId.replace('-', ' ');

  return (
    <div className="py-12">
      <div className="mb-16 flex flex-col items-center text-center">
        <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 mb-6 flex items-center justify-center text-white text-3xl font-bold">
          {artistName.charAt(0)}
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{artistName}</h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
          Digital artist exploring the intersection of nature and artificial intelligence.
        </p>
        
        <div className="mt-6 flex gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Berlin, DE</div>
          <div className="flex items-center gap-1"><Globe className="h-4 w-4" /> lumina.art/{artistId}</div>
          <div className="flex items-center gap-1"><Twitter className="h-4 w-4" /> @{artistId}</div>
        </div>
      </div>
      
      <div className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <h2 className="text-xl font-semibold">Portfolio</h2>
        <div className="text-sm text-zinc-500">{artworks.length} pieces</div>
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
    </div>
  );
};
