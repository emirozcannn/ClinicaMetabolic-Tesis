import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ApiStatus } from "@/components/ApiStatus";
import { Navbar } from "@/components/Navbar";
import { LanguageProvider } from "@/lib/i18n";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClinicaMetabolic",
  description: "Clinical phenotype engine for metabolic obesity classification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="app-shell min-h-full font-sans text-slate-900">
        <LanguageProvider>
          <div className="relative min-h-screen">
            <ApiStatus />
            <Navbar />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
