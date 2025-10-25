<?php

namespace Database\Seeders;

use App\Models\Dealer;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dealers = Dealer::with('user')->get();

        if ($dealers->isEmpty()) {
            return;
        }

        $vehicles = [
            // BMW vehicles
            ['make' => 'BMW', 'model' => '320d', 'year' => 2023, 'price' => 45000, 'mileage' => 15000, 'fuel' => 'diesel', 'transmission' => 'automatic', 'body_type' => 'sedan', 'power_hp' => 190, 'condition' => 'used'],
            ['make' => 'BMW', 'model' => 'X5', 'year' => 2024, 'price' => 75000, 'mileage' => 5000, 'fuel' => 'diesel', 'transmission' => 'automatic', 'body_type' => 'suv', 'power_hp' => 265, 'condition' => 'certified'],
            ['make' => 'BMW', 'model' => 'M3', 'year' => 2023, 'price' => 85000, 'mileage' => 8000, 'fuel' => 'petrol', 'transmission' => 'automatic', 'body_type' => 'sedan', 'power_hp' => 510, 'condition' => 'used'],

            // Mercedes-Benz vehicles
            ['make' => 'Mercedes-Benz', 'model' => 'C-Class', 'year' => 2023, 'price' => 48000, 'mileage' => 12000, 'fuel' => 'diesel', 'transmission' => 'automatic', 'body_type' => 'sedan', 'power_hp' => 200, 'condition' => 'used'],
            ['make' => 'Mercedes-Benz', 'model' => 'GLE', 'year' => 2024, 'price' => 82000, 'mileage' => 3000, 'fuel' => 'hybrid', 'transmission' => 'automatic', 'body_type' => 'suv', 'power_hp' => 367, 'condition' => 'certified'],
            ['make' => 'Mercedes-Benz', 'model' => 'E-Class', 'year' => 2023, 'price' => 58000, 'mileage' => 18000, 'fuel' => 'diesel', 'transmission' => 'automatic', 'body_type' => 'sedan', 'power_hp' => 220, 'condition' => 'used'],

            // Audi vehicles
            ['make' => 'Audi', 'model' => 'A4', 'year' => 2023, 'price' => 42000, 'mileage' => 20000, 'fuel' => 'diesel', 'transmission' => 'automatic', 'body_type' => 'sedan', 'power_hp' => 190, 'condition' => 'used'],
            ['make' => 'Audi', 'model' => 'Q7', 'year' => 2024, 'price' => 78000, 'mileage' => 2000, 'fuel' => 'diesel', 'transmission' => 'automatic', 'body_type' => 'suv', 'power_hp' => 286, 'condition' => 'certified'],
            ['make' => 'Audi', 'model' => 'RS6', 'year' => 2023, 'price' => 125000, 'mileage' => 5000, 'fuel' => 'petrol', 'transmission' => 'automatic', 'body_type' => 'wagon', 'power_hp' => 600, 'condition' => 'used'],

            // Volkswagen vehicles
            ['make' => 'Volkswagen', 'model' => 'Golf', 'year' => 2023, 'price' => 28000, 'mileage' => 25000, 'fuel' => 'petrol', 'transmission' => 'manual', 'body_type' => 'hatchback', 'power_hp' => 150, 'condition' => 'used'],
            ['make' => 'Volkswagen', 'model' => 'Tiguan', 'year' => 2024, 'price' => 38000, 'mileage' => 8000, 'fuel' => 'diesel', 'transmission' => 'automatic', 'body_type' => 'suv', 'power_hp' => 150, 'condition' => 'used'],
            ['make' => 'Volkswagen', 'model' => 'Passat', 'year' => 2023, 'price' => 35000, 'mileage' => 30000, 'fuel' => 'diesel', 'transmission' => 'automatic', 'body_type' => 'sedan', 'power_hp' => 150, 'condition' => 'used'],

            // Tesla vehicles
            ['make' => 'Tesla', 'model' => 'Model 3', 'year' => 2024, 'price' => 48000, 'mileage' => 5000, 'fuel' => 'electric', 'transmission' => 'automatic', 'body_type' => 'sedan', 'power_hp' => 350, 'condition' => 'used'],
            ['make' => 'Tesla', 'model' => 'Model Y', 'year' => 2024, 'price' => 58000, 'mileage' => 3000, 'fuel' => 'electric', 'transmission' => 'automatic', 'body_type' => 'suv', 'power_hp' => 384, 'condition' => 'certified'],
            ['make' => 'Tesla', 'model' => 'Model S', 'year' => 2023, 'price' => 92000, 'mileage' => 12000, 'fuel' => 'electric', 'transmission' => 'automatic', 'body_type' => 'sedan', 'power_hp' => 670, 'condition' => 'used'],

            // Toyota vehicles
            ['make' => 'Toyota', 'model' => 'RAV4', 'year' => 2023, 'price' => 32000, 'mileage' => 18000, 'fuel' => 'hybrid', 'transmission' => 'automatic', 'body_type' => 'suv', 'power_hp' => 219, 'condition' => 'used'],
            ['make' => 'Toyota', 'model' => 'Corolla', 'year' => 2024, 'price' => 26000, 'mileage' => 5000, 'fuel' => 'hybrid', 'transmission' => 'automatic', 'body_type' => 'sedan', 'power_hp' => 140, 'condition' => 'certified'],
            ['make' => 'Toyota', 'model' => 'Land Cruiser', 'year' => 2023, 'price' => 85000, 'mileage' => 15000, 'fuel' => 'diesel', 'transmission' => 'automatic', 'body_type' => 'suv', 'power_hp' => 304, 'condition' => 'used'],

            // Porsche vehicles
            ['make' => 'Porsche', 'model' => 'Cayenne', 'year' => 2024, 'price' => 98000, 'mileage' => 2000, 'fuel' => 'petrol', 'transmission' => 'automatic', 'body_type' => 'suv', 'power_hp' => 340, 'condition' => 'certified'],
            ['make' => 'Porsche', 'model' => '911', 'year' => 2023, 'price' => 135000, 'mileage' => 8000, 'fuel' => 'petrol', 'transmission' => 'automatic', 'body_type' => 'coupe', 'power_hp' => 450, 'condition' => 'used'],
            ['make' => 'Porsche', 'model' => 'Macan', 'year' => 2024, 'price' => 75000, 'mileage' => 5000, 'fuel' => 'petrol', 'transmission' => 'automatic', 'body_type' => 'suv', 'power_hp' => 265, 'condition' => 'certified'],
        ];

        $features = ['ABS', 'ESP', 'Airbags', 'Air Conditioning', 'Bluetooth', 'LED Headlights'];
        $colors = ['Black', 'White', 'Silver', 'Blue', 'Red', 'Gray'];
        $cities = ['Munich', 'Berlin', 'London', 'Paris', 'Madrid', 'Rome', 'Bucharest', 'Vienna'];
        $countries = ['DE', 'GB', 'FR', 'ES', 'IT', 'RO', 'AT'];

        foreach ($vehicles as $index => $vehicleData) {
            $dealer = $dealers->random();

            $slug = Str::slug($vehicleData['make'].' '.$vehicleData['model'].' '.$vehicleData['year'].' '.uniqid());

            Vehicle::create([
                'user_id' => $dealer->user_id,
                'dealer_id' => $dealer->id,
                'slug' => $slug,
                'make' => $vehicleData['make'],
                'model' => $vehicleData['model'],
                'year' => $vehicleData['year'],
                'price' => $vehicleData['price'],
                'currency' => 'EUR',
                'mileage' => $vehicleData['mileage'],
                'fuel' => $vehicleData['fuel'],
                'transmission' => $vehicleData['transmission'],
                'body_type' => $vehicleData['body_type'],
                'power_hp' => $vehicleData['power_hp'],
                'condition' => $vehicleData['condition'],
                'doors' => rand(2, 5),
                'seats' => rand(4, 7),
                'exterior_color' => $colors[array_rand($colors)],
                'title' => [
                    'en' => $vehicleData['make'].' '.$vehicleData['model'].' '.$vehicleData['year'],
                    'de' => $vehicleData['make'].' '.$vehicleData['model'].' '.$vehicleData['year'],
                    'ro' => $vehicleData['make'].' '.$vehicleData['model'].' '.$vehicleData['year'],
                ],
                'description' => [
                    'en' => 'Excellent condition '.$vehicleData['make'].' '.$vehicleData['model'].' with low mileage.',
                    'de' => 'Ausgezeichneter Zustand '.$vehicleData['make'].' '.$vehicleData['model'].' mit geringer Laufleistung.',
                    'ro' => 'Stare excelentă '.$vehicleData['make'].' '.$vehicleData['model'].' cu kilometraj redus.',
                ],
                'features' => array_slice($features, 0, rand(3, 6)),
                'location_city' => $cities[array_rand($cities)],
                'location_country' => $countries[array_rand($countries)],
                'is_published' => true,
                'is_featured' => $index < 5, // First 5 are featured
                'published_at' => now(),
            ]);
        }
    }
}
