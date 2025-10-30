# Messages & Chat API Guide

Complete documentation for the Messages & Conversations API in AUTOSITE.

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

The Messages API allows users to:
- Send messages to other users (buyers to dealers, dealers to buyers)
- View their conversations grouped by thread
- View message history with a specific user
- Mark messages as read
- Delete messages
- Get unread message count

### Key Features
- ✅ Thread-based conversations (messages grouped by participants)
- ✅ Real-time email notifications
- ✅ Database notifications
- ✅ Message read/unread tracking
- ✅ Vehicle context (optional - messages can reference a vehicle)
- ✅ Automatic thread ID generation
- ✅ Permission-based access control

### Base URL
```
/api/v1
```

---

## Authentication

All endpoints require authentication via Laravel Sanctum:

```bash
# Include authentication token in header
Authorization: Bearer YOUR_TOKEN_HERE
```

**Rate Limiting**: 60 requests per minute for authenticated users

---

## Endpoints

### 1. Send Message

**POST** `/api/v1/messages`

Send a new message to another user.

#### Request Body
```json
{
  "receiver_id": 5,
  "message": "Hi, I'm interested in the BMW X5. Is it still available?",
  "vehicle_id": 12,
  "thread_id": "thread_3_5"
}
```

#### Parameters
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `receiver_id` | integer | Yes | ID of the user receiving the message |
| `message` | string | Yes | Message content (1-5000 characters) |
| `vehicle_id` | integer | No | ID of vehicle being discussed (optional) |
| `thread_id` | string | No | Thread identifier (auto-generated if not provided) |

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": 42,
    "sender_id": 3,
    "receiver_id": 5,
    "vehicle_id": 12,
    "thread_id": "thread_3_5",
    "message": "Hi, I'm interested in the BMW X5. Is it still available?",
    "is_read": false,
    "created_at": "2025-10-30T10:30:00.000000Z",
    "sender": {
      "id": 3,
      "name": "John Buyer",
      "email": "john@example.com"
    },
    "receiver": {
      "id": 5,
      "name": "Premium Motors",
      "email": "dealer@premium.com"
    },
    "vehicle": {
      "id": 12,
      "title": "BMW X5 2024",
      "slug": "bmw-x5-2024-luxury"
    }
  }
}
```

#### Business Rules
- Cannot send messages to yourself
- Thread ID is auto-generated based on sender/receiver IDs if not provided
- Email notification sent to receiver
- Database notification created for receiver

---

### 2. List Conversations

**GET** `/api/v1/conversations`

Get all conversation threads for the authenticated user.

#### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "thread_id": "thread_3_5",
      "other_user": {
        "id": 5,
        "name": "Premium Motors",
        "email": "dealer@premium.com"
      },
      "vehicle": {
        "id": 12,
        "title": "BMW X5 2024",
        "slug": "bmw-x5-2024-luxury"
      },
      "latest_message": {
        "id": 42,
        "message": "Hi, I'm interested in the BMW X5...",
        "sender_id": 3,
        "is_read": false,
        "created_at": "2025-10-30T10:30:00.000000Z"
      },
      "unread_count": 2
    }
  ]
}
```

#### Features
- Shows latest message per conversation
- Groups messages by thread
- Shows unread count per conversation
- Ordered by latest activity (most recent first)

---

### 3. Get Conversation with User

**GET** `/api/v1/conversations/{userId}`

Get complete message history with a specific user.

#### Parameters
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | integer | Yes | ID of the other user in the conversation |

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "thread_id": "thread_3_5",
    "other_user": {
      "id": 5,
      "name": "Premium Motors",
      "email": "dealer@premium.com"
    },
    "messages": [
      {
        "id": 40,
        "sender_id": 3,
        "receiver_id": 5,
        "message": "Hi, I'm interested in the BMW X5...",
        "is_read": true,
        "read_at": "2025-10-30T10:35:00.000000Z",
        "created_at": "2025-10-30T10:30:00.000000Z",
        "sender": {
          "id": 3,
          "name": "John Buyer"
        },
        "receiver": {
          "id": 5,
          "name": "Premium Motors"
        }
      },
      {
        "id": 41,
        "sender_id": 5,
        "receiver_id": 3,
        "message": "Yes, it's still available! Would you like to schedule a test drive?",
        "is_read": true,
        "read_at": "2025-10-30T10:40:00.000000Z",
        "created_at": "2025-10-30T10:36:00.000000Z",
        "sender": {
          "id": 5,
          "name": "Premium Motors"
        },
        "receiver": {
          "id": 3,
          "name": "John Buyer"
        }
      }
    ]
  }
}
```

#### Side Effects
- Automatically marks all unread messages in this thread as read
- Updates `is_read` to `true` and sets `read_at` timestamp

---

### 4. Mark Message as Read

**PUT** `/api/v1/messages/{id}/read`

Manually mark a specific message as read.

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Message marked as read",
  "data": {
    "id": 42,
    "is_read": true,
    "read_at": "2025-10-30T10:45:00.000000Z"
  }
}
```

#### Authorization
- Only the message receiver can mark it as read
- Returns 403 Forbidden if called by sender or other users

---

### 5. Delete Message

**DELETE** `/api/v1/messages/{id}`

Delete a message (soft delete).

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Message deleted successfully"
}
```

#### Authorization
- Only sender or receiver can delete the message
- Returns 403 Forbidden for unauthorized users

---

### 6. Get Unread Count

**GET** `/api/v1/messages/unread-count`

Get total unread message count for authenticated user.

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "unread_count": 5
  }
}
```

#### Use Cases
- Display badge on messages icon in UI
- Show notification count in header
- Poll periodically for real-time updates

---

## Usage Examples

### Example 1: Buyer Contacts Dealer About Vehicle

```bash
# Step 1: Buyer sends initial message
curl -X POST http://localhost:8000/api/v1/messages \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "receiver_id": 10,
    "vehicle_id": 15,
    "message": "Hello, I would like more information about this Mercedes C-Class."
  }'

# Step 2: Dealer responds
curl -X POST http://localhost:8000/api/v1/messages \
  -H "Authorization: Bearer {dealer_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "receiver_id": 3,
    "vehicle_id": 15,
    "message": "Of course! The vehicle is in excellent condition. Would you like to schedule a viewing?"
  }'

# Step 3: Buyer views conversation
curl -X GET http://localhost:8000/api/v1/conversations/10 \
  -H "Authorization: Bearer {token}"
```

### Example 2: Check Unread Messages

```bash
# Get unread count
curl -X GET http://localhost:8000/api/v1/messages/unread-count \
  -H "Authorization: Bearer {token}"

# Get all conversations (shows unread per thread)
curl -X GET http://localhost:8000/api/v1/conversations \
  -H "Authorization: Bearer {token}"
```

### Example 3: Thread Management

```bash
# View specific conversation (auto-marks as read)
curl -X GET http://localhost:8000/api/v1/conversations/5 \
  -H "Authorization: Bearer {token}"

# Manually mark specific message as read
curl -X PUT http://localhost:8000/api/v1/messages/42/read \
  -H "Authorization: Bearer {token}"

# Delete a message
curl -X DELETE http://localhost:8000/api/v1/messages/42 \
  -H "Authorization: Bearer {token}"
```

---

## Error Handling

### Common Errors

#### 401 Unauthorized
```json
{
  "message": "Unauthenticated."
}
```

#### 403 Forbidden
```json
{
  "success": false,
  "message": "Unauthorized. You can only mark your own messages as read."
}
```

#### 404 Not Found
```json
{
  "message": "No query results for model [App\\Models\\Message] 999"
}
```

#### 422 Validation Error
```json
{
  "message": "The receiver id field is required.",
  "errors": {
    "receiver_id": [
      "The receiver id field is required."
    ]
  }
}
```

#### 422 Business Logic Error
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "receiver_id": [
      "You cannot send messages to yourself."
    ]
  }
}
```

---

## Testing

### Run Message Tests
```bash
# Run all message tests
php artisan test --filter=MessageTest

# Run specific test
php artisan test --filter=MessageTest::user_can_send_message
```

### Manual Testing with Postman

1. **Import Collection**: Import the API collection from `/docs/postman/AUTOSITE.postman_collection.json`
2. **Set Environment**: Configure `{{baseUrl}}` and `{{token}}`
3. **Test Flow**:
   - Register/Login two users (buyer and dealer)
   - Send message from buyer to dealer
   - Check conversations list
   - View specific conversation
   - Check unread count
   - Mark as read
   - Delete message

---

## Best Practices

### Frontend Integration

```javascript
// Example React hook for messages
const useMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch conversations
  const fetchConversations = async () => {
    const response = await api.get('/conversations');
    setConversations(response.data.data);
  };

  // Fetch unread count
  const fetchUnreadCount = async () => {
    const response = await api.get('/messages/unread-count');
    setUnreadCount(response.data.data.unread_count);
  };

  // Send message
  const sendMessage = async (receiverId, message, vehicleId = null) => {
    const response = await api.post('/messages', {
      receiver_id: receiverId,
      message,
      vehicle_id: vehicleId,
    });
    return response.data;
  };

  // Poll for new messages (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    conversations,
    unreadCount,
    fetchConversations,
    sendMessage,
  };
};
```

### Real-Time Updates (Optional)

For production, consider adding Laravel Echo + Pusher for real-time message notifications:

```javascript
// Listen for new messages
Echo.private(`user.${userId}`)
  .notification((notification) => {
    if (notification.type === 'App\\Notifications\\NewMessageNotification') {
      // Update UI with new message
      fetchUnreadCount();
      showNotification('New message from ' + notification.sender_name);
    }
  });
```

### Security Considerations

1. **Rate Limiting**: API is rate-limited to 60 requests/minute
2. **Authorization**: Users can only access their own messages
3. **Validation**: All inputs are validated and sanitized
4. **SQL Injection**: Protected by Eloquent ORM
5. **XSS Prevention**: Laravel automatically escapes output

---

## Integration with Other Features

### Vehicle Context
Messages can reference vehicles for better context:
- Buyer inquires about specific vehicle
- Conversation shows vehicle details
- Dealer can see which vehicle is being discussed

### Notifications
Multiple notification channels:
- **Email**: Sent to receiver when offline
- **Database**: Stored for in-app notifications
- **Real-time**: Optional with Laravel Echo

### User Roles
- **Buyers**: Can message dealers about vehicles
- **Dealers**: Can respond to buyer inquiries
- **Admin**: Can view all messages (if needed for moderation)

---

## Performance Optimization

### Caching Strategy
- Conversations list: Cache for 1 minute
- Unread count: Cache for 30 seconds
- Message history: No caching (real-time data)

### Database Indexes
Already created on:
- `sender_id` for fast sender lookups
- `receiver_id` for fast receiver lookups
- `thread_id` for conversation grouping
- `is_read` for unread filtering
- `created_at` for chronological ordering

### Pagination (Future Enhancement)
For high-volume conversations, add pagination:
```php
$messages = Message::where('thread_id', $threadId)
    ->orderBy('created_at', 'desc')
    ->paginate(50);
```

---

## Summary

The Messages API provides a complete chat/messaging system for AUTOSITE:

✅ **6 endpoints** - Complete CRUD operations
✅ **Thread-based** - Organized conversations
✅ **Notifications** - Email + database
✅ **Read tracking** - Mark as read functionality
✅ **Vehicle context** - Messages linked to vehicles
✅ **Secure** - Authorization and validation
✅ **Performance** - Indexed and optimized

---

**Created**: October 30, 2025
**Version**: 1.0
**For**: AUTOSITE Messages API
