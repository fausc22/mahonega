import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import * as chromeLauncher from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
const mode = process.argv[2] || "mobile";
const path = process.argv[3] || "/";
const browser = await chromeLauncher.launch({
  chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  const result = await lighthouse("http://127.0.0.1:3011" + path, {
    port: browser.port,
    output: ["html", "json"],
    logLevel: "error",
  }, mode === "desktop" ? desktopConfig : undefined);
  await mkdir("docs/audits", { recursive: true });
  const stem = mode + "-" + (path.replaceAll("/", "") || "inicio");
  await writeFile("docs/audits/" + stem + ".html", result.report[0]);
  await writeFile("docs/audits/" + stem + ".json", result.report[1]);
  console.log(
    JSON.stringify({
      mode,
      path,
      scores: Object.fromEntries(
        Object.entries(result.lhr.categories).map(([k, v]) => [
          k,
          Math.round(v.score * 100),
        ]),
      ),
      issues: Object.values(result.lhr.audits)
        .filter(
          (a) =>
            a.score !== null &&
            a.score < 1 &&
            a.scoreDisplayMode !== "informative",
        )
        .map((a) => ({
          id: a.id,
          title: a.title,
          score: a.score,

          displayValue: a.displayValue,
        })),
    }),
  );
} finally {
  await browser.kill();
}
