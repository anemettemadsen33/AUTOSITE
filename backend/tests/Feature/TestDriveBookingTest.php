<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Vehicle;
use App\Models\Dealer;
use App\Models\TestDriveBooking;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Carbon\Carbon;

class TestDriveBookingTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $vehicle;
    protected $dealer;

    protected function setUp(): void
    {
        parent::setUp();

        // Create test user
        $this->user = User::factory()->create();

        // Create dealer
        $this->dealer = Dealer::factory()->create();

        // Create test vehicle
        $this->vehicle = Vehicle::factory()->create([
            'dealer_id' => $this->dealer->id,
            'status' => 'published',
        ]);
    }

    /** @test */
    public function user_can_book_a_test_drive()
    {
        $tomorrow = Carbon::tomorrow();

        $response = $this->actingAs($this->user)->postJson('/api/v1/test-drives', [
            'vehicle_id' => $this->vehicle->id,
            'preferred_date' => $tomorrow->format('Y-m-d'),
            'preferred_time' => '10:00',
            'contact_name' => 'John Doe',
            'contact_phone' => '+1234567890',
            'contact_email' => 'john@example.com',
            'notes' => 'Looking forward to test driving this car!',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'booking' => [
                    'id',
                    'user_id',
                    'vehicle_id',
                    'dealer_id',
                    'preferred_date',
                    'status',
                    'contact_name',
                ]
            ]);

        $this->assertDatabaseHas('test_drive_bookings', [
            'user_id' => $this->user->id,
            'vehicle_id' => $this->vehicle->id,
            'status' => 'pending',
            'contact_name' => 'John Doe',
        ]);
    }

    /** @test */
    public function booking_requires_authentication()
    {
        $tomorrow = Carbon::tomorrow();

        $response = $this->postJson('/api/v1/test-drives', [
            'vehicle_id' => $this->vehicle->id,
            'preferred_date' => $tomorrow->format('Y-m-d'),
            'preferred_time' => '10:00',
            'contact_name' => 'John Doe',
            'contact_phone' => '+1234567890',
            'contact_email' => 'john@example.com',
        ]);

        $response->assertStatus(401);
    }

    /** @test */
    public function booking_requires_valid_vehicle_id()
    {
        $tomorrow = Carbon::tomorrow();

        $response = $this->actingAs($this->user)->postJson('/api/v1/test-drives', [
            'vehicle_id' => 99999, // Non-existent vehicle
            'preferred_date' => $tomorrow->format('Y-m-d'),
            'preferred_time' => '10:00',
            'contact_name' => 'John Doe',
            'contact_phone' => '+1234567890',
            'contact_email' => 'john@example.com',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['vehicle_id']);
    }

    /** @test */
    public function booking_date_must_be_in_future()
    {
        $yesterday = Carbon::yesterday();

        $response = $this->actingAs($this->user)->postJson('/api/v1/test-drives', [
            'vehicle_id' => $this->vehicle->id,
            'preferred_date' => $yesterday->format('Y-m-d'),
            'preferred_time' => '10:00',
            'contact_name' => 'John Doe',
            'contact_phone' => '+1234567890',
            'contact_email' => 'john@example.com',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['preferred_date']);
    }

    /** @test */
    public function booking_time_must_be_valid_format()
    {
        $tomorrow = Carbon::tomorrow();

        $response = $this->actingAs($this->user)->postJson('/api/v1/test-drives', [
            'vehicle_id' => $this->vehicle->id,
            'preferred_date' => $tomorrow->format('Y-m-d'),
            'preferred_time' => 'invalid-time',
            'contact_name' => 'John Doe',
            'contact_phone' => '+1234567890',
            'contact_email' => 'john@example.com',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['preferred_time']);
    }

    /** @test */
    public function contact_email_must_be_valid()
    {
        $tomorrow = Carbon::tomorrow();

        $response = $this->actingAs($this->user)->postJson('/api/v1/test-drives', [
            'vehicle_id' => $this->vehicle->id,
            'preferred_date' => $tomorrow->format('Y-m-d'),
            'preferred_time' => '10:00',
            'contact_name' => 'John Doe',
            'contact_phone' => '+1234567890',
            'contact_email' => 'invalid-email',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['contact_email']);
    }

    /** @test */
    public function cannot_book_same_vehicle_at_same_time()
    {
        $tomorrow = Carbon::tomorrow();
        $datetime = $tomorrow->format('Y-m-d') . ' 10:00';

        // Create existing booking
        TestDriveBooking::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'preferred_date' => $datetime,
            'preferred_time' => '10:00',
            'status' => 'pending',
        ]);

        // Try to book same time
        $response = $this->actingAs($this->user)->postJson('/api/v1/test-drives', [
            'vehicle_id' => $this->vehicle->id,
            'preferred_date' => $tomorrow->format('Y-m-d'),
            'preferred_time' => '10:00',
            'contact_name' => 'John Doe',
            'contact_phone' => '+1234567890',
            'contact_email' => 'john@example.com',
        ]);

        $response->assertStatus(409)
            ->assertJson([
                'error' => 'booking_conflict'
            ]);
    }

    /** @test */
    public function user_can_list_their_bookings()
    {
        // Create bookings for this user
        TestDriveBooking::factory()->count(3)->create([
            'user_id' => $this->user->id,
        ]);

        // Create booking for another user (should not be visible)
        $otherUser = User::factory()->create();
        TestDriveBooking::factory()->create([
            'user_id' => $otherUser->id,
        ]);

        $response = $this->actingAs($this->user)->getJson('/api/v1/test-drives');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    /** @test */
    public function user_can_filter_bookings_by_status()
    {
        TestDriveBooking::factory()->create([
            'user_id' => $this->user->id,
            'status' => 'pending',
        ]);

        TestDriveBooking::factory()->create([
            'user_id' => $this->user->id,
            'status' => 'confirmed',
        ]);

        TestDriveBooking::factory()->create([
            'user_id' => $this->user->id,
            'status' => 'cancelled',
        ]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/v1/test-drives?status=pending');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    /** @test */
    public function user_can_view_specific_booking()
    {
        $booking = TestDriveBooking::factory()->create([
            'user_id' => $this->user->id,
            'vehicle_id' => $this->vehicle->id,
        ]);

        $response = $this->actingAs($this->user)
            ->getJson("/api/v1/test-drives/{$booking->id}");

        $response->assertStatus(200)
            ->assertJson([
                'id' => $booking->id,
                'vehicle_id' => $this->vehicle->id,
            ]);
    }

    /** @test */
    public function user_cannot_view_other_users_booking()
    {
        $otherUser = User::factory()->create();
        $booking = TestDriveBooking::factory()->create([
            'user_id' => $otherUser->id,
        ]);

        $response = $this->actingAs($this->user)
            ->getJson("/api/v1/test-drives/{$booking->id}");

        $response->assertStatus(404);
    }

    /** @test */
    public function user_can_reschedule_booking()
    {
        $tomorrow = Carbon::tomorrow();
        $booking = TestDriveBooking::factory()->create([
            'user_id' => $this->user->id,
            'vehicle_id' => $this->vehicle->id,
            'status' => 'pending',
        ]);

        $newDate = Carbon::tomorrow()->addDays(2);

        $response = $this->actingAs($this->user)
            ->putJson("/api/v1/test-drives/{$booking->id}", [
                'preferred_date' => $newDate->format('Y-m-d'),
                'preferred_time' => '14:00',
                'notes' => 'Rescheduled',
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Test drive rescheduled successfully.',
            ]);

        $this->assertDatabaseHas('test_drive_bookings', [
            'id' => $booking->id,
            'preferred_time' => '14:00',
        ]);
    }

    /** @test */
    public function cannot_reschedule_cancelled_booking()
    {
        $booking = TestDriveBooking::factory()->create([
            'user_id' => $this->user->id,
            'status' => 'cancelled',
        ]);

        $newDate = Carbon::tomorrow()->addDays(2);

        $response = $this->actingAs($this->user)
            ->putJson("/api/v1/test-drives/{$booking->id}", [
                'preferred_date' => $newDate->format('Y-m-d'),
                'preferred_time' => '14:00',
            ]);

        $response->assertStatus(422)
            ->assertJson([
                'error' => 'invalid_status'
            ]);
    }

    /** @test */
    public function user_can_cancel_booking()
    {
        $booking = TestDriveBooking::factory()->create([
            'user_id' => $this->user->id,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($this->user)
            ->deleteJson("/api/v1/test-drives/{$booking->id}");

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Test drive booking cancelled successfully.',
            ]);

        $this->assertDatabaseHas('test_drive_bookings', [
            'id' => $booking->id,
            'status' => 'cancelled',
        ]);
    }

    /** @test */
    public function cannot_cancel_already_cancelled_booking()
    {
        $booking = TestDriveBooking::factory()->create([
            'user_id' => $this->user->id,
            'status' => 'cancelled',
        ]);

        $response = $this->actingAs($this->user)
            ->deleteJson("/api/v1/test-drives/{$booking->id}");

        $response->assertStatus(422)
            ->assertJson([
                'error' => 'invalid_status'
            ]);
    }

    /** @test */
    public function can_check_available_slots_for_vehicle()
    {
        $tomorrow = Carbon::tomorrow();

        // Create some bookings
        $datetime1 = $tomorrow->format('Y-m-d') . ' 10:00';
        $datetime2 = $tomorrow->format('Y-m-d') . ' 14:00';

        TestDriveBooking::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'preferred_date' => $datetime1,
            'preferred_time' => '10:00',
            'status' => 'confirmed',
        ]);

        TestDriveBooking::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'preferred_date' => $datetime2,
            'preferred_time' => '14:00',
            'status' => 'pending',
        ]);

        $response = $this->actingAs($this->user)
            ->getJson("/api/v1/vehicles/{$this->vehicle->id}/available-slots?date=" . $tomorrow->format('Y-m-d'));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'vehicle_id',
                'date',
                'slots',
                'booked_count',
                'available_count',
            ])
            ->assertJson([
                'vehicle_id' => $this->vehicle->id,
                'booked_count' => 2,
            ]);

        // Check that 10:00 and 14:00 are not available
        $slots = $response->json('slots');
        $slot10 = collect($slots)->firstWhere('time', '10:00');
        $slot14 = collect($slots)->firstWhere('time', '14:00');
        $slot11 = collect($slots)->firstWhere('time', '11:00');

        $this->assertFalse($slot10['available']);
        $this->assertFalse($slot14['available']);
        $this->assertTrue($slot11['available']);
    }

    /** @test */
    public function available_slots_requires_future_date()
    {
        $yesterday = Carbon::yesterday();

        $response = $this->actingAs($this->user)
            ->getJson("/api/v1/vehicles/{$this->vehicle->id}/available-slots?date=" . $yesterday->format('Y-m-d'));

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['date']);
    }

    /** @test */
    public function booking_includes_vehicle_and_dealer_details()
    {
        $tomorrow = Carbon::tomorrow();

        $response = $this->actingAs($this->user)->postJson('/api/v1/test-drives', [
            'vehicle_id' => $this->vehicle->id,
            'preferred_date' => $tomorrow->format('Y-m-d'),
            'preferred_time' => '10:00',
            'contact_name' => 'John Doe',
            'contact_phone' => '+1234567890',
            'contact_email' => 'john@example.com',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'booking' => [
                    'vehicle' => ['id', 'make', 'model'],
                    'dealer' => ['id', 'name'],
                ]
            ]);
    }
}
