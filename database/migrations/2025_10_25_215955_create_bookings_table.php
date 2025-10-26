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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('vehicle_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('dealer_id')->nullable()->constrained()->onDelete('set null');
            $table->string('booking_type'); // test_drive, viewing, service
            $table->dateTime('booking_date');
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->text('notes')->nullable();
            $table->string('status')->default('pending'); // pending, confirmed, cancelled, completed
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
