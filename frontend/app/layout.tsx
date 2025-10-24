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
        {children}
      </body>
    </html>
  );
}
