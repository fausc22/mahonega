export const categories = [
  {
    id: "vacunas",
    name: "Biológicos y vacunas",
    short: "Prevención para el rodeo",
    description:
      "Líneas de vacunas para acompañar el manejo sanitario del establecimiento. Consultanos por las opciones de nuestros laboratorios.",
    icon: "shield",
  },
  {
    id: "antiparasitarios",
    name: "Antiparasitarios",
    short: "Control interno y externo",
    description:
      "Antiparasitarios internos, externos y endectocidas. Te orientamos sobre las alternativas de productos para conversar con tu veterinario.",
    icon: "scan",
  },
  {
    id: "antibioticos",
    name: "Antibióticos",
    short: "Respaldo para la sanidad animal",
    description:
      "Productos veterinarios para el tratamiento de infecciones bacterianas, de acuerdo con la indicación del profesional actuante.",
    icon: "plus",
  },
  {
    id: "caravanas",
    name: "Caravanas electrónicas",
    short: "Identificación del ganado",
    description:
      "Identificación electrónica para el rodeo. Consultá modelos, disponibilidad y los datos necesarios para coordinar tu pedido.",
    icon: "tag",
  },
  {
    id: "descartables",
    name: "Descartables veterinarios",
    short: "Insumos para el trabajo diario",
    description:
      "Artículos descartables para las tareas veterinarias del establecimiento. Contanos qué insumos necesitás y consultá las opciones disponibles.",
    icon: "syringe",
  },
  {
    id: "rurales",
    name: "Artículos rurales",
    short: "Equipá tu establecimiento",
    description:
      "Bobinas e hilos para boyeros y artículos para el trabajo rural. Consultá al equipo por el producto que estás buscando.",
    icon: "fence",
  },
] as const;
export const products = [
  {
    id: "bioabortogen",
    name: "Bioabortogen H",
    brand: "Biogénesis Bagó",
    category: "vacunas",
    label: "Biológicos y vacunas",
    description: "Vacuna de la línea de sanidad reproductiva bovina.",
    image: "/images/bioabortogen.webp",
    source: "BioVademecumArgentina.pdf, página 27",
  },
  {
    id: "biopoligen",
    name: "Biopoligen AIR",
    brand: "Biogénesis Bagó",
    category: "vacunas",
    label: "Biológicos y vacunas",
    description:
      "Vacuna de la línea de prevención del síndrome respiratorio bovino.",
    image: "/images/biopoligen.webp",
    source: "BioVademecumArgentina.pdf, página 32",
  },
  {
    id: "bagomectina",
    name: "Bagomectina STAR",
    brand: "Biogénesis Bagó",
    category: "antiparasitarios",
    label: "Endectocidas",
    description: "Antiparasitario interno y externo de la línea bovina.",
    image: "/images/bagomectina.webp",
    source: "BioVademecumArgentina.pdf, página 83",
  },
  {
    id: "biomeq",
    name: "Biomeq",
    brand: "Biochemiq",
    category: "antiparasitarios",
    label: "Endectocidas",
    description:
      "Combina un componente antiparasitario con un inmunoestimulante inespecífico.",
    image: "/images/biomeq.webp",
    source: "Vademecum-digital.pdf, página 3; imagen oficial biochemiq.com",
  },
  {
    id: "biomeq-35",
    name: "Biomeq +3,5",
    brand: "Biochemiq",
    category: "antiparasitarios",
    label: "Endectocidas",
    description:
      "Alternativa de la línea de productos híbridos de Biochemiq para bovinos.",
    image: "/images/biomeq-35.webp",
    source: "Vademecum-digital.pdf, página 3; imagen oficial biochemiq.com",
  },
  {
    id: "clostrimiq",
    name: "Clostrimiq MS",
    brand: "Biochemiq",
    category: "vacunas",
    label: "Biológicos y vacunas",
    description: "Vacuna de la línea clostridial para bovinos.",
    image: "/images/clostrimiq.webp",
    source: "Vademecum-digital.pdf, página 4; imagen oficial biochemiq.com",
  },
] as const;
export type Product = (typeof products)[number];
