<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['pending', 'confirmed', 'processing', 'completed', 'cancelled'];
        $paymentMethods = ['credit_card', 'bank_transfer', 'cash', 'financing'];
        
        return [
            'user_id' => User::factory(),
            'vehicle_id' => Vehicle::factory(),
            'order_number' => 'ORD-' . strtoupper($this->faker->bothify('???-####')),
            'status' => $this->faker->randomElement($statuses),
            'total_amount' => $this->faker->numberBetween(15000, 100000),
            'currency' => 'EUR',
            'payment_method' => $this->faker->randomElement($paymentMethods),
            'payment_status' => $this->faker->randomElement(['pending', 'paid', 'failed', 'refunded']),
            'notes' => $this->faker->optional(0.3)->paragraph(),
            'buyer_name' => $this->faker->name(),
            'buyer_email' => $this->faker->safeEmail(),
            'buyer_phone' => $this->faker->phoneNumber(),
            'delivery_address' => $this->faker->optional(0.7)->address(),
        ];
    }

    /**
     * Indicate that the order is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);
    }

    /**
     * Indicate that the order is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'payment_status' => 'paid',
        ]);
    }

    /**
     * Indicate that the order is cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelled',
            'payment_status' => 'refunded',
        ]);
    }
}
