<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'vehicle_id',
        'buyer_id',
        'seller_id',
        'buyer_type',
        // Individual
        'first_name',
        'last_name',
        'cnp',
        'birth_date',
        // Company
        'company_name',
        'cui',
        'vat_number',
        'company_address',
        'company_city',
        'company_postal_code',
        'legal_representative',
        'legal_rep_position',
        'legal_rep_phone',
        'legal_rep_email',
        // Contact
        'email',
        'phone',
        'address',
        'city',
        'postal_code',
        // Financial
        'vehicle_price',
        'vat_amount',
        'processing_fee',
        'total_amount',
        'currency',
        // Status
        'status',
        'payment_method',
        'payment_reference',
        'payment_date',
        // Invoice
        'invoice_number',
        'invoice_path',
        // Consents
        'gdpr_consent',
        'terms_consent',
        'notes',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'payment_date' => 'datetime',
        'vehicle_price' => 'decimal:2',
        'vat_amount' => 'decimal:2',
        'processing_fee' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'gdpr_consent' => 'boolean',
        'terms_consent' => 'boolean',
    ];

    // Relationships
    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    // Generate invoice number
    public static function generateInvoiceNumber(): string
    {
        $prefix = 'INV';
        $year = date('Y');
        $month = date('m');
        
        $lastOrder = static::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->orderBy('id', 'desc')
            ->first();
        
        $sequence = $lastOrder ? ((int) substr($lastOrder->invoice_number, -4)) + 1 : 1;
        
        return sprintf('%s-%s%s-%04d', $prefix, $year, $month, $sequence);
    }

    // Calculate totals
    public function calculateTotals(): void
    {
        $this->vat_amount = $this->buyer_type === 'company' ? $this->vehicle_price * 0.19 : 0;
        $this->total_amount = $this->vehicle_price + $this->vat_amount + $this->processing_fee;
    }
}
