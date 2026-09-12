import { readFile, writeFile } from "node:fs/promises";
import subsetFont from "subset-font";
// Latin and Latin Extended, combining marks, punctuation and currency symbols.
const characters = [
  [0x20, 0x24f],
  [0x300, 0x36f],
  [0x2000, 0x206f],
  [0x20a0, 0x20cf],
]
  .flatMap(([start, end]) =>
    Array.from({ length: end - start + 1 }, (_, i) =>
      String.fromCodePoint(start + i),
    ),
  )
  .join("");
for (const font of ["manrope", "source-sans-3"]) {
  const original = await readFile(`public/fonts/${font}.ttf`);
  const compressed = await subsetFont(original, characters, {
    targetFormat: "woff2",
  });
  await writeFile(`public/fonts/${font}.woff2`, compressed);
  console.log(`${font}: ${original.length} → ${compressed.length} bytes`);
}
