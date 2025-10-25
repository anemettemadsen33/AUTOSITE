<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$dealer = App\Models\Dealer::first();
$user = $dealer->user;

// Delete old test vehicles
App\Models\Vehicle::where('dealer_id', $dealer->id)->delete();

echo "Creating premium test vehicles...\n";

// BMW X5
App\Models\Vehicle::factory()->create([
    'user_id' => $user->id,
    'dealer_id' => $dealer->id,
    'make' => 'BMW',
    'model' => 'X5',
    'year' => 2023,
    'price' => 75900,
    'mileage' => 12500,
    'fuel' => 'diesel',
    'transmission' => 'automatic',
    'body_type' => 'suv',
    'power_hp' => 340,
    'doors' => 5,
    'seats' => 5,
    'title' => 'BMW X5 xDrive40d M Sport',
    'description' => 'Premium SUV in perfect condition. Full service history, panoramic roof, HUD, adaptive cruise control, Harman/Kardon sound, leather seats.',
    'is_featured' => true,
    'location_city' => 'München',
    'location_country' => 'Germany',
]);

// Mercedes E-Class
App\Models\Vehicle::factory()->create([
    'user_id' => $user->id,
    'dealer_id' => $dealer->id,
    'make' => 'Mercedes-Benz',
    'model' => 'E-Class',
    'year' => 2022,
    'price' => 58900,
    'mileage' => 28000,
    'fuel' => 'hybrid',
    'transmission' => 'automatic',
    'body_type' => 'sedan',
    'power_hp' => 320,
    'doors' => 4,
    'seats' => 5,
    'title' => 'Mercedes-Benz E 300e AMG Line',
    'description' => 'Hybrid luxury sedan. MBUX infotainment, Burmester sound, 360° camera, adaptive LED lights, memory seats.',
    'is_featured' => true,
    'location_city' => 'Stuttgart',
    'location_country' => 'Germany',
]);

// Audi Q7
App\Models\Vehicle::factory()->create([
    'user_id' => $user->id,
    'dealer_id' => $dealer->id,
    'make' => 'Audi',
    'model' => 'Q7',
    'year' => 2023,
    'price' => 82500,
    'mileage' => 8900,
    'fuel' => 'diesel',
    'transmission' => 'automatic',
    'body_type' => 'suv',
    'power_hp' => 286,
    'doors' => 5,
    'seats' => 7,
    'title' => 'Audi Q7 50 TDI quattro S line',
    'description' => '7-seater luxury SUV. Matrix LED, virtual cockpit, Bang & Olufsen, air suspension, panoramic roof, MMI Navigation.',
    'is_featured' => true,
    'location_city' => 'Berlin',
    'location_country' => 'Germany',
]);

// Porsche 911
App\Models\Vehicle::factory()->create([
    'user_id' => $user->id,
    'dealer_id' => $dealer->id,
    'make' => 'Porsche',
    'model' => '911',
    'year' => 2024,
    'price' => 145000,
    'mileage' => 2100,
    'fuel' => 'petrol',
    'transmission' => 'automatic',
    'body_type' => 'coupe',
    'power_hp' => 480,
    'doors' => 2,
    'seats' => 4,
    'title' => 'Porsche 911 Carrera S',
    'description' => 'Sports car icon. PDK transmission, Sport Chrono, PASM, Bose surround sound, sport exhaust, premium leather.',
    'is_featured' => true,
    'location_city' => 'Frankfurt',
    'location_country' => 'Germany',
]);

// Tesla Model 3
App\Models\Vehicle::factory()->create([
    'user_id' => $user->id,
    'dealer_id' => $dealer->id,
    'make' => 'Tesla',
    'model' => 'Model 3',
    'year' => 2023,
    'price' => 42900,
    'mileage' => 15000,
    'fuel' => 'electric',
    'transmission' => 'automatic',
    'body_type' => 'sedan',
    'power_hp' => 462,
    'doors' => 4,
    'seats' => 5,
    'title' => 'Tesla Model 3 Performance',
    'description' => 'Electric performance sedan. Autopilot, premium audio, glass roof, heated seats, 19-inch wheels, white interior.',
    'is_featured' => true,
    'location_city' => 'Hamburg',
    'location_country' => 'Germany',
]);

// VW Golf
App\Models\Vehicle::factory()->create([
    'user_id' => $user->id,
    'dealer_id' => $dealer->id,
    'make' => 'Volkswagen',
    'model' => 'Golf',
    'year' => 2022,
    'price' => 28500,
    'mileage' => 22000,
    'fuel' => 'petrol',
    'transmission' => 'manual',
    'body_type' => 'hatchback',
    'power_hp' => 150,
    'doors' => 5,
    'seats' => 5,
    'title' => 'Volkswagen Golf 1.5 TSI Life',
    'description' => 'Compact hatchback, perfect daily driver. Digital cockpit, LED lights, parking sensors, Apple CarPlay.',
    'is_featured' => false,
    'location_city' => 'Köln',
    'location_country' => 'Germany',
]);

// Ford Mustang
App\Models\Vehicle::factory()->create([
    'user_id' => $user->id,
    'dealer_id' => $dealer->id,
    'make' => 'Ford',
    'model' => 'Mustang',
    'year' => 2023,
    'price' => 67800,
    'mileage' => 5400,
    'fuel' => 'petrol',
    'transmission' => 'automatic',
    'body_type' => 'coupe',
    'power_hp' => 460,
    'doors' => 2,
    'seats' => 4,
    'title' => 'Ford Mustang GT 5.0 V8',
    'description' => 'American muscle car. V8 engine, performance pack, Recaro seats, premium sound, active exhaust.',
    'is_featured' => true,
    'location_city' => 'Düsseldorf',
    'location_country' => 'Germany',
]);

// Toyota RAV4
App\Models\Vehicle::factory()->create([
    'user_id' => $user->id,
    'dealer_id' => $dealer->id,
    'make' => 'Toyota',
    'model' => 'RAV4',
    'year' => 2023,
    'price' => 38900,
    'mileage' => 18000,
    'fuel' => 'hybrid',
    'transmission' => 'automatic',
    'body_type' => 'suv',
    'power_hp' => 222,
    'doors' => 5,
    'seats' => 5,
    'title' => 'Toyota RAV4 Hybrid AWD',
    'description' => 'Reliable hybrid SUV. AWD system, Toyota Safety Sense, JBL audio, heated seats, adaptive cruise.',
    'is_featured' => false,
    'location_city' => 'Dresden',
    'location_country' => 'Germany',
]);

// Range Rover Sport
App\Models\Vehicle::factory()->create([
    'user_id' => $user->id,
    'dealer_id' => $dealer->id,
    'make' => 'Land Rover',
    'model' => 'Range Rover Sport',
    'year' => 2023,
    'price' => 95000,
    'mileage' => 7800,
    'fuel' => 'diesel',
    'transmission' => 'automatic',
    'body_type' => 'suv',
    'power_hp' => 350,
    'doors' => 5,
    'seats' => 5,
    'title' => 'Range Rover Sport HSE Dynamic',
    'description' => 'Luxury performance SUV. Air suspension, Meridian audio, heated/cooled seats, 360° cameras, panoramic roof.',
    'is_featured' => true,
    'location_city' => 'London',
    'location_country' => 'UK',
]);

// Dacia Duster
App\Models\Vehicle::factory()->create([
    'user_id' => $user->id,
    'dealer_id' => $dealer->id,
    'make' => 'Dacia',
    'model' => 'Duster',
    'year' => 2022,
    'price' => 18500,
    'mileage' => 35000,
    'fuel' => 'petrol',
    'transmission' => 'manual',
    'body_type' => 'suv',
    'power_hp' => 130,
    'doors' => 5,
    'seats' => 5,
    'title' => 'Dacia Duster Prestige 4WD',
    'description' => 'Affordable 4WD SUV. Perfect for adventures. Roof rails, cruise control, MediaNav, climate control.',
    'is_featured' => false,
    'location_city' => 'București',
    'location_country' => 'Romania',
]);

echo "✅ Created 10 premium test vehicles!\n";
echo "🚗 BMW X5, Mercedes E-Class, Audi Q7, Porsche 911, Tesla Model 3\n";
echo "🚙 VW Golf, Ford Mustang, Toyota RAV4, Range Rover, Dacia Duster\n";
