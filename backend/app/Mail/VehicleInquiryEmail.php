<?php

namespace App\Mail;

use App\Models\Vehicle;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VehicleInquiryEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public Vehicle $vehicle,
        public array $inquiry
    ) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Inquiry: ' . $this->vehicle->make . ' ' . $this->vehicle->model,
            tags: ['inquiry', 'lead'],
            metadata: [
                'vehicle_id' => $this->vehicle->id,
                'inquiry_from' => $this->inquiry['email'] ?? 'unknown',
            ],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.vehicle-inquiry',
            with: [
                'vehicle' => $this->vehicle,
                'inquiry' => $this->inquiry,
                'vehicleUrl' => config('app.frontend_url') . '/vehicles/' . $this->vehicle->slug,
                'replyToEmail' => $this->inquiry['email'] ?? null,
                'inquiryName' => $this->inquiry['name'] ?? 'Unknown',
                'inquiryMessage' => $this->inquiry['message'] ?? '',
                'inquiryPhone' => $this->inquiry['phone'] ?? null,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
