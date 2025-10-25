<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // General settings
            ['key' => 'app.name', 'value' => 'AUTOSITE', 'type' => 'string', 'group' => 'general', 'is_public' => true, 'description' => 'Application name'],
            ['key' => 'app.url', 'value' => 'http://localhost:3000', 'type' => 'string', 'group' => 'general', 'is_public' => true, 'description' => 'Application URL'],
            ['key' => 'app.locale', 'value' => 'en', 'type' => 'string', 'group' => 'general', 'is_public' => true, 'description' => 'Default locale'],
            ['key' => 'app.timezone', 'value' => 'UTC', 'type' => 'string', 'group' => 'general', 'is_public' => true, 'description' => 'Application timezone'],
            
            // Currency settings
            ['key' => 'currency.default', 'value' => 'EUR', 'type' => 'string', 'group' => 'currency', 'is_public' => true, 'description' => 'Default currency'],
            ['key' => 'currency.supported', 'value' => json_encode(['EUR', 'USD', 'GBP', 'RON']), 'type' => 'json', 'group' => 'currency', 'is_public' => true, 'description' => 'Supported currencies'],
            
            // SEO settings
            ['key' => 'seo.meta_title', 'value' => 'AUTOSITE - Premium Automotive Marketplace', 'type' => 'string', 'group' => 'seo', 'is_public' => true, 'description' => 'Meta title'],
            ['key' => 'seo.meta_description', 'value' => 'Find your dream car on AUTOSITE - Europe\'s leading automotive marketplace with thousands of vehicles from verified dealers', 'type' => 'string', 'group' => 'seo', 'is_public' => true, 'description' => 'Meta description'],
            
            // Filter options
            ['key' => 'filters.makes', 'value' => json_encode([
                'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Ford', 'Toyota', 'Honda', 'Nissan', 
                'Mazda', 'Hyundai', 'Kia', 'Renault', 'Peugeot', 'Citroën', 'Opel', 'Fiat', 
                'Alfa Romeo', 'Volvo', 'Škoda', 'SEAT', 'Porsche', 'Ferrari', 'Lamborghini', 
                'Jaguar', 'Land Rover', 'Jeep', 'Chevrolet', 'Tesla', 'Lexus', 'Infiniti'
            ]), 'type' => 'json', 'group' => 'general', 'is_public' => true, 'description' => 'Available vehicle makes'],
            
            ['key' => 'filters.body_types', 'value' => json_encode([
                'sedan', 'suv', 'coupe', 'convertible', 'wagon', 'van', 'truck', 'hatchback', 'other'
            ]), 'type' => 'json', 'group' => 'general', 'is_public' => true, 'description' => 'Available body types'],
            
            ['key' => 'filters.fuel_types', 'value' => json_encode([
                'petrol', 'diesel', 'electric', 'hybrid', 'plugin_hybrid', 'other'
            ]), 'type' => 'json', 'group' => 'general', 'is_public' => true, 'description' => 'Available fuel types'],
            
            ['key' => 'filters.transmissions', 'value' => json_encode([
                'manual', 'automatic', 'semi_automatic'
            ]), 'type' => 'json', 'group' => 'general', 'is_public' => true, 'description' => 'Available transmission types'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
