import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  ScanLine,
  Plus,
  Tag,
  Syringe,
  Fence,
  Phone,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { categories, type Product } from "@/lib/catalog";
import { site, whatsappUrl, contactUrl } from "@/lib/site";
import { ContactLink } from "./ContactLink";
const icons = {
  shield: ShieldCheck,
  scan: ScanLine,
  plus: Plus,
  tag: Tag,
  syringe: Syringe,
  fence: Fence,
};
export function CategoryIcon({ icon }: { icon: keyof typeof icons }) {
  const Icon = icons[icon];
  return <Icon size={25} strokeWidth={1.5} />;
}
export function CategoryGrid() {
  return (
    <div className="category-grid">
      {categories.map((c, i) => (
        <Link key={c.id} href={"/productos#" + c.id} className="category-card">
          <div className="category-top">
            <CategoryIcon icon={c.icon} />
            <span>0{i + 1}</span>
          </div>
          <h3>{c.name}</h3>
          <div className="category-bottom">
            <p>{c.short}</p>
            <ArrowUpRight size={21} />
          </div>
        </Link>
      ))}
    </div>
  );
}
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link
        href={contactUrl(product.name)}
        className="product-image"
        aria-label={"Consultar por " + product.name}
      >
        <Image
          src={product.image}
          alt={product.name + " — " + product.brand}
          fill
          sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"
        />
      </Link>
      <div className="product-info">
        <span className="eyebrow">{product.brand}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <Link href={contactUrl(product.name)} className="text-link">
          Consultar producto <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}
export function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="container cta-inner">
        <div>
          <p className="eyebrow">CONVERSEMOS</p>
          <h2>
            Tu próximo pedido
            <br />
            empieza acá.
          </h2>
          <p>Contanos qué necesitás y dónde está tu establecimiento.</p>
        </div>
        <div className="cta-actions">
          <ContactLink
            href={whatsappUrl()}
            className="button button-gold"
            event="contact_whatsapp_click"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={19} /> Escribinos por WhatsApp
          </ContactLink>
          <Link href="/contacto" className="text-link light-link">
            O envianos una consulta <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            MAHONEGA<span>El respaldo que tu campo necesita.</span>
          </Link>
          <p className="footer-location">
            Huinca Renancó, Córdoba
            <br />
            Argentina
          </p>
        </div>
        <div>
          <p className="footer-label">EXPLORÁ</p>
          <Link href="/productos">Productos</Link>
          <Link href="/empresa">Empresa</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
        <div>
          <p className="footer-label">CONTACTANOS</p>
          <ContactLink
            href={"tel:" + site.phone.replace(/\s/g, "")}
            event="contact_phone_click"
          >
            <Phone size={15} />
            {site.phone}
          </ContactLink>
          <ContactLink
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            event="instagram_click"
          >
            <Instagram size={15} /> @mahonega.sas
          </ContactLink>
          <ContactLink
            href={"mailto:" + site.email}
            event="contact_email_click"
          >
            {site.email}
          </ContactLink>
          <p>{site.hours}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} MAHONEGA
          {" · "}
          <a
            className="footer-credit"
            href="https://portfolio-cantallops.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Desarrollado por FC SOFTWARE
          </a>
        </span>
        <span>Insumos veterinarios · Atención a productores</span>
        <Link href="/privacidad">Privacidad</Link>
      </div>
    </footer>
  );
}
export function WhatsAppFloat() {
  return (
    <ContactLink
      className="whatsapp-float"
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      event="contact_whatsapp_click"
      context="floating"
      aria-label="Consultar a MAHONEGA por WhatsApp"
    >
      <MessageCircle size={25} />
      <span>¿En qué te ayudamos?</span>
    </ContactLink>
  );
}
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <span>{eyebrow}</span>
        </div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="intro-text">{children}</div>
      </div>
    </section>
  );
}
