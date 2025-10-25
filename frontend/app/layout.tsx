import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AUTOSITE - Premium Automotive Marketplace",
  description: "Modern automotive marketplace platform with multi-language and multi-currency support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        
        {children}
      </body>
    </html>
  );
}
