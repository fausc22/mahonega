# Recursos y procedencia

Originales conservados en `resources/`. El usuario confirmó autorización para usar el logo, fotografías y material de las marcas.

## Información institucional

`Desarrollo MAHONEGA WEB (2).docx`: origen de la empresa, nombres, matrícula profesional, contactos, domicilio, horarios, regiones y líneas comerciales. El texto se sintetizó y redactó para web; no se inventaron testimonios, antigüedad adicional, clientes, cifras comerciales ni fotografías de integrantes.

## Identidad y fotografías

- `Logo Marcelo Houriet.jpeg`: logo final aportado. Copia completa WebP, extracción del monograma MH para cabecera, favicon y tarjeta social. No se redibujó el símbolo ni se sustituyó por iniciales de otra identidad.
- WhatsApp 10.40.33: `campo-entrega.webp`, portada.
- WhatsApp 10.40.34 (1): `entregas.webp`, empresa.
- WhatsApp 10.40.34 (2): `rodeo.webp`, inicio.
- WhatsApp 10.40.34: `camino.webp`, disponible como reserva.
- WhatsApp 10.41.59: recorte central de caravanas en `caravanas.webp`, conservando productos y texto completo del recorte. No se usó la frase regulatoria del folleto como una nueva afirmación editorial.

Las fotos conservan el contenido real. Se optimizó su codificación a WebP y se ajustó el encuadre mediante CSS. No se generaron fotografías ficticias. La calidad disponible es adecuada para la primera web; originales de cámara mejorarían futuras vistas de gran tamaño.

## Catálogos

| Original                              | Tratamiento                                                                                                                                                                               |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BioVademecumArgentina.pdf             | Catálogo completo de 155 páginas; selección breve. Bioabortogen H: página 27; Biopoligen AIR: 32; Bagomectina STAR: 83. Imágenes rasterizadas y extraídas a archivos WebP independientes. |
| Vademecum-digital.pdf                 | Catálogo Biochemiq, 9 páginas. Referencia de líneas y productos; imágenes complementadas con material oficial de mejor calidad.                                                           |
| DOC-20260728-WA0026_260909_145825.pdf | Catálogo CDV, 6 páginas. Disponible para descarga y como referencia complementaria.                                                                                                       |

Los tres PDF originales se ofrecen en `public/catalogos/`, sin insertar sus páginas completas en el HTML. La descarga de Biogénesis es pesada (~44 MB); se informa el tamaño antes de descargar. Las presentaciones fotografiadas son ilustrativas: disponibilidad y presentación se consultan al equipo.

Los recortes de Biogénesis retienen parte del fondo original del catálogo; no se reconstruyeron etiquetas. Sirven para tarjetas web, no para ampliación comercial de alta resolución. Los renderizados de trabajo están en `tmp/assets/` (carpeta ignorada), y los resultados finales en `public/images/`.

## Imágenes oficiales complementarias

Consultadas en el sitio oficial de [Biochemiq](https://biochemiq.com/productos/) y su [página Biomeq](https://biochemiq.com/productos/biomeq/):

- Biomeq: https://biochemiq.com/wp-content/uploads/2021/09/biomeq-triangular-1024x1024.webp
- Biomeq +3,5: https://biochemiq.com/wp-content/uploads/2021/09/biomeq-triangular-35-1024x1024.webp
- Clostrimiq MS: https://biochemiq.com/wp-content/uploads/2021/09/Clostrimiq-MS-1.webp

Vigormeq se descargó como recurso de reserva, no forma parte de la selección publicada en las páginas. Los nombres de los laboratorios se componen tipográficamente, sin presentar esas composiciones como sus logotipos oficiales.

## Fuentes

Manrope y Source Sans 3, archivos locales WOFF2 con subconjunto latino y originales TTF conservados y licencias OFL en `public/fonts/`. Identidad: azul profundo #182B3A, grafito #24282B, marfil #F7F5F0, dorado #C4A45E y bronce #795A26. El bronce se usa para textos pequeños sobre fondos claros; el dorado, para acentos y botones.

## Pendientes editoriales

Dominio definitivo y credenciales Resend; confirmación comercial de la selección y presentaciones; revisión de contactos y horarios. Fotos del equipo son opcionales: se usan tarjetas con iniciales, sin simular retratos. Una futura actualización de catálogos debe revisar también nombres, fotos y descripciones asociadas.

## Revisión de portada

La portada usa ahora `hero-rodeo.avif` (escritorio) y `hero-rodeo-mobile.avif` (móvil), recortes de la fotografía real del rodeo, sin contenido generado. La fotografía anterior de la camioneta queda disponible como recurso de entregas. Las fuentes para la web se regeneran con `node scripts/prepare-fonts.mjs`; el subconjunto conserva caracteres latinos extendidos, acentos combinados, puntuación y monedas.
