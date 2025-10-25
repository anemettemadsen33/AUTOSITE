'use client';

import { useState } from 'react';

interface LeasingCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleId: number;
  vehicleTitle: string;
  price: number;
}

export function LeasingCalculatorModal({ isOpen, onClose, vehicleTitle, price }: LeasingCalculatorModalProps) {
  const [downPayment, setDownPayment] = useState(price * 0.2);
  const [duration, setDuration] = useState(48);
  const [interestRate] = useState(4.9);

  if (!isOpen) return null;

  const loanAmount = price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, duration)) / (Math.pow(1 + monthlyRate, duration) - 1);
  const totalPayment = monthlyPayment * duration + downPayment;
  const totalInterest = totalPayment - price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Leasing Calculator</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Vehicle</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{vehicleTitle}</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">€{price.toLocaleString()}</p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Down Payment
                </label>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  €{downPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <input
                type="range"
                min={price * 0.1}
                max={price * 0.5}
                step={100}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>10%</span>
                <span>50%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Loan Duration
                </label>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {duration} months
                </span>
              </div>
              <input
                type="range"
                min={12}
                max={84}
                step={12}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>12</span>
                <span>24</span>
                <span>36</span>
                <span>48</span>
                <span>60</span>
                <span>72</span>
                <span>84</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Interest Rate</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{interestRate}% APR</span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Payment</p>
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                    €{monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">per month</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Total Amount</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      €{totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Total Interest</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      €{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              * This is an estimate. Actual rates may vary based on credit score and other factors.
            </div>

            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Request Financing Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
