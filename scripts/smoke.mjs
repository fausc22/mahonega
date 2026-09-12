import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
const origin = "http://127.0.0.1:3010";
for (const path of [
  "/",
  "/productos",
  "/empresa",
  "/contacto",
  "/privacidad",
]) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, path + ": one H1");
  assert.ok(html.includes("MAHONEGA"), path);
  console.log("OK page", path);
}
assert.equal((await fetch(origin + "/ruta-inexistente-qa")).status, 404);
for (const dir of ["brand", "images", "catalogos", "fonts"]) {
  for (const file of await readdir("public/" + dir)) {
    if (!/\.(webp|avif|png|pdf|ttf|woff2)$/.test(file)) continue;
    const response = await fetch(`${origin}/${dir}/${file}`, {
      method: "HEAD",
    });
    assert.equal(response.status, 200, file);
    assert.ok(Number(response.headers.get("content-length")) > 0, file);
  }
}
for (const route of ["/robots.txt", "/sitemap.xml", "/opengraph-image.png"]) {
  assert.equal((await fetch(origin + route)).status, 200, route);
}
console.log("OK 404, brand, photos, products, PDFs, fonts and metadata routes");
