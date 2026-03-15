import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from './Button';

interface ArtCardProps {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  imageUrl: string;
  price?: string;
  isFavorite?: boolean;
  onFavorite?: (id: string) => void;
  onPurchase?: (id: string) => void;
}

export const ArtCard: React.FC<ArtCardProps> = ({
  id,
  title,
  artist,
  artistId,
  imageUrl,
  price,
  isFavorite = false,
  onFavorite,
  onPurchase,
}) => {
  return (
    <div className="group relative break-inside-avoid mb-6 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 shadow-sm transition-all hover:shadow-lg">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`backdrop-blur-sm ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              onClick={(e) => {
                e.preventDefault();
                onFavorite?.(id);
              }}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 bg-white text-black hover:bg-white/90"
              onClick={(e) => {
                e.preventDefault();
                onPurchase?.(id);
              }}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              {price || 'Collect'}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">{title}</h3>
        <Link 
          href={`/artist/${artistId}`}
          className="block mt-1 text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-500 transition-colors"
        >
          {artist}
        </Link>
      </div>
    </div>
  );
};
