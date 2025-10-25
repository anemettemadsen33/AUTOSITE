<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeasingApplication extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'vehicle_id',
        'applicant_id',
        'applicant_type',
        // Individual
        'first_name',
        'last_name',
        'cnp',
        'email',
        'phone',
        'monthly_income',
        'employer',
        // Company
        'company_name',
        'cui',
        'legal_representative',
        'legal_rep_email',
        'legal_rep_phone',
        // Leasing terms
        'vehicle_price',
        'down_payment_percentage',
        'down_payment_amount',
        'term_months',
        'apr',
        'monthly_payment',
        'total_amount',
        'total_interest',
        'currency',
        // Status & checks
        'status',
        'credit_check_consent',
        'credit_score',
        'credit_check_result',
        'credit_checked_at',
        // Documents & contract
        'required_documents',
        'uploaded_documents',
        'documents_verified_at',
        'contract_number',
        'contract_path',
        'contract_sent_at',
        'contract_signed_at',
        // Consents & review
        'gdpr_consent',
        'terms_consent',
        'reviewer_notes',
        'reviewed_by',
        'reviewed_at',
        'rejection_reason',
    ];

    protected $casts = [
        'monthly_income' => 'decimal:2',
        'vehicle_price' => 'decimal:2',
        'down_payment_percentage' => 'decimal:2',
        'down_payment_amount' => 'decimal:2',
        'apr' => 'decimal:2',
        'monthly_payment' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'total_interest' => 'decimal:2',
        'credit_check_consent' => 'boolean',
        'gdpr_consent' => 'boolean',
        'terms_consent' => 'boolean',
        'required_documents' => 'array',
        'uploaded_documents' => 'array',
        'credit_checked_at' => 'datetime',
        'documents_verified_at' => 'datetime',
        'contract_sent_at' => 'datetime',
        'contract_signed_at' => 'datetime',
        'reviewed_at' => 'datetime',
    ];

    // Relationships
    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(User::class, 'applicant_id');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    // Generate contract number
    public static function generateContractNumber(): string
    {
        $prefix = 'LEASE';
        $year = date('Y');
        
        $lastApplication = static::whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();
        
        $sequence = $lastApplication ? ((int) substr($lastApplication->contract_number, -5)) + 1 : 1;
        
        return sprintf('%s-%s-%05d', $prefix, $year, $sequence);
    }

    // Calculate leasing terms
    public function calculateLeasingTerms(): void
    {
        $this->down_payment_amount = $this->vehicle_price * ($this->down_payment_percentage / 100);
        
        $principal = $this->vehicle_price - $this->down_payment_amount;
        $monthlyRate = ($this->apr / 100) / 12;
        
        if ($monthlyRate > 0) {
            $this->monthly_payment = $principal * 
                ($monthlyRate * pow(1 + $monthlyRate, $this->term_months)) / 
                (pow(1 + $monthlyRate, $this->term_months) - 1);
        } else {
            $this->monthly_payment = $principal / $this->term_months;
        }
        
        $this->total_amount = $this->down_payment_amount + ($this->monthly_payment * $this->term_months);
        $this->total_interest = $this->total_amount - $this->vehicle_price;
    }
}
