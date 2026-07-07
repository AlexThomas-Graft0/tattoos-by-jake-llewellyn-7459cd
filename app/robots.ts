import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://tattoos-by-jake-llewellyn-7459cd.duckbyte.co/sitemap.xml",
  };
}
