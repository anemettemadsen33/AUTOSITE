export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Despre AutoSite
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <p className="text-lg text-gray-700">
            AutoSite este platforma ta de încredere pentru cumpărarea și vânzarea vehiculelor în România și Europa.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">
            Misiunea Noastră
          </h2>
          <p className="text-gray-700">
            Conectăm cumpărători cu dealeri verificați, oferind o experiență sigură și transparentă în procesul de achiziție auto.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">
            De Ce AutoSite?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Dealeri 100% verificați</li>
            <li>Vehicule cu istoric complet</li>
            <li>Platformă modernă și sigură</li>
            <li>Suport clienți dedicat</li>
            <li>Transparență totală în prețuri</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">
            Contactează-ne
          </h2>
          <p className="text-gray-700">
            Ai întrebări? Echipa noastră este aici să te ajute!
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
