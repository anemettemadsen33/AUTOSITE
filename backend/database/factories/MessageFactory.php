<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sender = User::factory()->create();
        $receiver = User::factory()->create();
        
        // Generate thread_id based on sender and receiver IDs
        $ids = [$sender->id, $receiver->id];
        sort($ids);
        $threadId = 'thread_' . implode('_', $ids);

        return [
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id,
            'vehicle_id' => $this->faker->optional(0.7)->randomElement(Vehicle::pluck('id')->toArray()),
            'thread_id' => $threadId,
            'message' => $this->faker->paragraph(),
            'is_read' => $this->faker->boolean(40), // 40% chance of being read
            'read_at' => function (array $attributes) {
                return $attributes['is_read'] ? now()->subMinutes($this->faker->numberBetween(1, 1440)) : null;
            },
        ];
    }

    /**
     * Indicate that the message is unread.
     */
    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_read' => false,
            'read_at' => null,
        ]);
    }

    /**
     * Indicate that the message is read.
     */
    public function read(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_read' => true,
            'read_at' => now()->subMinutes($this->faker->numberBetween(1, 1440)),
        ]);
    }

    /**
     * Set specific sender and receiver.
     */
    public function between(User $sender, User $receiver): static
    {
        $ids = [$sender->id, $receiver->id];
        sort($ids);
        $threadId = 'thread_' . implode('_', $ids);

        return $this->state(fn (array $attributes) => [
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id,
            'thread_id' => $threadId,
        ]);
    }

    /**
     * Set a specific vehicle reference.
     */
    public function aboutVehicle(Vehicle $vehicle): static
    {
        return $this->state(fn (array $attributes) => [
            'vehicle_id' => $vehicle->id,
        ]);
    }
}
