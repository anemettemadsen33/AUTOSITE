import api from '../lib/api';

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
  updated_at: string;
  sender?: {
    id: number;
    name: string;
    email: string;
  };
  receiver?: {
    id: number;
    name: string;
    email: string;
  };
  vehicle?: {
    id: number;
    title: string;
    slug: string;
  };
}

export interface Conversation {
  thread_id: string;
  other_user: {
    id: number;
    name: string;
    email: string;
  };
  last_message: Message;
  unread_count: number;
  total_messages: number;
}

export interface SendMessageData {
  receiver_id: number;
  message: string;
  vehicle_id?: number;
  thread_id?: string;
}

class MessageService {
  /**
   * Get all conversations for the authenticated user
   */
  async getConversations(): Promise<Conversation[]> {
    const response = await api.get('/messages/conversations');
    return response.data;
  }

  /**
   * Get a specific conversation with a user
   */
  async getConversation(userId: number): Promise<{ messages: Message[]; thread_id: string }> {
    const response = await api.get(`/conversations/${userId}`);
    return response.data;
  }

  /**
   * Send a new message
   */
  async sendMessage(data: SendMessageData): Promise<Message> {
    const response = await api.post('/messages', data);
    return response.data;
  }

  /**
   * Mark a message as read
   */
  async markAsRead(messageId: number): Promise<{ message: string }> {
    const response = await api.put(`/messages/${messageId}/read`);
    return response.data;
  }

  /**
   * Delete a message (soft delete)
   */
  async deleteMessage(messageId: number): Promise<{ message: string }> {
    const response = await api.delete(`/messages/${messageId}`);
    return response.data;
  }

  /**
   * Get unread message count
   */
  async getUnreadCount(): Promise<{ count: number }> {
    const response = await api.get('/messages/unread-count');
    return response.data;
  }
}

export default new MessageService();
