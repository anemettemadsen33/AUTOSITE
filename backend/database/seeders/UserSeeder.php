<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::updateOrCreate(
            ['email' => 'admin@autosite.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'is_active' => true,
            ]
        );

        // Create dealer users
        $dealerEmails = [
            'dealer1@autosite.com' => 'Premium Motors',
            'dealer2@autosite.com' => 'AutoHaus München',
            'dealer3@autosite.com' => 'CarCenter București',
            'dealer4@autosite.com' => 'Elite Automobiles',
            'dealer5@autosite.com' => 'AutoGallery Madrid',
            'dealer6@autosite.com' => 'Luxury Cars Paris',
            'dealer7@autosite.com' => 'TopAuto Roma',
            'dealer8@autosite.com' => 'DriveZone Berlin',
            'dealer9@autosite.com' => 'AutoPlaza London',
            'dealer10@autosite.com' => 'CarWorld Vienna',
        ];

        foreach ($dealerEmails as $email => $name) {
            User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => $name,
                    'password' => Hash::make('password'),
                    'role' => 'dealer',
                    'is_active' => true,
                ]
            );
        }

        // Create buyer users
        $buyerEmails = [
            'buyer1@example.com' => 'John Smith',
            'buyer2@example.com' => 'Maria Garcia',
            'buyer3@example.com' => 'Hans Mueller',
            'buyer4@example.com' => 'Sophie Dubois',
            'buyer5@example.com' => 'Marco Rossi',
        ];

        foreach ($buyerEmails as $email => $name) {
            User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => $name,
                    'password' => Hash::make('password'),
                    'role' => 'buyer',
                    'is_active' => true,
                ]
            );
        }
    }
}
