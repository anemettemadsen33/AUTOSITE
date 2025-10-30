<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LeasingApplication>
 */
class LeasingApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['pending', 'under_review', 'approved', 'rejected', 'cancelled'];
        
        return [
            'user_id' => User::factory(),
            'vehicle_id' => Vehicle::factory(),
            'application_number' => 'LSG-' . strtoupper($this->faker->bothify('???-####')),
            'status' => $this->faker->randomElement($statuses),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'city' => $this->faker->city(),
            'postal_code' => $this->faker->postcode(),
            'country' => $this->faker->countryCode(),
            'employment_status' => $this->faker->randomElement(['employed', 'self_employed', 'unemployed', 'retired']),
            'employer_name' => $this->faker->optional(0.7)->company(),
            'monthly_income' => $this->faker->numberBetween(2000, 10000),
            'down_payment' => $this->faker->numberBetween(5000, 30000),
            'lease_term_months' => $this->faker->randomElement([24, 36, 48, 60]),
            'notes' => $this->faker->optional(0.3)->paragraph(),
        ];
    }

    /**
     * Indicate that the application is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }

    /**
     * Indicate that the application is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
        ]);
    }

    /**
     * Indicate that the application is rejected.
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'rejected',
        ]);
    }
}
