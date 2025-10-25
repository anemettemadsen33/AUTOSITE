<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DealerController;
use App\Http\Controllers\Api\ExchangeRateController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\VehicleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes with strict rate limiting for auth endpoints
Route::prefix('v1')->group(function () {
    // Auth routes with rate limiting (5 attempts per minute)
    Route::middleware('throttle:5,1')->group(function () {
        Route::post('/auth/register', [AuthController::class, 'register']);
        Route::post('/auth/login', [AuthController::class, 'login']);
    });

    // Public vehicle routes with moderate rate limiting (60 per minute)
    Route::middleware('throttle:60,1')->group(function () {
        Route::get('/vehicles', [VehicleController::class, 'index']);
        Route::get('/vehicles/{slug}', [VehicleController::class, 'show']);
    });

    // Public dealer routes
    Route::get('/dealers', [DealerController::class, 'index']);
    Route::get('/dealers/{id}', [DealerController::class, 'show']);

    // Public settings
    Route::get('/settings', [SettingController::class, 'index']);
    Route::get('/settings/{key}', [SettingController::class, 'show']);

    // Exchange rates
    Route::get('/exchange/latest', [ExchangeRateController::class, 'latest']);
    Route::post('/exchange/convert', [ExchangeRateController::class, 'convert']);
});

// Protected routes with higher rate limits (120 per minute for authenticated users)
Route::prefix('v1')->middleware(['auth:sanctum', 'throttle:120,1'])->group(function () {
    // Auth routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);

    // Vehicle management
    Route::post('/vehicles', [VehicleController::class, 'store']);
    Route::put('/vehicles/{id}', [VehicleController::class, 'update']);
    Route::delete('/vehicles/{id}', [VehicleController::class, 'destroy']);
});
