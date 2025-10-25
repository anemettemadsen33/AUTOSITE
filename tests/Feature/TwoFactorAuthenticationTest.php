<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;

test('user can enable two factor authentication', function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $response = $this->postJson('/api/2fa/enable');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'qr_code',
            'secret',
            'recovery_codes'
        ]);
});

test('user can confirm two factor authentication', function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    // Enable 2FA first
    $user->enableTwoFactorAuthentication();
    $user->save();

    $response = $this->postJson('/api/2fa/confirm', [
        'code' => '123456' // In real test, would use valid TOTP code
    ]);

    $response->assertStatus(200);
});

test('user can disable two factor authentication', function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    // Enable and confirm 2FA first
    $user->enableTwoFactorAuthentication();
    $user->confirmTwoFactorAuthentication('123456');
    $user->save();

    $response = $this->postJson('/api/2fa/disable', [
        'password' => 'password'
    ]);

    $response->assertStatus(200);
});

test('user can get recovery codes', function () {
    $user = User::factory()->create();
    $user->enableTwoFactorAuthentication();
    $user->save();
    
    Sanctum::actingAs($user);

    $response = $this->getJson('/api/2fa/recovery-codes');

    $response->assertStatus(200)
        ->assertJsonStructure(['recovery_codes']);
});

test('user can regenerate recovery codes', function () {
    $user = User::factory()->create();
    $user->enableTwoFactorAuthentication();
    $user->save();
    
    Sanctum::actingAs($user);

    $response = $this->postJson('/api/2fa/recovery-codes/regenerate');

    $response->assertStatus(200)
        ->assertJsonStructure(['recovery_codes']);
});
