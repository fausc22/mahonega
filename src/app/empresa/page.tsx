import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Truck,
  MapPin,
  Phone,
  ClipboardList,
  MessagesSquare,
} from "lucide-react";
import { ContactCTA, PageIntro } from "@/components/Shared";
import { ContactLink } from "@/components/ContactLink";
import { regions, team } from "@/lib/site";
export const metadata = pageMetadata(
  "Nuestra empresa",
  "Conocé MAHONEGA, su equipo y el asesoramiento veterinario para productores. Entregas a campo desde Huinca Renancó.",
  "/empresa",
);
export default function Company() {
  return (
    <>
      <PageIntro
        eyebrow="Empresa"
        title="Conocemos el campo. Trabajamos con vos."
      >
        <p>
          Insumos veterinarios, atención personalizada y un equipo que acompaña
          las necesidades de cada establecimiento.
        </p>
      </PageIntro>
      <section className="section">
        <div className="container story-grid">
          <div>
            <p className="eyebrow">NUESTRO ORIGEN</p>
            <h2>
              Una empresa nueva.
              <br />
              Un compromiso cercano.
            </h2>
            <p>
              MAHONEGA comienza en 2025, de la mano de Marcelo Houriet y Carlos
              Tosso, para abastecer las necesidades de insumos veterinarios del
              productor agropecuario.
            </p>
            <p>
              Trabajamos directamente con productores. Escuchamos lo que
              necesita cada establecimiento, acercamos alternativas de productos
              y coordinamos la entrega a campo.
            </p>
            <div className="story-signature">
              <span>MH</span>
              <p>
                MAHONEGA<strong>Insumos veterinarios</strong>
              </p>
            </div>
          </div>
          <div className="story-image">
            <Image
              src="/images/entregas.webp"
              alt="Entrega de insumos veterinarios en la entrada de un establecimiento rural"
              fill
              sizes="(max-width:800px) 90vw, 45vw"
            />
            <div className="image-caption">
              <Truck size={20} /> Logística propia. Contacto directo.
            </div>
          </div>
        </div>
      </section>
      <section className="team-section section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">NUESTRO EQUIPO</p>
              <h2>Sabés con quién hablás.</h2>
            </div>
            <p>
              Personas que conocen el sector y están disponibles para atender tu
              consulta.
            </p>
          </div>
          <div className="team-grid">
            {team.map((person) => (
              <article key={person.name} className="team-card">
                <span className="team-initials" aria-hidden="true">
                  {person.initials}
                </span>
                <p className="eyebrow">{person.role}</p>
                <h3>{person.name}</h3>
                <p>{person.detail}</p>
                <ContactLink
                  href={"tel:" + person.phone.replace(/\s/g, "")}
                  event="contact_phone_click"
                  context={person.name}
                  className="text-link"
                >
                  <Phone size={16} />
                  {person.phone}
                </ContactLink>
                {person.email && (
                  <ContactLink
                    className="team-email"
                    href={"mailto:" + person.email}
                    event="contact_email_click"
                    context={person.name}
                  >
                    {person.email}
                  </ContactLink>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container advice-grid">
          <div>
            <p className="eyebrow">ASESORAMIENTO PROFESIONAL</p>
            <h2>
              Una consulta.
              <br />
              Una respuesta pensada
              <br />
              para tu establecimiento.
            </h2>
          </div>
          <div>
            <p>
              El M.V. Marcelo A. C. Houriet, M.P. 1729, está a cargo del
              asesoramiento técnico, junto al equipo de ventas.
            </p>
            <p>
              Te orientamos sobre las líneas que comercializamos para que puedas
              resolver tus necesidades de abastecimiento con información y
              acompañamiento profesional.
            </p>
            <Link
              href="/contacto?consulta=asesoramiento%20veterinario"
              className="text-link"
            >
              Consultar por asesoramiento <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="process-section">
        <div className="container">
          <p className="eyebrow">CÓMO NOS CONTACTAMOS</p>
          <div className="process-grid">
            {[
              {
                n: "01",
                title: "Contanos qué necesitás",
                text: "Compartí el producto o la línea que buscás y la ubicación de tu establecimiento.",
                Icon: MessagesSquare,
              },
              {
                n: "02",
                title: "Conversá con el equipo",
                text: "Consultá las opciones, presentaciones y disponibilidad antes de definir tu pedido.",
                Icon: ClipboardList,
              },
              {
                n: "03",
                title: "Coordiná la entrega",
                text: "Acordá con el equipo las condiciones de entrega según tu zona.",
                Icon: Truck,
              },
            ].map((s) => (
              <div key={s.n}>
                <div className="process-top">
                  <span>{s.n}</span>
                  <s.Icon size={26} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" id="cobertura">
        <div className="container coverage-grid">
          <div>
            <p className="eyebrow">NUESTRA REGIÓN</p>
            <h2>
              Desde Huinca Renancó,
              <br />
              directo al campo.
            </h2>
            <p>
              Contamos con logística propia para realizar entregas a
              establecimientos de la región. La coordinación se realiza con
              nuestro equipo comercial.
            </p>
            <p className="coverage-note">
              Consultanos por tu localidad y las condiciones de entrega.
            </p>
            <Link
              className="text-link"
              href="/contacto?consulta=entrega%20en%20mi%20zona"
            >
              Consultar mi zona <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="region-list">
            <div className="region-origin">
              <MapPin />
              <span>
                Huinca Renancó<strong>CÓRDOBA · BASE OPERATIVA</strong>
              </span>
            </div>
            {regions.map((r, i) => (
              <div key={r} className="region-row">
                <span>0{i + 1}</span>
                <p>{r}</p>
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
