'use client';

import { useState } from 'react';
import { CurrencyEuroIcon, CalendarIcon, CalculatorIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function LeasingPage() {
  const [leasingType, setLeasingType] = useState<'personal' | 'business'>('personal');
  const [vehiclePrice, setVehiclePrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(6000);
  const [duration, setDuration] = useState(48);
  
  const monthlyPayment = ((vehiclePrice - downPayment) * 1.05) / duration;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Leasing <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Auto</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Calculator Leasing</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setLeasingType('personal')}
                className={`p-4 rounded-xl border-2 ${leasingType === 'personal' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
              >
                <div className="font-bold">Persoană Fizică</div>
              </button>
              <button
                onClick={() => setLeasingType('business')}
                className={`p-4 rounded-xl border-2 ${leasingType === 'business' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
              >
                <div className="font-bold">Companie</div>
              </button>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold">Preț Vehicul: €{vehiclePrice.toLocaleString()}</label>
              <input
                type="range"
                min="10000"
                max="100000"
                step="1000"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold">Avans: €{downPayment.toLocaleString()}</label>
              <input
                type="range"
                min="0"
                max={vehiclePrice * 0.5}
                step="500"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold">Durată: {duration} luni</label>
              <div className="grid grid-cols-4 gap-2">
                {[24, 36, 48, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => setDuration(m)}
                    className={`py-2 rounded ${duration === m ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-6 text-white">
              <div className="text-sm mb-2">Rată Lunară</div>
              <div className="text-4xl font-black">€{monthlyPayment.toFixed(0)}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Solicită Ofertă</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Nume" className="w-full px-4 py-3 border rounded-lg" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-lg" />
              <input type="tel" placeholder="Telefon" className="w-full px-4 py-3 border rounded-lg" />
              <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold">
                Trimite
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
