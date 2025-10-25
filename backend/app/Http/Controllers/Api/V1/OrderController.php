<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Vehicle;
use App\Mail\OrderConfirmation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $orders = Order::with(['vehicle', 'buyer', 'seller'])
            ->where(function($query) use ($user) {
                $query->where('buyer_id', $user->id)->orWhere('seller_id', $user->id);
            })
            ->orderBy('created_at', 'desc')->paginate(15);
        return response()->json(['success' => true, 'data' => $orders]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'vehicle_id' => 'required|exists:vehicles,id',
            'buyer_type' => 'required|in:individual,company',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }
        try {
            $vehicle = Vehicle::findOrFail($request->vehicle_id);
            $user = Auth::user();
            $order = Order::create([
                'vehicle_id' => $vehicle->id,
                'buyer_id' => $user->id,
                'seller_id' => $vehicle->user_id,
                'buyer_type' => $request->buyer_type,
                'vehicle_price' => $vehicle->price,
                'processing_fee' => 99,
                'invoice_number' => Order::generateInvoiceNumber(),
            ] + $request->all());
            $order->calculateTotals();
            $order->save();

            // Send confirmation email
            try {
                Mail::to($order->email)->send(new OrderConfirmation($order));
            } catch (\Exception $e) {
                \Log::error('Failed to send order confirmation email: ' . $e->getMessage());
            }

            return response()->json(['success' => true, 'data' => $order], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
