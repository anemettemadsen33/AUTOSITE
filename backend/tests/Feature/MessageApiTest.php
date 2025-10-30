<?php

namespace Tests\Feature;

use App\Models\Message;
use App\Models\User;
use App\Models\Vehicle;
use App\Notifications\NewMessageNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class MessageApiTest extends TestCase
{
    use RefreshDatabase;

    protected $sender;
    protected $receiver;
    protected $vehicle;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->sender = User::factory()->create();
        $this->receiver = User::factory()->create();
        $this->vehicle = Vehicle::factory()->create();
    }

    public function test_user_can_send_message()
    {
        Notification::fake();

        $response = $this->actingAs($this->sender, 'sanctum')
            ->postJson('/api/v1/messages', [
                'receiver_id' => $this->receiver->id,
                'message' => 'Hello, is this vehicle still available?',
                'vehicle_id' => $this->vehicle->id,
            ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Message sent successfully',
            ]);

        $this->assertDatabaseHas('messages', [
            'sender_id' => $this->sender->id,
            'receiver_id' => $this->receiver->id,
            'vehicle_id' => $this->vehicle->id,
            'message' => 'Hello, is this vehicle still available?',
            'is_read' => false,
        ]);

        Notification::assertSentTo($this->receiver, NewMessageNotification::class);
    }

    public function test_sending_message_requires_authentication()
    {
        $response = $this->postJson('/api/v1/messages', [
            'receiver_id' => $this->receiver->id,
            'message' => 'Test message',
        ]);

        $response->assertStatus(401);
    }

    public function test_message_requires_receiver_id()
    {
        $response = $this->actingAs($this->sender, 'sanctum')
            ->postJson('/api/v1/messages', [
                'message' => 'Test message',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['receiver_id']);
    }

    public function test_message_requires_valid_receiver()
    {
        $response = $this->actingAs($this->sender, 'sanctum')
            ->postJson('/api/v1/messages', [
                'receiver_id' => 99999,
                'message' => 'Test message',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['receiver_id']);
    }

    public function test_message_content_is_required()
    {
        $response = $this->actingAs($this->sender, 'sanctum')
            ->postJson('/api/v1/messages', [
                'receiver_id' => $this->receiver->id,
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['message']);
    }

    public function test_cannot_send_message_to_yourself()
    {
        $response = $this->actingAs($this->sender, 'sanctum')
            ->postJson('/api/v1/messages', [
                'receiver_id' => $this->sender->id,
                'message' => 'Message to myself',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['receiver_id']);
    }

    public function test_thread_id_is_auto_generated()
    {
        $response = $this->actingAs($this->sender, 'sanctum')
            ->postJson('/api/v1/messages', [
                'receiver_id' => $this->receiver->id,
                'message' => 'Test message',
            ]);

        $response->assertStatus(201);
        
        $message = Message::latest()->first();
        $this->assertNotNull($message->thread_id);
        $this->assertStringContainsString('thread_', $message->thread_id);
    }

    public function test_can_provide_custom_thread_id()
    {
        $customThreadId = 'custom_thread_123';

        $response = $this->actingAs($this->sender, 'sanctum')
            ->postJson('/api/v1/messages', [
                'receiver_id' => $this->receiver->id,
                'message' => 'Test message',
                'thread_id' => $customThreadId,
            ]);

        $response->assertStatus(201);
        
        $this->assertDatabaseHas('messages', [
            'thread_id' => $customThreadId,
        ]);
    }

    public function test_user_can_list_conversations()
    {
        // Create messages in different threads
        Message::factory()->create([
            'sender_id' => $this->sender->id,
            'receiver_id' => $this->receiver->id,
            'thread_id' => 'thread_1_2',
        ]);

        $otherUser = User::factory()->create();
        Message::factory()->create([
            'sender_id' => $otherUser->id,
            'receiver_id' => $this->sender->id,
            'thread_id' => 'thread_1_3',
        ]);

        $response = $this->actingAs($this->sender, 'sanctum')
            ->getJson('/api/v1/conversations');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonCount(2, 'data');
    }

    public function test_conversations_show_unread_count()
    {
        // Create some unread messages
        Message::factory()->count(3)->create([
            'sender_id' => $this->receiver->id,
            'receiver_id' => $this->sender->id,
            'thread_id' => 'thread_1_2',
            'is_read' => false,
        ]);

        $response = $this->actingAs($this->sender, 'sanctum')
            ->getJson('/api/v1/conversations');

        $response->assertStatus(200);
        
        $conversation = $response->json('data.0');
        $this->assertEquals(3, $conversation['unread_count']);
    }

    public function test_user_can_view_conversation_with_specific_user()
    {
        // Create messages between sender and receiver
        Message::factory()->count(5)->create([
            'sender_id' => $this->sender->id,
            'receiver_id' => $this->receiver->id,
            'thread_id' => 'thread_1_2',
        ]);

        Message::factory()->count(3)->create([
            'sender_id' => $this->receiver->id,
            'receiver_id' => $this->sender->id,
            'thread_id' => 'thread_1_2',
        ]);

        $response = $this->actingAs($this->sender, 'sanctum')
            ->getJson('/api/v1/conversations/' . $this->receiver->id);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonCount(8, 'data.messages');
    }

    public function test_viewing_conversation_marks_messages_as_read()
    {
        // Create unread messages from receiver to sender
        Message::factory()->count(3)->create([
            'sender_id' => $this->receiver->id,
            'receiver_id' => $this->sender->id,
            'thread_id' => 'thread_1_2',
            'is_read' => false,
        ]);

        $this->assertEquals(3, Message::where('is_read', false)->count());

        $this->actingAs($this->sender, 'sanctum')
            ->getJson('/api/v1/conversations/' . $this->receiver->id);

        // All messages should now be marked as read
        $this->assertEquals(0, Message::where('is_read', false)->count());
        $this->assertEquals(3, Message::where('is_read', true)->count());
    }

    public function test_user_can_mark_specific_message_as_read()
    {
        $message = Message::factory()->create([
            'sender_id' => $this->receiver->id,
            'receiver_id' => $this->sender->id,
            'is_read' => false,
        ]);

        $response = $this->actingAs($this->sender, 'sanctum')
            ->putJson('/api/v1/messages/' . $message->id . '/read');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Message marked as read',
            ]);

        $message->refresh();
        $this->assertTrue($message->is_read);
        $this->assertNotNull($message->read_at);
    }

    public function test_only_receiver_can_mark_message_as_read()
    {
        $message = Message::factory()->create([
            'sender_id' => $this->receiver->id,
            'receiver_id' => $this->sender->id,
            'is_read' => false,
        ]);

        $otherUser = User::factory()->create();

        $response = $this->actingAs($otherUser, 'sanctum')
            ->putJson('/api/v1/messages/' . $message->id . '/read');

        $response->assertStatus(403);
    }

    public function test_user_can_delete_their_message()
    {
        $message = Message::factory()->create([
            'sender_id' => $this->sender->id,
            'receiver_id' => $this->receiver->id,
        ]);

        $response = $this->actingAs($this->sender, 'sanctum')
            ->deleteJson('/api/v1/messages/' . $message->id);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Message deleted successfully',
            ]);

        $this->assertSoftDeleted('messages', ['id' => $message->id]);
    }

    public function test_receiver_can_delete_message()
    {
        $message = Message::factory()->create([
            'sender_id' => $this->sender->id,
            'receiver_id' => $this->receiver->id,
        ]);

        $response = $this->actingAs($this->receiver, 'sanctum')
            ->deleteJson('/api/v1/messages/' . $message->id);

        $response->assertStatus(200);
        $this->assertSoftDeleted('messages', ['id' => $message->id]);
    }

    public function test_other_users_cannot_delete_message()
    {
        $message = Message::factory()->create([
            'sender_id' => $this->sender->id,
            'receiver_id' => $this->receiver->id,
        ]);

        $otherUser = User::factory()->create();

        $response = $this->actingAs($otherUser, 'sanctum')
            ->deleteJson('/api/v1/messages/' . $message->id);

        $response->assertStatus(403);
        $this->assertDatabaseHas('messages', ['id' => $message->id, 'deleted_at' => null]);
    }

    public function test_user_can_get_unread_message_count()
    {
        // Create 5 unread messages for sender
        Message::factory()->count(5)->create([
            'receiver_id' => $this->sender->id,
            'is_read' => false,
        ]);

        // Create 3 read messages
        Message::factory()->count(3)->create([
            'receiver_id' => $this->sender->id,
            'is_read' => true,
        ]);

        $response = $this->actingAs($this->sender, 'sanctum')
            ->getJson('/api/v1/messages/unread-count');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'unread_count' => 5,
                ],
            ]);
    }

    public function test_message_includes_sender_and_receiver_details()
    {
        $response = $this->actingAs($this->sender, 'sanctum')
            ->postJson('/api/v1/messages', [
                'receiver_id' => $this->receiver->id,
                'message' => 'Test message',
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'sender_id',
                    'receiver_id',
                    'message',
                    'sender' => ['id', 'name', 'email'],
                    'receiver' => ['id', 'name', 'email'],
                ],
            ]);
    }

    public function test_message_can_reference_vehicle()
    {
        $response = $this->actingAs($this->sender, 'sanctum')
            ->postJson('/api/v1/messages', [
                'receiver_id' => $this->receiver->id,
                'message' => 'Is this vehicle available?',
                'vehicle_id' => $this->vehicle->id,
            ]);

        $response->assertStatus(201);
        
        $message = Message::latest()->first();
        $this->assertEquals($this->vehicle->id, $message->vehicle_id);
    }

    public function test_messages_are_ordered_chronologically_in_conversation()
    {
        // Create messages at different times
        $message1 = Message::factory()->create([
            'sender_id' => $this->sender->id,
            'receiver_id' => $this->receiver->id,
            'thread_id' => 'thread_1_2',
            'created_at' => now()->subHours(3),
        ]);

        $message2 = Message::factory()->create([
            'sender_id' => $this->receiver->id,
            'receiver_id' => $this->sender->id,
            'thread_id' => 'thread_1_2',
            'created_at' => now()->subHours(2),
        ]);

        $message3 = Message::factory()->create([
            'sender_id' => $this->sender->id,
            'receiver_id' => $this->receiver->id,
            'thread_id' => 'thread_1_2',
            'created_at' => now()->subHours(1),
        ]);

        $response = $this->actingAs($this->sender, 'sanctum')
            ->getJson('/api/v1/conversations/' . $this->receiver->id);

        $messages = $response->json('data.messages');
        
        $this->assertEquals($message1->id, $messages[0]['id']);
        $this->assertEquals($message2->id, $messages[1]['id']);
        $this->assertEquals($message3->id, $messages[2]['id']);
    }

    public function test_conversation_endpoint_requires_valid_user_id()
    {
        $response = $this->actingAs($this->sender, 'sanctum')
            ->getJson('/api/v1/conversations/99999');

        $response->assertStatus(404);
    }

    public function test_message_notification_contains_correct_data()
    {
        Notification::fake();

        $this->actingAs($this->sender, 'sanctum')
            ->postJson('/api/v1/messages', [
                'receiver_id' => $this->receiver->id,
                'message' => 'Hello, this is a test message',
            ]);

        Notification::assertSentTo(
            $this->receiver,
            NewMessageNotification::class,
            function ($notification) {
                $array = $notification->toArray($this->receiver);
                return isset($array['sender_id']) && 
                       isset($array['message_preview']) &&
                       isset($array['thread_id']);
            }
        );
    }
}
