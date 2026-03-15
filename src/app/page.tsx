import React from 'react';
import { ArtGallery, FeaturedArtists, Hero } from '@/features';

export default function Home() {
  return (
    <main>
      <Hero />
      <ArtGallery />
      <FeaturedArtists />
    </main>
  );
}
