'use client';

import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { startConversation, type StartConversationData } from '@/lib/messages';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface ContactDealerButtonProps {
  vehicleId: number;
  vehicleTitle: string;
  dealerId?: number;
  className?: string;
}

export default function ContactDealerButton({ 
  vehicleId, 
  vehicleTitle,
  dealerId,
  className = ''
}: ContactDealerButtonProps) {
  const t = useTranslations('vehicle');
  const { user, token } = useAuthStore();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState(`Inquiry about ${vehicleTitle}`);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleClick = () => {
    if (!user) {
      toast.error(t('pleaseLoginToContact'));
      router.push('/login');
      return;
    }

    if (user.id === dealerId) {
      toast.error(t('cannotContactYourself'));
      return;
    }

    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !token) return;

    setSending(true);
    try {
      const data: StartConversationData = {
        subject: subject.trim(),
        content: message.trim(),
      };

      await startConversation(vehicleId, data, token);
      
      toast.success(t('messageSent'));
      setShowModal(false);
      setMessage('');
      router.push('/user/messages');
    } catch {
      toast.error(t('errorSendingMessage'));
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold ${className}`}
      >
        {t('contactDealer')}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('contactDealer')}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder={t('messagePlaceholder')}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={sending}
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={!message.trim() || sending}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {sending ? t('sending') : t('send')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
