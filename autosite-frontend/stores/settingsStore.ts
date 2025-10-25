import { create } from 'zustand';

interface PublicSettings {
  site_name: string;
  default_currency?: string;
  currencies: string[];
  locales: string[];
  frontend_url: string;
  mail_from_name: string;
  contact_email: string;
  available_filters: {
    makes: string[];
    models: string[];
    fuel_types: string[];
    transmissions: string[];
    body_types: string[];
    colors: string[];
  };
  exchange_rates: Array<{
    base_currency: string;
    target_currency: string;
    rate: number;
  }>;
}

interface SettingsState {
  settings: PublicSettings | null;
  selectedCurrency: string;
  setSettings: (settings: PublicSettings) => void;
  setCurrency: (currency: string) => void;
  getExchangeRate: (from: string, to: string) => number;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: null,
  selectedCurrency: 'EUR',
  setSettings: (settings) => set({ settings }),
  setCurrency: (currency) => set({ selectedCurrency: currency }),
  getExchangeRate: (from, to) => {
    const { settings } = get();
    if (!settings || from === to) return 1;
    
    const rate = settings.exchange_rates.find(
      (r) => r.base_currency === from && r.target_currency === to
    );
    
    if (rate) return rate.rate;
    
    // If direct rate not found, try reverse calculation
    const reverseRate = settings.exchange_rates.find(
      (r) => r.base_currency === to && r.target_currency === from
    );
    
    return reverseRate ? 1 / reverseRate.rate : 1;
  },
}));
