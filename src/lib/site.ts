export const site = {
  name: "MAHONEGA",
  legalName: "MAHONEGA",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contacto@mahonega.com",
  phone: "+54 9 2302 635250",
  whatsapp: "5492302635250",
  address: "José Galaverna 700, Huinca Renancó, Córdoba",
  hours: "Lunes a viernes de 08:00 a 12:30 y de 14:30 a 18:30",
  instagram: "https://www.instagram.com/mahonega.sas/",
};
export const regions = [
  "Sur de Córdoba",
  "Sur de San Luis",
  "Norte de La Pampa",
  "Oeste de Buenos Aires",
  "Sudoeste de Santa Fe",
];
export const brands = [
  "Biogénesis Bagó",
  "Biochemiq",
  "CDV",
  "Carreteles Rafaela",
  "OVER",
  "Vetanco",
  "Zoetis",
  "Río de Janeiro",
  "Brouwer",
];
export function whatsappUrl(context = "") {
  const message = context
    ? `Hola, me contacto desde la web de MAHONEGA. Quisiera consultar por ${context}.`
    : "Hola, me contacto desde la web de MAHONEGA. Quisiera hacer una consulta para mi establecimiento.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
export function contactUrl(context = "") {
  return (
    "/contacto" + (context ? `?consulta=${encodeURIComponent(context)}` : "")
  );
}
export const team = [
  {
    name: "Marcelo Houriet",
    role: "Socio · Asesoramiento veterinario",
    detail: "Médico Veterinario · M.P. 1729",
    phone: "+54 9 2302 531296",
    initials: "MH",
    email: "mhouriet@mahonega.com",
  },
  {
    name: "Carlos Tosso",
    role: "Socio",
    detail: "Equipo MAHONEGA",
    phone: "+54 9 2302 579107",
    initials: "CT",
    email: "",
  },
  {
    name: "Benjamín Pinto",
    role: "Atención comercial",
    detail: "Tu primer contacto para consultas y pedidos",
    phone: "+54 9 2302 635250",
    initials: "BP",
    email: "bpinto@mahonega.com",
  },
];
