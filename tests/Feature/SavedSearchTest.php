<?php

use App\Models\User;
use App\Models\SavedSearch;
use Laravel\Sanctum\Sanctum;

test('user can create saved search', function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $response = $this->postJson('/api/saved-searches', [
        'name' => 'My Toyota Search',
        'criteria' => [
            'make' => 'Toyota',
            'year_from' => 2020,
            'year_to' => 2024,
        ],
        'notify' => true,
    ]);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'id',
            'name',
            'criteria',
            'notify'
        ]);

    $this->assertDatabaseHas('saved_searches', [
        'user_id' => $user->id,
        'name' => 'My Toyota Search',
    ]);
});

test('user can list their saved searches', function () {
    $user = User::factory()->create();
    SavedSearch::factory()->count(3)->create(['user_id' => $user->id]);
    
    Sanctum::actingAs($user);

    $response = $this->getJson('/api/saved-searches');

    $response->assertStatus(200)
        ->assertJsonCount(3);
});

test('user can view a saved search', function () {
    $user = User::factory()->create();
    $search = SavedSearch::factory()->create(['user_id' => $user->id]);
    
    Sanctum::actingAs($user);

    $response = $this->getJson("/api/saved-searches/{$search->id}");

    $response->assertStatus(200)
        ->assertJson([
            'id' => $search->id,
            'name' => $search->name,
        ]);
});

test('user can update saved search', function () {
    $user = User::factory()->create();
    $search = SavedSearch::factory()->create(['user_id' => $user->id]);
    
    Sanctum::actingAs($user);

    $response = $this->putJson("/api/saved-searches/{$search->id}", [
        'name' => 'Updated Search Name',
        'criteria' => $search->criteria,
        'notify' => false,
    ]);

    $response->assertStatus(200);
    
    $this->assertDatabaseHas('saved_searches', [
        'id' => $search->id,
        'name' => 'Updated Search Name',
    ]);
});

test('user can delete saved search', function () {
    $user = User::factory()->create();
    $search = SavedSearch::factory()->create(['user_id' => $user->id]);
    
    Sanctum::actingAs($user);

    $response = $this->deleteJson("/api/saved-searches/{$search->id}");

    $response->assertStatus(204);
    
    $this->assertDatabaseMissing('saved_searches', [
        'id' => $search->id,
    ]);
});

test('user cannot access another users saved search', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $search = SavedSearch::factory()->create(['user_id' => $user2->id]);
    
    Sanctum::actingAs($user1);

    $response = $this->getJson("/api/saved-searches/{$search->id}");

    $response->assertStatus(403);
});
