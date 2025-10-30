# Frontend-Backend Integration Guide

Complete guide for integrating the AUTOSITE React frontend with the Laravel backend API.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [API Configuration](#api-configuration)
- [Authentication Setup](#authentication-setup)
- [API Services](#api-services)
- [Component Integration](#component-integration)
- [Error Handling](#error-handling)
- [Testing](#testing)

---

## Overview

The AUTOSITE project uses a decoupled architecture:
- **Frontend**: React 19 + Vite SPA (port 3000)
- **Backend**: Laravel 11 API (port 8000)
- **Authentication**: Laravel Sanctum (token-based)

### Integration Points
1. Authentication (login, register, logout)
2. Vehicle CRUD operations
3. Search and filtering
4. Messages/Chat system
5. Test Drive bookings
6. Favorites
7. Orders & Leasing
8. Image uploads

---

## Prerequisites

### Backend Requirements
- Laravel 11 backend running on http://localhost:8000
- Database migrated and seeded
- Sanctum configured with CORS

### Frontend Requirements
- Install axios for HTTP requests:
```bash
cd frontend
npm install axios
```

---

## API Configuration

### Step 1: Create API Client

Create `src/lib/api.ts`:

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';

// API base URL from environment or default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Important for Sanctum cookies
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

### Step 2: Environment Variables

Create `.env.local`:

```bash
VITE_API_URL=http://localhost:8000/api/v1
VITE_API_BASE=http://localhost:8000
```

---

## Authentication Setup

### Auth Service

Create `src/services/authService.ts`:

```typescript
import api from '@/lib/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
}

class AuthService {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    // Store token and user data
    if (response.data.success && response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  // Register
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    
    // Store token and user data
    if (response.data.success && response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  // Get current user
  async me(): Promise<User> {
    const response = await api.get<{ data: User }>('/auth/me');
    return response.data.data;
  }

  // Get stored user
  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Check if authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}

export const authService = new AuthService();
```

### Auth Hook

Create `src/hooks/useAuth.ts`:

```typescript
import { useState, useEffect } from 'react';
import { authService, User } from '@/services/authService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const storedUser = authService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setUser(response.user);
    return response;
  };

  const register = async (data: any) => {
    const response = await authService.register(data);
    setUser(response.user);
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
}
```

---

## API Services

### Vehicle Service

Create `src/services/vehicleService.ts`:

```typescript
import api from '@/lib/api';

export interface Vehicle {
  id: number;
  title: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage: number;
  fuel: string;
  transmission: string;
  body_type: string;
  condition: string;
  description: string;
  images: Array<{ url: string }>;
  dealer?: {
    id: number;
    name: string;
    verified: boolean;
  };
}

export interface VehicleFilters {
  make?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  priceFrom?: number;
  priceTo?: number;
  fuel?: string;
  transmission?: string;
  body_type?: string;
  condition?: string;
  page?: number;
  perPage?: number;
}

class VehicleService {
  // Get all vehicles with filters
  async getVehicles(filters: VehicleFilters = {}) {
    const response = await api.get('/vehicles', { params: filters });
    return response.data;
  }

  // Get single vehicle by slug
  async getVehicle(slug: string) {
    const response = await api.get(`/vehicles/${slug}`);
    return response.data.data;
  }

  // Create vehicle (requires auth)
  async createVehicle(data: Partial<Vehicle>) {
    const response = await api.post('/vehicles', data);
    return response.data;
  }

  // Update vehicle (requires auth)
  async updateVehicle(id: number, data: Partial<Vehicle>) {
    const response = await api.put(`/vehicles/${id}`, data);
    return response.data;
  }

  // Delete vehicle (requires auth)
  async deleteVehicle(id: number) {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  }

  // Upload vehicle images
  async uploadImages(vehicleId: number, files: File[]) {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    const response = await api.post(
      `/vehicles/${vehicleId}/images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  }
}

export const vehicleService = new VehicleService();
```

### Message Service

Create `src/services/messageService.ts`:

```typescript
import api from '@/lib/api';

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  vehicle_id?: number;
  thread_id: string;
  message: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
  sender: {
    id: number;
    name: string;
  };
  receiver: {
    id: number;
    name: string;
  };
}

export interface Conversation {
  thread_id: string;
  other_user: {
    id: number;
    name: string;
    email: string;
  };
  vehicle?: {
    id: number;
    title: string;
    slug: string;
  };
  latest_message: {
    id: number;
    message: string;
    sender_id: number;
    is_read: boolean;
    created_at: string;
  };
  unread_count: number;
}

class MessageService {
  // Send message
  async sendMessage(data: {
    receiver_id: number;
    message: string;
    vehicle_id?: number;
  }) {
    const response = await api.post('/messages', data);
    return response.data;
  }

  // Get all conversations
  async getConversations() {
    const response = await api.get<{ success: boolean; data: Conversation[] }>(
      '/conversations'
    );
    return response.data.data;
  }

  // Get conversation with specific user
  async getConversation(userId: number) {
    const response = await api.get(`/conversations/${userId}`);
    return response.data.data;
  }

  // Mark message as read
  async markAsRead(messageId: number) {
    const response = await api.put(`/messages/${messageId}/read`);
    return response.data;
  }

  // Delete message
  async deleteMessage(messageId: number) {
    const response = await api.delete(`/messages/${messageId}`);
    return response.data;
  }

  // Get unread count
  async getUnreadCount() {
    const response = await api.get<{
      success: boolean;
      data: { unread_count: number };
    }>('/messages/unread-count');
    return response.data.data.unread_count;
  }
}

export const messageService = new MessageService();
```

---

## Component Integration

### Update Login Page

Update `src/pages/LoginPage.tsx`:

```typescript
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LoginPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      onNavigate('dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to AUTOSITE</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Update Messages Page

Update `src/pages/MessagesPage.tsx`:

```typescript
import { useState, useEffect } from 'react';
import { messageService, Conversation } from '@/services/messageService';
import { Card, CardContent } from '@/components/ui/card';
import { ChatCircle } from '@phosphor-icons/react';

interface MessagesPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function MessagesPage({ onNavigate }: MessagesPageProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const data = await messageService.getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (conversations.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-r from-primary to-purple-900 text-primary-foreground py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Messages</h1>
            <p className="text-primary-foreground/80">
              Communicate with buyers and sellers
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <Card className="p-12 text-center">
            <ChatCircle
              size={64}
              weight="duotone"
              className="mx-auto mb-4 text-muted-foreground"
            />
            <h2 className="text-2xl font-semibold mb-2">No messages yet</h2>
            <p className="text-muted-foreground">
              Messages from buyers and sellers will appear here
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-purple-900 text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Messages</h1>
          <p className="text-primary-foreground/80">
            {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {conversations.map((conv) => (
            <Card
              key={conv.thread_id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() =>
                onNavigate('conversation', { userId: String(conv.other_user.id) })
              }
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {conv.other_user.name}
                    </h3>
                    {conv.vehicle && (
                      <p className="text-sm text-muted-foreground">
                        Re: {conv.vehicle.title}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                      {conv.latest_message.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(conv.latest_message.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {conv.unread_count > 0 && (
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                      {conv.unread_count}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## Error Handling

### Global Error Handler

Create `src/lib/errorHandler.ts`:

```typescript
import { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';

export function handleApiError(error: unknown) {
  if (error instanceof AxiosError) {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';

    // Show toast notification
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive',
    });

    // Log for debugging
    console.error('API Error:', {
      status: error.response?.status,
      message,
      data: error.response?.data,
    });

    return message;
  }

  // Generic error
  const message = 'An unexpected error occurred';
  toast({
    title: 'Error',
    description: message,
    variant: 'destructive',
  });

  return message;
}
```

---

## Testing

### Testing API Integration

Create `src/__tests__/services/authService.test.ts`:

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { authService } from '@/services/authService';
import api from '@/lib/api';

vi.mock('@/lib/api');

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should login successfully', async () => {
    const mockResponse = {
      data: {
        success: true,
        token: 'test-token',
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
        },
      },
    };

    (api.post as any).mockResolvedValue(mockResponse);

    const result = await authService.login({
      email: 'test@example.com',
      password: 'password',
    });

    expect(result.success).toBe(true);
    expect(localStorage.getItem('auth_token')).toBe('test-token');
  });

  it('should check if authenticated', () => {
    expect(authService.isAuthenticated()).toBe(false);

    localStorage.setItem('auth_token', 'test-token');
    expect(authService.isAuthenticated()).toBe(true);
  });
});
```

---

## Summary

This integration guide covers:

✅ **API Configuration** - Axios setup with interceptors
✅ **Authentication** - Sanctum token-based auth
✅ **Services** - Typed API service classes
✅ **Hooks** - React hooks for auth state
✅ **Components** - Updated login and messages pages
✅ **Error Handling** - Global error management
✅ **Testing** - Unit tests for services

### Next Steps

1. Install axios: `npm install axios`
2. Create the service files as outlined
3. Update components to use the services
4. Add error boundaries
5. Test authentication flow
6. Test API endpoints with real backend
7. Add loading states and error handling
8. Implement remaining features (favorites, test drives, etc.)

---

**Created**: October 30, 2025
**Version**: 1.0
**Status**: Integration Guide Complete
