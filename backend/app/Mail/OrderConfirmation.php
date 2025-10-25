<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public Order $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmare Comandă - ' . $this->order->invoice_number,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.orders.confirmation',
            with: [
                'order' => $this->order,
                'buyerName' => $this->order->buyer_type === 'individual' 
                    ? $this->order->first_name . ' ' . $this->order->last_name
                    : $this->order->company_name,
                'vehicleTitle' => $this->order->vehicle->make . ' ' . $this->order->vehicle->model,
            ]
        );
    }

    public function attachments(): array
    {
        $attachments = [];
        
        // Attach PDF invoice if exists
        if ($this->order->invoice_path && file_exists(storage_path('app/public/' . $this->order->invoice_path))) {
            $attachments[] = \Illuminate\Mail\Mailables\Attachment::fromPath(
                storage_path('app/public/' . $this->order->invoice_path)
            )->as('Factura-' . $this->order->invoice_number . '.pdf')
             ->withMime('application/pdf');
        }
        
        return $attachments;
    }
}
