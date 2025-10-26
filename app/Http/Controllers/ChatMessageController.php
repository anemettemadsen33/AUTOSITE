<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ChatMessageController extends Controller
{
    public function index(Request $request)
    {
        $sessionId = $request->input('session_id', session()->getId());

        $messages = ChatMessage::where('session_id', $sessionId)
            ->when(Auth::check() && Auth::user()->role !== 'admin', function($query) {
                $query->where('user_id', Auth::id())
                      ->orWhereNull('user_id');
            })
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:1000',
            'session_id' => 'nullable|string',
            'metadata' => 'nullable|array',
        ]);

        $sessionId = $validated['session_id'] ?? session()->getId();

        // Save user message
        $userMessage = ChatMessage::create([
            'session_id' => $sessionId,
            'user_id' => Auth::id(),
            'message' => $validated['message'],
            'sender' => 'user',
            'metadata' => $validated['metadata'] ?? null,
        ]);

        // Generate bot response
        $botResponse = $this->generateBotResponse($validated['message']);

        $botMessage = ChatMessage::create([
            'session_id' => $sessionId,
            'user_id' => Auth::id(),
            'message' => $botResponse,
            'sender' => 'bot',
            'metadata' => ['auto_generated' => true],
        ]);

        return response()->json([
            'user_message' => $userMessage,
            'bot_message' => $botMessage,
        ], 201);
    }

    public function show(Request $request, $sessionId)
    {
        $messages = ChatMessage::where('session_id', $sessionId)
            ->when(Auth::check() && Auth::user()->role !== 'admin', function($query) {
                $query->where('user_id', Auth::id());
            })
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    public function markAsRead(Request $request)
    {
        $sessionId = $request->input('session_id', session()->getId());

        ChatMessage::where('session_id', $sessionId)
            ->where('sender', 'bot')
            ->update(['is_read' => true]);

        return response()->json(['message' => 'Messages marked as read']);
    }

    private function generateBotResponse(string $message): string
    {
        $message = strtolower($message);

        // Simple keyword-based responses
        if (str_contains($message, 'price') || str_contains($message, 'cost') || str_contains($message, 'pret')) {
            return "Our vehicles range from €10,000 to €100,000 depending on the model and features. Would you like to see our current inventory with pricing?";
        }

        if (str_contains($message, 'test drive') || str_contains($message, 'test') || str_contains($message, 'proba')) {
            return "I can help you schedule a test drive! Please provide your preferred date and time, or use our booking system to reserve a slot.";
        }

        if (str_contains($message, 'financing') || str_contains($message, 'loan') || str_contains($message, 'credit') || str_contains($message, 'finantare')) {
            return "We offer flexible financing options with competitive interest rates. Our team can help you find the best financing solution for your budget. Would you like to speak with a financial advisor?";
        }

        if (str_contains($message, 'warranty') || str_contains($message, 'garantie')) {
            return "All our vehicles come with a comprehensive warranty. New cars have manufacturer's warranty, and used cars come with our dealer warranty. Would you like specific details?";
        }

        if (str_contains($message, 'hello') || str_contains($message, 'hi') || str_contains($message, 'buna')) {
            return "Hello! Welcome to AutoSite. I'm here to help you find your perfect vehicle. How can I assist you today?";
        }

        if (str_contains($message, 'contact') || str_contains($message, 'phone') || str_contains($message, 'email')) {
            return "You can reach us at info@autosite.com or call +40 123 456 789. Our team is available Monday-Friday 9:00-18:00. Would you like to schedule a call?";
        }

        // Default response
        return "Thank you for your message! Our team will get back to you shortly. In the meantime, feel free to browse our inventory or schedule a test drive. Is there anything specific I can help you with?";
    }
}
