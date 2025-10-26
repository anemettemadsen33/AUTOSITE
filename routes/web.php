<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExchangeRateController;
use App\Http\Controllers\SeoController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\PlanController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ExportController;
use App\Http\Controllers\Api\TranslationController;

Route::get('/', function () {
    return view('welcome');
});

// SEO routes
Route::get('/sitemap.xml', [SeoController::class, 'sitemap']);
Route::get('/robots.txt', [SeoController::class, 'robots']);

// API routes
Route::prefix('api')->group(function () {
    // Auth
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/password/forgot', [AuthController::class, 'forgotPassword']);
    Route::post('/password/reset', [AuthController::class, 'resetPassword']);

    // Public endpoints
    Route::get('/vehicles', [VehicleController::class, 'index']);
    Route::get('/vehicles/{vehicle}', [VehicleController::class, 'show']);
    Route::get('/settings/public', [SettingController::class, 'public']);
    
    // Plans (public)
    Route::get('/plans', [PlanController::class, 'index']);
    
    // Blog posts (public)
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{slug}', [PostController::class, 'show']);
    
    // Export endpoints (public with token auth)
    Route::get('/export/vehicles.xml', [ExportController::class, 'xml']);
    Route::get('/export/vehicles.csv', [ExportController::class, 'csv']);

    // Currency / Exchange Rates (public)
    Route::get('/exchange-rates', [ExchangeRateController::class, 'index']);
    Route::post('/currency/convert', [ExchangeRateController::class, 'convert']);

    // Languages / Translations (public)
    Route::get('/languages', [TranslationController::class, 'languages']);
    Route::get('/translations/{locale}', [TranslationController::class, 'getTranslations']);

    // Protected endpoints
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::post('/vehicles', [VehicleController::class, 'store']);
        Route::match(['put', 'patch'], '/vehicles/{vehicle}', [VehicleController::class, 'update']);
        Route::delete('/vehicles/{vehicle}', [VehicleController::class, 'destroy']);

        // Favorites
        Route::get('/favorites', [FavoriteController::class, 'index']);
        Route::post('/favorites/toggle', [FavoriteController::class, 'toggle']);
        Route::get('/favorites/check/{vehicle}', [FavoriteController::class, 'check']);

        // Messaging
        Route::get('/conversations', [MessageController::class, 'conversations']);
        Route::get('/conversations/{conversation}/messages', [MessageController::class, 'messages']);
        Route::post('/messages/send', [MessageController::class, 'send']);
        Route::post('/conversations/{conversation}/mark-read', [MessageController::class, 'markAsRead']);
        Route::post('/vehicles/{vehicle}/start-conversation', [MessageController::class, 'startConversation']);

        // Subscriptions
        Route::post('/plans/{plan}/subscribe', [PlanController::class, 'subscribe']);
        Route::get('/subscriptions', [PlanController::class, 'mySubscriptions']);
        Route::post('/subscriptions/{subscription}/cancel', [PlanController::class, 'cancel']);

        // User Profile & Settings
        Route::patch('/user/profile', [UserController::class, 'updateProfile']);
        Route::post('/user/password', [UserController::class, 'changePassword']);
    });
});
