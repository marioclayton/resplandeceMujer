import type { Metadata } from "next";
import { Cuprum, Noto_Sans } from "next/font/google";
import "./globals.css";
import { Navbar1 } from "../components/Navbar1";
import { Footer1 } from "../components/Footer1";
import ErrorBoundary from "../components/ErrorBoundary";
import { SiteMotion } from "../components/SiteMotion";
import { CookieConsent } from "../components/CookieConsent";

const cuprum = Cuprum({ variable: "--font-cuprum", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const notoSans = Noto_Sans({ variable: "--font-noto-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.resplandecemujer.com"),
  title: { default: "Resplandece Mujer | Crece en tu relación con Jesucristo", template: "%s | Resplandece Mujer" },
  description: "Enseñanzas bíblicas, reflexiones y recursos para fortalecer tu fe, renovar tu esperanza y vivir el propósito de Dios en Cristo.",
  alternates: { canonical: "./" },
  category: "Fe cristiana y crecimiento espiritual",
  openGraph: { type: "website", locale: "es_US", siteName: "Resplandece Mujer", title: "Resplandece Mujer | Crece en Cristo", description: "Enseñanzas bíblicas y recursos para fortalecer tu fe, renovar tu esperanza y vivir el propósito de Dios.", images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Resplandece Mujer" }] },
  twitter: { card: "summary_large_image", title: "Resplandece Mujer | Crece en Cristo", description: "Enseñanzas bíblicas y recursos para fortalecer tu fe y vivir el propósito de Dios.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${cuprum.variable} ${notoSans.variable} antialiased`}>
    <SiteMotion />
    <ErrorBoundary><Navbar1 />{children}<Footer1 /><CookieConsent /></ErrorBoundary>
  </body></html>;
}
