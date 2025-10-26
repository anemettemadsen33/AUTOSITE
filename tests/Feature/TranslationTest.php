<?php

test('can get supported languages', function () {
    $response = $this->getJson('/api/languages');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'languages',
            'default',
        ])
        ->assertJsonPath('default', 'en');
});

test('can get translations for a language', function () {
    $response = $this->getJson('/api/translations/en');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'locale',
            'translations',
        ])
        ->assertJsonPath('locale', 'en');
});

test('returns error for unsupported language', function () {
    $response = $this->getJson('/api/translations/unsupported');

    $response->assertStatus(400)
        ->assertJson([
            'message' => 'Unsupported language',
        ]);
});
