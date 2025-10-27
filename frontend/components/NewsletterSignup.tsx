'use client';

import { useState } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <EnvelopeIcon className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Fii Primul Care Află
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Primește oferte exclusive și noutăți direct în inbox-ul tău
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adresa@email.ro"
                required
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading' ? 'Se trimite...' : status === 'success' ? '✓ Trimis' : 'Abonează-te'}
              </button>
            </div>
            
            {status === 'success' && (
              <p className="mt-3 text-green-200 text-sm">
                ✓ Te-ai abonat cu succes! Verifică-ți email-ul.
              </p>
            )}
            
            <p className="mt-3 text-blue-200 text-xs">
              🔒 Nu spam. Poți renunța oricând. Respectăm confidențialitatea ta.
            </p>
          </form>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-white">
              <div className="text-2xl font-bold mb-1">📧</div>
              <div className="text-sm font-semibold mb-1">Oferte Exclusive</div>
              <div className="text-xs text-blue-200">Reduceri speciale pentru abonați</div>
            </div>
            <div className="text-white">
              <div className="text-2xl font-bold mb-1">🚗</div>
              <div className="text-sm font-semibold mb-1">Alerte Noi Vehicule</div>
              <div className="text-xs text-blue-200">Fii primul care vede ofertele noi</div>
            </div>
            <div className="text-white">
              <div className="text-2xl font-bold mb-1">💡</div>
              <div className="text-sm font-semibold mb-1">Sfaturi & Ghiduri</div>
              <div className="text-xs text-blue-200">Cum să alegi mașina perfectă</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
