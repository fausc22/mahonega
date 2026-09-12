import type { Metadata } from "next";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | MAHONEGA`,
      description,
      url: path,
      locale: "es_AR",
      type: "website",
      siteName: "MAHONEGA",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | MAHONEGA`,
      description,
    },
  };
}
