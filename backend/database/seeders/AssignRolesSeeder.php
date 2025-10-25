<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AssignRolesSeeder extends Seeder
{
    public function run(): void
    {
        // Assign admin role to admin user
        $admin = User::where('email', 'admin@autosite.com')->first();
        if ($admin) {
            $admin->assignRole('admin');
            $this->command->info("✅ Admin role assigned to: {$admin->email}");
        }

        // Assign dealer role to all dealer users
        $dealers = User::where('email', 'like', 'dealer%@autosite.com')->get();
        foreach ($dealers as $dealer) {
            $dealer->assignRole('dealer');
        }
        $this->command->info("✅ Dealer role assigned to {$dealers->count()} dealers");

        // Assign buyer role to all buyer users
        $buyers = User::where('email', 'like', 'buyer%@example.com')->get();
        foreach ($buyers as $buyer) {
            $buyer->assignRole('buyer');
        }
        $this->command->info("✅ Buyer role assigned to {$buyers->count()} buyers");
    }
}
