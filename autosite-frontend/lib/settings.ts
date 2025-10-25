import api from './api';

export interface PublicSettings {
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

export const getPublicSettings = async (): Promise<PublicSettings> => {
  const { data } = await api.get<PublicSettings>('/settings/public');
  return data;
};
