import { Metadata } from 'next';
import { CheckCircleIcon, UserGroupIcon, ChartBarIcon, TrophyIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Despre Noi',
  description: 'Descoperiți povestea AutoSite - platforma premium pentru vehicule în România',
};

const stats = [
  { label: 'Vehicule Active', value: '1,250+', icon: ChartBarIcon },
  { label: 'Dealeri Parteneri', value: '150+', icon: UserGroupIcon },
  { label: 'Clienți Mulțumiți', value: '850+', icon: CheckCircleIcon },
  { label: 'Ani Experiență', value: '5+', icon: TrophyIcon },
];

const timeline = [
  { year: '2020', title: 'Lansare', description: 'AutoSite este lansat cu 50 de vehicule' },
  { year: '2021', title: 'Expansiune', description: 'Ajungem la 100+ dealeri parteneri' },
  { year: '2022', title: 'Inovație', description: 'Lansăm aplicația mobilă și chat live' },
  { year: '2023', title: 'Creștere', description: 'Depășim 1000 vehicule active pe platformă' },
  { year: '2024', title: 'Leadership', description: 'Devenim platforma #1 pentru vehicule premium' },
];

const values = [
  { title: 'Transparență', description: 'Toate vehiculele sunt verificate și prețurile sunt clare.', icon: '🔍' },
  { title: 'Calitate', description: 'Lucrăm doar cu dealeri verificați.', icon: '⭐' },
  { title: 'Inovație', description: 'Tehnologie modernă pentru cea mai bună experiență.', icon: '🚀' },
  { title: 'Suport', description: 'Echipa noastră este disponibilă 24/7.', icon: '💬' },
];

const team = [
  { name: 'Alexandru Popescu', role: 'CEO & Fondator', bio: '15 ani experiență în industria auto', avatar: '👨‍💼' },
  { name: 'Maria Ionescu', role: 'CTO', bio: 'Expert în platforme digitale auto', avatar: '👩‍💻' },
  { name: 'Andrei Georgescu', role: 'Head of Sales', bio: 'Specialist în relații cu dealerii', avatar: '👨‍💼' },
  { name: 'Elena Dumitrescu', role: 'Customer Success', bio: 'Pasionată de experiența clienților', avatar: '👩‍💼' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-6">Povestea AutoSite</h1>
            <p className="text-xl text-blue-100 mb-8">
              Din pasiune pentru automobile, am creat platforma premium care 
              conectează cumpărători cu cei mai buni dealeri din România
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/vehicles" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                Explorează Vehicule
              </a>
              <a href="/contact" className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition">
                Contactează-ne
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Misiunea Noastră</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ne-am propus să revoluționăm modul în care românii cumpără și vând vehicule. 
              Prin tehnologie modernă, transparență totală și un serviciu impecabil.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">Evoluția Noastră</h2>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.year.slice(2)}
                  </div>
                  {index < timeline.length - 1 && <div className="w-1 h-full bg-blue-200 mt-2"></div>}
                </div>
                <div className="flex-1 pb-8">
                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                    <div className="text-sm text-blue-600 font-semibold mb-1">{item.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Echipa Noastră</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Profesioniști pasionați care lucrează zilnic pentru a-ți oferi cea mai bună experiență
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 h-48 flex items-center justify-center text-6xl">
                  {member.avatar}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <div className="text-blue-600 font-semibold mb-3">{member.role}</div>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Alătură-te Comunității AutoSite</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Fie că vrei să cumperi, să vinzi sau pur și simplu să explorezi, suntem aici pentru tine.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/register" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Creează Cont Gratuit
            </a>
            <a href="/dealers" className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition">
              Vezi Dealeri Parteneri
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
