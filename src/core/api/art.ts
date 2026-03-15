export interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  imageUrl: string;
  price: string;
  description: string;
}

export const MOCK_ARTWORKS: Artwork[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'Luna Ray',
    artistId: 'luna-ray',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    price: '0.5 ETH',
    description: 'A vibrant exploration of digital light and shadow.'
  },
  {
    id: '2',
    title: 'Digital Horizon',
    artist: 'Marcus Vane',
    artistId: 'marcus-vane',
    imageUrl: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800',
    price: '1.2 ETH',
    description: 'Minimalist landscape rendered in neural gradients.'
  },
  {
    id: '3',
    title: 'Cyber Flora',
    artist: 'Elena K.',
    artistId: 'elena-k',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800',
    price: '0.8 ETH',
    description: 'Organic forms meet synthetic precision.'
  },
  {
    id: '4',
    title: 'Abstract Pulse',
    artist: 'Luna Ray',
    artistId: 'luna-ray',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    price: '0.3 ETH',
    description: 'Rhythmic patterns in deep ultraviolet.'
  },
  {
    id: '5',
    title: 'Neural Web',
    artist: 'Orbit 7',
    artistId: 'orbit-7',
    imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
    price: '2.1 ETH',
    description: 'Connectivity manifested in silicon.'
  },
  {
    id: '6',
    title: 'Prism Shift',
    artist: 'Marcus Vane',
    artistId: 'marcus-vane',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800',
    price: '0.9 ETH',
    description: 'Refraction study in 4D space.'
  }
];

export const getArtworks = async (): Promise<Artwork[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_ARTWORKS;
};

export const getArtworkById = async (id: string): Promise<Artwork | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_ARTWORKS.find(a => a.id === id);
};

export const getArtists = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const uniqueArtists = Array.from(new Set(MOCK_ARTWORKS.map(a => a.artistId)));
  return uniqueArtists.map(id => {
    const art = MOCK_ARTWORKS.find(a => a.artistId === id)!;
    return {
      id: art.artistId,
      name: art.artist,
      artworksCount: MOCK_ARTWORKS.filter(a => a.artistId === id).length,
      coverImage: art.imageUrl
    };
  });
};

export const getArtworksByArtist = async (artistId: string): Promise<Artwork[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return MOCK_ARTWORKS.filter(a => a.artistId === artistId);
};
