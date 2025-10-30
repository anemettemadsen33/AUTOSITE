<?php

namespace Database\Factories;

use App\Models\Dealer;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TestDriveBooking>
 */
class TestDriveBookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['pending', 'confirmed', 'cancelled', 'completed'];
        $preferredDate = $this->faker->dateTimeBetween('now', '+30 days');
        
        return [
            'user_id' => User::factory(),
            'vehicle_id' => Vehicle::factory(),
            'dealer_id' => Dealer::factory(),
            'preferred_date' => $preferredDate,
            'preferred_time' => $this->faker->time('H:i'),
            'status' => $this->faker->randomElement($statuses),
            'contact_name' => $this->faker->name(),
            'contact_phone' => $this->faker->phoneNumber(),
            'contact_email' => $this->faker->safeEmail(),
            'notes' => $this->faker->optional(0.5)->sentence(),
            'dealer_notes' => $this->faker->optional(0.3)->sentence(),
        ];
    }

    /**
     * Indicate that the booking is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }

    /**
     * Indicate that the booking is confirmed.
     */
    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'confirmed',
        ]);
    }

    /**
     * Indicate that the booking is cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelled',
        ]);
    }

    /**
     * Indicate that the booking is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }
}
