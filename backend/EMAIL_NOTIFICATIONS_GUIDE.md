# 📧 AUTOSITE Backend - Email Notifications Guide

**Created**: 29 October 2025  
**Status**: Day 3 - Email Notifications System  
**Framework**: Laravel 11 Mail & Notifications

---

## 📋 Overview

AUTOSITE has a comprehensive email notification system for user engagement and communication. All emails support:
- ✅ **Queue processing** (database driver)
- ✅ **Multi-language support** (8 EU languages)
- ✅ **Markdown templates** (responsive, beautiful emails)
- ✅ **Development testing** (Mailtrap, Log driver)
- ✅ **Production ready** (SMTP, Mailgun, SES)

---

## 🚀 Quick Start

### Development Setup

```bash
# 1. Configure .env for development (using log driver)
MAIL_MAILER=log
MAIL_FROM_ADDRESS="noreply@autosite.com"
MAIL_FROM_NAME="${APP_NAME}"

# 2. Run migrations (includes queue tables)
php artisan migrate

# 3. Start queue worker
php artisan queue:work

# 4. Test sending email
php artisan tinker
> Mail::to('test@example.com')->send(new App\Mail\WelcomeEmail($user));
```

### Production Setup

```bash
# Using Mailtrap for testing
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password

# Using Mailgun
MAIL_MAILER=mailgun
MAILGUN_DOMAIN=mg.autosite.com
MAILGUN_SECRET=your_key

# Using Amazon SES
MAIL_MAILER=ses
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_DEFAULT_REGION=eu-central-1
```

---

## 📬 Available Mailables

### 1. WelcomeEmail
**Sent when**: New user registers  
**To**: New user  
**Purpose**: Welcome message with next steps

```php
use App\Mail\WelcomeEmail;

Mail::to($user->email)->send(new WelcomeEmail($user));
```

### 2. VehicleInquiryEmail
**Sent when**: Buyer contacts dealer about vehicle  
**To**: Dealer  
**Purpose**: Notify dealer of inquiry with buyer details

```php
use App\Mail\VehicleInquiryEmail;

Mail::to($dealer->email)->send(
    new VehicleInquiryEmail($vehicle, $inquiry)
);
```

### 3. TestDriveConfirmationEmail
**Sent when**: Test drive is booked  
**To**: Buyer and Dealer  
**Purpose**: Confirm test drive appointment

```php
use App\Mail\TestDriveConfirmationEmail;

// To buyer
Mail::to($buyer->email)->send(
    new TestDriveConfirmationEmail($testDrive)
);

// To dealer
Mail::to($dealer->email)->send(
    new TestDriveConfirmationEmail($testDrive, 'dealer')
);
```

### 4. OrderConfirmation
**Sent when**: Order is placed  
**To**: Buyer  
**Purpose**: Confirm order details and next steps

```php
use App\Mail\OrderConfirmation;

Mail::to($order->email)->send(new OrderConfirmation($order));
```

### 5. LeasingApplicationConfirmation
**Sent when**: Leasing application is submitted  
**To**: Applicant  
**Purpose**: Confirm application received

```php
use App\Mail\LeasingApplicationConfirmation;

Mail::to($application->email)->send(
    new LeasingApplicationConfirmation($application)
);
```

### 6. PasswordResetEmail
**Sent when**: User requests password reset  
**To**: User  
**Purpose**: Password reset link

```php
// Automatically sent by Laravel
$user->sendPasswordResetNotification($token);
```

---

## 🔔 Available Notifications

### 1. NewVehicleAlert
**Sent when**: New vehicle matching user's saved search  
**To**: Users with matching saved searches  
**Channels**: Email, Database

```php
use App\Notifications\NewVehicleAlert;

$user->notify(new NewVehicleAlert($vehicle));
```

### 2. PriceDropAlert
**Sent when**: Price drops on favorited vehicle  
**To**: Users who favorited the vehicle  
**Channels**: Email, Database

```php
use App\Notifications\PriceDropAlert;

$user->notify(new PriceDropAlert($vehicle, $oldPrice, $newPrice));
```

### 3. TestDriveConfirmation
**Sent when**: Test drive booking confirmed  
**To**: Buyer  
**Channels**: Email, Database

```php
use App\Notifications\TestDriveConfirmation;

$user->notify(new TestDriveConfirmation($testDrive));
```

### 4. MessageReceived
**Sent when**: New message from dealer/buyer  
**To**: Recipient  
**Channels**: Email, Database

```php
use App\Notifications\MessageReceived;

$user->notify(new MessageReceived($message));
```

### 5. FavoriteVehicleSold
**Sent when**: Favorited vehicle is sold  
**To**: Users who favorited the vehicle  
**Channels**: Email, Database

```php
use App\Notifications\FavoriteVehicleSold;

$user->notify(new FavoriteVehicleSold($vehicle));
```

---

## 🎨 Email Templates

### Markdown Templates Location

```
resources/views/emails/
├── welcome.blade.php
├── vehicle-inquiry.blade.php
├── password-reset.blade.php
├── orders/
│   └── confirmation.blade.php
├── leasing/
│   └── confirmation.blade.php
└── test-drives/
    └── confirmation.blade.php
```

### Example Template Structure

```blade
@component('mail::message')
# Welcome to AUTOSITE!

Hello {{ $user->name }},

Thank you for joining AUTOSITE, the premier automotive marketplace platform.

## What's Next?

- Browse thousands of vehicles
- Save your favorite cars
- Contact dealers directly
- Schedule test drives

@component('mail::button', ['url' => $dashboardUrl])
View Dashboard
@endcomponent

Need help? [Contact Support]({{ $supportUrl }})

Thanks,<br>
{{ config('app.name') }}
@endcomponent
```

---

## 🔧 Creating New Mailables

### Step 1: Generate Mailable

```bash
php artisan make:mail WelcomeEmail --markdown=emails.welcome
```

### Step 2: Implement Mailable

```php
<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to AUTOSITE!',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.welcome',
            with: [
                'dashboardUrl' => url('/dashboard'),
                'supportUrl' => url('/support'),
            ],
        );
    }
}
```

### Step 3: Create Blade Template

```blade
@component('mail::message')
# Welcome {{ $user->name }}!

Your AUTOSITE account is ready.

@component('mail::button', ['url' => $dashboardUrl])
Get Started
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
```

### Step 4: Send Email

```php
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;

Mail::to($user->email)->send(new WelcomeEmail($user));
```

---

## 🔔 Creating New Notifications

### Step 1: Generate Notification

```bash
php artisan make:notification NewVehicleAlert
```

### Step 2: Implement Notification

```php
<?php

namespace App\Notifications;

use App\Models\Vehicle;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewVehicleAlert extends Notification
{
    use Queueable;

    public function __construct(
        public Vehicle $vehicle
    ) {}

    public function via($notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Vehicle Alert!')
            ->greeting('Hi ' . $notifiable->name)
            ->line('A new vehicle matching your search is available:')
            ->line($this->vehicle->make . ' ' . $this->vehicle->model . ' - €' . number_format($this->vehicle->price))
            ->action('View Vehicle', url('/vehicles/' . $this->vehicle->slug))
            ->line('Don\'t miss this opportunity!');
    }

    public function toArray($notifiable): array
    {
        return [
            'vehicle_id' => $this->vehicle->id,
            'vehicle_make' => $this->vehicle->make,
            'vehicle_model' => $this->vehicle->model,
            'vehicle_price' => $this->vehicle->price,
        ];
    }
}
```

### Step 3: Send Notification

```php
$user->notify(new NewVehicleAlert($vehicle));
```

---

## ⚙️ Queue Configuration

### Database Queue Setup

```bash
# 1. Migrations already exist
php artisan migrate

# 2. Start queue worker
php artisan queue:work

# 3. For development (restart on code changes)
php artisan queue:work --queue=default --tries=3

# 4. For production (use Supervisor)
php artisan queue:work --daemon --queue=default --tries=3 --timeout=60
```

### Supervisor Configuration

```ini
[program:autosite-queue]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/autosite/backend/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/path/to/autosite/backend/storage/logs/worker.log
```

---

## 🧪 Testing Emails

### Unit Testing

```php
use App\Mail\WelcomeEmail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

test('welcome email is sent to new user', function () {
    Mail::fake();
    
    $user = User::factory()->create();
    
    Mail::to($user->email)->send(new WelcomeEmail($user));
    
    Mail::assertSent(WelcomeEmail::class, function ($mail) use ($user) {
        return $mail->hasTo($user->email);
    });
});
```

### Feature Testing

```php
test('user receives welcome email after registration', function () {
    Mail::fake();
    
    $response = postJson('/api/v1/auth/register', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);
    
    $response->assertStatus(201);
    
    Mail::assertSent(WelcomeEmail::class);
});
```

### Manual Testing

```bash
# Using Tinker
php artisan tinker

> $user = User::first();
> Mail::to($user->email)->send(new App\Mail\WelcomeEmail($user));

# Check logs
tail -f storage/logs/laravel.log
```

---

## 📊 Email Analytics

### Track Email Events

```php
// In Mailable
use Illuminate\Mail\Mailables\Envelope;

public function envelope(): Envelope
{
    return new Envelope(
        subject: 'Welcome!',
        tags: ['welcome', 'onboarding'],
        metadata: [
            'user_id' => $this->user->id,
            'campaign' => 'welcome_series',
        ],
    );
}
```

### Monitor Queue

```bash
# Check queue status
php artisan queue:monitor

# Failed jobs
php artisan queue:failed

# Retry failed jobs
php artisan queue:retry all
```

---

## 🎯 Best Practices

### 1. Always Queue Emails

```php
// Good - Queued (non-blocking)
Mail::to($user->email)->queue(new WelcomeEmail($user));

// Avoid - Synchronous (blocking)
Mail::to($user->email)->send(new WelcomeEmail($user));
```

### 2. Use Markdown Templates

```php
// Good - Consistent, responsive
return new Content(
    markdown: 'emails.welcome'
);

// Avoid - Custom HTML (maintenance overhead)
return new Content(
    view: 'emails.custom-html'
);
```

### 3. Handle Failures Gracefully

```php
use Illuminate\Support\Facades\Log;

try {
    Mail::to($user->email)->send(new WelcomeEmail($user));
} catch (\Exception $e) {
    Log::error('Failed to send welcome email', [
        'user_id' => $user->id,
        'error' => $e->getMessage()
    ]);
}
```

### 4. Localize Email Content

```php
public function envelope(): Envelope
{
    return new Envelope(
        subject: __('emails.welcome.subject'),
    );
}

public function content(): Content
{
    return new Content(
        markdown: 'emails.welcome',
        with: [
            'greeting' => __('emails.welcome.greeting', ['name' => $this->user->name]),
        ],
    );
}
```

### 5. Batch Notifications

```php
// Notify multiple users efficiently
Notification::send($users, new NewVehicleAlert($vehicle));
```

---

## 🔐 Security

### Prevent Email Enumeration

```php
// Don't reveal if email exists
if ($user = User::where('email', $email)->first()) {
    Mail::to($user->email)->send(new PasswordResetEmail($user, $token));
}

// Always return success response
return response()->json(['message' => 'If email exists, reset link sent']);
```

### Rate Limiting

```php
// Limit password reset emails
RateLimiter::attempt(
    'send-password-reset:' . $request->ip(),
    $perMinute = 3,
    function() use ($user, $token) {
        Mail::to($user->email)->send(new PasswordResetEmail($user, $token));
    }
);
```

---

## 📚 Resources

- [Laravel Mail Documentation](https://laravel.com/docs/mail)
- [Laravel Notifications](https://laravel.com/docs/notifications)
- [Laravel Queues](https://laravel.com/docs/queues)
- [Markdown Mail Templates](https://laravel.com/docs/mail#markdown-mailables)
- [Mailtrap](https://mailtrap.io/) - Email testing
- [Mailgun](https://www.mailgun.com/) - Email delivery

---

## ✅ Current Status

**Implemented**:
- ✅ OrderConfirmation mailable
- ✅ LeasingApplicationConfirmation mailable
- ✅ NewVehicleAlert notification
- ✅ PriceDropAlert notification
- ✅ TestDriveConfirmation notification
- ✅ Queue system (database driver)
- ✅ Markdown templates
- ✅ Multi-language support ready

**Ready to Add**:
- [ ] WelcomeEmail mailable
- [ ] VehicleInquiryEmail mailable
- [ ] MessageReceived notification
- [ ] FavoriteVehicleSold notification
- [ ] Email templates for all mailables
- [ ] Comprehensive tests

---

## 🎯 Integration Examples

### In AuthController (Registration)

```php
use App\Mail\WelcomeEmail;

public function register(Request $request)
{
    $user = User::create($validated);
    
    // Send welcome email (queued)
    Mail::to($user->email)->queue(new WelcomeEmail($user));
    
    return response()->json(['user' => $user, 'token' => $token]);
}
```

### In VehicleController (New Vehicle)

```php
use App\Notifications\NewVehicleAlert;

public function store(Request $request)
{
    $vehicle = Vehicle::create($validated);
    
    // Notify users with matching saved searches
    $users = User::whereHas('savedSearches', function ($query) use ($vehicle) {
        $query->where('make', $vehicle->make)
              ->where('price_max', '>=', $vehicle->price);
    })->get();
    
    Notification::send($users, new NewVehicleAlert($vehicle));
    
    return response()->json(['data' => $vehicle], 201);
}
```

---

**Status**: ✅ Email System Active  
**Queue**: Database Driver  
**Last Updated**: 29 October 2025

---

*Part of AUTOSITE Week 1 Implementation - Day 3*
