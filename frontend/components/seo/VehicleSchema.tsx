import React from 'react';

interface VehicleSchemaProps {
  vehicle: {
    slug: string;
    make: string;
    model: string;
    year: number;
    price: number;
    currency: string;
    mileage: number;
    fuel: string;
    transmission: string;
    bodyType?: string;
    condition: string;
    description?: string;
    images?: string[];
    vin?: string;
    color?: string;
  };
}

/**
 * Vehicle Structured Data Component
 * Implements Schema.org Vehicle type for SEO
 */
export default function VehicleSchema({ vehicle }: VehicleSchemaProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
    brand: {
      '@type': 'Brand',
      name: vehicle.make,
    },
    model: vehicle.model,
    vehicleModelDate: vehicle.year,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: vehicle.mileage,
      unitCode: 'KMT',
    },
    fuelType: vehicle.fuel,
    vehicleTransmission: vehicle.transmission,
    ...(vehicle.bodyType && { bodyType: vehicle.bodyType }),
    vehicleConfiguration: vehicle.condition,
    ...(vehicle.description && { description: vehicle.description }),
    ...(vehicle.vin && { vehicleIdentificationNumber: vehicle.vin }),
    ...(vehicle.color && { color: vehicle.color }),
    offers: {
      '@type': 'Offer',
      price: vehicle.price,
      priceCurrency: vehicle.currency,
      availability: 'https://schema.org/InStock',
      itemCondition: 
        vehicle.condition === 'new' 
          ? 'https://schema.org/NewCondition'
          : 'https://schema.org/UsedCondition',
    },
    ...(vehicle.images && vehicle.images.length > 0 && {
      image: vehicle.images,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
