import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">AutoSite</h3>
            <p className="text-sm text-gray-400">
              Platformă premium pentru cumpărarea și vânzarea vehiculelor în România.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Link-uri Rapide</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/vehicles" className="hover:text-white transition">
                  Caută Vehicule
                </Link>
              </li>
              <li>
                <Link href="/dealers" className="hover:text-white transition">
                  Dealeri Verificați
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Despre Noi
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Suport</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  Întrebări Frecvente
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition">
                  Ajutor
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Termeni și Condiții
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Politica de Confidențialitate
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} AutoSite. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}
