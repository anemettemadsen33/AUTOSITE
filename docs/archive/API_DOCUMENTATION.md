# AutoSite API Documentation

## Authentication
All protected endpoints require authentication using Laravel Sanctum.

### Admin User Credentials
- **Email**: admin@autosite.com
- **Password**: password

## Base URL
```
http://localhost:8000/api
```

---

## Vehicle Configurator API

### Get Configuration Options
```http
GET /api/vehicles/{vehicle_id}/options
```

**Response:**
```json
{
  "exterior_colors": ["Black", "White", "Silver", "Red", "Blue", "Gray"],
  "interior_colors": ["Black", "Beige", "Brown", "Gray"],
  "wheels": ["18\" Standard", "19\" Sport", "20\" Premium", "21\" Performance"],
  "additional_options": [...]
}
```

### List All Configurations
```http
GET /api/vehicle-configurations
```

### Create Configuration
```http
POST /api/vehicle-configurations
```

**Body:**
```json
{
  "vehicle_id": 1,
  "exterior_color": "Black",
  "interior_color": "Beige",
  "wheels": "19\" Sport",
  "options": ["Sunroof", "Navigation System"],
  "total_price": 45000
}
```

### Get Single Configuration
```http
GET /api/vehicle-configurations/{id}
```

### Update Configuration
```http
PUT /api/vehicle-configurations/{id}
```

### Delete Configuration
```http
DELETE /api/vehicle-configurations/{id}
```

---

## Booking System API

### List All Bookings
```http
GET /api/bookings
```

### Create Booking
```http
POST /api/bookings
```

**Body:**
```json
{
  "vehicle_id": 1,
  "dealer_id": 1,
  "booking_type": "test_drive",
  "booking_date": "2025-11-01 10:00:00",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+40123456789",
  "notes": "Interested in this model"
}
```

**Booking Types:**
- `test_drive` - Test Drive
- `viewing` - Vehicle Viewing
- `service` - Service Appointment
- `consultation` - Consultation

**Status:**
- `pending` - Pending Confirmation
- `confirmed` - Confirmed
- `cancelled` - Cancelled
- `completed` - Completed

### Get Available Time Slots
```http
GET /api/bookings/available-slots?date=2025-11-01&dealer_id=1
```

**Response:**
```json
{
  "date": "2025-11-01",
  "available_slots": ["09:00", "10:00", "11:00", "14:00", "15:00"],
  "booked_slots": ["12:00", "16:00", "17:00"]
}
```

### Get Single Booking
```http
GET /api/bookings/{id}
```

### Update Booking (Admin Only)
```http
PUT /api/bookings/{id}
```

**Body:**
```json
{
  "status": "confirmed",
  "notes": "Confirmed with client"
}
```

### Cancel Booking
```http
DELETE /api/bookings/{id}
```

---

## Chatbot API

### Get Chat Messages
```http
GET /api/chat/messages?session_id={session_id}
```

### Send Message
```http
POST /api/chat/messages
```

**Body:**
```json
{
  "message": "What are your prices?",
  "session_id": "optional-session-id",
  "metadata": {}
}
```

**Response:**
```json
{
  "user_message": {
    "id": 1,
    "session_id": "abc123",
    "message": "What are your prices?",
    "sender": "user",
    "created_at": "2025-10-25T22:00:00.000000Z"
  },
  "bot_message": {
    "id": 2,
    "session_id": "abc123",
    "message": "Our vehicles range from €10,000 to €100,000...",
    "sender": "bot",
    "created_at": "2025-10-25T22:00:01.000000Z"
  }
}
```

### Get Messages by Session
```http
GET /api/chat/messages/{session_id}
```

### Mark Messages as Read
```http
POST /api/chat/messages/mark-read
```

**Body:**
```json
{
  "session_id": "abc123"
}
```

---

## Chatbot Keyword Responses

The chatbot automatically responds to these keywords:
- **price, cost, pret** → Pricing information
- **test drive, test, proba** → Test drive booking
- **financing, loan, credit, finantare** → Financing options
- **warranty, garantie** → Warranty information
- **hello, hi, buna** → Greeting
- **contact, phone, email** → Contact information

---

## Premium Features Implemented

### 1. ✅ Vehicle Configurator
- Custom color selection (exterior/interior)
- Wheel options
- Additional features
- Real-time price calculation
- Save and retrieve configurations

### 2. ✅ Booking System
- Multiple booking types (test drive, viewing, service)
- Real-time availability checking
- Time slot management
- Email notifications (ready)
- Status tracking

### 3. ✅ AI Chatbot
- Intelligent keyword-based responses
- Session management
- Multi-language support (EN/RO)
- Context-aware replies
- Message history

---

## Testing Examples

### Test Vehicle Configurator
```bash
# Create a configuration
curl -X POST http://localhost:8000/api/vehicle-configurations \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": 1,
    "exterior_color": "Black",
    "interior_color": "Beige",
    "wheels": "19\" Sport",
    "total_price": 45000
  }'
```

### Test Booking System
```bash
# Create a booking
curl -X POST http://localhost:8000/api/bookings \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "booking_type": "test_drive",
    "booking_date": "2025-11-01 10:00:00",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+40123456789"
  }'
```

### Test Chatbot
```bash
# Send a message
curl -X POST http://localhost:8000/api/chat/messages \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are your prices?"
  }'
```

---

## Database Tables Created

1. **vehicle_configurations** - Store vehicle customizations
2. **bookings** - Manage appointments and reservations
3. **chat_messages** - Chat history and bot responses

---

## Next Steps for Production

1. **Email Integration**: Configure mail settings for booking confirmations
2. **Advanced AI**: Integrate OpenAI/Anthropic for smarter responses
3. **WebSocket**: Real-time chat notifications
4. **Payment Gateway**: Integrate Stripe/PayPal for deposits
5. **SMS Notifications**: Booking reminders via SMS
6. **Calendar Integration**: Sync with Google Calendar

---

## Support

For issues or questions, contact: admin@autosite.com
