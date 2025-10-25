'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { getConversations, getMessages, sendMessage, markConversationAsRead, type Conversation, type Message } from '@/lib/messages';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

export default function MessagesPage() {
  const t = useTranslations('messages');
  const { user, token } = useAuthStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversations
  useEffect(() => {
    if (!token) return;

    const loadConversations = async () => {
      try {
        const data = await getConversations(token);
        setConversations(data);
      } catch {
        toast.error(t('errorLoadingConversations'));
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [token, t]);

  // Load messages for selected conversation
  useEffect(() => {
    if (!selectedConversation || !token) return;

    const loadMessages = async () => {
      try {
        const data = await getMessages(selectedConversation.id, token);
        setMessages(data);
        
        // Mark as read
        await markConversationAsRead(selectedConversation.id, token);
        
        // Update unread count in conversation list
        setConversations(prev => prev.map(conv => 
          conv.id === selectedConversation.id 
            ? { ...conv, unread_count: 0 } 
            : conv
        ));
      } catch {
        toast.error(t('errorLoadingMessages'));
      }
    };

    loadMessages();
  }, [selectedConversation, token, t]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Poll for new messages every 10 seconds
  useEffect(() => {
    if (!selectedConversation || !token) return;

    const interval = setInterval(async () => {
      try {
        const data = await getMessages(selectedConversation.id, token);
        setMessages(data);
      } catch {
        // Silent fail for polling
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedConversation, token]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation || !token) return;

    setSending(true);
    try {
      const { message } = await sendMessage({
        conversation_id: selectedConversation.id,
        content: newMessage.trim(),
      }, token);

      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Update latest message in conversation list
      setConversations(prev => prev.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, latest_message: message, updated_at: new Date().toISOString() }
          : conv
      ));
    } catch {
      toast.error(t('errorSendingMessage'));
    } finally {
      setSending(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">{t('pleaseLogin')}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('title')}</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-200px)]">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>{t('noConversations')}</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {conv.subject || conv.vehicle?.make + ' ' + conv.vehicle?.model || t('noSubject')}
                        </h3>
                        {conv.unread_count > 0 && (
                          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {conv.unread_count}
                          </span>
                        )}
                      </div>
                      {conv.vehicle && (
                        <p className="text-sm text-gray-500 mb-1">
                          {conv.vehicle.make} {conv.vehicle.model} ({conv.vehicle.year})
                        </p>
                      )}
                      {conv.latest_message && (
                        <p className="text-sm text-gray-600 truncate">
                          {conv.latest_message.content}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDistanceToNow(new Date(conv.updated_at), { addSuffix: true })}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="font-semibold text-gray-900">
                      {selectedConversation.subject || selectedConversation.vehicle?.make + ' ' + selectedConversation.vehicle?.model || t('conversation')}
                    </h2>
                    {selectedConversation.vehicle && (
                      <p className="text-sm text-gray-500">
                        {selectedConversation.vehicle.make} {selectedConversation.vehicle.model} ({selectedConversation.vehicle.year})
                      </p>
                    )}
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => {
                      const isCurrentUser = msg.user_id === user.id;
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                              isCurrentUser
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-900'
                            }`}
                          >
                            {!isCurrentUser && (
                              <p className="text-xs font-semibold mb-1 opacity-75">
                                {msg.user.name}
                              </p>
                            )}
                            <p className="text-sm whitespace-pre-wrap wrap-break-word">{msg.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                              }`}
                            >
                              {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={t('typeMessage')}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={sending}
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim() || sending}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {sending ? t('sending') : t('send')}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <p>{t('selectConversation')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
