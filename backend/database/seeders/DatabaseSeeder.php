<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class, // First - create roles & permissions
            SettingSeeder::class,
            ExchangeRateSeeder::class,
            FeatureSeeder::class,
            UserSeeder::class,
            DealerSeeder::class,
            VehicleSeeder::class,
        ]);
    }
}
