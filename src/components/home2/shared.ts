/* v2 (Swiss / editorial) — plain, server-safe constants and helpers. Kept out
   of the "use client" primitives module so server components can call them. */

import type { Metadata } from "next";

/** Page gutter + max width shared by every v2 section. */
export const WRAP = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";

/** Unsplash helper: large source; next/image downsizes per breakpoint. */
export const photo = (id: string, w = 2000) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&auto=format&q=75`;

/** Portrait crop helper for tall tiles. */
export const portrait = (id: string, w = 900, h = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&auto=format&q=72`;

/**
 * v2 routes. The preview is a self-contained, separate copy of the site:
 * every v2 page links only to other v2 pages. The live pages are untouched.
 */
export const R = {
  home: "/home-2",
  about: "/about-us-2",
  products: "/products-2",
  services: "/services-2",
  industries: "/industries-served-2",
  app: "/app-2",
  career: "/career-2",
  partners: "/partners-2",
  blog: "/blog-2",
  contact: "/contact-us-2",
} as const;

/** Contact page with the product enquiry pre-filled. */
export const enquire = (slug: string) => `${R.contact}?product=${slug}`;

/** Metadata for a v2 preview page: titled, and kept out of search. */
export function v2Meta(title: string, description?: string): Metadata {
  return {
    title: `${title} (v2 preview)`,
    description,
    robots: { index: false, follow: false },
  };
}

/** Shared photo IDs (Unsplash) used across v2 pages, already vetted in B&W. */
export const PHOTOS = {
  shipCranes: "1578575437130-527eed3abbec",
  refinery: "1516937941344-00b4e0337589",
  pipework: "1513828583688-c52646db42da",
  portAerial: "1494412574643-ff11b0a5c1c3",
  containerYard: "1494412651409-8963ce7935a7",
  warehouse: "1587293852726-70cdb56c2866",
  welder: "1504328345606-18bbc8c9d7d1",
} as const;
