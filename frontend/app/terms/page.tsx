import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termeni și Condiții',
  description: 'Termeni și condiții de utilizare AutoSite',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Termeni și Condiții
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
          </p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Acceptarea Termenilor
              </h2>
              <p className="text-gray-700 mb-4">
                Prin accesarea și utilizarea platformei AutoSite, acceptați să
                respectați acești termeni și condiții. Dacă nu sunteți de acord
                cu acești termeni, vă rugăm să nu utilizați platforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Serviciile Oferite
              </h2>
              <p className="text-gray-700 mb-4">
                AutoSite este o platformă online care facilitează conexiunea
                între cumpărători și dealeri auto. Noi nu suntem proprietarii
                vehiculelor listate și nu suntem parte în tranzacțiile dintre
                cumpărători și dealeri.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Cont de Utilizator
              </h2>
              <p className="text-gray-700 mb-4">Pentru a utiliza anumite funcții:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Trebuie să creați un cont cu informații corecte</li>
                <li>Sunteți responsabil pentru securitatea parolei</li>
                <li>Nu puteți partaja contul cu alte persoane</li>
                <li>Trebuie să aveți minimum 18 ani</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Listarea Vehiculelor
              </h2>
              <p className="text-gray-700 mb-4">Dealerii care listează vehicule se angajează să:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Furnizeze informații corecte și complete</li>
                <li>Dețină dreptul legal de a vinde vehiculele</li>
                <li>Respecte toate reglementările aplicabile</li>
                <li>Răspundă prompt la solicitările de informații</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Conduita Utilizatorului
              </h2>
              <p className="text-gray-700 mb-4">
                Este interzis să folosiți platforma pentru:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Activități ilegale sau frauduloase</li>
                <li>Încărcarea de conținut fals sau înșelător</li>
                <li>Hărțuirea altor utilizatori</li>
                <li>Tentative de a compromite securitatea platformei</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Limitarea Răspunderii
              </h2>
              <p className="text-gray-700 mb-4">
                AutoSite nu este responsabilă pentru:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Calitatea sau starea vehiculelor listate</li>
                <li>Acțiunile dealerilor sau cumpărătorilor</li>
                <li>Pierderi rezultate din utilizarea platformei</li>
                <li>Întreruperi temporare ale serviciului</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Modificări ale Termenilor
              </h2>
              <p className="text-gray-700 mb-4">
                Ne rezervăm dreptul de a modifica acești termeni în orice
                moment. Modificările vor fi publicate pe această pagină și vor
                intra în vigoare imediat.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Legea Aplicabilă
              </h2>
              <p className="text-gray-700 mb-4">
                Acești termeni sunt guvernați de legile din România. Orice
                dispute vor fi soluționate de instanțele competente din
                București.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Contact
              </h2>
              <p className="text-gray-700 mb-4">
                Pentru întrebări despre acești termeni, contactați-ne la:
                legal@autosite.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
