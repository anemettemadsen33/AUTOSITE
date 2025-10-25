'use client';

import { useState } from 'react';
import { ContactFormModal } from './ContactFormModal';

interface BuyNowButtonProps {
  vehicleId: number;
  vehicleTitle: string;
  price: number;
  className?: string;
}

export function BuyNowButton({ vehicleId, vehicleTitle, price, className = '' }: BuyNowButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center gap-2 ${className}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Buy Now
      </button>
      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehicleId={vehicleId}
        vehicleTitle={vehicleTitle}
        inquiryType="purchase"
      />
    </>
  );
}
