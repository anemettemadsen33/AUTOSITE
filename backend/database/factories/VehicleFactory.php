<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
        $makes = ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Toyota', 'Honda', 'Ford'];
        $models = ['320d', 'X5', 'M3', 'C-Class', 'E-Class', 'A4', 'Q7', 'Golf', 'Passat', 'Camry', 'Civic', 'Focus'];
        $fuels = ['petrol', 'diesel', 'electric', 'hybrid'];
        $transmissions = ['manual', 'automatic', 'semi_automatic'];
        $bodyTypes = ['sedan', 'suv', 'coupe', 'hatchback', 'wagon'];
        $conditions = ['new', 'used', 'certified'];
        
        $make = $this->faker->randomElement($makes);
        $model = $this->faker->randomElement($models);
        $title = $make . ' ' . $model;
        
        return [
            'user_id' => \App\Models\User::factory(),
            'title' => ['en' => $title],
            'description' => ['en' => $this->faker->paragraph()],
            'slug' => \Illuminate\Support\Str::slug($title . '-' . $this->faker->unique()->numberBetween(1000, 9999)),
            'make' => $make,
            'model' => $model,
            'year' => $this->faker->numberBetween(2018, 2024),
            'price' => $this->faker->numberBetween(15000, 100000),
            'currency' => 'EUR',
            'mileage' => $this->faker->numberBetween(0, 200000),
            'fuel' => $this->faker->randomElement($fuels),
            'transmission' => $this->faker->randomElement($transmissions),
            'body_type' => $this->faker->randomElement($bodyTypes),
            'doors' => $this->faker->randomElement([2, 3, 4, 5]),
            'seats' => $this->faker->randomElement([2, 4, 5, 7]),
            'color' => $this->faker->safeColorName(),
            'condition' => $this->faker->randomElement($conditions),
            'vin' => strtoupper($this->faker->bothify('??#############')),
            'location_country' => 'DE',
            'location_city' => $this->faker->city(),
            'is_featured' => $this->faker->boolean(20),
            'views_count' => $this->faker->numberBetween(0, 1000),
            'published_at' => now(),
        ];
    }
}
