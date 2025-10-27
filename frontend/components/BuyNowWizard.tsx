'use client';

import { useState } from 'react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface BuyNowWizardProps {
  vehicle: {
    id: number;
    name: string;
    price: number;
  };
  onClose: () => void;
}

export default function BuyNowWizard({ vehicle, onClose }: BuyNowWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: '',
    insurance: false,
    warranty: false,
  });

  const steps = [
    { num: 1, title: 'Informații Personale' },
    { num: 2, title: 'Metodă Plată' },
    { num: 3, title: 'Opțiuni Adiționale' },
    { num: 4, title: 'Confirmare' },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    alert('Comanda a fost plasată cu succes!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black">Finalizează Comanda</h2>
            <p className="text-blue-100">{vehicle.name}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between mb-2">
            {steps.map((s) => (
              <div key={s.num} className="flex-1">
                <div className={`flex items-center ${s.num !== steps.length ? 'pr-4' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                    s.num < step ? 'bg-green-500 text-white' : s.num === step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {s.num < step ? '✓' : s.num}
                  </div>
                  {s.num !== steps.length && (
                    <div className={`flex-1 h-1 mx-2 transition ${s.num < step ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
                <p className={`text-xs mt-2 ${s.num === step ? 'font-bold text-blue-600' : 'text-gray-500'}`}>
                  {s.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Informații Personale</h3>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nume Complet *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ion Popescu"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@exemplu.ro"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+40 722 123 456"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Adresă Completă *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Str. Exemplu nr. 123, București"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Metodă de Plată</h3>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">💵 Plată Cash</div>
                    <div className="text-sm text-gray-600">Plata integrală în numerar</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="financing"
                    checked={formData.paymentMethod === 'financing'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">🏦 Finanțare Bancară</div>
                    <div className="text-sm text-gray-600">Credit cu dobândă de la 5.9%</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="leasing"
                    checked={formData.paymentMethod === 'leasing'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">💳 Leasing Operațional</div>
                    <div className="text-sm text-gray-600">Rate flexibile, avans de la 10%</div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Additional Options */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Opțiuni Adiționale</h3>
              <div className="space-y-3">
                <label className="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition">
                  <input
                    type="checkbox"
                    checked={formData.insurance}
                    onChange={(e) => setFormData({ ...formData, insurance: e.target.checked })}
                    className="w-5 h-5 text-blue-600 mt-1"
                  />
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">🛡️ Asigurare CASCO</div>
                    <div className="text-sm text-gray-600 mb-2">Protecție completă pentru vehicul</div>
                    <div className="text-lg font-bold text-blue-600">+ €850/an</div>
                  </div>
                </label>

                <label className="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition">
                  <input
                    type="checkbox"
                    checked={formData.warranty}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.checked })}
                    className="w-5 h-5 text-blue-600 mt-1"
                  />
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">🔧 Garanție Extinsă</div>
                    <div className="text-sm text-gray-600 mb-2">3 ani garanție completă</div>
                    <div className="text-lg font-bold text-blue-600">+ €1,200</div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirmă Comanda</h3>
                <p className="text-gray-600">Verifică datele înainte de finalizare</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Vehicul</h4>
                  <p className="text-gray-700">{vehicle.name}</p>
                  <p className="text-2xl font-black text-blue-600">€{vehicle.price.toLocaleString()}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-bold text-gray-900 mb-2">Informații Contact</h4>
                  <p className="text-gray-700">{formData.name}</p>
                  <p className="text-gray-600 text-sm">{formData.email}</p>
                  <p className="text-gray-600 text-sm">{formData.phone}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-bold text-gray-900 mb-2">Metodă Plată</h4>
                  <p className="text-gray-700 capitalize">{formData.paymentMethod || 'Nu ai selectat'}</p>
                </div>

                {(formData.insurance || formData.warranty) && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-bold text-gray-900 mb-2">Opțiuni Extra</h4>
                    {formData.insurance && <p className="text-gray-700">✓ Asigurare CASCO</p>}
                    {formData.warranty && <p className="text-gray-700">✓ Garanție Extinsă</p>}
                  </div>
                )}

                <div className="border-t-2 border-gray-300 pt-4">
                  <div className="flex justify-between text-xl">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className="font-black text-blue-600">
                      €{(vehicle.price + (formData.insurance ? 850 : 0) + (formData.warranty ? 1200 : 0)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-6 border-t border-gray-200 flex justify-between">
          {step > 1 && (
            <button
              onClick={handlePrev}
              className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition"
            >
              ← Înapoi
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={handleNext}
              className="ml-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-cyan-700 transition"
            >
              Continuă →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition"
            >
              ✓ Finalizează Comanda
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
