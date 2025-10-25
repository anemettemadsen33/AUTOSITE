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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_id')->constrained()->onDelete('cascade');
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            
            // Buyer information
            $table->enum('buyer_type', ['individual', 'company']);
            
            // Individual buyer fields
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('cnp')->nullable();
            $table->date('birth_date')->nullable();
            
            // Company buyer fields
            $table->string('company_name')->nullable();
            $table->string('cui')->nullable();
            $table->string('vat_number')->nullable();
            $table->string('company_address')->nullable();
            $table->string('company_city')->nullable();
            $table->string('company_postal_code')->nullable();
            $table->string('legal_representative')->nullable();
            $table->string('legal_rep_position')->nullable();
            $table->string('legal_rep_phone')->nullable();
            $table->string('legal_rep_email')->nullable();
            
            // Common contact fields
            $table->string('email');
            $table->string('phone');
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('postal_code')->nullable();
            
            // Financial details
            $table->decimal('vehicle_price', 10, 2);
            $table->decimal('vat_amount', 10, 2)->default(0);
            $table->decimal('processing_fee', 10, 2)->default(99);
            $table->decimal('total_amount', 10, 2);
            $table->string('currency', 3)->default('EUR');
            
            // Order status
            $table->enum('status', [
                'pending_payment',
                'payment_received',
                'processing',
                'completed',
                'cancelled'
            ])->default('pending_payment');
            
            // Payment details
            $table->string('payment_method')->nullable(); // bank_transfer, stripe, etc
            $table->string('payment_reference')->nullable();
            $table->timestamp('payment_date')->nullable();
            
            // Invoice
            $table->string('invoice_number')->unique()->nullable();
            $table->string('invoice_path')->nullable();
            
            // Consents
            $table->boolean('gdpr_consent')->default(false);
            $table->boolean('terms_consent')->default(false);
            
            // Notes
            $table->text('notes')->nullable();
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('buyer_id');
            $table->index('seller_id');
            $table->index('vehicle_id');
            $table->index('status');
            $table->index('invoice_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
