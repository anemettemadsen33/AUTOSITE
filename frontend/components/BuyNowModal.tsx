'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface BuyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: {
    id: number;
    title: string;
    price: number;
    make: string;
    model: string;
  };
}

type BuyerType = 'individual' | 'company';

export default function BuyNowModal({ isOpen, onClose, vehicle }: BuyNowModalProps) {
  const [buyerType, setBuyerType] = useState<BuyerType>('individual');
  const [formData, setFormData] = useState({
    // Individual fields
    firstName: '',
    lastName: '',
    cnp: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    city: '',
    postalCode: '',
    // Company fields
    companyName: '',
    cui: '',
    vatNumber: '',
    companyAddress: '',
    companyCity: '',
    companyPostalCode: '',
    legalRepresentative: '',
    legalRepPosition: '',
    legalRepPhone: '',
    legalRepEmail: '',
    // Common
    gdprConsent: false,
    termsConsent: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        vehicle_id: vehicle.id,
        buyer_type: buyerType,
        ...formData
      };

      // Call API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1'}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      setSuccess(true);
      
      // Show success message
      setTimeout(() => {
        alert(`✅ Comandă înregistrată!\n\nFactură: ${data.data.invoice_number}\n\nVeți primi factura proforma pe email cu detaliile bancare pentru plata.\n\nVehicul: ${vehicle.title}\nPreț: €${vehicle.price.toLocaleString()}`);
        onClose();
        setSuccess(false);
        // Reset form
        setFormData({
          firstName: '', lastName: '', cnp: '', email: '', phone: '', birthDate: '',
          address: '', city: '', postalCode: '', companyName: '', cui: '', vatNumber: '',
          companyAddress: '', companyCity: '', companyPostalCode: '', legalRepresentative: '',
          legalRepPosition: '', legalRepPhone: '', legalRepEmail: '',
          gdprConsent: false, termsConsent: false,
        });
      }, 1000);

    } catch (error: any) {
      alert('❌ Eroare la trimiterea comenzii: ' + (error.message || 'Vă rugăm încercați din nou.'));
      console.error('Order submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const basePrice = vehicle.price;
    const vat = buyerType === 'company' ? basePrice * 0.19 : 0;
    const processingFee = 99;
    return basePrice + vat + processingFee;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Finalizare Comandă</h2>
            <p className="text-sm text-gray-600 mt-1">{vehicle.make} {vehicle.model}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Comandă Înregistrată!</h3>
            <p className="text-gray-600">Veți primi factura proforma pe email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Buyer Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tip Cumpărător
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setBuyerType('individual')}
                  className={`p-4 border-2 rounded-lg transition ${
                    buyerType === 'individual'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg font-semibold">👤 Persoană Fizică</div>
                  <div className="text-sm text-gray-600 mt-1">Fără TVA</div>
                </button>
                <button
                  type="button"
                  onClick={() => setBuyerType('company')}
                  className={`p-4 border-2 rounded-lg transition ${
                    buyerType === 'company'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg font-semibold">🏢 Companie</div>
                  <div className="text-sm text-gray-600 mt-1">Cu TVA 19%</div>
                </button>
              </div>
            </div>

            {/* Individual Form */}
            {buyerType === 'individual' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Date Personale
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nume *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prenume *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CNP *
                    </label>
                    <input
                      type="text"
                      name="cnp"
                      value={formData.cnp}
                      onChange={handleInputChange}
                      required
                      maxLength={13}
                      pattern="[0-9]{13}"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data Nașterii *
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 pt-4">
                  Adresă
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adresă Completă *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Str., Nr., Bl., Sc., Et., Ap."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Oraș *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cod Poștal *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Company Form */}
            {buyerType === 'company' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Date Companie
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Denumire Firmă *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CUI *
                    </label>
                    <input
                      type="text"
                      name="cui"
                      value={formData.cui}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cod TVA (opțional)
                    </label>
                    <input
                      type="text"
                      name="vatNumber"
                      value={formData.vatNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adresă Sediu Social *
                    </label>
                    <input
                      type="text"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Oraș *
                    </label>
                    <input
                      type="text"
                      name="companyCity"
                      value={formData.companyCity}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cod Poștal *
                    </label>
                    <input
                      type="text"
                      name="companyPostalCode"
                      value={formData.companyPostalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 pt-4">
                  Reprezentant Legal
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nume Complet *
                    </label>
                    <input
                      type="text"
                      name="legalRepresentative"
                      value={formData.legalRepresentative}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Funcție *
                    </label>
                    <input
                      type="text"
                      name="legalRepPosition"
                      value={formData.legalRepPosition}
                      onChange={handleInputChange}
                      required
                      placeholder="Ex: Director General"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="legalRepEmail"
                      value={formData.legalRepEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      name="legalRepPhone"
                      value={formData.legalRepPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rezumat Comandă</h3>
              <div className="flex justify-between text-gray-700">
                <span>Preț vehicul:</span>
                <span>€{vehicle.price.toLocaleString()}</span>
              </div>
              {buyerType === 'company' && (
                <div className="flex justify-between text-gray-700">
                  <span>TVA (19%):</span>
                  <span>€{(vehicle.price * 0.19).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-700">
                <span>Taxă procesare:</span>
                <span>€99</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                <span>Total:</span>
                <span>€{calculateTotal().toLocaleString()}</span>
              </div>
              <div className="text-sm text-gray-600 mt-4 p-3 bg-blue-50 rounded">
                💳 După confirmare, veți primi factura proforma cu detaliile bancare pentru efectuarea plății.
              </div>
            </div>

            {/* Consents */}
            <div className="space-y-3">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="gdprConsent"
                  checked={formData.gdprConsent}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Accept prelucrarea datelor personale conform GDPR *
                </span>
              </label>
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="termsConsent"
                  checked={formData.termsConsent}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Accept termenii și condițiile *
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Anulează
              </button>
              <button
                type="submit"
                disabled={loading || !formData.gdprConsent || !formData.termsConsent}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Se procesează...' : 'Confirmă Comanda'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
