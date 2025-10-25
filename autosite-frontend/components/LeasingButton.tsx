'use client';

import { useState } from 'react';
import { LeasingCalculatorModal } from './LeasingCalculatorModal';

interface LeasingButtonProps {
  vehicleId: number;
  vehicleTitle: string;
  price: number;
  className?: string;
}

export function LeasingButton({ vehicleId, vehicleTitle, price, className = '' }: LeasingButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center gap-2 ${className}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Calculate Leasing
      </button>
      <LeasingCalculatorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehicleId={vehicleId}
        vehicleTitle={vehicleTitle}
        price={price}
      />
    </>
  );
}
