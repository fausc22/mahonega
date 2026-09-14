import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Truck,
  ShieldCheck,
  Users,
  MapPin,
} from "lucide-react";
import { CategoryGrid, ContactCTA, ProductCard } from "@/components/Shared";
import { featuredProducts } from "@/lib/catalog";
import { brands, regions } from "@/lib/site";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/hero-rodeo-mobile.avif"
        media="(max-width: 799px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero-rodeo.avif"
        media="(min-width: 800px)"
        fetchPriority="high"
      />
      <section className="hero hero-panoramic">
        <picture>
          <source
            media="(max-width: 799px)"
            srcSet="/images/hero-rodeo-mobile.avif"
            type="image/avif"
          />
          <Image
            className="hero-background"
            src="/images/hero-rodeo.avif"
            alt="Rodeo bovino en un establecimiento de la región"
            fill
            loading="eager"
            fetchPriority="high"
            unoptimized
            sizes="100vw"
          />
        </picture>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="gold-line" /> CERCA DEL PRODUCTOR
            </p>
            <h1>
              El respaldo
              <br />
              que tu campo
              <br />
              <em>necesita.</em>
            </h1>
            <p className="hero-description">
              Productos veterinarios, asesoramiento profesional y entrega
              directa a tu establecimiento.
            </p>
            <div className="hero-actions">
              <Link className="button button-gold" href="/productos">
                Ver productos <ArrowUpRight size={19} />
              </Link>
              <Link className="button hero-secondary" href="/contacto">
                Contactanos <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-origin">
              <MapPin size={17} />
              <span>DESDE HUINCA RENANCÓ, CÓRDOBA</span>
            </div>
          </div>
        </div>
      </section>
      <div className="trust-strip">
        <div className="container trust-grid">
          <div>
            <Users />
            <span>
              Atención personalizada<strong>Hablás con nuestro equipo</strong>
            </span>
          </div>
          <div>
            <ShieldCheck />
            <span>
              Asesoramiento veterinario<strong>Respaldo profesional</strong>
            </span>
          </div>
          <div>
            <Truck />
            <span>
              Entrega a campo<strong>Logística propia en la región</strong>
            </span>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">NUESTROS PRODUCTOS</p>
              <h2>
                Lo que necesitás.
                <br />
                Para cada jornada.
              </h2>
            </div>
            <p>
              Sanidad, identificación e insumos rurales.
              <br />
              Encontrá tu línea y consultanos.
            </p>
          </div>
          <CategoryGrid />
        </div>
      </section>
      <section className="brands-section">
        <div className="container">
          <div className="brands-heading">
            <p className="eyebrow">MARCAS CON LAS QUE TRABAJAMOS</p>
            <span>Calidad que acompaña tu trabajo.</span>
          </div>
          <div className="brand-featured">
            <div className="brand-wordmark bago">
              Biogénesis<span>Bagó</span>
            </div>
            <div className="brand-wordmark biochemiq">
              Biochemiq<span>SALUD ANIMAL</span>
            </div>
            <div className="brand-featured-copy brand-cdv">
              <Image
                src="/images/cdv-logo.webp"
                alt="CDV"
                width={157}
                height={49}
              />
            </div>
          </div>
          <div className="other-brands">
            {brands
              .slice(2)
              .filter((brand) => brand !== "CDV")
              .map((brand) => (
                <span key={brand}>{brand}</span>
              ))}
          </div>
        </div>
      </section>
      <section className="section featured-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CONOCÉ NUESTRAS LÍNEAS</p>
              <h2>Opciones para tu rodeo.</h2>
            </div>
            <Link className="text-link" href="/productos#seleccion">
              Explorar productos <ArrowUpRight size={19} />
            </Link>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <p className="catalog-note">
            Consultá disponibilidad y presentaciones con nuestro equipo. Uso
            según indicación veterinaria.
          </p>
        </div>
      </section>
      <section className="company-preview">
        <div className="container company-preview-grid">
          <div className="company-photo">
            <Image
              src="/images/rodeo.webp"
              alt="Rodeo bovino en un establecimiento de la región"
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
            />
            <span>TRABAJAMOS CERCA. CONOCEMOS EL CAMPO.</span>
          </div>
          <div className="company-copy">
            <p className="eyebrow">SOMOS MAHONEGA</p>
            <h2>
              Personas detrás
              <br />
              de cada solución.
            </h2>
            <p>
              MAHONEGA nace en 2025 para abastecer al productor agropecuario con
              insumos veterinarios y atención cercana.
            </p>
            <p>
              Marcelo Houriet y Carlos Tosso combinan su conocimiento del sector
              con un equipo que te escucha, te orienta y coordina tu pedido.
            </p>
            <Link className="button button-outline" href="/empresa">
              Conocé al equipo <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section coverage-preview">
        <div className="container coverage-grid">
          <div>
            <p className="eyebrow">ENTREGAS A CAMPO</p>
            <h2>
              Tu establecimiento.
              <br />
              Nuestro destino.
            </h2>
            <p>
              Desde Huinca Renancó, acercamos los insumos a productores de la
              región con logística propia.
            </p>
            <Link
              className="text-link"
              href="/contacto?consulta=entrega%20en%20mi%20zona"
            >
              Consultá cobertura en tu zona <ArrowUpRight size={19} />
            </Link>
          </div>
          <div className="region-list">
            <div className="region-origin">
              <MapPin size={22} />
              <span>
                Huinca Renancó<strong>CÓRDOBA · BASE OPERATIVA</strong>
              </span>
            </div>
            {regions.map((region, i) => (
              <div key={region} className="region-row">
                <span>0{i + 1}</span>
                <p>{region}</p>
                <ArrowUpRight size={17} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
