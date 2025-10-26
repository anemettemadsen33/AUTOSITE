<?php

use App\Http\Controllers\Api\SavedSearchController;
use App\Http\Controllers\Api\PriceAlertController;
use App\Http\Controllers\Api\VehicleComparisonController;
use App\Http\Controllers\Api\VehiclePdfController;
use App\Http\Controllers\Api\WebhookController;
use App\Http\Controllers\Api\SocialAuthController;
use App\Http\Controllers\Api\TwoFactorController;
use App\Http\Controllers\VehicleConfigurationController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ChatMessageController;
use Illuminate\Support\Facades\Route;

// Public routes - PDF/QR with rate limiting
Route::middleware('throttle:pdf')->group(function () {
    Route::get('/vehicles/{vehicle}/pdf', [VehiclePdfController::class, 'generatePdf']);
    Route::get('/vehicles/{vehicle}/qrcode', [VehiclePdfController::class, 'qrCode']);
});

// Social Authentication - Strict rate limiting for auth endpoints
Route::middleware('throttle:auth')->group(function () {
    Route::get('/auth/{provider}/redirect', [SocialAuthController::class, 'redirect']);
    Route::get('/auth/{provider}/callback', [SocialAuthController::class, 'callback']);
});

// Protected routes - Standard API rate limiting
Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    
    // Saved Searches
    Route::apiResource('saved-searches', SavedSearchController::class);
    
    // Price Alerts
    Route::apiResource('price-alerts', PriceAlertController::class);
    
    // Vehicle Comparisons
    Route::get('/vehicle-comparisons', [VehicleComparisonController::class, 'index']);
    Route::post('/vehicle-comparisons', [VehicleComparisonController::class, 'store']);
    Route::get('/vehicle-comparisons/{vehicleComparison}', [VehicleComparisonController::class, 'show']);
    Route::put('/vehicle-comparisons/{vehicleComparison}', [VehicleComparisonController::class, 'update']);
    Route::delete('/vehicle-comparisons/{vehicleComparison}', [VehicleComparisonController::class, 'destroy']);
    Route::post('/vehicle-comparisons/{vehicleComparison}/add', [VehicleComparisonController::class, 'addVehicle']);
    Route::post('/vehicle-comparisons/{vehicleComparison}/remove', [VehicleComparisonController::class, 'removeVehicle']);
    
    // Vehicle Configurations
    Route::apiResource('vehicle-configurations', VehicleConfigurationController::class);
    Route::get('/vehicles/{vehicle}/options', [VehicleConfigurationController::class, 'getOptions']);
    
    // Bookings
    Route::apiResource('bookings', BookingController::class);
    Route::get('/bookings/available-slots', [BookingController::class, 'getAvailableSlots']);
    
    // Chat Messages
    Route::get('/chat/messages', [ChatMessageController::class, 'index']);
    Route::post('/chat/messages', [ChatMessageController::class, 'store']);
    Route::get('/chat/messages/{sessionId}', [ChatMessageController::class, 'show']);
    Route::post('/chat/messages/mark-read', [ChatMessageController::class, 'markAsRead']);
});

// Webhooks - Lower rate limit
Route::middleware(['auth:sanctum', 'throttle:webhooks'])->group(function () {
    Route::apiResource('webhooks', WebhookController::class);
    Route::post('/webhooks/{webhook}/test', [WebhookController::class, 'test']);
    Route::get('/webhooks/{webhook}/calls', [WebhookController::class, 'calls']);
});

// Two-Factor Authentication - Strict rate limiting
Route::middleware(['auth:sanctum', 'throttle:auth'])->group(function () {
    Route::post('/2fa/enable', [TwoFactorController::class, 'enable']);
    Route::post('/2fa/confirm', [TwoFactorController::class, 'confirm']);
    Route::post('/2fa/disable', [TwoFactorController::class, 'disable']);
    Route::get('/2fa/recovery-codes', [TwoFactorController::class, 'recoveryCodes']);
    Route::post('/2fa/recovery-codes/regenerate', [TwoFactorController::class, 'regenerateRecoveryCodes']);
    Route::post('/2fa/verify', [TwoFactorController::class, 'verify']);
});
