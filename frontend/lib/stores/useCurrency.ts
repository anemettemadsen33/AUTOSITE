import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = 'EUR' | 'USD' | 'RON' | 'GBP';

interface CurrencyState {
  currency: Currency;
  rates: Record<Currency, number>;
  setCurrency: (currency: Currency) => void;
  setRates: (rates: Record<Currency, number>) => void;
  convert: (amount: number, from: Currency, to: Currency) => number;
}

export const useCurrency = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'EUR',
      rates: {
        EUR: 1,
        USD: 1.09,
        RON: 4.97,
        GBP: 0.86,
      },
      setCurrency: (currency) => set({ currency }),
      setRates: (rates) => set({ rates }),
      convert: (amount, from, to) => {
        const { rates } = get();
        if (from === to) return amount;
        const eurAmount = amount / rates[from];
        return eurAmount * rates[to];
      },
    }),
    {
      name: 'currency-storage',
    }
  )
);
