'use client';

import React from 'react';
import { Button } from '@/core';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[120px]" />
      </div>

      <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-wider uppercase mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Sparkles className="h-3 w-3" />
          The Future of Digital Ownership
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-b from-zinc-950 to-zinc-600 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
          Curating the World's Finest Digital Art
        </h1>
        
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl leading-relaxed">
          Discover, collect, and showcase extraordinary digital artworks from 
          leading creators across the globe. Powered by Lumina's high-performance 
          architecture.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold group">
            Start Exploring
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg font-bold">
            View Collections
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-3 gap-8 md:gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-sm font-bold tracking-widest text-zinc-400 uppercase">Featured in Wired</div>
          <div className="text-sm font-bold tracking-widest text-zinc-400 uppercase">Art Basel 2026</div>
          <div className="text-sm font-bold tracking-widest text-zinc-400 uppercase">Primis Partner</div>
        </div>
      </div>
    </section>
  );
};
