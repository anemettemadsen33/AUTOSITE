# Test Drive Booking API Guide

Complete guide for the Test Drive Booking API endpoints in the AUTOSITE platform.

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Best Practices](#best-practices)

---

## Overview

The Test Drive Booking API allows users to:
- Book test drives for vehicles
- View their booking history
- Reschedule appointments
- Cancel bookings
- Check available time slots

All endpoints require authentication except for checking available slots (which can be public if needed).

### Base URL
```
/api/v1/test-drives
```

### Features
- ✅ Conflict prevention (no double bookings)
- ✅ Email notifications (user & dealer)
- ✅ Status tracking (pending, confirmed, cancelled, completed)
- ✅ Flexible rescheduling
- ✅ Available slots checking
- ✅ Validation and error handling

---

## Authentication

All endpoints require authentication via Laravel Sanctum:

```bash
# Include authentication token in header
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Endpoints

### 1. Book a Test Drive

**POST** `/api/v1/test-drives`

Book a new test drive appointment for a vehicle.

#### Request Body
```json
{
  "vehicle_id": 123,
  "preferred_date": "2025-11-15",
  "preferred_time": "10:00",
  "contact_name": "John Doe",
  "contact_phone": "+1234567890",
  "contact_email": "john@example.com",
  "notes": "Looking forward to test driving this car!"
}
```

#### Validation Rules
- `vehicle_id`: required, must exist in vehicles table
- `preferred_date`: required, must be a date after today
- `preferred_time`: required, format HH:mm (24-hour)
- `contact_name`: required, max 255 characters
- `contact_phone`: required, max 20 characters
- `contact_email`: required, valid email
- `notes`: optional, max 1000 characters

#### Success Response (201 Created)
```json
{
  "message": "Test drive booked successfully. You will receive a confirmation email shortly.",
  "booking": {
    "id": 1,
    "user_id": 5,
    "vehicle_id": 123,
    "dealer_id": 10,
    "preferred_date": "2025-11-15 10:00:00",
    "preferred_time": "10:00",
    "status": "pending",
    "contact_name": "John Doe",
    "contact_phone": "+1234567890",
    "contact_email": "john@example.com",
    "notes": "Looking forward to test driving this car!",
    "created_at": "2025-10-29T10:30:00.000000Z",
    "vehicle": {
      "id": 123,
      "make": "BMW",
      "model": "X5",
      "year": 2024
    },
    "dealer": {
      "id": 10,
      "name": "Premium Motors"
    }
  }
}
```

#### Error Response (409 Conflict)
```json
{
  "message": "This time slot is already booked. Please select a different time.",
  "error": "booking_conflict"
}
```

---

### 2. List User's Bookings

**GET** `/api/v1/test-drives`

Retrieve all test drive bookings for the authenticated user.

#### Query Parameters
- `status`: Filter by status (pending, confirmed, cancelled, completed)
- `from_date`: Filter bookings from this date (YYYY-MM-DD)
- `to_date`: Filter bookings until this date (YYYY-MM-DD)
- `sort`: Sort order (asc/desc), default: desc
- `per_page`: Results per page (default: 15, max: 100)

#### Example Request
```bash
GET /api/v1/test-drives?status=pending&per_page=20
```

#### Success Response (200 OK)
```json
{
  "data": [
    {
      "id": 1,
      "user_id": 5,
      "vehicle_id": 123,
      "preferred_date": "2025-11-15 10:00:00",
      "status": "pending",
      "contact_name": "John Doe",
      "vehicle": {
        "id": 123,
        "make": "BMW",
        "model": "X5"
      },
      "dealer": {
        "id": 10,
        "name": "Premium Motors"
      }
    }
  ],
  "current_page": 1,
  "per_page": 15,
  "total": 3
}
```

---

### 3. Get Booking Details

**GET** `/api/v1/test-drives/{id}`

Retrieve details of a specific booking.

#### Success Response (200 OK)
```json
{
  "id": 1,
  "user_id": 5,
  "vehicle_id": 123,
  "dealer_id": 10,
  "preferred_date": "2025-11-15 10:00:00",
  "preferred_time": "10:00",
  "status": "pending",
  "contact_name": "John Doe",
  "contact_phone": "+1234567890",
  "contact_email": "john@example.com",
  "notes": "Looking forward to test driving this car!",
  "dealer_notes": null,
  "created_at": "2025-10-29T10:30:00.000000Z",
  "vehicle": { /* vehicle details */ },
  "dealer": { /* dealer details */ },
  "user": { /* user details */ }
}
```

#### Error Response (404 Not Found)
```json
{
  "message": "No query results for model [App\\Models\\TestDriveBooking]."
}
```

---

### 4. Reschedule Booking

**PUT** `/api/v1/test-drives/{id}`

Reschedule an existing test drive booking.

#### Request Body
```json
{
  "preferred_date": "2025-11-16",
  "preferred_time": "14:00",
  "notes": "Rescheduled due to work commitment"
}
```

#### Validation Rules
- `preferred_date`: required, must be a date after today
- `preferred_time`: required, format HH:mm (24-hour)
- `notes`: optional, max 1000 characters

#### Success Response (200 OK)
```json
{
  "message": "Test drive rescheduled successfully.",
  "booking": {
    "id": 1,
    "preferred_date": "2025-11-16 14:00:00",
    "preferred_time": "14:00",
    "notes": "Rescheduled due to work commitment"
  }
}
```

#### Error Response (422 Unprocessable Entity)
```json
{
  "message": "Cannot reschedule a cancelled booking.",
  "error": "invalid_status"
}
```

**Note**: Only bookings with status `pending` or `confirmed` can be rescheduled.

---

### 5. Cancel Booking

**DELETE** `/api/v1/test-drives/{id}`

Cancel a test drive booking.

#### Success Response (200 OK)
```json
{
  "message": "Test drive booking cancelled successfully."
}
```

#### Error Response (422 Unprocessable Entity)
```json
{
  "message": "Cannot cancel a completed booking.",
  "error": "invalid_status"
}
```

**Note**: 
- Only bookings with status `pending` or `confirmed` can be cancelled
- Cancellation updates status to `cancelled` (soft cancel, preserves history)
- Cancellation email is sent to user

---

### 6. Check Available Slots

**GET** `/api/v1/vehicles/{vehicleId}/available-slots`

Get available time slots for a vehicle on a specific date.

#### Query Parameters
- `date`: Required, YYYY-MM-DD format, must be after today

#### Example Request
```bash
GET /api/v1/vehicles/123/available-slots?date=2025-11-15
```

#### Success Response (200 OK)
```json
{
  "vehicle_id": 123,
  "date": "2025-11-15",
  "slots": [
    { "time": "09:00", "available": true },
    { "time": "10:00", "available": false },
    { "time": "11:00", "available": true },
    { "time": "12:00", "available": true },
    { "time": "13:00", "available": true },
    { "time": "14:00", "available": false },
    { "time": "15:00", "available": true },
    { "time": "16:00", "available": true },
    { "time": "17:00", "available": true },
    { "time": "18:00", "available": true }
  ],
  "booked_count": 2,
  "available_count": 8
}
```

**Working Hours**: 9:00 AM - 6:00 PM (configurable)  
**Slot Duration**: 1 hour intervals

---

## Usage Examples

### Book a Test Drive with cURL

```bash
curl -X POST https://api.autosite.com/api/v1/test-drives \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": 123,
    "preferred_date": "2025-11-15",
    "preferred_time": "10:00",
    "contact_name": "John Doe",
    "contact_phone": "+1234567890",
    "contact_email": "john@example.com"
  }'
```

### Check Available Slots with JavaScript

```javascript
const checkAvailability = async (vehicleId, date) => {
  const response = await fetch(
    `/api/v1/vehicles/${vehicleId}/available-slots?date=${date}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    }
  );
  
  const data = await response.json();
  return data.slots.filter(slot => slot.available);
};

// Usage
const availableSlots = await checkAvailability(123, '2025-11-15');
console.log('Available slots:', availableSlots);
```

### List Pending Bookings with Axios

```javascript
import axios from 'axios';

const getPendingBookings = async () => {
  try {
    const response = await axios.get('/api/v1/test-drives', {
      params: {
        status: 'pending',
        sort: 'desc'
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};
```

---

## Error Handling

### Common Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 401 | Unauthorized (missing or invalid token) |
| 404 | Booking not found |
| 409 | Conflict (time slot already booked) |
| 422 | Validation error |
| 429 | Too many requests (rate limit) |
| 500 | Server error |

### Error Response Format

```json
{
  "message": "Error description",
  "error": "error_code",
  "errors": {
    "field_name": ["Validation error message"]
  }
}
```

### Handling Validation Errors

```javascript
try {
  await bookTestDrive(data);
} catch (error) {
  if (error.response.status === 422) {
    const validationErrors = error.response.data.errors;
    
    // Display errors to user
    Object.keys(validationErrors).forEach(field => {
      console.error(`${field}: ${validationErrors[field][0]}`);
    });
  } else if (error.response.status === 409) {
    // Handle booking conflict
    alert('This time slot is already booked. Please choose another time.');
  }
}
```

---

## Testing

### Running Tests

```bash
# Run all test drive tests
php artisan test --filter=TestDriveBookingTest

# Run specific test
php artisan test --filter=test_user_can_book_a_test_drive

# With coverage
php artisan test --coverage --filter=TestDriveBookingTest
```

### Test Coverage

The test suite includes **20+ comprehensive tests** covering:

- ✅ Booking creation with validation
- ✅ Authentication requirements
- ✅ Conflict prevention
- ✅ Listing and filtering bookings
- ✅ Viewing booking details
- ✅ Rescheduling logic
- ✅ Cancellation rules
- ✅ Available slots checking
- ✅ Authorization (users can only access their own bookings)
- ✅ Email notifications (mocked)

### Manual Testing with Postman

1. Import the API collection (coming soon)
2. Set environment variables:
   - `base_url`: Your API base URL
   - `auth_token`: Your authentication token
3. Run the collection tests

---

## Best Practices

### For Frontend Developers

1. **Always check availability before booking**
   ```javascript
   // Good practice
   const slots = await getAvailableSlots(vehicleId, date);
   if (slots.length === 0) {
     alert('No slots available for this date');
     return;
   }
   ```

2. **Handle conflicts gracefully**
   ```javascript
   try {
     await bookTestDrive(data);
   } catch (error) {
     if (error.response?.status === 409) {
       // Refresh available slots and let user choose again
       refreshAvailableSlots();
     }
   }
   ```

3. **Show booking status clearly**
   - Use color coding (pending=yellow, confirmed=green, cancelled=red)
   - Display countdown to appointment
   - Show dealer contact information

4. **Enable easy rescheduling**
   - Show "Reschedule" button for pending/confirmed bookings
   - Pre-fill current date/time for easy comparison
   - Validate new date is in the future

### For Backend Developers

1. **Extend working hours configuration**
   ```php
   // Make working hours configurable per dealer
   $dealer->working_hours = [
       'start' => '08:00',
       'end' => '19:00',
       'slot_duration' => 60 // minutes
   ];
   ```

2. **Add dealer availability calendar**
   ```php
   // Check dealer's blocked dates
   if ($dealer->isDateBlocked($date)) {
       return response()->json(['message' => 'Dealer unavailable'], 422);
   }
   ```

3. **Implement reminder system**
   ```php
   // Send reminders 24h before appointment
   Schedule::daily()->call(function () {
       $tomorrow = Carbon::tomorrow();
       TestDriveBooking::whereDate('preferred_date', $tomorrow)
           ->where('status', 'confirmed')
           ->each(function ($booking) {
               $booking->user->notify(new TestDriveReminder($booking));
           });
   });
   ```

4. **Track no-shows**
   ```php
   // Mark as no-show if not completed within 2 hours of appointment
   if ($booking->isOverdue()) {
       $booking->update(['status' => 'no_show']);
   }
   ```

### Security Considerations

1. **Rate Limiting**: API uses throttle middleware (60 requests/minute for authenticated users)
2. **Authorization**: Users can only access their own bookings
3. **Input Validation**: All inputs are validated and sanitized
4. **SQL Injection Protection**: Using Eloquent ORM and parameterized queries
5. **Email Notifications**: Queued to prevent blocking and potential DoS

---

## Database Schema

```sql
CREATE TABLE test_drive_bookings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    vehicle_id BIGINT UNSIGNED NOT NULL,
    dealer_id BIGINT UNSIGNED NOT NULL,
    preferred_date DATETIME NOT NULL,
    preferred_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed', 'no_show') DEFAULT 'pending',
    contact_name VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    notes TEXT NULL,
    dealer_notes TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (dealer_id) REFERENCES dealers(id) ON DELETE CASCADE,
    
    INDEX idx_user_bookings (user_id, created_at),
    INDEX idx_vehicle_date (vehicle_id, preferred_date),
    INDEX idx_dealer_bookings (dealer_id, status),
    INDEX idx_status_date (status, preferred_date)
);
```

---

## Future Enhancements

### Planned Features

- [ ] **Calendar Integration**: Export to Google Calendar, Outlook
- [ ] **SMS Notifications**: Send SMS reminders via Twilio
- [ ] **Video Test Drives**: Option for virtual test drives
- [ ] **Group Bookings**: Book test drives for multiple people
- [ ] **Dealer Confirmation**: Require dealer to confirm bookings
- [ ] **Automated Rescheduling**: Suggest alternative slots if preferred is unavailable
- [ ] **Booking History**: Track completed test drives and outcomes
- [ ] **Feedback System**: Collect feedback after test drive
- [ ] **Integration with CRM**: Sync bookings with dealer CRM systems
- [ ] **Multi-location Support**: Handle dealers with multiple locations

---

## Support & Contribution

### Need Help?

- Check the [main TESTING_GUIDE.md](./TESTING_GUIDE.md) for testing infrastructure
- Review [WEEK1_FINAL_SUMMARY.md](../WEEK1_FINAL_SUMMARY.md) for project overview
- Contact the development team

### Contributing

1. Follow Laravel coding standards
2. Write tests for new features
3. Update this documentation
4. Submit pull requests with clear descriptions

---

**Version**: 1.0.0  
**Last Updated**: 29 October 2025  
**Author**: AUTOSITE Development Team

---

*This guide is part of the Week 1 Day 4 implementation: Test Drive Booking API*
