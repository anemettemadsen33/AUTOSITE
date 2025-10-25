<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehicle;
use App\Models\Dealer;

class VehicleTestSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing
        Vehicle::query()->delete();
        
        $dealer = Dealer::first();
        
        if (!$dealer) {
            $this->command->error('No dealer found. Run DealerSeeder first.');
            return;
        }

        $vehicles = [
            // Premium BMW X5
            [
                'user_id' => $dealer->user_id,
                'user_id' => $dealer->user_id,
                'dealer_id' => $dealer->id,
                'make' => 'BMW',
                'model' => 'X5',
                'year' => 2023,
                'price' => 75900,
                'currency' => 'EUR',
                'mileage' => 12500,
                'fuel' => 'diesel',
                'transmission' => 'automatic',
                'body_type' => 'suv',
                'condition' => 'used',
                'exterior_color' => 'Black',
                'interior_color' => 'Beige',
                'doors' => 5,
                'seats' => 5,
                'power_hp' => 340,
                'engine_size' => 3.0,
                'vin' => 'WBAKR8C50JB123456',
                'location_city' => 'München',
                'location_country' => 'Germany',
                'title' => 'BMW X5 xDrive40d M Sport',
                'description' => 'Premium SUV in perfect condition. Full service history, panoramic roof, HUD, adaptive cruise control, Harman/Kardon sound, leather seats.',
                'is_featured' => true,
                'views_count' => 1234
            ],
            
            // Mercedes E-Class
            [
                'user_id' => $dealer->user_id,
                'dealer_id' => $dealer->id,
                'make' => 'Mercedes-Benz',
                'model' => 'E-Class',
                'year' => 2022,
                'price' => 58900,
                'currency' => 'EUR',
                'mileage' => 28000,
                'fuel' => 'hybrid',
                'transmission' => 'automatic',
                'body_type' => 'sedan',
                'condition' => 'used',
                'exterior_color' => 'Silver',
                'interior_color' => 'Black',
                'doors' => 4,
                'seats' => 5,
                'power_hp' => 320,
                'engine_size' => 2.0,
                'vin' => 'WDD2130461A123456',
                'location_city' => 'Stuttgart',
                'location_country' => 'Germany',
                'title' => 'Mercedes-Benz E 300e AMG Line',
                'description' => 'Hybrid luxury sedan. MBUX infotainment, Burmester sound, 360° camera, adaptive LED lights, memory seats.',
                'is_featured' => true,
                
                'views_count' => 892
            ],
            
            // Audi Q7
            [
                'user_id' => $dealer->user_id,
                'dealer_id' => $dealer->id,
                'make' => 'Audi',
                'model' => 'Q7',
                'year' => 2023,
                'price' => 82500,
                'currency' => 'EUR',
                'mileage' => 8900,
                'fuel' => 'diesel',
                'transmission' => 'automatic',
                'body_type' => 'suv',
                'condition' => 'used',
                'exterior_color' => 'Gray',
                'interior_color' => 'Brown',
                'doors' => 5,
                'seats' => 7,
                'power_hp' => 286,
                'engine_size' => 3.0,
                'vin' => 'WAUZZZ4M3GD123456',
                'location_city' => 'Berlin',
                'location_country' => 'Germany',
                'title' => 'Audi Q7 50 TDI quattro S line',
                'description' => '7-seater luxury SUV. Matrix LED, virtual cockpit, Bang & Olufsen, air suspension, panoramic roof, MMI Navigation.',
                'is_featured' => true,
                
                'views_count' => 1567
            ],
            
            // Porsche 911
            [
                'user_id' => $dealer->user_id,
                'dealer_id' => $dealer->id,
                'make' => 'Porsche',
                'model' => '911',
                'year' => 2024,
                'price' => 145000,
                'currency' => 'EUR',
                'mileage' => 2100,
                'fuel' => 'petrol',
                'transmission' => 'automatic',
                'body_type' => 'coupe',
                'condition' => 'used',
                'exterior_color' => 'Red',
                'interior_color' => 'Black',
                'doors' => 2,
                'seats' => 4,
                'power_hp' => 480,
                'engine_size' => 3.0,
                'vin' => 'WP0AA2A92KS123456',
                'location_city' => 'Frankfurt',
                'location_country' => 'Germany',
                'title' => 'Porsche 911 Carrera S',
                'description' => 'Sports car icon. PDK transmission, Sport Chrono, PASM, Bose surround sound, sport exhaust, premium leather.',
                'is_featured' => true,
                
                'views_count' => 2341
            ],
            
            // Tesla Model 3
            [
                'user_id' => $dealer->user_id,
                'dealer_id' => $dealer->id,
                'make' => 'Tesla',
                'model' => 'Model 3',
                'year' => 2023,
                'price' => 42900,
                'currency' => 'EUR',
                'mileage' => 15000,
                'fuel' => 'electric',
                'transmission' => 'automatic',
                'body_type' => 'sedan',
                'condition' => 'used',
                'exterior_color' => 'White',
                'interior_color' => 'White',
                'doors' => 4,
                'seats' => 5,
                'power_hp' => 462,
                'engine_size' => 0,
                'vin' => '5YJ3E1EB5KF123456',
                'location_city' => 'Hamburg',
                'location_country' => 'Germany',
                'title' => 'Tesla Model 3 Performance',
                'description' => 'Electric performance sedan. Autopilot, premium audio, glass roof, heated seats, 19-inch wheels, white interior.',
                'is_featured' => true,
                
                'views_count' => 1876
            ],
            
            // VW Golf
            [
                'user_id' => $dealer->user_id,
                'dealer_id' => $dealer->id,
                'make' => 'Volkswagen',
                'model' => 'Golf',
                'year' => 2022,
                'price' => 28500,
                'currency' => 'EUR',
                'mileage' => 22000,
                'fuel' => 'petrol',
                'transmission' => 'manual',
                'body_type' => 'hatchback',
                'condition' => 'used',
                'exterior_color' => 'Blue',
                'interior_color' => 'Black',
                'doors' => 5,
                'seats' => 5,
                'power_hp' => 150,
                'engine_size' => 1.5,
                'vin' => 'WVWZZZ1KZMW123456',
                'location_city' => 'Köln',
                'location_country' => 'Germany',
                'title' => 'Volkswagen Golf 1.5 TSI Life',
                'description' => 'Compact hatchback, perfect daily driver. Digital cockpit, LED lights, parking sensors, Apple CarPlay.',
                'is_featured' => false,
                
                'views_count' => 543
            ],
            
            // Ford Mustang
            [
                'user_id' => $dealer->user_id,
                'dealer_id' => $dealer->id,
                'make' => 'Ford',
                'model' => 'Mustang',
                'year' => 2023,
                'price' => 67800,
                'currency' => 'EUR',
                'mileage' => 5400,
                'fuel' => 'petrol',
                'transmission' => 'automatic',
                'body_type' => 'coupe',
                'condition' => 'used',
                'exterior_color' => 'Yellow',
                'interior_color' => 'Black',
                'doors' => 2,
                'seats' => 4,
                'power_hp' => 460,
                'engine_size' => 5.0,
                'vin' => '1FA6P8CF3K5123456',
                'location_city' => 'Düsseldorf',
                'location_country' => 'Germany',
                'title' => 'Ford Mustang GT 5.0 V8',
                'description' => 'American muscle car. V8 engine, performance pack, Recaro seats, premium sound, active exhaust.',
                'is_featured' => true,
                
                'views_count' => 987
            ],
            
            // Toyota RAV4
            [
                'user_id' => $dealer->user_id,
                'dealer_id' => $dealer->id,
                'make' => 'Toyota',
                'model' => 'RAV4',
                'year' => 2023,
                'price' => 38900,
                'currency' => 'EUR',
                'mileage' => 18000,
                'fuel' => 'hybrid',
                'transmission' => 'automatic',
                'body_type' => 'suv',
                'condition' => 'used',
                'exterior_color' => 'White',
                'interior_color' => 'Gray',
                'doors' => 5,
                'seats' => 5,
                'power_hp' => 222,
                'engine_size' => 2.5,
                'vin' => 'JTMB3RFV1KD123456',
                'location_city' => 'Dresden',
                'location_country' => 'Germany',
                'title' => 'Toyota RAV4 Hybrid AWD',
                'description' => 'Reliable hybrid SUV. AWD system, Toyota Safety Sense, JBL audio, heated seats, adaptive cruise.',
                'is_featured' => false,
                
                'views_count' => 654
            ],
            
            // Range Rover Sport
            [
                'user_id' => $dealer->user_id,
                'dealer_id' => $dealer->id,
                'make' => 'Land Rover',
                'model' => 'Range Rover Sport',
                'year' => 2023,
                'price' => 95000,
                'currency' => 'EUR',
                'mileage' => 7800,
                'fuel' => 'diesel',
                'transmission' => 'automatic',
                'body_type' => 'suv',
                'condition' => 'used',
                'exterior_color' => 'Blue',
                'interior_color' => 'Tan',
                'doors' => 5,
                'seats' => 5,
                'power_hp' => 350,
                'engine_size' => 3.0,
                'vin' => 'SALWA2FK5KA123456',
                'location_city' => 'London',
                'location_country' => 'UK',
                'title' => 'Range Rover Sport HSE Dynamic',
                'description' => 'Luxury performance SUV. Air suspension, Meridian audio, heated/cooled seats, 360° cameras, panoramic roof.',
                'is_featured' => true,
                
                'views_count' => 1432
            ],
            
            // Dacia Duster - Budget option
            [
                'user_id' => $dealer->user_id,
                'dealer_id' => $dealer->id,
                'make' => 'Dacia',
                'model' => 'Duster',
                'year' => 2022,
                'price' => 18500,
                'currency' => 'EUR',
                'mileage' => 35000,
                'fuel' => 'petrol',
                'transmission' => 'manual',
                'body_type' => 'suv',
                'condition' => 'used',
                'exterior_color' => 'Orange',
                'interior_color' => 'Black',
                'doors' => 5,
                'seats' => 5,
                'power_hp' => 130,
                'engine_size' => 1.3,
                'vin' => 'UU1HSRFH5KK123456',
                'location_city' => 'București',
                'location_country' => 'Romania',
                'title' => 'Dacia Duster Prestige 4WD',
                'description' => 'Affordable 4WD SUV. Perfect for adventures. Roof rails, cruise control, MediaNav, climate control.',
                'is_featured' => false,
                
                'views_count' => 432
            ],
        ];

        foreach ($vehicles as $vehicleData) {
            Vehicle::create($vehicleData);
        }

        $this->command->info('Created ' . count($vehicles) . ' test vehicles successfully!');
    }
}
