'use client';

import React, { useEffect, useState } from 'react';
import { ArtCard, MasonryGrid, getArtworksByArtist, Artwork, useFavorites, Button } from '@/core';
import { User, MapPin, Globe, Twitter, Users, Share2, Plus } from 'lucide-react';

interface ArtistProfileProps {
  artistId: string;
}

export const ArtistProfile: React.FC<ArtistProfileProps> = ({ artistId }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
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
        <div className="relative group mb-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-blue-500/20">
            {artistName.charAt(0)}
          </div>
          <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white dark:bg-zinc-950 border-4 border-zinc-50 dark:border-zinc-950 flex items-center justify-center text-blue-500">
            <Users className="h-4 w-4" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{artistName}</h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
          Digital artist exploring the intersection of nature and artificial intelligence. 
          Pioneering new forms of generative aesthetics in the Web3 space.
        </p>
        
        <div className="mt-6 flex gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer transition-colors"><MapPin className="h-4 w-4" /> Berlin, DE</div>
          <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer transition-colors"><Globe className="h-4 w-4" /> lumina.art/{artistId}</div>
          <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer transition-colors"><Twitter className="h-4 w-4" /> @{artistId}</div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <Button 
            className={`rounded-full px-8 font-bold ${isFollowing ? 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100' : ''}`}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? 'Following' : (
              <span className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Follow
              </span>
            )}
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-12 flex gap-12 border-y border-zinc-100 py-8 dark:border-zinc-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{artworks.length}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">Artworks</div>
          </div>
          <div className="text-center border-x border-zinc-100 px-12 dark:border-zinc-800">
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">12.4k</div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">142</div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">Sold</div>
          </div>
        </div>
      </div>
      
      <div className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <h2 className="text-xl font-semibold">Portfolio</h2>
        <div className="text-sm text-zinc-500">All creations</div>
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
