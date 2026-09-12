# Refinamiento de MAHONEGA — septiembre 2026

## Cambios realizados

- Portada panorámica: fotografía real del rodeo, degradado azul y texto superpuesto. Se retiró la etiqueta “Del pedido al campo”. Dos acciones: Ver productos y Contactanos. Recortes AVIF específicos para móvil y escritorio, sin inventar instalaciones o personas.
- Contactanos reemplaza Hablemos en navegación y portada; nuevo título de Contacto.
- contacto@mahonega.com como correo general y pie. bpinto@mahonega.com en atención comercial y Empresa. mhouriet@mahonega.com en Empresa y otros contactos.
- Menú móvil con transición de entrada/salida e ícono animado; tarjetas con movimiento suave. Se respeta la preferencia de movimiento reducido.
- Selector Radix estilizado con la identidad de la web, navegación por teclado, Escape, selección visible y conservación del valor ante errores.
- Botones Explorar productos y Ver catálogos en la cabecera de Productos; enlaces a las seis líneas y a los tres PDF conservados.
- Integración Resend alineada con HT, remitente con nombre MAHONEGA, destinatario configurable, Reply-To del visitante y notificación HTML/texto con motivo y contexto. `.env.example` completo y guía `RESEND.md`.
- Metadatos específicos por página, canonical de Inicio, datos estructurados institucionales y contacto. Se conserva el bloqueo de indexación local hasta definir NEXT_PUBLIC_SITE_URL.
- Fuentes locales WOFF2 con caracteres latinos, acentos, signos y monedas; originales TTF preservados. La selección mantiene todos los caracteres necesarios para español y nombres latinos, además de los pesos variables originales.

## Validación funcional

Nueve pruebas automatizadas: validación de campos, canales alternativos de respuesta, origen, antispam, límites, escape HTML, contexto de producto, configuración y adaptador del SDK de Resend. El transporte HTTP de Resend se simuló; ningún mensaje real fue enviado.

Navegador: selección de motivo, validación de campos obligatorios y foco al primer error, conservación de datos, respuesta de servicio sin configurar, selector en móvil, Escape y menú móvil; acceso directo a catálogos.

## Lighthouse

Los informes se guardan en `audits/`. Se ejecutan con Chrome headless sobre `next build` + `next start`, con los perfiles móvil y escritorio predeterminados de Lighthouse; no se deshabilitan auditorías para elevar los resultados.

La primera evaluación local detectó contraste bajo en los números de categorías y carga mejorable de la portada: ambos se corrigieron. El SEO de la vista previa sin dominio da 69 por noindex/robots, una protección intencional. Para verificar el estado publicable se usa un build separado con NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3011; no se publica ni se modifica el dominio definitivo. Los resultados deben volver a medirse en el hosting y dominio finales.

Reproducción del perfil publicable local:

```sh
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3011 npm run build
npm run start -- --port 3011
# En otra terminal:
node scripts/audit.mjs mobile /
node scripts/audit.mjs desktop /
node scripts/audit.mjs mobile /contacto
```

Luego detener ese servidor y recompilar sin la variable temporal para restablecer el build de revisión. El servidor de desarrollo del puerto 3010 mantiene su configuración habitual.
