import Link from 'next/link';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50">
                <span className="text-white font-black text-xl">A</span>
              </div>
              <h3 className="text-xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">AutoSite</h3>
            </div>
            <p className="text-sm text-blue-200/70 leading-relaxed">
              Platformă premium pentru cumpărarea și vânzarea vehiculelor în România și Europa.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Link-uri Rapide</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/vehicles" className="text-blue-200/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 group-hover:w-3 transition-all duration-300"></span>
                  Caută Vehicule
                </Link>
              </li>
              <li>
                <Link href="/dealers" className="text-blue-200/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 group-hover:w-3 transition-all duration-300"></span>
                  Dealeri Verificați
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-200/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 group-hover:w-3 transition-all duration-300"></span>
                  Despre Noi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start text-blue-200/70 hover:text-cyan-300 transition group">
                <EnvelopeIcon className="w-5 h-5 mr-3 mt-0.5 text-cyan-400" />
                <a href="mailto:contact@autosite.ro">contact@autosite.ro</a>
              </li>
              <li className="flex items-start text-blue-200/70 hover:text-cyan-300 transition group">
                <PhoneIcon className="w-5 h-5 mr-3 mt-0.5 text-cyan-400" />
                <a href="tel:+40123456789">+40 123 456 789</a>
              </li>
              <li className="flex items-start text-blue-200/70">
                <MapPinIcon className="w-5 h-5 mr-3 mt-0.5 text-cyan-400" />
                <span>București, România</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/terms" className="text-blue-200/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 group-hover:w-3 transition-all duration-300"></span>
                  Termeni și Condiții
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-blue-200/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 group-hover:w-3 transition-all duration-300"></span>
                  Politica de Confidențialitate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-200/70 hover:text-cyan-300 transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 group-hover:w-3 transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-blue-200/50">
            &copy; {new Date().getFullYear()} AutoSite. Toate drepturile rezervate.
          </p>
          <p className="text-sm text-blue-200/50 mt-4 md:mt-0">
            Dezvoltat cu <span className="text-red-400">❤</span> în România
          </p>
        </div>
      </div>
    </footer>
  );
}
