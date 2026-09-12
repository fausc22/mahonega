import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return site.url
    ? ["", "/productos", "/empresa", "/contacto", "/privacidad"].map(
        (path) => ({
          url: site.url + path,
          changeFrequency: "monthly",
          priority: path === "" ? 1 : 0.7,
        }),
      )
    : [];
}
