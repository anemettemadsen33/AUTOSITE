import api from '../api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'dealer' | 'admin';
  phone?: string;
  avatar_url?: string;
  dealer_id?: number;
  dealer?: {
    id: number;
    name: string;
    slug: string;
  };
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  role?: 'user' | 'dealer';
  dealer_name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  token_type: string;
  expires_in: number;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    const data = response.data.data;
    
    // Store token
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    const responseData = response.data.data;
    
    // Store token
    if (responseData.token) {
      localStorage.setItem('auth_token', responseData.token);
      localStorage.setItem('user', JSON.stringify(responseData.user));
    }
    
    return responseData;
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    const user = response.data.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put('/auth/profile', data);
    const user = response.data.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();
