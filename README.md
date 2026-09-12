# MAHONEGA

Sitio institucional y comercial en Next.js (App Router), React y TypeScript. Inicio, Productos, Empresa, Contacto y Privacidad. Implementación local lista para revisión del cliente; aún sin publicación ni envío real de correo configurado.

## Ejecutar

Recomendado: Node.js 22.18+ o 24 LTS y npm. Los tests usan soporte nativo de TypeScript.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Abrir http://127.0.0.1:3010. Para producción: `npm run build` y `npm start`. No requiere base de datos.

## Configuración pendiente

- `NEXT_PUBLIC_SITE_URL`: origen público definitivo, con https y sin rutas. Al definirlo se habilitan indexación, sitemap, metadatos absolutos y la comprobación del origen del formulario. Sin configurarlo, la revisión queda en noindex y solo acepta el origen local del puerto 3010.
- `NEXT_PUBLIC_CONTACT_EMAIL`: correo comercial visible. Si está vacío se usa `contacto@mahonega.com`.
- `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` y `CONTACT_TO_EMAIL`: credenciales, remitente de un dominio verificado en Resend y destinatario de consultas. Sin token o remitente, el formulario devuelve 503, conserva los datos y ofrece WhatsApp. El destinatario usa como respaldo el correo público. Nunca simula un envío exitoso.
- `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`: configurar ambos para compartir el límite de envíos entre instancias. Sin ellos se usa memoria por proceso, suficiente para pruebas pero no un límite global en serverless.
- `TRUST_PROXY=true`: únicamente si el proveedor garantiza que sobrescribe X-Forwarded-For. De lo contrario el límite es compartido: 5 envíos cada 10 minutos por proceso, o entre instancias cuando se usa Redis.

Reiniciar desarrollo o volver a compilar tras cambiar variables públicas. No guardar secretos en Git. Validar recepción y respuesta con un envío real autorizado antes de publicar: las pruebas automatizadas usan un proveedor simulado y no certifican entregabilidad.

## Dónde editar

| Contenido                                             | Archivo                                            |
| ----------------------------------------------------- | -------------------------------------------------- |
| Teléfonos, integrantes, domicilio, cobertura y marcas | `src/lib/site.ts`                                  |
| Categorías, selección de productos e imágenes         | `src/lib/catalog.ts`                               |
| Textos y estructura por página                        | `src/app/**/page.tsx`                              |
| Colores, tamaños, espaciados y responsive             | `src/app/globals.css`                              |
| Navegación, pie y componentes compartidos             | `src/components/`                                  |
| Validación y correo del formulario                    | `src/lib/contact.ts`, `src/lib/contact-handler.ts` |
| Integración Resend y límite de envíos                 | `src/app/api/contact/route.ts`                     |
| Logo, fotos y catálogos públicos                      | `public/`                                          |

Las imágenes originales permanecen intactas en `resources/`. No hace falta extraerlas manualmente para revisar esta versión. `node scripts/prepare-brand.mjs` regenera monograma, favicon y tarjeta para compartir a partir del logo oficial.

## Verificación

```sh
npm run lint
npm test
npm run build
npm run format:check
npm audit
# Con el servidor local iniciado:
node scripts/smoke.mjs
```

Los tests comprueban canales de respuesta, validación, contexto del producto, origen detrás de proxy, tamaño de solicitudes, escape HTML, límite de envíos y respuestas del proveedor. No envían correos.

Revisar también navegación móvil, menú con Escape/Tab, consultas desde productos, enlaces de teléfono y WhatsApp, descarga de los tres PDF y lectura de contenidos con el cliente. En `docs/IMPLEMENTACION.md` se detallan las etapas y en `docs/RECURSOS.md`, las fuentes y limitaciones.

## Alcance

Catálogo editorial sin precios, stock en tiempo real, carrito ni administración. No se incorporan dosis ni protocolos. Fuentes alojadas localmente; sin rastreadores externos. Los eventos de conversión quedan preparados como eventos DOM y llamada opcional a gtag, pero no se instaló Google Analytics. La política de privacidad debe reflejar la configuración real elegida antes de publicar.

## Ajustes de septiembre de 2026

Portada panorámica con fotografía real y versiones AVIF para móvil/escritorio; CTA Contactanos; correos generales y personales; acceso inicial a catálogos; menú animado; selector accesible Radix; fuentes WOFF2 locales; metadatos por página. Ver `docs/RESEND.md` para activar el formulario y `docs/AJUSTES.md` para los resultados de validación.
