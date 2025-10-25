<?php

namespace App\Notifications;

use App\Models\Vehicle;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PriceDropAlert extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Vehicle $vehicle,
        public float $oldPrice,
        public float $newPrice
    ) {
    }

    public function via($notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable): MailMessage
    {
        $discount = round((($this->oldPrice - $this->newPrice) / $this->oldPrice) * 100);
        
        return (new MailMessage)
            ->subject('Price Drop Alert: ' . $this->vehicle->title)
            ->greeting('Great News, ' . $notifiable->name . '!')
            ->line('The price has dropped on a vehicle you\'re watching:')
            ->line('**' . $this->vehicle->title . '**')
            ->line('Old Price: €' . number_format($this->oldPrice, 0, ',', '.'))
            ->line('New Price: €' . number_format($this->newPrice, 0, ',', '.'))
            ->line('**Save ' . $discount . '%!**')
            ->action('View Vehicle', url('/vehicles/' . $this->vehicle->slug))
            ->line('Don\'t miss this opportunity!');
    }

    public function toArray($notifiable): array
    {
        return [
            'vehicle_id' => $this->vehicle->id,
            'vehicle_title' => $this->vehicle->title,
            'vehicle_slug' => $this->vehicle->slug,
            'old_price' => $this->oldPrice,
            'new_price' => $this->newPrice,
            'discount_percent' => round((($this->oldPrice - $this->newPrice) / $this->oldPrice) * 100),
        ];
    }
}
