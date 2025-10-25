'use client';

import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'individual', // individual or company
    company: '',
    cui: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', type: 'individual', company: '', cui: '' });
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Contactează-ne
          </h1>
          <p className="text-xl text-gray-600">Suntem aici să te ajutăm</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <EnvelopeIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-2">Email</h3>
            <a href="mailto:contact@autosite.ro" className="text-blue-600 hover:text-blue-700 font-semibold">
              contact@autosite.ro
            </a>
            <p className="text-sm text-gray-500 mt-2">Răspuns în 24h</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <PhoneIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-2">Telefon</h3>
            <a href="tel:+40123456789" className="text-blue-600 hover:text-blue-700 font-semibold text-lg">
              +40 123 456 789
            </a>
            <p className="text-sm text-gray-500 mt-2">Luni-Vineri 9-18</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPinIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-2">Adresă</h3>
            <p className="text-gray-600 font-semibold">
              Strada Exemplu 123<br />
              București, 010101
            </p>
            <p className="text-sm text-gray-500 mt-2">România</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Trimite-ne un mesaj
            </h2>

            {submitted && (
              <div className="bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6 flex items-center space-x-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Mesajul tău a fost trimis cu succes!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Tip solicitant</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, type: 'individual'})}
                    className={`p-4 rounded-xl border-2 transition ${
                      formData.type === 'individual' 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">👤</div>
                    <div className="font-bold">Persoană Fizică</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, type: 'company'})}
                    className={`p-4 rounded-xl border-2 transition ${
                      formData.type === 'company' 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">🏢</div>
                    <div className="font-bold">Companie</div>
                  </button>
                </div>
              </div>

              {formData.type === 'company' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nume Companie *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      CUI
                    </label>
                    <input
                      type="text"
                      value={formData.cui}
                      onChange={(e) => setFormData({ ...formData, cui: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nume complet *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Subiect *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Mesaj *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                Trimite Mesaj
              </button>
            </form>
          </div>

          {/* Google Map */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 pb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Locația Noastră
              </h2>
            </div>
            <div className="h-[600px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.8583361194386!2d26.096306315556897!3d44.43942097910192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff476d0c1f85%3A0x86770c7a08f3d1a6!2zQnVjdXJlyJl0aQ!5e0!3m2!1sen!2sro!4v1635000000000!5m2!1sen!2sro"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition duration-500"
              ></iframe>
            </div>
          </div>
        </div>

        {/* FAQ Quick Links */}
        <div className="mt-12 bg-gradient-to-br from-blue-900 to-cyan-900 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Întrebări Frecvente</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="font-bold mb-2">Program</h4>
              <p className="text-sm text-blue-100">Luni - Vineri: 9:00 - 18:00<br />Sâmbătă: 10:00 - 14:00</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="font-bold mb-2">Răspuns</h4>
              <p className="text-sm text-blue-100">Garantăm răspuns în maxim 24 de ore</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="font-bold mb-2">Suport</h4>
              <p className="text-sm text-blue-100">Asistență gratuită pentru toți clienții</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
