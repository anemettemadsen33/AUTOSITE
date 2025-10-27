'use client';

interface Spec {
  label: string;
  value: string;
  icon?: string;
}

interface SpecsTableProps {
  specs: {
    general: Spec[];
    technical: Spec[];
    features: Spec[];
  };
}

export default function VehicleSpecsTable({ specs }: SpecsTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Specificații Tehnice</h2>

      {/* General Info */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
          Informații Generale
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {specs.general.map((spec, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">{spec.label}:</span>
              <span className="font-semibold text-gray-900">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technical */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
          Specificații Tehnice
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {specs.technical.map((spec, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">{spec.label}:</span>
              <span className="font-semibold text-gray-900">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
          Dotări & Extra
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {specs.features.map((spec, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
