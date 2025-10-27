'use client';

import React, { useState, ReactNode } from 'react';
import { clsx } from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-6 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-900 pr-4">{title}</h3>
        <ChevronDownIcon
          className={clsx(
            'w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-6 pb-4 text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export interface AccordionProps {
  children: ReactNode;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ children, className }) => {
  return (
    <div className={clsx('bg-white rounded-lg shadow-sm overflow-hidden', className)}>
      {children}
    </div>
  );
};

Accordion.displayName = 'Accordion';

export default Accordion;
