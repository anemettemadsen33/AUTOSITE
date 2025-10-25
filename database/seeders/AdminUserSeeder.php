<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Update existing admin user or create new one
        $admin = User::where('email', 'admin@gmail.com')->first();
        
        if ($admin) {
            $admin->update([
                'role' => 'admin',
                'name' => 'Admin User',
            ]);
            $this->command->info('Admin user updated successfully!');
        } else {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@autosite.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]);
            $this->command->info('Admin user created: admin@autosite.com / password');
        }
    }
}
