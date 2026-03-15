'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getArtists } from '@/core';

interface Artist {
  id: string;
  name: string;
  coverImage: string;
}

export const FeaturedArtists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    getArtists().then(data => {
      // Just take the first 3 for the featured section
      setArtists(data.slice(0, 3));
    });
  }, []);

  if (artists.length === 0) return null;

  return (
    <section className="py-16 border-t border-zinc-100 dark:border-zinc-900">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Featured Creators
          </h2>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Top performing artists this week.
          </p>
        </div>
        <Link 
          href="/artists" 
          className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors"
        >
          View all creators →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {artists.map((artist) => (
          <Link
            key={artist.id}
            href={`/artist/${artist.id}`}
            className="group relative overflow-hidden rounded-2xl aspect-[16/9]"
          >
            <Image
              src={artist.coverImage}
              alt={artist.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-xl font-bold text-white">{artist.name}</h3>
              <p className="text-zinc-300 text-sm mt-1">Lumina Certified</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
