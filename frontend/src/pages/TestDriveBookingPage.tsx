import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { useApiVehicles } from '../hooks/use-api-vehicles';
import { useTestDriveBookings, useAvailableSlots } from '../hooks/use-test-drive';
import testDriveService, { BookTestDriveData } from '../services/testDriveService';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

export default function TestDriveBookingPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'book' | 'bookings'>('book');

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-muted-foreground mb-6">
            Please login to book test drives
          </p>
          <Button onClick={() => window.location.href = '/login'}>
            Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Test Drive Booking</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('book')}
          className={`pb-2 px-4 ${
            activeTab === 'book'
              ? 'border-b-2 border-primary font-semibold'
              : 'text-muted-foreground'
          }`}
        >
          Book Test Drive
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-2 px-4 ${
            activeTab === 'bookings'
              ? 'border-b-2 border-primary font-semibold'
              : 'text-muted-foreground'
          }`}
        >
          My Bookings
        </button>
      </div>

      {activeTab === 'book' ? <BookingForm user={user} /> : <MyBookings />}
    </div>
  );
}

function BookingForm({ user }: { user: any }) {
  const { vehicles, loading: vehiclesLoading } = useApiVehicles({ perPage: 100 });
  const [formData, setFormData] = useState<BookTestDriveData>({
    vehicle_id: 0,
    preferred_date: '',
    preferred_time: '',
    contact_name: user?.name || '',
    contact_phone: '',
    contact_email: user?.email || '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const { slots, loading: slotsLoading } = useAvailableSlots(
    formData.vehicle_id || null,
    formData.preferred_date || null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vehicle_id) {
      toast.error('Please select a vehicle');
      return;
    }

    try {
      setSubmitting(true);
      await testDriveService.bookTestDrive(formData);
      toast.success('Test drive booked successfully! You will receive a confirmation email.');
      
      // Reset form
      setFormData({
        ...formData,
        vehicle_id: 0,
        preferred_date: '',
        preferred_time: '',
        notes: ''
      });
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Failed to book test drive');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedVehicle = vehicles.find(v => v.id === Number(formData.vehicle_id));

  // Get tomorrow's date for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vehicle Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Vehicle *
          </label>
          <select
            value={formData.vehicle_id}
            onChange={(e) => setFormData({ ...formData, vehicle_id: Number(e.target.value) })}
            className="w-full p-2 border rounded-md"
            required
            disabled={vehiclesLoading}
          >
            <option value="0">
              {vehiclesLoading ? 'Loading vehicles...' : 'Choose a vehicle'}
            </option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.title} - €{vehicle.price?.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Vehicle Preview */}
        {selectedVehicle && (
          <div className="p-4 bg-muted rounded-md">
            <h3 className="font-semibold">{selectedVehicle.title}</h3>
            <p className="text-sm text-muted-foreground">
              {selectedVehicle.year} • {selectedVehicle.mileage?.toLocaleString()} km
            </p>
          </div>
        )}

        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Date *
          </label>
          <Input
            type="date"
            value={formData.preferred_date}
            onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value, preferred_time: '' })}
            min={minDate}
            required
          />
        </div>

        {/* Time Selection */}
        {formData.preferred_date && formData.vehicle_id > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Preferred Time *
            </label>
            {slotsLoading ? (
              <p className="text-sm text-muted-foreground">Loading available slots...</p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setFormData({ ...formData, preferred_time: slot.time })}
                    disabled={!slot.available}
                    className={`p-2 rounded-md text-sm ${
                      formData.preferred_time === slot.time
                        ? 'bg-primary text-primary-foreground'
                        : slot.available
                        ? 'bg-green-50 hover:bg-green-100 text-green-700 border border-green-200'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Contact Name *
            </label>
            <Input
              value={formData.contact_name}
              onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number *
            </label>
            <Input
              type="tel"
              value={formData.contact_phone}
              onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Email *
          </label>
          <Input
            type="email"
            value={formData.contact_email}
            onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
            required
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Notes / Special Requests
          </label>
          <Textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            placeholder="Any special requests or questions..."
          />
        </div>

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? 'Booking...' : 'Book Test Drive'}
        </Button>
      </form>
    </Card>
  );
}

function MyBookings() {
  const { bookings, loading, refetch } = useTestDriveBookings();
  const [cancelling, setCancelling] = useState<number | null>(null);

  const handleCancel = async (id: number) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      setCancelling(id);
      await testDriveService.cancelBooking(id);
      toast.success('Booking cancelled successfully');
      refetch();
    } catch (error: any) {
      console.error('Cancel error:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancelling(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No test drive bookings yet</p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="mt-4"
        >
          Book Your First Test Drive
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">
                {booking.vehicle?.title || 'Vehicle'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Booking ID: #{booking.id}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                booking.status === 'confirmed'
                  ? 'bg-green-100 text-green-700'
                  : booking.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : booking.status === 'cancelled'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="font-medium">
                {new Date(booking.preferred_date).toLocaleDateString()} at{' '}
                {booking.preferred_time}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contact</p>
              <p className="font-medium">{booking.contact_name}</p>
              <p className="text-sm">{booking.contact_phone}</p>
            </div>
          </div>

          {booking.notes && (
            <div className="mb-4 p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground mb-1">Notes:</p>
              <p className="text-sm">{booking.notes}</p>
            </div>
          )}

          {(booking.status === 'pending' || booking.status === 'confirmed') && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info('Reschedule feature coming soon')}
              >
                Reschedule
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleCancel(booking.id)}
                disabled={cancelling === booking.id}
              >
                {cancelling === booking.id ? 'Cancelling...' : 'Cancel'}
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
