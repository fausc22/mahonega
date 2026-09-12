import sharp from "sharp";
import fs from "node:fs";
(async () => {
  await sharp("resources/Logo Marcelo Houriet.jpeg")
    .extract({ left: 60, top: 68, width: 370, height: 220 })
    .png()
    .toFile("public/brand/monograma.png");
  await sharp("public/brand/monograma.png")
    .resize(176, 105)
    .extend({ top: 43, bottom: 44, left: 8, right: 8, background: "white" })
    .png()
    .toFile("public/brand/icon.png");
  const logo = await sharp("public/brand/monograma.png")
    .resize(180)
    .png()
    .toBuffer();
  const svg = Buffer.from(
    `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#182b3a"/><rect x="70" y="60" width="220" height="150" rx="4" fill="white"/><text x="330" y="155" font-family="Arial,sans-serif" font-size="64" font-weight="700" fill="white" letter-spacing="5">MAHONEGA</text><rect x="70" y="275" width="70" height="4" fill="#c4a45e"/><text x="70" y="365" font-family="Arial,sans-serif" font-size="56" fill="white">El respaldo que tu campo necesita.</text><text x="70" y="438" font-family="Arial,sans-serif" font-size="29" fill="#d1d9df">Insumos veterinarios · Asesoramiento · Entrega a campo</text><text x="70" y="555" font-family="Arial,sans-serif" font-size="22" fill="#c4a45e">HUINCA RENANCÓ, CÓRDOBA</text></svg>`,
  );
  await sharp(svg)
    .composite([{ input: logo, left: 90, top: 81 }])
    .png()
    .toFile("src/app/opengraph-image.png");
  fs.writeFileSync(
    "src/app/opengraph-image.alt.txt",
    "MAHONEGA. El respaldo que tu campo necesita. Insumos veterinarios, asesoramiento y entrega a campo.",
  );
})();
