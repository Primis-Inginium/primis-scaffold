'use client';

import React, { useState } from 'react';
import { Modal, Button, Artwork } from '@/core';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  artwork: Artwork | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, artwork }) => {
  const [step, setStep] = useState<'review' | 'success'>('review');

  const handlePurchase = () => {
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  const handleClose = () => {
    setStep('review');
    onClose();
  };

  if (!artwork) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={step === 'review' ? 'Complete Purchase' : 'Purchase Successful'}>
      {step === 'review' ? (
        <div className="space-y-6">
          <div className="flex gap-4 border-b border-zinc-100 pb-4 dark:border-zinc-800">
            <div className="h-20 w-20 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <img src={artwork.imageUrl} alt={artwork.title} className="h-full w-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-zinc-50">{artwork.title}</h4>
              <p className="text-sm text-zinc-500">{artwork.artist}</p>
              <p className="mt-1 font-mono font-bold text-blue-500">{artwork.price}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Service Fee</span>
              <span>0.005 ETH</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{artwork.price}</span>
            </div>
          </div>

          <Button className="w-full" onClick={handlePurchase}>
            Confirm Purchase
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center py-6 text-center">
          <CheckCircle2 className="h-16 w-16 text-emerald-500 animate-in zoom-in duration-300" />
          <h4 className="mt-4 text-xl font-bold">Artwork Collected!</h4>
          <p className="mt-2 text-zinc-500">
            "{artwork.title}" has been added to your digital collection.
          </p>
          <Button variant="outline" className="mt-8 w-full" onClick={handleClose}>
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
};
