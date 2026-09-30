import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lumiere Veritas Media Solutions",
    template: "%s · Lumiere Veritas",
  },
  description:
    "Creative media solutions — strategy, creativity, media & execution. We make brands impossible to ignore.",
  keywords: [
    "creative agency",
    "media solutions",
    "brand campaigns",
    "video production",
    "PR",
    "outdoor advertising",
    "Mumbai",
  ],
  openGraph: {
    title: "Lumiere Veritas Media Solutions",
    description:
      "We make brands impossible to ignore. Creative media, production & brand experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-ink text-cream">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
