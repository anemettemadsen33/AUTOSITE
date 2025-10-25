# 🚀 WebSocket Server - Laravel Reverb

**Date:** 25 Octombrie 2025, 22:55  
**Status:** ✅ **WEBSOCKET SERVER RUNNING**

---

## ✅ **INSTALLED & RUNNING:**

### **Laravel Reverb WebSocket Server**
- **Package:** laravel/reverb v1.6.0
- **Host:** 0.0.0.0 (all interfaces)
- **Port:** 8080
- **WebSocket URL:** ws://127.0.0.1:8080
- **Protocol:** Pusher-compatible

---

## 📋 **COMMANDS:**

### **Start Server:**
```bash
cd backend
php artisan reverb:start
```

### **Custom Port/Host:**
```bash
php artisan reverb:start --host=0.0.0.0 --port=8080
```

### **Restart Server:**
```bash
php artisan reverb:restart
```

### **Stop Server:**
```
Ctrl+C
```

---

## 🔧 **CONFIGURATION:**

### **1. Backend (.env):**
```env
BROADCAST_CONNECTION=reverb

REVERB_APP_ID=my-app-id
REVERB_APP_KEY=my-app-key
REVERB_APP_SECRET=my-app-secret
REVERB_HOST="0.0.0.0"
REVERB_PORT=8080
REVERB_SCHEME=http

VITE_REVERB_APP_KEY="${REVERB_APP_KEY}"
VITE_REVERB_HOST="${REVERB_HOST}"
VITE_REVERB_PORT="${REVERB_PORT}"
VITE_REVERB_SCHEME="${REVERB_SCHEME}"
```

### **2. Frontend - Install Laravel Echo:**
```bash
cd frontend
npm install --save laravel-echo pusher-js
```

### **3. Frontend - Configure Echo:**
```typescript
// lib/echo.ts
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

export const echo = new Echo({
    broadcaster: 'reverb',
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY || 'my-app-key',
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST || '127.0.0.1',
    wsPort: process.env.NEXT_PUBLIC_REVERB_PORT || 8080,
    wssPort: process.env.NEXT_PUBLIC_REVERB_PORT || 8080,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
});
```

---

## 📡 **USE CASES:**

### **1. Real-Time Order Notifications:**
```php
// Backend - Broadcast event
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class OrderCreated implements ShouldBroadcast
{
    public function __construct(public Order $order) {}
    
    public function broadcastOn()
    {
        return new Channel('orders');
    }
}

// Dispatch:
event(new OrderCreated($order));
```

```typescript
// Frontend - Listen
import { echo } from '@/lib/echo';

echo.channel('orders')
    .listen('OrderCreated', (e: any) => {
        console.log('New order!', e.order);
        // Show notification
    });
```

### **2. Private User Notifications:**
```php
// Backend
class NewLeasing implements ShouldBroadcast
{
    public function broadcastOn()
    {
        return new PrivateChannel('user.' . $this->userId);
    }
}
```

```typescript
// Frontend
echo.private(`user.${userId}`)
    .listen('NewLeasing', (e: any) => {
        toast.success('New leasing application!');
    });
```

### **3. Admin Dashboard Updates:**
```php
// Backend - Broadcast to admin channel
class VehicleSold implements ShouldBroadcast
{
    public function broadcastOn()
    {
        return new Channel('admin.dashboard');
    }
}
```

```typescript
// Frontend - Admin panel listens
echo.channel('admin.dashboard')
    .listen('VehicleSold', (e: any) => {
        // Update dashboard stats
        updateStats();
    });
```

---

## 🎯 **PRACTICAL EXAMPLES FOR AUTOSITE:**

### **Example 1: New Order Notification to Admin**

**Backend (OrderController):**
```php
use App\Events\OrderCreated;

public function store(Request $request)
{
    $order = Order::create([...]);
    
    // Broadcast event
    broadcast(new OrderCreated($order))->toOthers();
    
    return response()->json(['success' => true]);
}
```

**Event (`app/Events/OrderCreated.php`):**
```php
<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Order $order) {}

    public function broadcastOn()
    {
        return new Channel('admin.orders');
    }
    
    public function broadcastWith()
    {
        return [
            'order' => $this->order,
            'customer' => $this->order->buyer_type === 'individual' 
                ? $this->order->first_name . ' ' . $this->order->last_name
                : $this->order->company_name,
            'vehicle' => $this->order->vehicle->make . ' ' . $this->order->vehicle->model,
            'amount' => $this->order->total_amount,
        ];
    }
}
```

**Frontend (Admin Dashboard):**
```typescript
'use client';

import { useEffect } from 'react';
import { echo } from '@/lib/echo';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  useEffect(() => {
    echo.channel('admin.orders')
      .listen('OrderCreated', (e: any) => {
        toast.success(
          `New order! ${e.customer} bought ${e.vehicle} - €${e.amount}`,
          { duration: 5000 }
        );
        // Refresh orders list
        refetchOrders();
      });

    return () => {
      echo.leaveChannel('admin.orders');
    };
  }, []);

  return <div>...</div>;
}
```

---

## 🧪 **TESTING WEBSOCKETS:**

### **Method 1: Browser Console**
```javascript
// Open http://localhost:3000
// In browser console:

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',
    key: 'my-app-key',
    wsHost: '127.0.0.1',
    wsPort: 8080,
    forceTLS: false,
});

echo.channel('test-channel')
    .listen('.test-event', (e) => {
        console.log('Received:', e);
    });
```

### **Method 2: PHP Tinker**
```bash
php artisan tinker

# Broadcast test event
broadcast(new \App\Events\TestEvent(['message' => 'Hello WebSocket!']));
```

### **Method 3: API Test**
```bash
# Create order via API
curl -X POST http://127.0.0.1:8000/api/v1/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"vehicle_id":1, "buyer_type":"individual", ...}'

# Check frontend receives broadcast
```

---

## 📊 **MONITORING:**

### **Check Server Status:**
```bash
# In Reverb server terminal, you'll see:
[2025-10-25 22:55:00] Connection opened
[2025-10-25 22:55:01] Subscribed to channel: admin.orders
[2025-10-25 22:55:10] Broadcasting: OrderCreated
```

### **Logs:**
```bash
# Laravel logs
tail -f backend/storage/logs/laravel.log

# Reverb server output
# (visible in terminal where server runs)
```

---

## 🚀 **PRODUCTION DEPLOYMENT:**

### **Option 1: Supervisor (Linux)**
```ini
[program:reverb]
command=php /path/to/backend/artisan reverb:start
directory=/path/to/backend
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/var/log/reverb.log
```

### **Option 2: PM2 (Node.js)**
```bash
pm2 start "php artisan reverb:start" --name reverb
pm2 save
pm2 startup
```

### **Option 3: Docker**
```dockerfile
# Add to docker-compose.yml
reverb:
  image: php:8.2-cli
  command: php artisan reverb:start
  ports:
    - "8080:8080"
  volumes:
    - ./backend:/app
```

---

## ✅ **CURRENT STATUS:**

```
✅ Laravel Reverb installed
✅ Server running on port 8080
✅ Pusher-compatible protocol
✅ Ready for real-time events!

Next Steps:
1. Create broadcast events (OrderCreated, etc.)
2. Install Laravel Echo in frontend
3. Connect frontend to WebSocket
4. Test real-time notifications
```

---

**Server is NOW RUNNING in background!** 🚀

To stop: Find terminal and press Ctrl+C

---

*Started: 25 Octombrie 2025, 22:55*  
*Status: ✅ ACTIVE*  
*Port: 8080*  
*Ready for real-time magic!* ✨
