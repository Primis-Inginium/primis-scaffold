'use client';

import React, { useEffect, useState } from 'react';
import { ArtCard, MasonryGrid, getArtworks, Artwork, useFavorites, useCollection } from '@/core';
import { CheckoutModal } from './CheckoutModal';

export const ArtGallery: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isOwned } = useCollection();
  
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getArtworks().then(data => {
      setArtworks(data);
      setLoading(false);
    });
  }, []);

  const handlePurchaseClick = (art: Artwork) => {
    setSelectedArt(art);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-black dark:border-zinc-800 dark:border-t-white" />
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Discover Digital Excellence
        </h2>
        <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
          Curated artworks from the world's leading digital creators.
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
            isOwned={isOwned(art.id)}
            onFavorite={(id) => toggleFavorite(id)}
            onPurchase={() => handlePurchaseClick(art)}
          />
        ))}
      </MasonryGrid>

      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        artwork={selectedArt} 
      />
    </section>
  );
};
