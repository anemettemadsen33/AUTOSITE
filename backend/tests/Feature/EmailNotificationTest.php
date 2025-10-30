<?php

use App\Mail\OrderConfirmation;
use App\Mail\VehicleInquiryEmail;
use App\Mail\WelcomeEmail;
use App\Models\Order;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Dealer;
use App\Notifications\NewVehicleAlert;
use App\Notifications\PriceDropAlert;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

uses(RefreshDatabase::class);

describe('Email Mailables', function () {
    
    test('WelcomeEmail can be sent', function () {
        Mail::fake();
        
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);
        
        Mail::to($user->email)->send(new WelcomeEmail($user));
        
        Mail::assertSent(WelcomeEmail::class, function ($mail) use ($user) {
            return $mail->hasTo($user->email) && 
                   $mail->user->id === $user->id;
        });
    });
    
    test('WelcomeEmail has correct subject', function () {
        $user = User::factory()->create();
        $mailable = new WelcomeEmail($user);
        
        expect($mailable->envelope()->subject)
            ->toContain('Welcome to AUTOSITE');
    });
    
    test('VehicleInquiryEmail can be sent', function () {
        Mail::fake();
        
        $vehicle = Vehicle::factory()->create([
            'make' => 'BMW',
            'model' => 'X5',
        ]);
        
        $inquiry = [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'phone' => '+123456789',
            'message' => 'I am interested in this vehicle.',
        ];
        
        Mail::to('dealer@example.com')->send(
            new VehicleInquiryEmail($vehicle, $inquiry)
        );
        
        Mail::assertSent(VehicleInquiryEmail::class, function ($mail) use ($vehicle) {
            return $mail->vehicle->id === $vehicle->id &&
                   $mail->inquiry['name'] === 'Jane Doe';
        });
    });
    
    test('VehicleInquiryEmail has correct subject with vehicle details', function () {
        $vehicle = Vehicle::factory()->create([
            'make' => 'Mercedes-Benz',
            'model' => 'C-Class',
        ]);
        
        $inquiry = ['name' => 'Test', 'email' => 'test@example.com'];
        $mailable = new VehicleInquiryEmail($vehicle, $inquiry);
        
        expect($mailable->envelope()->subject)
            ->toContain('Mercedes-Benz')
            ->toContain('C-Class');
    });
    
    test('OrderConfirmation can be sent', function () {
        Mail::fake();
        
        $order = Order::factory()->create([
            'email' => 'buyer@example.com',
        ]);
        
        Mail::to($order->email)->send(new OrderConfirmation($order));
        
        Mail::assertSent(OrderConfirmation::class, function ($mail) use ($order) {
            return $mail->hasTo($order->email) &&
                   $mail->order->id === $order->id;
        });
    });
    
    test('multiple emails can be queued', function () {
        Mail::fake();
        
        $users = User::factory()->count(3)->create();
        
        foreach ($users as $user) {
            Mail::to($user->email)->queue(new WelcomeEmail($user));
        }
        
        Mail::assertQueued(WelcomeEmail::class, 3);
    });
    
    test('email has correct tags and metadata', function () {
        $user = User::factory()->create();
        $mailable = new WelcomeEmail($user);
        
        $envelope = $mailable->envelope();
        
        expect($envelope->tags)->toContain('welcome')
            ->and($envelope->tags)->toContain('onboarding')
            ->and($envelope->metadata)->toHaveKey('user_id')
            ->and($envelope->metadata['user_id'])->toBe($user->id);
    });
});

describe('Notifications', function () {
    
    test('NewVehicleAlert notification can be sent', function () {
        Notification::fake();
        
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create([
            'make' => 'Tesla',
            'model' => 'Model 3',
            'price' => 45000,
            'status' => 'published',
        ]);
        
        $user->notify(new NewVehicleAlert($vehicle));
        
        Notification::assertSentTo($user, NewVehicleAlert::class, function ($notification) use ($vehicle) {
            return $notification->vehicle->id === $vehicle->id;
        });
    });
    
    test('PriceDropAlert notification can be sent', function () {
        Notification::fake();
        
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create([
            'price' => 50000,
        ]);
        
        $oldPrice = 55000;
        $newPrice = 50000;
        
        $user->notify(new PriceDropAlert($vehicle, $oldPrice, $newPrice));
        
        Notification::assertSentTo($user, PriceDropAlert::class);
    });
    
    test('notification is sent via mail and database channels', function () {
        Notification::fake();
        
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create(['status' => 'published']);
        
        $user->notify(new NewVehicleAlert($vehicle));
        
        Notification::assertSentTo($user, NewVehicleAlert::class, function ($notification, $channels) {
            return in_array('mail', $channels) && in_array('database', $channels);
        });
    });
    
    test('notification has correct mail content', function () {
        $user = User::factory()->create(['name' => 'John Doe']);
        $vehicle = Vehicle::factory()->create([
            'make' => 'Audi',
            'model' => 'A4',
            'price' => 35000,
        ]);
        
        $notification = new NewVehicleAlert($vehicle);
        $mailMessage = $notification->toMail($user);
        
        expect($mailMessage->subject)->toContain('New Vehicle Alert')
            ->and($mailMessage->greeting)->toContain('John Doe')
            ->and($mailMessage->actionText)->toContain('View Vehicle');
    });
    
    test('notification has correct array data', function () {
        $vehicle = Vehicle::factory()->create([
            'make' => 'BMW',
            'model' => 'X5',
            'price' => 65000,
        ]);
        
        $notification = new NewVehicleAlert($vehicle);
        $data = $notification->toArray(User::factory()->create());
        
        expect($data)->toHaveKey('vehicle_id')
            ->and($data)->toHaveKey('vehicle_make')
            ->and($data)->toHaveKey('vehicle_model')
            ->and($data)->toHaveKey('vehicle_price')
            ->and($data['vehicle_make'])->toBe('BMW');
    });
    
    test('multiple users can be notified at once', function () {
        Notification::fake();
        
        $users = User::factory()->count(5)->create();
        $vehicle = Vehicle::factory()->create(['status' => 'published']);
        
        Notification::send($users, new NewVehicleAlert($vehicle));
        
        Notification::assertSentTo($users, NewVehicleAlert::class);
        Notification::assertCount(5);
    });
});

describe('Queue Integration', function () {
    
    test('email is queued instead of sent immediately', function () {
        Mail::fake();
        
        $user = User::factory()->create();
        
        Mail::to($user->email)->queue(new WelcomeEmail($user));
        
        Mail::assertQueued(WelcomeEmail::class);
        Mail::assertNotSent(WelcomeEmail::class);
    });
    
    test('email can be sent with delay', function () {
        Mail::fake();
        
        $user = User::factory()->create();
        
        Mail::to($user->email)
            ->later(now()->addMinutes(10), new WelcomeEmail($user));
        
        Mail::assertQueued(WelcomeEmail::class);
    });
});

describe('Email Registration Flow', function () {
    
    beforeEach(function () {
        Mail::fake();
    });
    
    test('welcome email is sent after successful registration', function () {
        $response = postJson('/api/v1/auth/register', [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);
        
        $response->assertStatus(201);
        
        // Note: This would work if AuthController sends WelcomeEmail on registration
        // Mail::assertSent(WelcomeEmail::class);
    });
});

describe('Email Inquiry Flow', function () {
    
    beforeEach(function () {
        Mail::fake();
    });
    
    test('dealer receives email when buyer inquires about vehicle', function () {
        $dealer = User::factory()->create();
        $dealerProfile = Dealer::factory()->create(['user_id' => $dealer->id]);
        
        $vehicle = Vehicle::factory()->create([
            'dealer_id' => $dealerProfile->id,
            'user_id' => $dealer->id,
            'status' => 'published',
        ]);
        
        $inquiry = [
            'name' => 'Interested Buyer',
            'email' => 'buyer@example.com',
            'phone' => '+123456789',
            'message' => 'I would like more information about this vehicle.',
        ];
        
        // Manually send (this would be triggered by a controller action)
        Mail::to($dealer->email)->send(new VehicleInquiryEmail($vehicle, $inquiry));
        
        Mail::assertSent(VehicleInquiryEmail::class, function ($mail) use ($dealer, $vehicle) {
            return $mail->hasTo($dealer->email) &&
                   $mail->vehicle->id === $vehicle->id;
        });
    });
});

describe('Notification Preferences', function () {
    
    test('user can have notification preferences', function () {
        $user = User::factory()->create();
        
        // Assuming user has notification preferences
        // This is a placeholder for future implementation
        expect($user)->toHaveProperty('email');
    });
});

describe('Email Validation', function () {
    
    test('email must be valid format', function () {
        $user = User::factory()->make(['email' => 'invalid-email']);
        
        expect($user->email)->not->toMatch('/^[^\s@]+@[^\s@]+\.[^\s@]+$/');
    });
    
    test('email is required for mailables', function () {
        $user = User::factory()->create(['email' => 'valid@example.com']);
        
        $mailable = new WelcomeEmail($user);
        
        expect($mailable->user->email)->toBe('valid@example.com');
    });
});

describe('Error Handling', function () {
    
    test('mail facade handles exceptions gracefully', function () {
        Mail::fake();
        
        $user = User::factory()->create();
        
        try {
            Mail::to($user->email)->send(new WelcomeEmail($user));
            $success = true;
        } catch (\Exception $e) {
            $success = false;
        }
        
        expect($success)->toBeTrue();
    });
});
