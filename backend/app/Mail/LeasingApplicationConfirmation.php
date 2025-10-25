<?php

namespace App\Mail;

use App\Models\LeasingApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LeasingApplicationConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public LeasingApplication $application;

    public function __construct(LeasingApplication $application)
    {
        $this->application = $application;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmare Aplicare Leasing - Ref: ' . $this->application->id,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.leasing.confirmation',
            with: [
                'application' => $this->application,
                'applicantName' => $this->application->applicant_type === 'individual'
                    ? $this->application->first_name . ' ' . $this->application->last_name
                    : $this->application->company_name,
                'vehicleTitle' => $this->application->vehicle->make . ' ' . $this->application->vehicle->model,
                'monthlyPayment' => number_format($this->application->monthly_payment, 2),
                'downPayment' => number_format($this->application->down_payment_amount, 2),
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
