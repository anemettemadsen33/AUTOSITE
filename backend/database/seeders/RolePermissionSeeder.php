<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        $permissions = [
            // Vehicle permissions
            'view-vehicles',
            'create-vehicles',
            'edit-vehicles',
            'delete-vehicles',
            'publish-vehicles',
            
            // Dealer permissions
            'view-dealers',
            'edit-dealer-profile',
            'verify-dealers',
            'manage-dealers',
            
            // User permissions
            'view-users',
            'create-users',
            'edit-users',
            'delete-users',
            
            // Review permissions
            'view-reviews',
            'create-reviews',
            'moderate-reviews',
            'delete-reviews',
            
            // Booking permissions
            'view-bookings',
            'create-bookings',
            'manage-bookings',
            
            // Message permissions
            'view-messages',
            'send-messages',
            
            // Settings permissions
            'view-settings',
            'edit-settings',
            
            // Feature permissions
            'view-features',
            'manage-features',
            
            // Exchange rate permissions
            'view-exchange-rates',
            'update-exchange-rates',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create Roles and assign permissions

        // Admin Role - Full access
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        // Dealer Role - Can manage own vehicles and profile
        $dealerRole = Role::create(['name' => 'dealer']);
        $dealerRole->givePermissionTo([
            'view-vehicles',
            'create-vehicles',
            'edit-vehicles',
            'delete-vehicles',
            'publish-vehicles',
            'view-dealers',
            'edit-dealer-profile',
            'view-reviews',
            'view-bookings',
            'manage-bookings',
            'view-messages',
            'send-messages',
            'view-features',
            'view-exchange-rates',
        ]);

        // Buyer Role - Can view and interact
        $buyerRole = Role::create(['name' => 'buyer']);
        $buyerRole->givePermissionTo([
            'view-vehicles',
            'view-dealers',
            'view-reviews',
            'create-reviews',
            'view-bookings',
            'create-bookings',
            'view-messages',
            'send-messages',
            'view-features',
            'view-exchange-rates',
        ]);

        $this->command->info('✅ Roles and permissions created successfully!');
        $this->command->info('   • Admin role with full permissions');
        $this->command->info('   • Dealer role with vehicle management');
        $this->command->info('   • Buyer role with basic interactions');
    }
}
