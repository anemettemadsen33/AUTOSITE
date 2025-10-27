'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image?: string;
  rating: number;
  text: string;
  vehicle: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Andrei Popescu',
    role: 'Antreprenor',
    rating: 5,
    text: 'Experiență excelentă! Am găsit mașina perfectă pentru mine în mai puțin de o săptămână. Procesul a fost foarte simplu și transparent.',
    vehicle: 'BMW Seria 3'
  },
  {
    id: 2,
    name: 'Maria Ionescu',
    role: 'Manager',
    rating: 5,
    text: 'Platforma este foarte intuitivă și oferă multe opțiuni de filtrare. Am comparat mai multe oferte și am făcut cea mai bună alegere.',
    vehicle: 'Audi A4'
  },
  {
    id: 3,
    name: 'Ion Cristea',
    role: 'IT Specialist',
    rating: 5,
    text: 'Dealerii sunt verificați și profesioniști. Comunicarea a fost rapidă și am primit toate informațiile de care aveam nevoie.',
    vehicle: 'Mercedes-Benz C-Class'
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Ce Spun Clienții Noștri
          </h2>
          <p className="text-gray-600">
            Peste 500 de clienți mulțumiți și-au găsit mașina visurilor
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl">
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role} • {testimonial.vehicle}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-black text-blue-600 mb-2">4.9/5</div>
            <div className="text-sm text-gray-600">Rating Mediu</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-blue-600 mb-2">500+</div>
            <div className="text-sm text-gray-600">Review-uri</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-blue-600 mb-2">98%</div>
            <div className="text-sm text-gray-600">Clienți Mulțumiți</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-blue-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Suport</div>
          </div>
        </div>
      </div>
    </section>
  );
}
