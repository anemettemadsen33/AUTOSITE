import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Întrebări Frecvente',
  description: 'Răspunsuri la cele mai frecvente întrebări despre AutoSite',
};

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
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Întrebări Frecvente
          </h1>
          <p className="text-lg text-gray-600">
            Găsește răspunsuri la cele mai frecvente întrebări
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {section.category}
              </h2>
              <div className="space-y-6">
                {section.questions.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Nu ai găsit răspunsul?
          </h3>
          <p className="text-blue-700 mb-4">
            Contactează-ne și te vom ajuta cu plăcere!
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Contactează-ne
          </a>
        </div>
      </div>
    </div>
  );
}
