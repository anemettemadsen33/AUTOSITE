'use client';

import { useState } from 'react';
import { XMarkIcon, CalculatorIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface LeasingCalculatorProps {
  vehiclePrice: number;
  vehicleName: string;
  onClose: () => void;
}

export default function LeasingCalculator({ vehiclePrice, vehicleName, onClose }: LeasingCalculatorProps) {
  const [downPayment, setDownPayment] = useState(20); // percentage
  const [loanTerm, setLoanTerm] = useState(60); // months
  const [interestRate, setInterestRate] = useState(5.9); // percentage

  const downPaymentAmount = (vehiclePrice * downPayment) / 100;
  const loanAmount = vehiclePrice - downPaymentAmount;
  
  // Calculate monthly payment using standard loan formula
  const monthlyInterestRate = interestRate / 100 / 12;
  const monthlyPayment = 
    loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) /
    (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
  
  const totalPayment = monthlyPayment * loanTerm + downPaymentAmount;
  const totalInterest = totalPayment - vehiclePrice;

  const loanTermOptions = [
    { months: 12, label: '1 an' },
    { months: 24, label: '2 ani' },
    { months: 36, label: '3 ani' },
    { months: 48, label: '4 ani' },
    { months: 60, label: '5 ani' },
  ];

  const interestRateOptions = [
    { rate: 4.9, label: '4.9% - Excellent credit' },
    { rate: 5.9, label: '5.9% - Good credit' },
    { rate: 7.9, label: '7.9% - Fair credit' },
    { rate: 9.9, label: '9.9% - Poor credit' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <CalculatorIcon className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black">Calculator Leasing</h2>
              <p className="text-blue-100">{vehicleName}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* LEFT: Controls */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Configurează Finanțarea</h3>
              
              {/* Vehicle Price */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preț Vehicul</label>
                <div className="text-3xl font-black text-blue-600">€{vehiclePrice.toLocaleString()}</div>
              </div>

              {/* Down Payment */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-gray-700">Avans</label>
                  <span className="text-lg font-bold text-blue-600">{downPayment}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span>50%</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Valoare: <span className="font-bold text-gray-900">€{downPaymentAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Loan Term */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Perioadă Creditare</label>
                <div className="grid grid-cols-5 gap-2">
                  {loanTermOptions.map((option) => (
                    <button
                      key={option.months}
                      onClick={() => setLoanTerm(option.months)}
                      className={`px-3 py-2 rounded-lg font-bold text-sm transition ${
                        loanTerm === option.months
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Rată Dobândă</label>
                <div className="space-y-2">
                  {interestRateOptions.map((option) => (
                    <label
                      key={option.rate}
                      className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition ${
                        interestRate === option.rate
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="interestRate"
                        value={option.rate}
                        checked={interestRate === option.rate}
                        onChange={() => setInterestRate(option.rate)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-900">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Summary */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Rezumat Finanțare</h3>
            
            {/* Monthly Payment - BIG */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl p-6 mb-4">
              <div className="text-sm font-semibold mb-2">Rată Lunară Estimată</div>
              <div className="text-5xl font-black mb-1">€{Math.round(monthlyPayment).toLocaleString()}</div>
              <div className="text-blue-100 text-sm">pe lună, {loanTerm} luni</div>
            </div>

            {/* Breakdown */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Preț Vehicul</span>
                <span className="text-gray-900 font-bold">€{vehiclePrice.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Avans ({downPayment}%)</span>
                <span className="text-green-600 font-bold">- €{downPaymentAmount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Sumă Creditată</span>
                <span className="text-gray-900 font-bold">€{loanAmount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Dobândă ({interestRate}%)</span>
                <span className="text-red-600 font-bold">+ €{Math.round(totalInterest).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-900 font-bold text-lg">Cost Total</span>
                <span className="text-blue-600 font-black text-2xl">€{Math.round(totalPayment).toLocaleString()}</span>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">Aprobare Rapidă</div>
                  <div className="text-sm text-gray-600">Răspuns în 24 ore</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">Fără Costuri Ascunse</div>
                  <div className="text-sm text-gray-600">Transparență totală</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">Plată Anticipată</div>
                  <div className="text-sm text-gray-600">Fără penalități</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition shadow-lg">
              📋 Aplică pentru Finanțare
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 text-center text-xs text-gray-600">
          * Calculul este orientativ. Rata finală depinde de bonitatea clientului și de politica băncii partenere.
        </div>
      </div>
    </div>
  );
}
