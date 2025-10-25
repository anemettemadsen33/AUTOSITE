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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('dealer_id')->nullable()->constrained()->onDelete('set null');
            $table->string('slug')->unique();
            $table->string('vin')->unique()->nullable();

            // Basic info
            $table->string('make');
            $table->string('model');
            $table->integer('year');
            $table->string('category')->nullable(); // SUV, Sedan, etc.

            // Pricing
            $table->decimal('price', 12, 2);
            $table->string('currency', 3)->default('EUR');

            // Specs
            $table->integer('mileage')->unsigned()->default(0);
            $table->enum('fuel', ['petrol', 'diesel', 'electric', 'hybrid', 'plugin_hybrid', 'other'])->nullable();
            $table->enum('transmission', ['manual', 'automatic', 'semi_automatic'])->nullable();
            $table->enum('body_type', ['sedan', 'suv', 'coupe', 'convertible', 'wagon', 'van', 'truck', 'hatchback', 'other'])->nullable();
            $table->integer('power_hp')->unsigned()->nullable();
            $table->integer('doors')->unsigned()->nullable();
            $table->integer('seats')->unsigned()->nullable();
            $table->decimal('engine_size', 4, 1)->nullable(); // in liters

            // Colors
            $table->string('exterior_color')->nullable();
            $table->string('interior_color')->nullable();
            $table->string('color')->nullable(); // alias for exterior_color

            // Condition
            $table->enum('condition', ['new', 'used', 'certified'])->default('used');

            // Content
            $table->json('title')->nullable(); // translatable
            $table->json('description')->nullable(); // translatable
            $table->json('features')->nullable(); // array of features

            // Location
            $table->string('location_country')->nullable();
            $table->string('location_city')->nullable();
            $table->string('location')->nullable(); // combined location string

            // Status
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->integer('views_count')->default(0);

            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index('user_id');
            $table->index('dealer_id');
            $table->index('slug');
            $table->index('make');
            $table->index('model');
            $table->index('year');
            $table->index('price');
            $table->index('fuel');
            $table->index('transmission');
            $table->index('body_type');
            $table->index('is_published');
            $table->index('is_featured');
            $table->index('created_at');
            $table->index(['make', 'model', 'year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
