import { z } from "zod";
export const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Indicá tu nombre y apellido.").max(100),
    location: z
      .string()
      .trim()
      .min(2, "Indicá tu localidad y provincia.")
      .max(120),
    email: z
      .union([
        z.literal(""),
        z.string().trim().email("Revisá el correo electrónico.").max(160),
      ])
      .default(""),
    phone: z
      .string()
      .trim()
      .max(40)
      .default("")
      .refine(
        (v) =>
          !v || (/^[+\d\s().-]+$/.test(v) && v.replace(/\D/g, "").length >= 8),
        "Revisá el teléfono de contacto.",
      ),
    intent: z.enum(["productos", "asesoramiento", "entregas", "otra"]),
    context: z.string().trim().max(120).default(""),
    message: z
      .string()
      .trim()
      .min(10, "Escribí un mensaje de al menos 10 caracteres.")
      .max(3000),
    website: z.string().max(0).default(""),
    startedAt: z.number().int().positive(),
  })
  .superRefine((d, ctx) => {
    if (!d.email && !d.phone)
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Dejanos un teléfono o correo para responderte.",
      });
  });
export type ContactData = z.infer<typeof contactSchema>;
export function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}
export function contactEmail(data: ContactData) {
  const labels = {
    productos: "Productos y disponibilidad",
    asesoramiento: "Asesoramiento veterinario",
    entregas: "Entregas y cobertura",
    otra: "Otra consulta",
  };
  const motive = labels[data.intent];
  const rows: [string, string][] = [
    ["Nombre", data.name],
    ["Localidad", data.location],
    ["Teléfono", data.phone || "No informado"],
    ["Correo", data.email || "No informado"],
    ["Motivo", motive],
    ["Producto o línea", data.context || "Consulta general"],
    ["Mensaje", data.message],
  ];
  return {
    subject: `MAHONEGA · ${motive} · ${data.name.replace(/[\r\n]/g, " ")} · ${data.location.replace(/[\r\n]/g, " ")}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n\n"),
    html: `<!doctype html><html lang="es"><body style="margin:0;background:#f7f5f0;font-family:Arial,sans-serif;color:#182b3a"><table role="presentation" width="100%" style="padding:24px"><tr><td align="center"><table role="presentation" width="100%" style="max-width:640px;background:white;border:1px solid #deded7"><tr><td style="background:#182b3a;color:white;padding:26px"><p style="color:#c4a45e;letter-spacing:3px">MAHONEGA</p><h1 style="font-size:25px">Nueva consulta web</h1><p>${escapeHtml(motive)}</p></td></tr><tr><td style="padding:24px">${rows.map(([k, v]) => `<h2 style="font-size:13px;color:#795a26;margin:20px 0 8px">${k}</h2><p style="font-size:16px;line-height:1.6;white-space:pre-wrap;margin:0">${escapeHtml(v)}</p>`).join("")}${data.email ? `<p style="margin-top:30px"><a href="mailto:${encodeURIComponent(data.email)}" style="background:#182b3a;color:white;padding:12px 18px;text-decoration:none;display:inline-block">Responder consulta</a></p>` : ""}<p style="font-size:13px;color:#61696d;margin-top:28px">Consulta recibida desde el formulario web de MAHONEGA.</p></td></tr></table></td></tr></table></body></html>`,
  };
}
export function createMemoryLimiter(now = () => Date.now()) {
  const entries = new Map<string, { count: number; expires: number }>();
  return (key: string) => {
    const time = now();
    if (entries.size > 1000)
      for (const [k, v] of entries) if (v.expires <= time) entries.delete(k);
    let entry = entries.get(key);
    if (!entry || entry.expires <= time) {
      entry = { count: 0, expires: time + 600000 };
      entries.set(key, entry);
    }
    entry.count++;
    return entry.count <= 5;
  };
}
