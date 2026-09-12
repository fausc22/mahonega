import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer, WhatsAppFloat } from "@/components/Shared";
import { site } from "@/lib/site";
import "./globals.css";
const manrope = localFont({
  src: "../../public/fonts/manrope.woff2",
  variable: "--font-heading",
  display: "swap",
  weight: "200 800",
});
const sourceSans = localFont({
  src: "../../public/fonts/source-sans-3.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "200 900",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url || "http://127.0.0.1:3010"),
  title: {
    default: "MAHONEGA | Insumos veterinarios y entrega a campo",
    template: "%s | MAHONEGA",
  },
  description:
    "Productos veterinarios para el productor ganadero. Asesoramiento profesional y entrega a campo desde Huinca Renancó, Córdoba.",
  robots: { index: !!site.url, follow: !!site.url },
  twitter: {
    card: "summary_large_image",
    title: "MAHONEGA | Insumos veterinarios",
    description:
      "Asesoramiento profesional y entrega a campo desde Huinca Renancó.",
  },
  icons: { icon: "/brand/icon.png", apple: "/brand/icon.png" },
  openGraph: {
    title: "MAHONEGA · Insumos veterinarios",
    description:
      "Asesoramiento profesional y entrega a campo desde Huinca Renancó.",
    locale: "es_AR",
    type: "website",
    siteName: "MAHONEGA",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${sourceSans.variable}`}>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppFloat />
        {site.url && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: site.name,
                url: site.url,
                logo: site.url + "/brand/logo-completo.webp",
                telephone: site.phone,
                ...(site.email ? { email: site.email } : {}),
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "José Galaverna 700",
                  addressLocality: "Huinca Renancó",
                  addressRegion: "Córdoba",
                  addressCountry: "AR",
                },
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: site.phone,
                    email: site.email,
                    contactType: "sales",
                    availableLanguage: "Spanish",
                  },
                ],
                areaServed: [
                  "Sur de Córdoba",
                  "Sur de San Luis",
                  "Norte de La Pampa",
                  "Oeste de Buenos Aires",
                  "Sudoeste de Santa Fe",
                ],
                sameAs: [site.instagram],
              }).replace(/</g, "\\u003c"),
            }}
          />
        )}
      </body>
    </html>
  );
}
