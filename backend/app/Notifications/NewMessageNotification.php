<?php

namespace App\Notifications;

use App\Models\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewMessageNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $message;

    /**
     * Create a new notification instance.
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $senderName = $this->message->sender->name;
        $messagePreview = \Illuminate\Support\Str::limit($this->message->message, 100);

        return (new MailMessage)
            ->subject('New Message from ' . $senderName)
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('You have received a new message from ' . $senderName . ':')
            ->line('"' . $messagePreview . '"')
            ->action('View Message', url('/messages/' . $this->message->thread_id))
            ->line('Thank you for using AUTOSITE!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'message_id' => $this->message->id,
            'thread_id' => $this->message->thread_id,
            'sender_id' => $this->message->sender_id,
            'sender_name' => $this->message->sender->name,
            'message_preview' => \Illuminate\Support\Str::limit($this->message->message, 100),
            'vehicle_id' => $this->message->vehicle_id,
        ];
    }
}
