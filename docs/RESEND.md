# Formulario y Resend

Se revisó la integración de HT en `../ht/landing/src/app/api/contact/route.ts`, su plantilla y `.env.example`. MAHONEGA conserva el mismo flujo: envío desde el servidor, remitente del dominio verificado, destinatario configurable, versión HTML/texto, motivo de consulta y Reply-To del visitante. No se copiaron credenciales ni se modificó HT.

## Preparar la prueba

1. Copiar `.env.example` a `.env.local` si todavía no existe. Si ya existe, editarlo sin sobrescribir credenciales.
2. Completar `RESEND_API_KEY` con una clave de tu cuenta Resend con permiso de envío para el dominio correspondiente.
3. Verificar `mahonega.com` en Resend usando exactamente los registros DNS que muestre el proveedor. La verificación que exista para HT no verifica automáticamente MAHONEGA.
4. Confirmar `CONTACT_FROM_EMAIL="MAHONEGA <web@mahonega.com>"`, o reemplazarlo por un remitente permitido del dominio verificado. Es el remitente técnico; no reemplaza el correo público.
5. Usar `CONTACT_TO_EMAIL=contacto@mahonega.com`, o tu propia casilla para la primera prueba. En modo de prueba de Resend pueden existir restricciones de destinatario hasta verificar el dominio.
6. Dejar `NEXT_PUBLIC_SITE_URL` vacío para probar en `http://127.0.0.1:3010`. Si se configura un origen público, la API solo acepta ese origen: para pruebas locales no colocar el dominio de producción aquí.
7. Reiniciar `npm run dev`. Para un build de producción, recompilar y reiniciar.

No hace falta configurar Redis para una prueba local. Su configuración es recomendable para límites compartidos entre instancias en producción.

## Qué comprobar

- Enviar una consulta con un correo al que tengas acceso y un mensaje reconocible de prueba.
- Verificar que el sitio muestre “Consulta enviada” y que la notificación llegue a CONTACT_TO_EMAIL. Revisar spam si no aparece.
- En el correo deben figurar nombre, localidad, teléfono/correo, motivo, producto si corresponde y mensaje completo.
- Pulsar “Responder” en tu aplicación de correo: debe apuntar al correo que completó el visitante, no a web@mahonega.com.
- Se admite teléfono sin correo. En ese caso se omite Reply-To y la respuesta comercial se realiza al teléfono indicado.
- Repetir entrando desde un producto y comprobar su nombre en el correo.

Una respuesta correcta de la API significa que Resend aceptó el envío. La llegada a la bandeja debe verificarse con el correo real y el panel de Resend; no se certificó entregabilidad sin tus credenciales.

## Respuestas de error

503: falta configuración o servicio temporalmente indisponible. 502: Resend rechazó o no confirmó el envío. 429: límite de cinco intentos por diez minutos. 422: datos inválidos o formulario demasiado rápido/antiguo. 403: el origen del navegador no coincide con la configuración.

Ante fallos, el sitio conserva los datos y ofrece WhatsApp. No se envían respuestas automáticas al visitante ni copias a los integrantes: las consultas llegan al destinatario configurado.

## Pruebas incluidas

`npm test` verifica la validación, errores, contexto, antispam y el adaptador real del SDK de Resend con su transporte HTTP simulado. No envía mensajes reales. Las pruebas revisan remitente, destinatario, Reply-To, cuerpo y rechazo del proveedor.

Referencia oficial: https://resend.com/docs/api-reference/emails/send-email
