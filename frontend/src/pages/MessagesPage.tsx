import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth';
import { useConversations, useConversation } from '@/hooks/use-messages';
import messageService, { SendMessageData } from '@/services/messageService';
import { ChatCircle, PaperPlaneRight, User, CircleNotch } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { format, formatDistanceToNow } from 'date-fns';

interface MessagesPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function MessagesPage({ onNavigate }: MessagesPageProps) {
  const { user } = useAuth();
  const { conversations, loading: conversationsLoading, refetch: refetchConversations } = useConversations();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { messages, threadId, loading: messagesLoading, refetch: refetchMessages } = useConversation(selectedUserId);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Select first conversation by default
  useEffect(() => {
    if (conversations.length > 0 && !selectedUserId) {
      setSelectedUserId(conversations[0].other_user.id);
    }
  }, [conversations, selectedUserId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUserId || !user) return;

    setSending(true);
    try {
      const data: SendMessageData = {
        receiver_id: selectedUserId,
        message: newMessage.trim(),
        thread_id: threadId || undefined,
      };

      await messageService.sendMessage(data);
      setNewMessage('');
      refetchMessages();
      refetchConversations();
      toast.success('Message sent');
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <ChatCircle size={64} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Sign in to view messages</h2>
          <p className="text-muted-foreground mb-6">You need to be logged in to access your messages</p>
          <Button onClick={() => onNavigate('login')}>Sign In</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-purple-900 text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Messages</h1>
          <p className="text-primary-foreground/80">Chat with buyers and sellers</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1 overflow-hidden flex flex-col">
            <CardHeader className="border-b">
              <h2 className="font-semibold">Conversations</h2>
            </CardHeader>
            <div className="flex-1 overflow-y-auto">
              {conversationsLoading ? (
                <div className="p-8 text-center">
                  <CircleNotch size={32} className="animate-spin mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Loading conversations...</p>
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-8 text-center">
                  <ChatCircle size={48} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No conversations yet</p>
                </div>
              ) : (
                <div className="divide-y">
                  {conversations.map((conv) => (
                    <button
                      key={conv.thread_id}
                      onClick={() => setSelectedUserId(conv.other_user.id)}
                      className={`w-full p-4 text-left hover:bg-accent transition-colors ${
                        selectedUserId === conv.other_user.id ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User size={20} weight="duotone" className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium truncate">{conv.other_user.name}</span>
                            {conv.unread_count > 0 && (
                              <Badge variant="default" className="ml-2 flex-shrink-0">
                                {conv.unread_count}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {conv.last_message.message}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(conv.last_message.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Messages Panel */}
          <Card className="lg:col-span-2 overflow-hidden flex flex-col">
            {selectedUserId ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User size={20} weight="duotone" className="text-primary" />
                    </div>
                    <div>
                      <h2 className="font-semibold">
                        {conversations.find((c) => c.other_user.id === selectedUserId)?.other_user.name || 'User'}
                      </h2>
                      <p className="text-sm text-muted-foreground">{messages.length} messages</p>
                    </div>
                  </div>
                </CardHeader>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                  {messagesLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <CircleNotch size={32} className="animate-spin text-muted-foreground" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <ChatCircle size={48} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => {
                      const isOwnMessage = message.sender_id === user.id;
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              isOwnMessage
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-background border'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <div className="flex items-center justify-between gap-2 mt-1">
                              <span className={`text-xs ${isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                {format(new Date(message.created_at), 'HH:mm')}
                              </span>
                              {isOwnMessage && message.is_read && (
                                <span className="text-xs text-primary-foreground/70">✓✓ Read</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      disabled={sending}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={!newMessage.trim() || sending}>
                      {sending ? (
                        <CircleNotch size={20} className="animate-spin" />
                      ) : (
                        <PaperPlaneRight size={20} weight="fill" />
                      )}
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <ChatCircle size={64} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
