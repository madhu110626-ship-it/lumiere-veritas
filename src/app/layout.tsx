import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { siteUrl } from "@/data/navigation";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Lumiere Veritas Media Solutions",
    template: "%s · Lumiere Veritas",
  },
  description:
    "360° media, marketing, advertising & creative. Strategy, creativity, media and execution — one partner to make your brand matter.",
  keywords: [
    "creative agency",
    "media solutions",
    "brand campaigns",
    "video production",
    "PR",
    "advertising",
    "Mumbai",
  ],
  openGraph: {
    title: "Lumiere Veritas Media Solutions",
    description:
      "We create visibility. We build impact. 360° media · marketing · advertising · creative.",
    type: "website",
    url: siteUrl,
    siteName: "Lumiere Veritas Media Solutions",
    images: [{ url: "/brand/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumiere Veritas Media Solutions",
    description:
      "We create visibility. We build impact. 360° media · marketing · advertising · creative.",
    images: ["/brand/logo.png"],
  },
  icons: {
    icon: "/brand/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="font-body antialiased bg-bg text-text">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
