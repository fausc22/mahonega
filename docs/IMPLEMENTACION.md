# MAHONEGA — implementación

Alcance aprobado implementado: Inicio, Productos, Empresa, Contacto y Privacidad. Next.js, identidad azul profundo/grafito/dorado, logo MH oficial. Biogénesis Bagó y Biochemiq protagonistas; CDV y otras cinco marcas como oferta complementaria. Sin publicación definitiva en esta etapa.

La revisión posterior está documentada en [AJUSTES.md](AJUSTES.md); los correos ya fueron incorporados y la guía actual de envío es [RESEND.md](RESEND.md).

## Etapas terminadas

1. **Contenido y recursos.** Revisión del documento del cliente, los tres PDF y las fotografías; redacción orientada a consulta. Extracción de productos de Biogénesis y complemento con imágenes oficiales de Biochemiq. Originales intactos, derivados WebP, tres catálogos descargables y fuentes documentadas.
2. **Base técnica e identidad.** Next.js App Router, React y TypeScript. Paleta propia, Manrope/Source Sans 3 locales, monograma oficial, favicon, tarjeta para compartir, componentes reutilizables y estilos adaptables. HT se tomó como referencia y no se modificó.
3. **Inicio.** Portada con fotografía real, propuesta comercial, beneficios, seis categorías, laboratorios, productos seleccionados, empresa, cobertura y llamadas a contacto.
4. **Productos y Empresa.** Índice por categorías, selección de seis productos con consulta contextual, caravanas y PDF. Historia breve, equipo, asesoramiento veterinario, proceso de pedido y cobertura por regiones.
5. **Contacto y funcionamiento.** Teléfono, WhatsApp, ubicación, Instagram y formulario. Validación cliente/servidor, estados de error/envío, alternativa por WhatsApp, honeypot, límites de solicitudes, escape de contenido, integración Resend y límite compartido opcional en Redis. La falta de credenciales nunca devuelve éxito. Privacidad y página 404.
6. **Revisión integral y entrega.** Compilación de producción, lint, tests de formulario/API, revisión en navegador de escritorio y móvil. Corrección de recortes, encabezado de móvil pequeño, transiciones de navegación y validación del origen público detrás del proxy. Documentación de ejecución, edición y configuración.

## Validaciones

- Navegador: portada a 1440 px y 320 px; menú móvil a 390 px; navegación a Productos y Contacto; contexto Biomeq; campos obligatorios y foco; respuesta de servicio sin configurar y preservación de datos.
- Recursos: respuesta HTTP correcta de las cinco páginas, página 404, imágenes, fuentes, los tres PDF, robots, sitemap y tarjeta social.
- Accesibilidad manual: cierre con Escape, recorrido de foco del menú móvil y retorno al botón; ancho de tablet (768 px) sin desborde en Contacto y Privacidad.
- Pruebas de API: canales de respuesta, contexto, fallos de proveedor, origen permitido/ajeno, solicitudes excesivas/malformadas, ventana antispam, escape de HTML y reinicio del límite.
- No se enviaron correos ni mensajes reales como parte de las pruebas. La recepción del proveedor requiere configuración y prueba posterior.
- Las fotos cargan de forma diferida, salvo logo y portada. Fuentes locales y dimensiones previstas para evitar saltos de contenido. No se afirma una puntuación Lighthouse ni certificación de accesibilidad: no se realizó una auditoría formal.

## Decisiones y límites de entrega

- Productores agropecuarios, con énfasis ganadero bovino. No se ofrece atención de mascotas.
- Información institucional del DOCX y selección editorial de productos. No se infiere stock, exclusividad ni servicios de aplicación. No se reproducen dosis o protocolos.
- Contactos reales del documento; dominio y credenciales de envío pendientes en variables de entorno; correos comerciales incorporados. La vista previa conserva noindex hasta definir el origen público.
- No incluye carrito, pagos, inventario, CMS ni rastreadores externos. Eventos de conversión preparados sin instalar analítica.
- La política de privacidad debe revisarse al configurar proveedor, correo y eventuales herramientas de analítica.
- El límite por memoria no es global entre instancias; configurar Redis para producción distribuida y verificar el proxy antes de confiar en su cabecera de IP.
- Antes de publicar: confirmar selección comercial, contactos, horarios, dominio, recepción real del formulario y configuración de privacidad.

## Recorrido sugerido para el cliente

1. Inicio: identidad, frase principal, fotografía y claridad de la oferta.
2. Productos: seis familias, selección comercial, imágenes y descargas.
3. Empresa: integrantes, matrícula, fecha de inicio y cobertura.
4. Contacto: destinatarios de WhatsApp/teléfono; consulta desde una tarjeta de producto; errores del formulario vacío y alternativa disponible mientras falta el correo.
5. Repetir en celular: menú, legibilidad, botones y ausencia de desbordes.
