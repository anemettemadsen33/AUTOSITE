import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Dealer } from '@/lib/types';

interface UseDealersReturn {
  dealers: Dealer[];
  loading: boolean;
  error: string | null;
}

export function useDealers(): UseDealersReturn {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/dealers');
        setDealers(response.data.data || []);
      } catch (err: any) {
        console.error('Error fetching dealers:', err);
        setError(err.response?.data?.message || 'Failed to fetch dealers');
        setDealers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, []);

  return { dealers, loading, error };
}
