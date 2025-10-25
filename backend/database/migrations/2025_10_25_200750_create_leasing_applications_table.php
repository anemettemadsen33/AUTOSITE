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
        Schema::create('leasing_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_id')->constrained()->onDelete('cascade');
            $table->foreignId('applicant_id')->constrained('users')->onDelete('cascade');
            
            // Applicant type
            $table->enum('applicant_type', ['individual', 'company']);
            
            // Individual applicant fields
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('cnp')->nullable();
            $table->string('email');
            $table->string('phone');
            $table->decimal('monthly_income', 10, 2)->nullable();
            $table->string('employer')->nullable();
            
            // Company applicant fields
            $table->string('company_name')->nullable();
            $table->string('cui')->nullable();
            $table->string('legal_representative')->nullable();
            $table->string('legal_rep_email')->nullable();
            $table->string('legal_rep_phone')->nullable();
            
            // Leasing terms
            $table->decimal('vehicle_price', 10, 2);
            $table->decimal('down_payment_percentage', 5, 2); // e.g., 30.00 for 30%
            $table->decimal('down_payment_amount', 10, 2);
            $table->integer('term_months'); // 12, 24, 36, etc.
            $table->decimal('apr', 5, 2); // Annual Percentage Rate (e.g., 5.90)
            $table->decimal('monthly_payment', 10, 2);
            $table->decimal('total_amount', 10, 2); // down_payment + (monthly_payment * term_months)
            $table->decimal('total_interest', 10, 2);
            $table->string('currency', 3)->default('EUR');
            
            // Application status
            $table->enum('status', [
                'submitted',
                'documents_pending',
                'under_review',
                'credit_check',
                'approved',
                'rejected',
                'contract_sent',
                'contract_signed',
                'active',
                'completed',
                'cancelled'
            ])->default('submitted');
            
            // Credit check
            $table->boolean('credit_check_consent')->default(false);
            $table->string('credit_score')->nullable();
            $table->text('credit_check_result')->nullable();
            $table->timestamp('credit_checked_at')->nullable();
            
            // Documents
            $table->json('required_documents')->nullable(); // IDs, income proof, etc.
            $table->json('uploaded_documents')->nullable(); // paths to files
            $table->timestamp('documents_verified_at')->nullable();
            
            // Contract
            $table->string('contract_number')->unique()->nullable();
            $table->string('contract_path')->nullable();
            $table->timestamp('contract_sent_at')->nullable();
            $table->timestamp('contract_signed_at')->nullable();
            
            // Consents
            $table->boolean('gdpr_consent')->default(false);
            $table->boolean('terms_consent')->default(false);
            
            // Review & notes
            $table->text('reviewer_notes')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users');
            $table->timestamp('reviewed_at')->nullable();
            
            // Rejection reason
            $table->text('rejection_reason')->nullable();
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('applicant_id');
            $table->index('vehicle_id');
            $table->index('status');
            $table->index('contract_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leasing_applications');
    }
};
