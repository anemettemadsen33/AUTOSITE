import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AUTOSITE - Premium Automotive Marketplace",
  description: "Discover premium vehicles from verified dealers across Europe. Search, compare, and find your perfect car with multi-language and multi-currency support.",
  keywords: ["automotive", "cars", "marketplace", "vehicles", "dealers", "buy car", "sell car"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  );
}
