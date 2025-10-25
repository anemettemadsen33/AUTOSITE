'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface LeasingModalProps {
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

type ApplicationStep = 'calculator' | 'form' | 'documents' | 'success';
type BuyerType = 'individual' | 'company';

export default function LeasingModal({ isOpen, onClose, vehicle }: LeasingModalProps) {
  const [step, setStep] = useState<ApplicationStep>('calculator');
  const [buyerType, setBuyerType] = useState<BuyerType>('individual');
  
  // Calculator state
  const [downPayment, setDownPayment] = useState(30); // percentage
  const [term, setTerm] = useState(60); // months
  const [apr, setApr] = useState(5.9); // annual percentage rate

  // Form state
  const [formData, setFormData] = useState({
    // Individual
    firstName: '',
    lastName: '',
    cnp: '',
    email: '',
    phone: '',
    monthlyIncome: '',
    employer: '',
    // Company
    companyName: '',
    cui: '',
    legalRep: '',
    legalRepEmail: '',
    legalRepPhone: '',
    // Common
    gdprConsent: false,
    creditCheckConsent: false,
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const calculateMonthlyPayment = () => {
    const principal = vehicle.price * (1 - downPayment / 100);
    const monthlyRate = apr / 100 / 12;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    return payment;
  };

  const calculateTotalPayment = () => {
    const downPaymentAmount = vehicle.price * (downPayment / 100);
    const totalInterest = calculateMonthlyPayment() * term;
    return downPaymentAmount + totalInterest;
  };

  const calculateTotalInterest = () => {
    return calculateTotalPayment() - vehicle.price;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCalculatorSubmit = () => {
    if (downPayment < 30) {
      alert('⚠️ Avansul minim este 30% din valoarea vehiculului.');
      return;
    }
    setStep('form');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        vehicle_id: vehicle.id,
        applicant_type: buyerType,
        down_payment_percentage: downPayment,
        term_months: term,
        apr: apr,
        ...formData
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1'}/leasing-applications`, {
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
        throw new Error(data.message || 'Failed to submit application');
      }

      console.log('Leasing application submitted:', data);
      setStep('documents');
      
    } catch (error: any) {
      alert('❌ Eroare la trimiterea cererii: ' + (error.message || 'Încercați din nou.'));
      console.error('Leasing submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = () => {
    setStep('success');
  };

  const handleClose = () => {
    setStep('calculator');
    setBuyerType('individual');
    setDownPayment(30);
    setTerm(60);
    setFormData({
      firstName: '', lastName: '', cnp: '', email: '', phone: '',
      monthlyIncome: '', employer: '', companyName: '', cui: '',
      legalRep: '', legalRepEmail: '', legalRepPhone: '',
      gdprConsent: false, creditCheckConsent: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Aplicare Leasing</h2>
            <p className="text-sm text-gray-600 mt-1">{vehicle.make} {vehicle.model}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { key: 'calculator', label: 'Calculator' },
              { key: 'form', label: 'Date' },
              { key: 'documents', label: 'Documente' },
              { key: 'success', label: 'Finalizare' },
            ].map((s, index) => (
              <div key={s.key} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step === s.key ? 'bg-blue-600 text-white' :
                    ['calculator', 'form', 'documents', 'success'].indexOf(step) > index
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {['calculator', 'form', 'documents', 'success'].indexOf(step) > index ? '✓' : index + 1}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">{s.label}</span>
                </div>
                {index < 3 && (
                  <div className={`h-1 flex-1 mx-2 ${
                    ['calculator', 'form', 'documents', 'success'].indexOf(step) > index
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* STEP 1: CALCULATOR */}
          {step === 'calculator' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculator Leasing</h3>
                
                {/* Down Payment Slider */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Avans (%)</label>
                    <span className="text-lg font-bold text-blue-600">
                      {downPayment}% (€{(vehicle.price * downPayment / 100).toLocaleString()})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="80"
                    step="5"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>30% (minim)</span>
                    <span>80% (maxim)</span>
                  </div>
                </div>

                {/* Term Slider */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Perioadă (luni)</label>
                    <span className="text-lg font-bold text-blue-600">
                      {term} luni ({(term / 12).toFixed(1)} ani)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="84"
                    step="12"
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>12 luni</span>
                    <span>84 luni</span>
                  </div>
                </div>

                {/* APR */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Dobândă anuală (APR)</label>
                    <span className="text-lg font-bold text-blue-600">{apr}%</span>
                  </div>
                  <input
                    type="range"
                    min="3.9"
                    max="12.9"
                    step="0.5"
                    value={apr}
                    onChange={(e) => setApr(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>3.9%</span>
                    <span>12.9%</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <h4 className="font-semibold text-gray-900 mb-4">Rezumat Leasing</h4>
                
                <div className="flex justify-between text-gray-700">
                  <span>Preț vehicul:</span>
                  <span>€{vehicle.price.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-gray-700">
                  <span>Avans ({downPayment}%):</span>
                  <span>€{(vehicle.price * downPayment / 100).toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-gray-700">
                  <span>Sumă finanțată:</span>
                  <span>€{(vehicle.price * (1 - downPayment / 100)).toLocaleString()}</span>
                </div>

                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Rată lunară:</span>
                  <span className="text-3xl font-bold text-green-600">
                    €{calculateMonthlyPayment().toLocaleString(undefined, {maximumFractionDigits: 2})}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1 pt-3 border-t">
                  <div className="flex justify-between">
                    <span>Total plătit:</span>
                    <span>€{calculateTotalPayment().toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dobândă totală:</span>
                    <span>€{calculateTotalInterest().toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                <strong>⚠️ Atenție:</strong> Avansul minim pentru leasing este 30% din valoarea vehiculului.
                Ratele sunt orientative și pot varia în funcție de istoricul de credit.
              </div>

              <button
                onClick={handleCalculatorSubmit}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Continuă cu Aplicarea
              </button>
            </div>
          )}

          {/* STEP 2: FORM */}
          {step === 'form' && (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Buyer Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tip Solicitant
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
                  </button>
                </div>
              </div>

              {/* Individual Fields */}
              {buyerType === 'individual' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Date Personale</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Nume *"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Prenume *"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="cnp"
                      placeholder="CNP *"
                      value={formData.cnp}
                      onChange={handleInputChange}
                      required
                      maxLength={13}
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Telefon *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      name="monthlyIncome"
                      placeholder="Venit lunar net (€) *"
                      value={formData.monthlyIncome}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="employer"
                      placeholder="Angajator *"
                      value={formData.employer}
                      onChange={handleInputChange}
                      required
                      className="col-span-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Company Fields */}
              {buyerType === 'company' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Date Companie</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Denumire Firmă *"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="col-span-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="cui"
                      placeholder="CUI *"
                      value={formData.cui}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="legalRep"
                      placeholder="Reprezentant Legal *"
                      value={formData.legalRep}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      name="legalRepEmail"
                      placeholder="Email Reprezentant *"
                      value={formData.legalRepEmail}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      name="legalRepPhone"
                      placeholder="Telefon Reprezentant *"
                      value={formData.legalRepPhone}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Consents */}
              <div className="space-y-3 pt-4">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="gdprConsent"
                    checked={formData.gdprConsent}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Accept prelucrarea datelor personale conform GDPR *
                  </span>
                </label>
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="creditCheckConsent"
                    checked={formData.creditCheckConsent}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Accept verificarea credit scoring (soft check) *
                  </span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep('calculator')}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Înapoi
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300"
                >
                  {loading ? 'Se procesează...' : 'Continuă'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: DOCUMENTS */}
          {step === 'documents' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Documente Necesare</h3>
              
              <div className="space-y-4">
                {buyerType === 'individual' ? (
                  <>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition cursor-pointer">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📄</div>
                        <div className="font-medium text-gray-900">Carte Identitate (față + verso)</div>
                        <div className="text-sm text-gray-600 mt-1">Click pentru upload</div>
                      </div>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition cursor-pointer">
                      <div className="text-center">
                        <div className="text-4xl mb-2">💰</div>
                        <div className="font-medium text-gray-900">Adeverință Venit</div>
                        <div className="text-sm text-gray-600 mt-1">Click pentru upload</div>
                      </div>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition cursor-pointer">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏠</div>
                        <div className="font-medium text-gray-900">Dovadă Domiciliu</div>
                        <div className="text-sm text-gray-600 mt-1">Factură utilități (opțional)</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition cursor-pointer">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏢</div>
                        <div className="font-medium text-gray-900">Certificat Înregistrare</div>
                        <div className="text-sm text-gray-600 mt-1">Click pentru upload</div>
                      </div>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition cursor-pointer">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📊</div>
                        <div className="font-medium text-gray-900">Bilanț Contabil</div>
                        <div className="text-sm text-gray-600 mt-1">Ultimele 2 exerciții financiare</div>
                      </div>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition cursor-pointer">
                      <div className="text-center">
                        <div className="text-4xl mb-2">✍️</div>
                        <div className="font-medium text-gray-900">Împuternicire Reprezentant</div>
                        <div className="text-sm text-gray-600 mt-1">Click pentru upload</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
                💡 <strong>Notă:</strong> Documentele vor fi verificate în 24-48 ore. Veți fi contactat telefonic pentru următorii pași.
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Înapoi
                </button>
                <button
                  onClick={handleDocumentUpload}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Finalizează Aplicarea
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'success' && (
            <div className="text-center py-8 space-y-6">
              <div className="text-6xl">✅</div>
              <h3 className="text-2xl font-bold text-green-600">Cerere Înregistrată!</h3>
              <div className="bg-gray-50 rounded-lg p-6 text-left space-y-3">
                <h4 className="font-semibold text-gray-900">Pașii Următori:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Verificare documente (24-48 ore)</li>
                  <li>Credit scoring (soft check)</li>
                  <li>Evaluare cerere de către departamentul financiar</li>
                  <li>Vă vom contacta telefonic cu decizia</li>
                  <li>Semnare contract (dacă aprobat)</li>
                  <li>Plată avans {downPayment}%</li>
                  <li>Predare vehicul</li>
                </ol>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
                📧 Veți primi un email de confirmare la adresa specificată cu toate detaliile și număr de referință.
              </div>
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Închide
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
