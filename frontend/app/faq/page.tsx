'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Accordion, AccordionItem, Button, Input, Card } from '@/components/ui';
import Link from 'next/link';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'Ce este AutoSite?',
        a: 'AutoSite este o platformă modernă pentru cumpărarea și vânzarea de vehicule, conectând cumpărători cu dealeri verificați.',
      },
      {
        q: 'Este gratuit să folosesc platforma?',
        a: 'Da, navigarea și căutarea vehiculelor este complet gratuită pentru cumpărători.',
      },
    ],
  },
  {
    category: 'Cumpărare',
    questions: [
      {
        q: 'Cum pot programa un test drive?',
        a: 'Accesează pagina vehiculului dorit și apasă butonul "Programează Test Drive". Vei fi contactat de dealer în cel mai scurt timp.',
      },
      {
        q: 'Pot cumpăra online?',
        a: 'Da, platforma noastră permite finalizarea achizițiilor online, inclusiv semnarea documentelor electronic.',
      },
    ],
  },
  {
    category: 'Dealeri',
    questions: [
      {
        q: 'Cum devin dealer pe platformă?',
        a: 'Contactează-ne prin formularul de contact și vom programa o întâlnire pentru verificarea companiei tale.',
      },
      {
        q: 'Care sunt costurile pentru dealeri?',
        a: 'Oferim pachete flexibile în funcție de numărul de vehicule listate. Contactează-ne pentru o ofertă personalizată.',
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.map(section => ({
    ...section,
    questions: section.questions.filter(faq =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(section => section.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Întrebări Frecvente
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Găsește rapid răspunsuri la întrebările tale
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 -mt-6">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Input
              placeholder="Caută în întrebările frecvente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
              fullWidth
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length > 0 ? (
              <div className="space-y-8">
                {filteredFaqs.map((section) => (
                  <div key={section.category}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {section.category}
                    </h2>
                    <Accordion>
                      {section.questions.map((faq, idx) => (
                        <AccordionItem key={idx} title={faq.q} defaultOpen={idx === 0}>
                          {faq.a}
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  Nu am găsit rezultate pentru căutarea ta.
                </p>
                <Button variant="primary" onClick={() => setSearchQuery('')}>
                  Resetează căutarea
                </Button>
              </Card>
            )}

            {/* Contact CTA */}
            <Card variant="gradient" className="mt-12 text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Nu ai găsit răspunsul?
              </h3>
              <p className="text-blue-100 mb-6">
                Contactează-ne și te vom ajuta cu plăcere!
              </p>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Contactează-ne
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
