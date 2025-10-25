<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PriceAlert>
 */
class PriceAlertFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'make' => fake()->randomElement(['Toyota', 'Honda', 'Ford', 'BMW']),
            'model' => fake()->randomElement(['Camry', 'Accord', 'F-150', 'X5']),
            'year_from' => 2020,
            'year_to' => 2024,
            'target_price' => fake()->numberBetween(20000, 40000),
            'condition' => fake()->randomElement(['below', 'above']),
            'active' => true,
        ];
    }
}