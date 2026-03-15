'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getArtists } from '@/core';
import { Users } from 'lucide-react';

interface Artist {
  id: string;
  name: string;
  artworksCount: number;
  coverImage: string;
}

export const ArtistList: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtists().then(data => {
      setArtists(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-black dark:border-zinc-800 dark:border-t-white" />
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Digital Creators
        </h1>
        <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
          Meet the minds behind the most exquisite digital collections.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist) => (
          <Link
            key={artist.id}
            href={`/artist/${artist.id}`}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-zinc-900"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-zinc-100 dark:ring-zinc-800">
                <Image
                  src={artist.coverImage}
                  alt={artist.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{artist.name}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {artist.artworksCount} {artist.artworksCount === 1 ? 'Artwork' : 'Artworks'}
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between text-sm text-zinc-500">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Verified Creator
              </span>
              <span className="font-medium text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                View Profile →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
