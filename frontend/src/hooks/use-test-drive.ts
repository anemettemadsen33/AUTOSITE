import { useState, useEffect } from 'react';
import testDriveService, { TestDriveBooking, AvailableSlot } from '../services/testDriveService';

export function useTestDriveBookings(filters?: { status?: string }) {
  const [bookings, setBookings] = useState<TestDriveBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await testDriveService.getMyBookings({
        ...filters,
        per_page: 50
      });
      setBookings(response.data || []);
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError(err.message || 'Failed to fetch bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filters?.status]);

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings
  };
}

export function useAvailableSlots(vehicleId: number | null, date: string | null) {
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicleId || !date) {
      setSlots([]);
      return;
    }

    const fetchSlots = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await testDriveService.getAvailableSlots(vehicleId, date);
        setSlots(response.slots || []);
      } catch (err: any) {
        console.error('Error fetching slots:', err);
        setError(err.message || 'Failed to fetch available slots');
        setSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [vehicleId, date]);

  return {
    slots,
    loading,
    error
  };
}
