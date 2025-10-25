<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SavedSearch>
 */
class SavedSearchFactory extends Factory
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
            'name' => fake()->words(3, true),
            'criteria' => [
                'make' => fake()->randomElement(['Toyota', 'Honda', 'Ford', 'BMW']),
                'year_from' => 2020,
                'year_to' => 2024,
                'price_min' => 15000,
                'price_max' => 35000,
            ],
            'notify' => fake()->boolean(),
            'last_notified_at' => null,
        ];
    }
}
