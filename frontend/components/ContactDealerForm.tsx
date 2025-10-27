'use client';

import { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, UserIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function ContactDealerForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Contactează Dealerul</h3>
      
      {status === 'success' ? (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h4 className="font-bold text-green-900 mb-2">Mesaj trimis!</h4>
          <p className="text-sm text-green-700">Dealerul te va contacta în curând.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nume</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Numele tău"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+40 722..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@exemplu.ro"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mesaj</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Sunt interesat de acest vehicul..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-cyan-700 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Se trimite...' : 'Trimite Mesaj'}
          </button>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <a href="tel:+40722123456" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition">
              <PhoneIcon className="w-5 h-5" />
              <span className="font-semibold">Sună</span>
            </a>
            <a href="mailto:dealer@autosite.ro" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition">
              <EnvelopeIcon className="w-5 h-5" />
              <span className="font-semibold">Email</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
