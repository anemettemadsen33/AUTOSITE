import api from '../lib/api';

export interface TestDriveBooking {
  id: number;
  vehicle_id: number;
  preferred_date: string;
  preferred_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  notes?: string;
  vehicle?: any;
  dealer?: any;
  created_at: string;
  updated_at: string;
}

export interface BookTestDriveData {
  vehicle_id: number;
  preferred_date: string;
  preferred_time: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  notes?: string;
}

export interface AvailableSlot {
  time: string;
  available: boolean;
}

class TestDriveService {
  // Book a test drive
  async bookTestDrive(data: BookTestDriveData) {
    const response = await api.post('/test-drives', data);
    return response.data;
  }

  // Get user's bookings
  async getMyBookings(filters?: { status?: string; per_page?: number }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.per_page) params.append('per_page', filters.per_page.toString());
    
    const response = await api.get(`/test-drives${params.toString() ? '?' + params.toString() : ''}`);
    return response.data;
  }

  // Get specific booking
  async getBooking(id: number) {
    const response = await api.get(`/test-drives/${id}`);
    return response.data;
  }

  // Reschedule booking
  async rescheduleBooking(id: number, data: { preferred_date: string; preferred_time: string; notes?: string }) {
    const response = await api.put(`/test-drives/${id}`, data);
    return response.data;
  }

  // Cancel booking
  async cancelBooking(id: number) {
    const response = await api.delete(`/test-drives/${id}`);
    return response.data;
  }

  // Get available time slots
  async getAvailableSlots(vehicleId: number, date: string) {
    const response = await api.get(`/vehicles/${vehicleId}/available-slots?date=${date}`);
    return response.data;
  }
}

export default new TestDriveService();
