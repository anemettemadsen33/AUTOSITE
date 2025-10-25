<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use Spatie\Permission\Models\Role;

// Ensure admin role exists
$adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);

// Check if admin exists
$admin = User::where('email', 'admin@autosite.com')->first();

if ($admin) {
    echo "✅ Admin already exists!\n";
    
    // Ensure admin has the admin role
    if (!$admin->hasRole('admin')) {
        $admin->assignRole('admin');
        echo "🔧 Admin role assigned!\n";
    }
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    echo "📧 Email: " . $admin->email . "\n";
    echo "👤 Name: " . $admin->name . "\n";
    echo "🔑 ID: " . $admin->id . "\n";
    echo "📋 Roles: " . $admin->roles->pluck('name')->join(', ') . "\n";
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    echo "🔐 Password: password\n";
} else {
    echo "🔨 Creating new admin user...\n";
    
    // Ensure admin role exists
    $adminRole = Role::firstOrCreate(['name' => 'admin']);
    
    // Create admin user
    $admin = User::create([
        'name' => 'Admin User',
        'email' => 'admin@autosite.com',
        'password' => bcrypt('password'),
        'email_verified_at' => now(),
    ]);
    
    // Assign admin role
    $admin->assignRole('admin');
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    echo "✅ ADMIN USER CREATED SUCCESSFULLY!\n";
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    echo "📧 Email: admin@autosite.com\n";
    echo "🔐 Password: password\n";
    echo "👤 Name: Admin User\n";
    echo "🔑 ID: " . $admin->id . "\n";
    echo "📋 Role: admin\n";
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    echo "\n🌐 Access Admin Panel:\n";
    echo "   URL: http://127.0.0.1:8000/admin\n";
    echo "   Email: admin@autosite.com\n";
    echo "   Password: password\n";
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
}

echo "\n✨ Done!\n";
