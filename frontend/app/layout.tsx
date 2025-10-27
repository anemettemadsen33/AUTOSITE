import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "AutoSite - Platformă Premium Auto",
    template: "%s | AutoSite",
  },
  description: "Găsește mașina perfectă din peste 10,000 vehicule de la dealeri verificați. Compară prețuri, programează test drive și cumpără online.",
  keywords: ["mașini second hand", "dealeri auto", "vehicule noi", "marketplace auto", "test drive", "leasing auto"],
  authors: [{ name: "AutoSite Team" }],
  creator: "AutoSite",
  publisher: "AutoSite",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://autosite.com",
    siteName: "AutoSite",
    title: "AutoSite - Marketplace Auto Premium",
    description: "Platformă modernă pentru cumpărarea și vânzarea de vehicule",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AutoSite - Marketplace Auto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoSite - Marketplace Auto Premium",
    description: "Găsește mașina perfectă",
    images: ["/twitter-image.jpg"],
    creator: "@autosite",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AutoSite",
  },
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${inter.variable} font-sans flex flex-col min-h-screen`}>
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(
                  (registration) => {
                    console.log('SW registered:', registration);
                  },
                  (err) => {
                    console.log('SW registration failed:', err);
                  }
                );
              });
            }
          `
        }} />
      </body>
    </html>
  );
}
