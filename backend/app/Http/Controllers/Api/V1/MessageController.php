<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use App\Notifications\NewMessageNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class MessageController extends Controller
{
    /**
     * Send a new message
     * 
     * POST /api/v1/messages
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'message' => 'required|string|min:1|max:5000',
            'thread_id' => 'nullable|string|max:255',
        ]);

        // Prevent sending messages to yourself
        if ($validated['receiver_id'] == $request->user()->id) {
            throw ValidationException::withMessages([
                'receiver_id' => ['You cannot send messages to yourself.']
            ]);
        }

        // Generate thread_id if not provided (combination of sender and receiver IDs)
        if (empty($validated['thread_id'])) {
            $ids = [$request->user()->id, $validated['receiver_id']];
            sort($ids);
            $validated['thread_id'] = 'thread_' . implode('_', $ids);
        }

        $message = Message::create([
            'sender_id' => $request->user()->id,
            'receiver_id' => $validated['receiver_id'],
            'vehicle_id' => $validated['vehicle_id'] ?? null,
            'thread_id' => $validated['thread_id'],
            'message' => $validated['message'],
            'is_read' => false,
        ]);

        // Load relationships
        $message->load(['sender', 'receiver', 'vehicle']);

        // Send notification to receiver
        $receiver = User::find($validated['receiver_id']);
        if ($receiver) {
            $receiver->notify(new NewMessageNotification($message));
        }

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully',
            'data' => $message,
        ], 201);
    }

    /**
     * Get all conversations for the authenticated user
     * 
     * GET /api/v1/conversations
     */
    public function conversations(Request $request)
    {
        $userId = $request->user()->id;

        // Get distinct threads with latest message
        $conversations = Message::select('thread_id')
            ->where(function ($query) use ($userId) {
                $query->where('sender_id', $userId)
                    ->orWhere('receiver_id', $userId);
            })
            ->with(['sender', 'receiver', 'vehicle'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy('thread_id')
            ->map(function ($messages) use ($userId) {
                $latestMessage = $messages->first();
                
                // Determine the other participant
                $otherUserId = $latestMessage->sender_id == $userId 
                    ? $latestMessage->receiver_id 
                    : $latestMessage->sender_id;
                
                $otherUser = User::find($otherUserId);
                
                // Count unread messages in this thread
                $unreadCount = Message::where('thread_id', $latestMessage->thread_id)
                    ->where('receiver_id', $userId)
                    ->where('is_read', false)
                    ->count();

                return [
                    'thread_id' => $latestMessage->thread_id,
                    'other_user' => $otherUser,
                    'vehicle' => $latestMessage->vehicle,
                    'latest_message' => [
                        'id' => $latestMessage->id,
                        'message' => $latestMessage->message,
                        'sender_id' => $latestMessage->sender_id,
                        'is_read' => $latestMessage->is_read,
                        'created_at' => $latestMessage->created_at,
                    ],
                    'unread_count' => $unreadCount,
                ];
            })
            ->values();

        return response()->json([
            'success' => true,
            'data' => $conversations,
        ]);
    }

    /**
     * Get conversation with a specific user
     * 
     * GET /api/v1/conversations/{userId}
     */
    public function conversation(Request $request, $userId)
    {
        $currentUserId = $request->user()->id;

        // Validate user exists
        $otherUser = User::findOrFail($userId);

        // Generate thread_id
        $ids = [$currentUserId, $userId];
        sort($ids);
        $threadId = 'thread_' . implode('_', $ids);

        // Get all messages in this thread
        $messages = Message::where('thread_id', $threadId)
            ->with(['sender', 'receiver', 'vehicle'])
            ->orderBy('created_at', 'asc')
            ->get();

        // Mark received messages as read
        Message::where('thread_id', $threadId)
            ->where('receiver_id', $currentUserId)
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

        return response()->json([
            'success' => true,
            'data' => [
                'thread_id' => $threadId,
                'other_user' => $otherUser,
                'messages' => $messages,
            ],
        ]);
    }

    /**
     * Mark a specific message as read
     * 
     * PUT /api/v1/messages/{id}/read
     */
    public function markAsRead(Request $request, $id)
    {
        $message = Message::findOrFail($id);

        // Only the receiver can mark message as read
        if ($message->receiver_id != $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. You can only mark your own messages as read.',
            ], 403);
        }

        $message->markAsRead();

        return response()->json([
            'success' => true,
            'message' => 'Message marked as read',
            'data' => $message,
        ]);
    }

    /**
     * Delete a message
     * 
     * DELETE /api/v1/messages/{id}
     */
    public function destroy(Request $request, $id)
    {
        $message = Message::findOrFail($id);

        // Only sender or receiver can delete the message
        if ($message->sender_id != $request->user()->id && 
            $message->receiver_id != $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. You can only delete your own messages.',
            ], 403);
        }

        $message->delete();

        return response()->json([
            'success' => true,
            'message' => 'Message deleted successfully',
        ]);
    }

    /**
     * Get unread message count for authenticated user
     * 
     * GET /api/v1/messages/unread-count
     */
    public function unreadCount(Request $request)
    {
        $count = Message::where('receiver_id', $request->user()->id)
            ->where('is_read', false)
            ->count();

        return response()->json([
            'success' => true,
            'data' => [
                'unread_count' => $count,
            ],
        ]);
    }
}
