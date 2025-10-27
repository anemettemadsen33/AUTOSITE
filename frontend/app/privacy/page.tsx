import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Confidențialitate',
  description: 'Politica de confidențialitate AutoSite',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Politica de Confidențialitate
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
          </p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Introducere
              </h2>
              <p className="text-gray-700 mb-4">
                AutoSite respectă confidențialitatea utilizatorilor și se
                angajează să protejeze datele personale pe care le colectăm.
                Această politică descrie modul în care colectăm, folosim și
                protejăm informațiile dumneavoastră.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Date Colectate
              </h2>
              <p className="text-gray-700 mb-4">Colectăm următoarele tipuri de date:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Informații de contact (nume, email, telefon)</li>
                <li>Informații despre vehiculele de interes</li>
                <li>Date de navigare și utilizare a platformei</li>
                <li>Preferințe și setări de cont</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Utilizarea Datelor
              </h2>
              <p className="text-gray-700 mb-4">Folosim datele pentru:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Facilitarea tranzacțiilor între cumpărători și dealeri</li>
                <li>Îmbunătățirea experienței utilizatorului</li>
                <li>Comunicări relevante despre serviciile noastre</li>
                <li>Securitatea și prevenirea fraudelor</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Protecția Datelor
              </h2>
              <p className="text-gray-700 mb-4">
                Implementăm măsuri de securitate tehnice și organizatorice
                pentru a proteja datele dumneavoastră împotriva accesului
                neautorizat, modificării, divulgării sau distrugerii.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Drepturile Dumneavoastră
              </h2>
              <p className="text-gray-700 mb-4">
                În conformitate cu GDPR, aveți următoarele drepturi:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Dreptul de acces la datele personale</li>
                <li>Dreptul de rectificare a datelor</li>
                <li>Dreptul la ștergerea datelor ("dreptul de a fi uitat")</li>
                <li>Dreptul de a restricționa prelucrarea</li>
                <li>Dreptul la portabilitatea datelor</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Cookie-uri
              </h2>
              <p className="text-gray-700 mb-4">
                Folosim cookie-uri pentru a îmbunătăți experiența de navigare.
                Puteți configura browserul pentru a refuza cookie-urile, dar
                acest lucru poate afecta funcționalitatea platformei.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Contact
              </h2>
              <p className="text-gray-700 mb-4">
                Pentru orice întrebări despre politica de confidențialitate,
                contactați-ne la: privacy@autosite.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
