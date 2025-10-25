import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Vehicle {
  id: number;
  title: Record<string, string>;
  slug: string;
  make: string;
  model: string;
  year: number;
}

export interface Message {
  id: number;
  conversation_id: number;
  user_id: number;
  content: string;
  read_at: string | null;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface Conversation {
  id: number;
  subject: string | null;
  vehicle_id: number | null;
  vehicle: Vehicle | null;
  participants: User[];
  latest_message: Message | null;
  unread_count: number;
  last_read_at: string | null;
  updated_at: string;
  created_at: string;
}

export interface SendMessageData {
  conversation_id?: number;
  vehicle_id?: number;
  recipient_id?: number;
  subject?: string;
  content: string;
}

export interface StartConversationData {
  subject: string;
  content: string;
}

/**
 * Get all conversations for the authenticated user
 */
export async function getConversations(token: string): Promise<Conversation[]> {
  const response = await axios.get(`${API_URL}/api/conversations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

/**
 * Get messages for a specific conversation
 */
export async function getMessages(conversationId: number, token: string): Promise<Message[]> {
  const response = await axios.get(`${API_URL}/api/conversations/${conversationId}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

/**
 * Send a message in a conversation (existing or new)
 */
export async function sendMessage(data: SendMessageData, token: string): Promise<{ message: Message; conversation: Conversation }> {
  const response = await axios.post(`${API_URL}/api/messages/send`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

/**
 * Mark conversation as read
 */
export async function markConversationAsRead(conversationId: number, token: string): Promise<void> {
  await axios.post(`${API_URL}/api/conversations/${conversationId}/mark-read`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Start a conversation about a vehicle
 */
export async function startConversation(vehicleId: number, data: StartConversationData, token: string): Promise<{ message: Message; conversation: Conversation }> {
  const response = await axios.post(`${API_URL}/api/vehicles/${vehicleId}/start-conversation`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}
