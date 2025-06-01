import type { Metadata } from "next";
import { Cuprum, Noto_Sans } from "next/font/google";
import "./globals.css";
import { Navbar1 } from "../components/Navbar1";
import { Footer1 } from "../components/Footer1";
import Script from "next/script"; // <-- Import Script

// Replace Geist with Cuprum
const cuprum = Cuprum({
  variable: "--font-cuprum",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Replace Geist Mono with Noto Sans
const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resplandece Mujer",
  description: "Inspiración para mujeres de fe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YDE8BBVCB3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YDE8BBVCB3');
          `}
        </Script>
        <link
          rel="preload"
          as="image"
          href="/assets/pexels-kqpho-1921168.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          href="https://www.resplandecemujer.com/_next/static/media/c4250770ab8708b6-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://www.resplandecemujer.com/_next/static/media/c4a2af5d29d703b3-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${cuprum.variable} ${notoSans.variable} antialiased`}>
        <Navbar1 />
        {children}
        <Footer1 />
      </body>
    </html>
  );
}
