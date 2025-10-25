<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\{postJson, getJson};

uses(RefreshDatabase::class);

test('user can register with valid data', function () {
    $response = postJson('/api/v1/auth/register', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);
    
    $response->assertStatus(201)
        ->assertJsonStructure([
            'data' => [
                'user' => ['id', 'name', 'email'],
                'token'
            ]
        ]);
    
    expect(User::where('email', 'john@example.com')->exists())->toBeTrue();
});

test('user cannot register with duplicate email', function () {
    User::factory()->create(['email' => 'existing@example.com']);
    
    $response = postJson('/api/v1/auth/register', [
        'name' => 'Jane Doe',
        'email' => 'existing@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);
    
    $response->assertStatus(422)
        ->assertJsonValidationErrors(['email']);
});

test('user can login with correct credentials', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com',
        'password' => bcrypt('password123'),
    ]);
    
    $response = postJson('/api/v1/auth/login', [
        'email' => 'test@example.com',
        'password' => 'password123',
    ]);
    
    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                'user',
                'token'
            ]
        ]);
});

test('user cannot login with wrong password', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com',
        'password' => bcrypt('password123'),
    ]);
    
    $response = postJson('/api/v1/auth/login', [
        'email' => 'test@example.com',
        'password' => 'wrongpassword',
    ]);
    
    $response->assertStatus(401);
});

test('authenticated user can get own profile', function () {
    $user = User::factory()->create();
    
    $response = getJson('/api/v1/auth/me', [
        'Authorization' => 'Bearer ' . $user->createToken('test')->plainTextToken,
    ]);
    
    $response->assertStatus(200)
        ->assertJson([
            'data' => [
                'id' => $user->id,
                'email' => $user->email,
            ]
        ]);
});

test('unauthenticated user cannot access profile', function () {
    $response = getJson('/api/v1/auth/me');
    
    $response->assertStatus(401);
});
