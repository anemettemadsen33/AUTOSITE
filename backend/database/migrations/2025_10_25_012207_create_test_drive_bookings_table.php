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
        Schema::create('test_drive_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('vehicle_id')->constrained()->onDelete('cascade');
            $table->foreignId('dealer_id')->nullable()->constrained()->onDelete('set null');
            $table->dateTime('preferred_date');
            $table->string('preferred_time')->nullable();
            $table->enum('status', ['pending', 'confirmed', 'declined', 'completed', 'cancelled'])->default('pending');
            $table->string('contact_name');
            $table->string('contact_phone');
            $table->string('contact_email');
            $table->text('notes')->nullable();
            $table->text('dealer_notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('user_id');
            $table->index('vehicle_id');
            $table->index('dealer_id');
            $table->index('status');
            $table->index('preferred_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test_drive_bookings');
    }
};
