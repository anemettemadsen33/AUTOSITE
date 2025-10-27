'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Button, Input, Alert, Card } from '@/components/ui';

const contactMethods = [
  {
    icon: PhoneIcon,
    title: 'Telefon',
    value: '+40 21 123 4567',
    description: 'Luni - Vineri, 09:00 - 18:00',
  },
  {
    icon: EnvelopeIcon,
    title: 'Email',
    value: 'contact@autosite.ro',
    description: 'Răspundem în max 24h',
  },
  {
    icon: MapPinIcon,
    title: 'Adresă',
    value: 'Str. Exemplu nr. 123, București',
    description: 'Sector 1, România',
  },
  {
    icon: ClockIcon,
    title: 'Program',
    value: 'Luni - Vineri: 09:00 - 18:00',
    description: 'Sâmbătă: 10:00 - 14:00',
  },
];

const officeLocations = [
  {
    city: 'București',
    address: 'Str. Exemplu nr. 123, Sector 1',
    phone: '+40 21 123 4567',
    email: 'bucuresti@autosite.ro',
  },
  {
    city: 'Cluj-Napoca',
    address: 'Str. Exemplu nr. 456, Centru',
    phone: '+40 264 123 456',
    email: 'cluj@autosite.ro',
  },
  {
    city: 'Timișoara',
    address: 'Str. Exemplu nr. 789, Centru',
    phone: '+40 256 123 456',
    email: 'timisoara@autosite.ro',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Numele este obligatoriu';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email-ul este obligatoriu';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefonul este obligatoriu';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subiectul este obligatoriu';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mesajul este obligatoriu';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mesajul trebuie să conțină cel puțin 10 caractere';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, this would be an actual API call:
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Contactează-ne
            </h1>
            <p className="text-xl text-blue-100">
              Suntem aici să te ajutăm! Scrie-ne și îți vom răspunde cât mai curând posibil.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} variant="hover" className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
                <p className="text-blue-600 font-semibold mb-1">{method.value}</p>
                <p className="text-sm text-gray-600">{method.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Trimite-ne un mesaj
                </h2>

                {submitSuccess && (
                  <Alert
                    variant="success"
                    title="Mesaj trimis cu succes!"
                    closable
                    onClose={() => setSubmitSuccess(false)}
                    className="mb-6"
                  >
                    Îți mulțumim! Vom reveni cu un răspuns în cel mai scurt timp.
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Nume complet"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      placeholder="Ion Popescu"
                      fullWidth
                    />

                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="ion@example.com"
                      fullWidth
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Telefon"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      placeholder="+40 123 456 789"
                      fullWidth
                    />

                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subiect
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                          errors.subject
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        }`}
                      >
                        <option value="">Selectează un subiect</option>
                        <option value="general">Întrebare generală</option>
                        <option value="support">Suport tehnic</option>
                        <option value="dealer">Devin dealer</option>
                        <option value="complaint">Reclamație</option>
                        <option value="other">Altele</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1.5 text-sm text-red-600">{errors.subject}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mesaj
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Scrie mesajul tău aici..."
                      className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none ${
                        errors.message
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Se trimite...' : 'Trimite mesaj'}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Office Locations */}
            <div>
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Birourile Noastre
                </h2>

                <div className="space-y-6">
                  {officeLocations.map((office, index) => (
                    <div key={index} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                      <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <MapPinIcon className="w-5 h-5 text-blue-600" />
                        {office.city}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{office.address}</p>
                      <div className="space-y-1">
                        <a
                          href={`tel:${office.phone}`}
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <PhoneIcon className="w-4 h-4" />
                          {office.phone}
                        </a>
                        <a
                          href={`mailto:${office.email}`}
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <EnvelopeIcon className="w-4 h-4" />
                          {office.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Links */}
              <Card className="mt-6">
                <h3 className="font-bold text-gray-900 mb-4">Link-uri Utile</h3>
                <div className="space-y-2">
                  <a
                    href="/faq"
                    className="block text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Întrebări Frecvente
                  </a>
                  <a
                    href="/about"
                    className="block text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Despre Noi
                  </a>
                  <a
                    href="/terms"
                    className="block text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Termeni și Condiții
                  </a>
                  <a
                    href="/privacy"
                    className="block text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Politica de Confidențialitate
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-gray-300 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPinIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 font-semibold">
                Hartă interactivă cu locațiile noastre
              </p>
              <p className="text-sm text-gray-500">
                (Va fi integrată Google Maps / Leaflet)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
