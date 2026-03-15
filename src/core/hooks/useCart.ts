'use client';

import { useState, useEffect } from 'react';
import { Artwork } from '../api/art';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<Artwork[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('lumina-cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  const addToCart = (item: Artwork) => {
    setCartItems((prev) => {
      const isAlreadyInCart = prev.some((i) => i.id === item.id);
      if (isAlreadyInCart) return prev;
      
      const next = [...prev, item];
      localStorage.setItem('lumina-cart', JSON.stringify(next));
      return next;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      localStorage.setItem('lumina-cart', JSON.stringify(next));
      return next;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('lumina-cart');
  };

  return { cartItems, addToCart, removeFromCart, clearCart };
};
