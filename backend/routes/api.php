<?php

use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DealerController;
use App\Http\Controllers\Api\ExchangeRateController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\ReviewController;
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
    
    // Reviews (public - read only)
    Route::get('/dealers/{dealerId}/reviews', [ReviewController::class, 'index']);
});

// Protected routes (60 requests per minute for authenticated users)
Route::prefix('v1')->middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    // Auth routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);

    // Favorites routes
    Route::get('/favorites', [\App\Http\Controllers\Api\V1\FavoriteController::class, 'index']);
    Route::post('/favorites/toggle', [\App\Http\Controllers\Api\V1\FavoriteController::class, 'toggle']);
    Route::get('/favorites/check/{vehicleId}', [\App\Http\Controllers\Api\V1\FavoriteController::class, 'check']);
    Route::delete('/favorites/{vehicleId}', [\App\Http\Controllers\Api\V1\FavoriteController::class, 'destroy']);

    // Vehicle Image Management (NEW)
    Route::post('/vehicles/{vehicle}/images', [\App\Http\Controllers\Api\V1\VehicleImageController::class, 'upload']);
    Route::post('/vehicles/{vehicle}/images/single', [\App\Http\Controllers\Api\V1\VehicleImageController::class, 'uploadSingle']);
    Route::get('/vehicles/{vehicle}/images', [\App\Http\Controllers\Api\V1\VehicleImageController::class, 'index']);
    Route::delete('/vehicles/{vehicle}/images/{mediaId}', [\App\Http\Controllers\Api\V1\VehicleImageController::class, 'destroy']);
    Route::post('/vehicles/{vehicle}/images/reorder', [\App\Http\Controllers\Api\V1\VehicleImageController::class, 'reorder']);
    Route::post('/vehicles/{vehicle}/images/{mediaId}/primary', [\App\Http\Controllers\Api\V1\VehicleImageController::class, 'setPrimary']);

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
    
    // Media uploads
    Route::post('/vehicles/{vehicle}/images', [MediaController::class, 'uploadVehicleImages']);
    Route::delete('/vehicles/{vehicle}/images/{mediaId}', [MediaController::class, 'deleteVehicleImage']);
    Route::post('/vehicles/{vehicle}/images/reorder', [MediaController::class, 'reorderVehicleImages']);
    Route::post('/dealer/logo', [MediaController::class, 'uploadDealerLogo']);
    Route::post('/user/avatar', [MediaController::class, 'uploadAvatar']);
    
    // Analytics
    Route::get('/analytics/dealer/dashboard', [AnalyticsController::class, 'dealerDashboard']);
    Route::get('/analytics/vehicle/{vehicleId}', [AnalyticsController::class, 'vehicleStats']);
    Route::get('/analytics/platform', [AnalyticsController::class, 'platformStats'])->middleware('role:admin');
    
    // Reviews
    Route::post('/dealers/{dealerId}/reviews', [ReviewController::class, 'store']);
    Route::put('/reviews/{reviewId}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{reviewId}', [ReviewController::class, 'destroy']);
    Route::post('/reviews/{reviewId}/respond', [ReviewController::class, 'respond']);
    Route::post('/reviews/{reviewId}/approve', [ReviewController::class, 'approve'])->middleware('role:admin');
    Route::post('/reviews/{reviewId}/reject', [ReviewController::class, 'reject'])->middleware('role:admin');
});

// Public media routes
Route::get('/vehicles/{vehicle}/images', [MediaController::class, 'getVehicleImages']);

// Orders & Leasing Applications
Route::prefix('v1')->middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    // Orders
    Route::get('/orders', [\App\Http\Controllers\Api\V1\OrderController::class, 'index']);
    Route::post('/orders', [\App\Http\Controllers\Api\V1\OrderController::class, 'store']);
    Route::get('/orders/{id}', [\App\Http\Controllers\Api\V1\OrderController::class, 'show']);
    Route::put('/orders/{id}', [\App\Http\Controllers\Api\V1\OrderController::class, 'update']);
    Route::delete('/orders/{id}', [\App\Http\Controllers\Api\V1\OrderController::class, 'destroy']);
    
    // Leasing Applications
    Route::get('/leasing-applications', [\App\Http\Controllers\Api\V1\LeasingApplicationController::class, 'index']);
    Route::post('/leasing-applications', [\App\Http\Controllers\Api\V1\LeasingApplicationController::class, 'store']);
    Route::get('/leasing-applications/{id}', [\App\Http\Controllers\Api\V1\LeasingApplicationController::class, 'show']);
    Route::post('/leasing-applications/{id}/documents', [\App\Http\Controllers\Api\V1\LeasingApplicationController::class, 'uploadDocuments']);
    Route::delete('/leasing-applications/{id}', [\App\Http\Controllers\Api\V1\LeasingApplicationController::class, 'destroy']);
});
