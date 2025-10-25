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

// Public routes with rate limiting (100 requests per minute)
Route::prefix('v1')->middleware(['throttle:100,1', 'cacheResponse:3600'])->group(function () {
    // Auth routes - stricter rate limit (10 attempts per minute)
    Route::middleware('throttle:10,1')->group(function () {
        Route::post('/auth/register', [AuthController::class, 'register'])->middleware('doNotCacheResponse');
        Route::post('/auth/login', [AuthController::class, 'login'])->middleware('doNotCacheResponse');
    });

    // Public vehicle routes (CACHED for 1 hour)
    Route::get('/vehicles', [VehicleController::class, 'index']);
    Route::get('/vehicles/{slug}', [VehicleController::class, 'show']);

    // Public dealer routes (CACHED)
    Route::get('/dealers', [DealerController::class, 'index']);
    Route::get('/dealers/{id}', [DealerController::class, 'show']);

    // Public settings (CACHED)
    Route::get('/settings', [SettingController::class, 'index']);
    Route::get('/settings/{key}', [SettingController::class, 'show']);

    // Exchange rates (CACHED)
    Route::get('/exchange/latest', [ExchangeRateController::class, 'latest']);
    Route::post('/exchange/convert', [ExchangeRateController::class, 'convert'])->middleware('doNotCacheResponse');
});

// Protected routes (60 requests per minute for authenticated users)
Route::prefix('v1')->middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    // Auth routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);

    // Vehicle management - requires permissions
    Route::middleware(['permission:create-vehicles'])->group(function () {
        Route::post('/vehicles', [VehicleController::class, 'store']);
    });
    
    Route::middleware(['permission:edit-vehicles'])->group(function () {
        Route::put('/vehicles/{id}', [VehicleController::class, 'update']);
    });
    
    Route::middleware(['permission:delete-vehicles'])->group(function () {
        Route::delete('/vehicles/{id}', [VehicleController::class, 'destroy']);
    });
});
