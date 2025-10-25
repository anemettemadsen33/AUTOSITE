<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dealer>
 */
class DealerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $companyName = $this->faker->company();
        
        return [
            'user_id' => \App\Models\User::factory(),
            'company_name' => $companyName,
            'description' => [
                'en' => $this->faker->paragraph(),
                'de' => 'Deutsche Beschreibung',
            ],
            'vat' => $this->faker->numerify('DE###########'),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->streetAddress(),
            'city' => $this->faker->city(),
            'state' => $this->faker->state(),
            'country' => 'DE',
            'postal_code' => $this->faker->postcode(),
            'website' => $this->faker->optional()->url(),
            'logo' => null,
            'verified' => true,
            'verification_date' => now(),
        ];
    }
}
