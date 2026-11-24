import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";

const ORIGIN = "https://www.accordchemicals.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/about-us",
    "/products",
    "/services",
    "/industries-served",
    "/app",
    "/career",
    "/partners",
    "/contact-us",
    "/blog",
  ].map((path) => ({
    url: `${ORIGIN}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const articles = posts.map((p) => ({
    url: `${ORIGIN}/blog/${p.slug}`,
    lastModified: new Date(p.updated),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
