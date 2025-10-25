<?php

namespace App\Notifications;

use App\Models\TestDriveBooking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TestDriveConfirmation extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public TestDriveBooking $booking)
    {
    }

    public function via($notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable): MailMessage
    {
        $vehicle = $this->booking->vehicle;
        
        return (new MailMessage)
            ->subject('Test Drive Confirmed: ' . $vehicle->title)
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('Your test drive has been confirmed!')
            ->line('**Vehicle:** ' . $vehicle->title)
            ->line('**Date:** ' . $this->booking->scheduled_at->format('l, F j, Y'))
            ->line('**Time:** ' . $this->booking->scheduled_at->format('g:i A'))
            ->line('**Dealer:** ' . $this->booking->dealer->name)
            ->line('**Location:** ' . $this->booking->dealer->address)
            ->action('View Details', url('/test-drives/' . $this->booking->id))
            ->line('We look forward to seeing you!')
            ->line('Please arrive 10 minutes early and bring your driver\'s license.');
    }

    public function toArray($notifiable): array
    {
        return [
            'booking_id' => $this->booking->id,
            'vehicle_title' => $this->booking->vehicle->title,
            'scheduled_at' => $this->booking->scheduled_at->toIso8601String(),
            'dealer_name' => $this->booking->dealer->name,
        ];
    }
}
