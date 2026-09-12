import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageIntro } from "@/components/Shared";
import { site } from "@/lib/site";
export const metadata = pageMetadata(
  "Privacidad",
  "Información sobre los datos enviados a través del formulario de contacto de MAHONEGA.",
  "/privacidad",
);
export default function Privacy() {
  return (
    <>
      <PageIntro eyebrow="Privacidad" title="Tus datos, para responderte.">
        <p>
          Cómo tratamos la información que compartís al comunicarte con
          MAHONEGA.
        </p>
      </PageIntro>
      <section className="section">
        <div className="container prose">
          <h2>Información de contacto</h2>
          <p>
            MAHONEGA, con dirección en {site.address}, utiliza los datos que
            proporcionás para atender tu consulta, conversar sobre los productos
            solicitados y coordinar una respuesta.
          </p>
          <h2>Qué información recibimos</h2>
          <p>
            El formulario solicita nombre, localidad, un teléfono o correo
            electrónico, motivo y mensaje. También puede incluir el producto o
            la línea desde donde iniciaste la consulta. No incluyas información
            sensible ni datos que no sean necesarios para responderte.
          </p>
          <h2>Envío y conservación</h2>
          <p>
            Cuando el formulario está habilitado, la consulta se envía a la
            bandeja comercial mediante un proveedor de correo transaccional
            (Resend). Si el envío no está disponible, el sitio lo informa. La
            aplicación no mantiene una base de datos propia de consultas; el
            mensaje puede conservarse en el correo del equipo mientras sea
            necesario para su atención.
          </p>
          <h2>Seguridad técnica</h2>
          <p>
            El servicio limita los intentos de envío para reducir el spam. El
            alojamiento puede procesar registros técnicos de acceso y seguridad.
            Los datos del formulario no se incorporan a los eventos de
            interacción del sitio.
          </p>
          <h2>Servicios externos</h2>
          <p>
            Los enlaces a WhatsApp, Instagram y Google Maps abren servicios
            externos con sus propias políticas. Las tipografías e imágenes del
            sitio se sirven localmente. Esta versión no utiliza cookies
            publicitarias ni incorpora un servicio de analítica externo.
          </p>
          <h2>Consultas sobre tus datos</h2>
          <p>
            Podés comunicarte con el equipo para solicitar información,
            corrección o eliminación de los datos que nos hayas enviado,
            indicando los necesarios para identificar tu consulta.
          </p>
          <Link className="button" href="/contacto">
            Contactar con MAHONEGA
          </Link>
        </div>
      </section>
    </>
  );
}
