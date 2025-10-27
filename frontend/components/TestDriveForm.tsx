'use client';

import { useState } from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function TestDriveForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', time: '' });
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
    <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Programează Test Drive</h3>
      
      {status === 'success' ? (
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h4 className="font-bold mb-2">Test Drive Programat!</h4>
          <p className="text-sm text-blue-100">Vei primi confirmarea pe email.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Nume Complet</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-white/20 border-2 border-white/30 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white/70"
              placeholder="Numele tău"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Telefon</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 bg-white/20 border-2 border-white/30 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white/70"
              placeholder="+40 722 123 456"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-2">Data</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 bg-white/20 border-2 border-white/30 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Ora</label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 bg-white/20 border-2 border-white/30 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white"
                required
              >
                <option value="">Alege ora</option>
                <option value="10:00">10:00</option>
                <option value="12:00">12:00</option>
                <option value="14:00">14:00</option>
                <option value="16:00">16:00</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Se programează...' : 'Programează Acum'}
          </button>
        </form>
      )}
    </div>
  );
}
