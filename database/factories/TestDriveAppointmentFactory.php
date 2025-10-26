<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TestDriveAppointment>
 */
class TestDriveAppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'vehicle_id' => \App\Models\Vehicle::factory(),
            'dealer_id' => \App\Models\User::factory(),
            'appointment_date' => $this->faker->dateTimeBetween('+1 week', '+1 month'),
            'preferred_time' => $this->faker->randomElement(['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']),
            'customer_name' => $this->faker->name(),
            'customer_email' => $this->faker->safeEmail(),
            'customer_phone' => $this->faker->phoneNumber(),
            'message' => $this->faker->optional()->sentence(),
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'cancelled', 'completed']),
            'dealer_notes' => $this->faker->optional()->sentence(),
        ];
    }
}
