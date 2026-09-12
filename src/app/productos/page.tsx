import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, MessageCircle, Tag } from "lucide-react";
import {
  CategoryIcon,
  ContactCTA,
  PageIntro,
  ProductCard,
} from "@/components/Shared";
import { ContactLink } from "@/components/ContactLink";
import { categories, products } from "@/lib/catalog";
import { brands, contactUrl, whatsappUrl } from "@/lib/site";
export const metadata = pageMetadata(
  "Productos veterinarios",
  "Vacunas, antiparasitarios, antibióticos, caravanas electrónicas, descartables y artículos rurales. Conocé las líneas de MAHONEGA.",
  "/productos",
);
export default function Products() {
  return (
    <>
      <PageIntro
        eyebrow="Productos"
        title="Insumos para cuidar lo que producís."
      >
        <p>
          Sanidad animal y productos para el trabajo en campo, con un equipo que
          te ayuda a resolver tu consulta.
        </p>
        <div className="intro-actions">
          <a className="button button-gold" href="#lineas">
            Explorar productos <ArrowUpRight size={18} />
          </a>
          <a className="button button-light-outline" href="#catalogos">
            Ver catálogos <Download size={18} />
          </a>
        </div>
      </PageIntro>
      <section id="lineas" className="section catalog-layout container">
        <aside className="catalog-index">
          <p className="eyebrow">EXPLORÁ LAS LÍNEAS</p>
          <nav aria-label="Familias de productos">
            {categories.map((c) => (
              <a key={c.id} href={"#" + c.id}>
                {c.name}
                <ArrowUpRight size={15} />
              </a>
            ))}
          </nav>
          <a className="text-link" href="#seleccion">
            Productos seleccionados <ArrowUpRight size={16} />
          </a>
          <a className="text-link" href="#catalogos">
            Catálogos de marcas <Download size={16} />
          </a>
        </aside>
        <div className="category-details">
          {categories.map((c, i) => (
            <article id={c.id} className="category-detail" key={c.id}>
              <div className="category-detail-icon">
                <CategoryIcon icon={c.icon} />
              </div>
              <div>
                <p className="eyebrow">LÍNEA 0{i + 1}</p>
                <h2>{c.name}</h2>
                <p>{c.description}</p>
                {c.id === "antiparasitarios" && (
                  <div className="category-tags">
                    <span>Internos</span>
                    <span>Externos</span>
                    <span>Endectocidas</span>
                  </div>
                )}
                <Link className="text-link" href={contactUrl(c.name)}>
                  Consultar por esta línea <ArrowUpRight size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="identification-section">
        <div className="container identification-grid">
          <div className="identification-image">
            <Image
              src="/images/caravanas.webp"
              alt="Caravanas de identificación electrónica Argentflex y Traza, del material comercial de MAHONEGA"
              fill
              sizes="(max-width:800px) 90vw, 40vw"
            />
          </div>
          <div>
            <p className="eyebrow">IDENTIFICACIÓN ELECTRÓNICA</p>
            <h2>
              Cada animal.
              <br />
              Su identificación.
            </h2>
            <p>
              Las caravanas electrónicas acompañan la identificación individual
              del rodeo. Consultanos por las opciones de Argentflex y Traza que
              muestra nuestro material comercial.
            </p>
            <p>
              Contanos cuántas necesitás y tu localidad para coordinar el pedido
              con nuestro equipo.
            </p>
            <Link
              href={contactUrl("caravanas electrónicas")}
              className="button"
            >
              <Tag size={18} /> Consultar por caravanas{" "}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section" id="seleccion">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">BIOGÉNESIS BAGÓ + BIOCHEMIQ</p>
              <h2>Conocé algunas opciones.</h2>
            </div>
            <p>
              Una selección de las líneas de nuestros laboratorios. Consultá
              disponibilidad y presentación.
            </p>
          </div>
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <p className="catalog-note">
            La información es orientativa. La elección y el uso de cada producto
            deben seguir la indicación del profesional veterinario y su ficha
            vigente.
          </p>
        </div>
      </section>
      <section className="catalog-downloads section" id="catalogos">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">INFORMACIÓN DE LOS FABRICANTES</p>
              <h2>Consultá los catálogos.</h2>
            </div>
            <p>
              El catálogo de cada laboratorio puede incluir productos que no
              forman parte de nuestra oferta habitual.
            </p>
          </div>
          <div className="download-grid">
            {[
              {
                name: "Biogénesis Bagó",
                file: "biogenesis-bago",
                meta: "155 páginas · 44,2 MB",
              },
              {
                name: "Biochemiq",
                file: "biochemiq",
                meta: "9 páginas · 460 KB",
              },
              { name: "CDV", file: "cdv", meta: "6 páginas · 1 MB" },
            ].map((c) => (
              <ContactLink
                key={c.file}
                href={"/catalogos/" + c.file + ".pdf"}
                download
                className="download-card"
                event="catalog_download"
                context={c.name}
              >
                <span className="pdf-label">PDF</span>
                <h3>{c.name}</h3>
                <span>{c.meta}</span>
                <div>
                  Descargar catálogo <Download size={20} />
                </div>
              </ContactLink>
            ))}
          </div>
          <div className="all-brands">
            <p className="eyebrow">TAMBIÉN TRABAJAMOS CON</p>
            <div>
              {brands.slice(2).map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="catalog-question">
        <div className="container">
          <div>
            <h2>¿Buscás otro producto?</h2>
            <p>Consultanos por marca, nombre o tipo de insumo.</p>
          </div>
          <ContactLink
            href={whatsappUrl("un producto para mi establecimiento")}
            event="contact_whatsapp_click"
            context="catalog"
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} /> Consultar al equipo
          </ContactLink>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
