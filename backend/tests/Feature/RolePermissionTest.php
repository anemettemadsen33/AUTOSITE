<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

test('admin user has admin role and all permissions', function () {
    // Create permissions
    Permission::create(['name' => 'view-vehicles']);
    Permission::create(['name' => 'manage-dealers']);
    Permission::create(['name' => 'edit-settings']);
    
    // Create admin role with all permissions
    $adminRole = Role::create(['name' => 'admin']);
    $adminRole->givePermissionTo(Permission::all());
    
    // Create admin user
    $admin = User::create([
        'name' => 'Admin User',
        'email' => 'admin@autosite.com',
        'password' => bcrypt('password'),
        'role' => 'admin',
    ]);
    $admin->assignRole('admin');
    
    expect($admin)->not->toBeNull()
        ->and($admin->hasRole('admin'))->toBeTrue()
        ->and($admin->can('view-vehicles'))->toBeTrue()
        ->and($admin->can('manage-dealers'))->toBeTrue()
        ->and($admin->can('edit-settings'))->toBeTrue();
});

test('dealer user has dealer role and correct permissions', function () {
    // Create permissions
    $viewVehicles = Permission::create(['name' => 'view-vehicles']);
    $createVehicles = Permission::create(['name' => 'create-vehicles']);
    $manageDealers = Permission::create(['name' => 'manage-dealers']);
    
    // Create dealer role
    $dealerRole = Role::create(['name' => 'dealer']);
    $dealerRole->givePermissionTo([$viewVehicles, $createVehicles]);
    
    // Create dealer user
    $dealer = User::create([
        'name' => 'Dealer User',
        'email' => 'dealer@autosite.com',
        'password' => bcrypt('password'),
        'role' => 'dealer',
    ]);
    $dealer->assignRole('dealer');
    
    expect($dealer)->not->toBeNull()
        ->and($dealer->hasRole('dealer'))->toBeTrue()
        ->and($dealer->can('view-vehicles'))->toBeTrue()
        ->and($dealer->can('create-vehicles'))->toBeTrue()
        ->and($dealer->can('manage-dealers'))->toBeFalse();
});

test('buyer user has buyer role and limited permissions', function () {
    // Create permissions
    $viewVehicles = Permission::create(['name' => 'view-vehicles']);
    $createVehicles = Permission::create(['name' => 'create-vehicles']);
    
    // Create buyer role
    $buyerRole = Role::create(['name' => 'buyer']);
    $buyerRole->givePermissionTo($viewVehicles);
    
    // Create buyer user
    $buyer = User::create([
        'name' => 'Buyer User',
        'email' => 'buyer@example.com',
        'password' => bcrypt('password'),
        'role' => 'buyer',
    ]);
    $buyer->assignRole('buyer');
    
    expect($buyer)->not->toBeNull()
        ->and($buyer->hasRole('buyer'))->toBeTrue()
        ->and($buyer->can('view-vehicles'))->toBeTrue()
        ->and($buyer->can('create-vehicles'))->toBeFalse();
});
