<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $makes = ['BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Toyota', 'Ford', 'Honda', 'Nissan'];
        $models = ['X5', 'C-Class', 'A4', 'Golf', 'Camry', 'Focus', 'Civic', 'Altima'];
        $fuels = ['petrol', 'diesel', 'electric', 'hybrid', 'plugin_hybrid'];
        $transmissions = ['manual', 'automatic', 'semi_automatic'];
        $bodyTypes = ['sedan', 'suv', 'coupe', 'convertible', 'wagon', 'van', 'truck', 'hatchback'];
        $conditions = ['new', 'used', 'certified'];
        $colors = ['Black', 'White', 'Silver', 'Blue', 'Red', 'Gray', 'Green'];
        
        $make = fake()->randomElement($makes);
        $model = fake()->randomElement($models);
        $year = fake()->numberBetween(2015, 2024);
        
        return [
            'user_id' => User::factory(),
            'slug' => Str::slug($make . ' ' . $model . ' ' . $year . ' ' . Str::random(8)),
            'vin' => strtoupper(Str::random(17)),
            'make' => $make,
            'model' => $model,
            'year' => $year,
            'category' => fake()->randomElement(['car', 'truck', 'motorcycle', 'van']),
            'price' => fake()->randomFloat(2, 5000, 100000),
            'currency' => 'EUR',
            'mileage' => fake()->numberBetween(0, 200000),
            'fuel' => fake()->randomElement($fuels),
            'transmission' => fake()->randomElement($transmissions),
            'body_type' => fake()->randomElement($bodyTypes),
            'power_hp' => fake()->numberBetween(80, 500),
            'doors' => fake()->randomElement([2, 3, 4, 5]),
            'seats' => fake()->randomElement([2, 4, 5, 7]),
            'engine_size' => fake()->randomFloat(1, 1.0, 6.0),
            'exterior_color' => fake()->randomElement($colors),
            'interior_color' => fake()->randomElement($colors),
            'color' => fake()->randomElement($colors),
            'condition' => fake()->randomElement($conditions),
            'title' => [
                'en' => $make . ' ' . $model . ' ' . $year,
                'de' => $make . ' ' . $model . ' ' . $year,
            ],
            'description' => [
                'en' => fake()->paragraph(3),
                'de' => fake()->paragraph(3),
            ],
            'features' => fake()->randomElements(
                ['ABS', 'Air Conditioning', 'Alloy Wheels', 'Bluetooth', 'Cruise Control', 
                 'GPS Navigation', 'Leather Seats', 'Parking Sensors', 'Sunroof', 'USB Port'],
                fake()->numberBetween(3, 8)
            ),
            'location_country' => fake()->randomElement(['DE', 'FR', 'IT', 'ES', 'RO', 'PL']),
            'location_city' => fake()->city(),
            'location' => fake()->address(),
            'is_featured' => fake()->boolean(20),
            'is_published' => true,
            'published_at' => now(),
            'views_count' => fake()->numberBetween(0, 1000),
        ];
    }

    /**
     * Indicate that the vehicle is unpublished.
     */
    public function unpublished(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_published' => false,
            'published_at' => null,
        ]);
    }

    /**
     * Indicate that the vehicle is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }
}
