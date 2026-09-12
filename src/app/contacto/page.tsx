import { pageMetadata } from "@/lib/metadata";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Instagram,
  ArrowUpRight,
} from "lucide-react";
import { PageIntro } from "@/components/Shared";
import { ContactLink } from "@/components/ContactLink";
import { LeadForm } from "@/components/LeadForm";
import { site, team, whatsappUrl } from "@/lib/site";
import { categories, products } from "@/lib/catalog";
export const metadata = pageMetadata(
  "Contacto",
  "Contactá al equipo MAHONEGA por WhatsApp, teléfono o formulario. Consultas por productos y entregas a campo.",
  "/contacto",
);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ consulta?: string }>;
}) {
  const requested = (await searchParams).consulta;
  const allowed: string[] = [
    ...categories.map((c) => c.name),
    ...products.map((p) => p.name),
    "caravanas electrónicas",
    "entrega en mi zona",
    "asesoramiento veterinario",
  ];
  const context = requested && allowed.includes(requested) ? requested : "";
  return (
    <>
      <PageIntro eyebrow="Contacto" title="Contactanos para tu próximo pedido.">
        <p>
          Consultanos por productos, asesoramiento o entregas. Estamos para
          ayudarte a resolver lo que necesita tu establecimiento.
        </p>
      </PageIntro>
      <section className="section">
        <div className="container contact-grid">
          <aside className="contact-sidebar">
            <div className="commercial-contact">
              <p className="eyebrow">ATENCIÓN COMERCIAL</p>
              <h2>Benjamín Pinto</h2>
              <ContactLink
                className="team-email"
                href="mailto:bpinto@mahonega.com"
                event="contact_email_click"
              >
                bpinto@mahonega.com
              </ContactLink>
              <p>Productos, disponibilidad y coordinación de pedidos.</p>
              <ContactLink
                className="button"
                href={whatsappUrl(context)}
                target="_blank"
                rel="noopener noreferrer"
                event="contact_whatsapp_click"
                context={context || "contact"}
              >
                <MessageCircle size={19} /> Escribinos por WhatsApp
              </ContactLink>
              <ContactLink
                className="phone-link"
                href={"tel:" + site.phone.replace(/\s/g, "")}
                event="contact_phone_click"
              >
                <Phone size={18} />
                {site.phone}
              </ContactLink>
            </div>
            <div className="contact-facts">
              <div>
                <MapPin size={21} />
                <div>
                  <h3>Encontranos</h3>
                  <p>{site.address}</p>
                  <a
                    href={
                      "https://www.google.com/maps/search/?api=1&query=" +
                      encodeURIComponent(site.address)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    Ver ubicación <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
              <div>
                <Clock size={21} />
                <div>
                  <h3>Horarios de atención</h3>
                  <p>
                    Lunes a viernes
                    <br />
                    08:00 a 12:30 · 14:30 a 18:30
                  </p>
                </div>
              </div>
              <div>
                <Mail size={21} />
                <div>
                  <h3>Correo electrónico</h3>
                  {site.email ? (
                    <ContactLink
                      href={"mailto:" + site.email}
                      event="contact_email_click"
                    >
                      {site.email}
                    </ContactLink>
                  ) : (
                    <p>
                      Próximamente. Por ahora, contactanos por teléfono o
                      WhatsApp.
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Instagram size={21} />
                <div>
                  <h3>Seguinos</h3>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @mahonega.sas{" "}
                    <ArrowUpRight size={14} className="inline-icon" />
                  </a>
                </div>
              </div>
            </div>
            <div className="other-contacts">
              <p className="eyebrow">OTROS CONTACTOS DEL EQUIPO</p>
              {team.slice(0, 2).map((p) => (
                <div key={p.name}>
                  <strong>{p.name}</strong>
                  {p.email && (
                    <ContactLink
                      className="team-email"
                      href={"mailto:" + p.email}
                      event="contact_email_click"
                    >
                      {p.email}
                    </ContactLink>
                  )}
                  <ContactLink
                    href={"tel:" + p.phone.replace(/\s/g, "")}
                    event="contact_phone_click"
                    context={p.name}
                  >
                    {p.phone}
                    <ArrowUpRight size={15} />
                  </ContactLink>
                </div>
              ))}
            </div>
          </aside>
          <LeadForm context={context} key={context} />
        </div>
      </section>
    </>
  );
}
