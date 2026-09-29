import { site } from "@/libs/site";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/cart"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
