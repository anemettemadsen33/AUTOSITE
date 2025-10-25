<?php

namespace App\Notifications;

use App\Models\Vehicle;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewVehicleAlert extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Vehicle $vehicle)
    {
    }

    public function via($notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Vehicle Alert: ' . $this->vehicle->title)
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('A new vehicle matching your saved search has been listed:')
            ->line('**' . $this->vehicle->title . '**')
            ->line('Price: €' . number_format($this->vehicle->price, 0, ',', '.'))
            ->line('Year: ' . $this->vehicle->year)
            ->line('Mileage: ' . number_format($this->vehicle->mileage, 0, ',', '.') . ' km')
            ->action('View Vehicle', url('/vehicles/' . $this->vehicle->slug))
            ->line('Thank you for using AutoSite!');
    }

    public function toArray($notifiable): array
    {
        return [
            'vehicle_id' => $this->vehicle->id,
            'vehicle_title' => $this->vehicle->title,
            'vehicle_slug' => $this->vehicle->slug,
            'vehicle_price' => $this->vehicle->price,
        ];
    }
}
