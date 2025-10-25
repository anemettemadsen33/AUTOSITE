<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RateLimitingTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test rate limiting on login endpoint
     */
    public function test_login_endpoint_has_rate_limiting(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('Password123!'),
        ]);

        // Make multiple rapid requests
        $responses = [];
        for ($i = 0; $i < 10; $i++) {
            $responses[] = $this->postJson('/api/v1/auth/login', [
                'email' => 'test@example.com',
                'password' => 'WrongPassword',
            ]);
        }

        // At least one should be rate limited (429)
        $rateLimitedResponses = collect($responses)->filter(function ($response) {
            return $response->status() === 429;
        });

        $this->assertGreaterThan(0, $rateLimitedResponses->count(), 
            'Expected at least one response to be rate limited (429)');
    }

    /**
     * Test rate limiting on vehicle search
     */
    public function test_vehicle_search_has_rate_limiting(): void
    {
        // Make many rapid requests to search endpoint
        $responses = [];
        for ($i = 0; $i < 100; $i++) {
            $responses[] = $this->getJson('/api/v1/vehicles?query=BMW');
        }

        // Should eventually get rate limited
        $rateLimitedResponses = collect($responses)->filter(function ($response) {
            return $response->status() === 429;
        });

        $this->assertGreaterThan(0, $rateLimitedResponses->count(), 
            'Expected at least one response to be rate limited (429)');
    }

    /**
     * Test authenticated users have higher rate limits
     */
    public function test_authenticated_users_have_higher_rate_limits(): void
    {
        $user = User::factory()->create(['role' => 'dealer']);
        $token = $user->createToken('test-token')->plainTextToken;

        // Should allow more requests when authenticated
        $responses = [];
        for ($i = 0; $i < 100; $i++) {
            $responses[] = $this->withHeader('Authorization', 'Bearer ' . $token)
                ->getJson('/api/v1/vehicles');
        }

        // Count successful responses
        $successfulResponses = collect($responses)->filter(function ($response) {
            return $response->status() === 200;
        });

        // Authenticated should get more successful requests than public
        $this->assertGreaterThan(50, $successfulResponses->count(), 
            'Authenticated users should have higher rate limits');
    }
}
