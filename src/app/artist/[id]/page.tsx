import React from 'react';
import { ArtistProfile } from '@/features';

export default function ArtistPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <ArtistProfile artistId={params.id} />
    </main>
  );
}
