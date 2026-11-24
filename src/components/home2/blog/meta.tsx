import { readingMinutes, type Post } from "@/lib/blog";
import { R } from "../shared";

/** "23 November 2026" (UTC, so server and client agree). */
export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** v2 URL for an article. */
export const postHref = (slug: string) => `${R.blog}/${slug}`;

/** Category · date · reading time. `invert` for use on black surfaces. */
export function PostMeta({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] ${className}`}>
      <span className="font-medium uppercase tracking-[0.14em] text-accord-red">{post.category}</span>
      <span aria-hidden className="opacity-50">
        ·
      </span>
      <time dateTime={post.published}>{formatDate(post.published)}</time>
      <span aria-hidden className="opacity-50">
        ·
      </span>
      <span>{readingMinutes(post)} min read</span>
    </p>
  );
}

/* Live paths that have a v2 equivalent. Anything else is left as is. */
const V2_PATHS: Record<string, string> = {
  "/": R.home,
  "/about-us": R.about,
  "/products": R.products,
  "/services": R.services,
  "/industries-served": R.industries,
  "/app": R.app,
  "/career": R.career,
  "/partners": R.partners,
  "/blog": R.blog,
  "/contact-us": R.contact,
};

/** Map an internal link from blog.ts content to its v2 page. */
export function v2Href(href: string): string {
  if (!href.startsWith("/")) return href;
  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const tail = cut === -1 ? "" : href.slice(cut);
  if (path.startsWith("/blog/")) return `${R.blog}/${path.slice("/blog/".length)}${tail}`;
  const mapped = V2_PATHS[path];
  return mapped ? `${mapped}${tail}` : href;
}
