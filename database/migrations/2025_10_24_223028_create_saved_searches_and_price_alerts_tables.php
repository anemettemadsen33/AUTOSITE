<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Saved Searches Table
        Schema::create('saved_searches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->json('criteria'); // Stores search filters (make, model, price range, etc.)
            $table->boolean('notify')->default(true); // Send notifications for new matches
            $table->timestamp('last_notified_at')->nullable();
            $table->timestamps();
        });

        // Price Alerts Table
        Schema::create('price_alerts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('make')->nullable();
            $table->string('model')->nullable();
            $table->integer('year_from')->nullable();
            $table->integer('year_to')->nullable();
            $table->decimal('target_price', 10, 2);
            $table->enum('condition', ['below', 'above'])->default('below');
            $table->boolean('active')->default(true);
            $table->timestamp('last_triggered_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('price_alerts');
        Schema::dropIfExists('saved_searches');
    }
};
