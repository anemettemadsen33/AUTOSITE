<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Setting;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed a demo user
        if (! User::where('email', 'admin@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Admin',
                'email' => 'admin@example.com',
                // In Laravel 11, factory will set password to 'password' by default hashed
            ]);
        }

        // Seed basic public settings
        $defaults = [
            'site_name' => ['en' => 'AutoMarket', 'ro' => 'AutoMarket'],
            'default_currency' => 'EUR',
            'supported_currencies' => ['EUR','USD','GBP','RON','PLN','HUF'],
            'supported_locales' => ['en','ro','de','fr','it','es','pl','hu'],
            'frontend_url' => env('FRONTEND_URL', 'http://localhost:3000'),
            'mail_from_name' => 'AutoMarket',
            'contact_email' => 'contact@example.com',
        ];

        foreach ($defaults as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
