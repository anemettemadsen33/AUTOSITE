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
  role?: string;
  created_at?: string;
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

  // Get current user from API
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

  // Update profile
  async updateProfile(data: { name?: string; phone?: string; avatar?: string }): Promise<{ user: User; message: string }> {
    const response = await api.put<{ data: User; message: string }>('/auth/profile', data);
    return {
      user: response.data.data,
      message: response.data.message
    };
  }

  // Change password
  async changePassword(data: { 
    current_password: string; 
    new_password: string; 
    new_password_confirmation: string 
  }): Promise<{ success: boolean; message: string }> {
    const response = await api.put<{ success: boolean; message: string }>('/auth/password', data);
    return response.data;
  }
}

export const authService = new AuthService();
