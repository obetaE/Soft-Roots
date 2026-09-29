import { blogPosts, toIsoDate } from "@/libs/blogData";
import { site } from "@/libs/site";

const pages = ["", "/about", "/shop", "/build", "/blog", "/book", "/contact", "/terms"];

export default function sitemap() {
  return [
    ...pages.map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${site.url}/blog/${post.id}`,
      lastModified: toIsoDate(post.date),
      changeFrequency: "yearly",
      priority: 0.6,
    })),
  ];
}
