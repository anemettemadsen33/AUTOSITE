<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    /**
     * Get all conversations for the authenticated user.
     */
    public function conversations(Request $request): JsonResponse
    {
        $conversations = $request->user()
            ->conversations()
            ->with(['vehicle', 'participants', 'latestMessage.user'])
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function ($conversation) use ($request) {
                $latestMessage = $conversation->latestMessage->first();
                $pivot = $conversation->participants()
                    ->where('user_id', $request->user()->id)
                    ->first()
                    ->pivot;

                return [
                    'id' => $conversation->id,
                    'subject' => $conversation->subject,
                    'vehicle' => $conversation->vehicle,
                    'participants' => $conversation->participants,
                    'latest_message' => $latestMessage,
                    'unread_count' => $conversation->messages()
                        ->where('user_id', '!=', $request->user()->id)
                        ->where(function ($query) use ($pivot) {
                            $query->whereNull('read_at')
                                ->orWhere('read_at', '>', $pivot->last_read_at ?? now()->subYears(100));
                        })
                        ->count(),
                    'last_read_at' => $pivot->last_read_at,
                    'updated_at' => $conversation->updated_at,
                ];
            });

        return response()->json($conversations);
    }

    /**
     * Get messages for a specific conversation.
     */
    public function messages(Request $request, Conversation $conversation): JsonResponse
    {
        // Check if user is a participant
        if (!$conversation->participants()->where('user_id', $request->user()->id)->exists()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $messages = $conversation->messages()
            ->with('user')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    /**
     * Send a new message in a conversation.
     */
    public function send(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'conversation_id' => 'nullable|exists:conversations,id',
            'vehicle_id' => 'required_without:conversation_id|exists:vehicles,id',
            'recipient_id' => 'required_without:conversation_id|exists:users,id',
            'subject' => 'required_without:conversation_id|string|max:255',
            'content' => 'required|string',
        ]);

        DB::beginTransaction();

        try {
            // Find or create conversation
            if (isset($validated['conversation_id'])) {
                $conversation = Conversation::findOrFail($validated['conversation_id']);
                
                // Check if user is a participant
                if (!$conversation->participants()->where('user_id', $request->user()->id)->exists()) {
                    return response()->json(['message' => 'Unauthorized'], 403);
                }
            } else {
                // Create new conversation
                $conversation = Conversation::create([
                    'subject' => $validated['subject'],
                    'vehicle_id' => $validated['vehicle_id'],
                ]);

                // Add participants
                $conversation->participants()->attach([
                    $request->user()->id => ['last_read_at' => now()],
                    $validated['recipient_id'] => [],
                ]);
            }

            // Create message
            $message = Message::create([
                'conversation_id' => $conversation->id,
                'user_id' => $request->user()->id,
                'content' => $validated['content'],
            ]);

            // Update conversation timestamp
            $conversation->touch();

            DB::commit();

            return response()->json([
                'message' => $message->load('user'),
                'conversation' => $conversation->load(['vehicle', 'participants']),
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to send message'], 500);
        }
    }

    /**
     * Mark messages in a conversation as read.
     */
    public function markAsRead(Request $request, Conversation $conversation): JsonResponse
    {
        // Check if user is a participant
        if (!$conversation->participants()->where('user_id', $request->user()->id)->exists()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Update last_read_at for this user in the conversation
        $conversation->participants()->updateExistingPivot($request->user()->id, [
            'last_read_at' => now(),
        ]);

        return response()->json(['message' => 'Marked as read']);
    }

    /**
     * Start a conversation about a vehicle (helper endpoint).
     */
    public function startConversation(Request $request, Vehicle $vehicle): JsonResponse
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        // Get the dealer (owner) of the vehicle
        $dealer = $vehicle->user;

        if (!$dealer) {
            return response()->json(['message' => 'Vehicle has no owner'], 400);
        }

        if ($dealer->id === $request->user()->id) {
            return response()->json(['message' => 'Cannot message yourself'], 400);
        }

        // Check if conversation already exists between these users for this vehicle
        $existingConversation = Conversation::where('vehicle_id', $vehicle->id)
            ->whereHas('participants', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })
            ->whereHas('participants', function ($query) use ($dealer) {
                $query->where('user_id', $dealer->id);
            })
            ->first();

        if ($existingConversation) {
            // Use existing conversation
            $message = Message::create([
                'conversation_id' => $existingConversation->id,
                'user_id' => $request->user()->id,
                'content' => $validated['content'],
            ]);

            $existingConversation->touch();

            return response()->json([
                'message' => $message->load('user'),
                'conversation' => $existingConversation->load(['vehicle', 'participants']),
            ], 201);
        }

        // Create new conversation
        DB::beginTransaction();

        try {
            $conversation = Conversation::create([
                'subject' => $validated['subject'],
                'vehicle_id' => $vehicle->id,
            ]);

            $conversation->participants()->attach([
                $request->user()->id => ['last_read_at' => now()],
                $dealer->id => [],
            ]);

            $message = Message::create([
                'conversation_id' => $conversation->id,
                'user_id' => $request->user()->id,
                'content' => $validated['content'],
            ]);

            DB::commit();

            return response()->json([
                'message' => $message->load('user'),
                'conversation' => $conversation->load(['vehicle', 'participants']),
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to start conversation'], 500);
        }
    }
}
