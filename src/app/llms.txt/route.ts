import { sortedPosts } from "@/lib/blog";
import { LATEST_FY, products, siteConfig } from "@/lib/site";

/**
 * /llms.txt — a plain-text map of the site for AI assistants (GEO).
 * Generated from site.ts and blog.ts so it never drifts from the pages.
 */
export const dynamic = "force-static";

const ORIGIN = "https://www.accordchemicals.com";

export function GET() {
  const c = siteConfig.contact;
  const body = `# ${siteConfig.name}

> ${siteConfig.description}

Key facts (${LATEST_FY}): 198,000+ metric tons traded; 500+ active clients; 60+ countries; established ${siteConfig.established}; headquarters in Mumbai with branch offices in Ahmedabad and Gandhidham, Gujarat.

Contact: ${c.phone} · ${c.email} · ${c.addressLines.join(" ")}

## Pages
- [About Us](${ORIGIN}/about-us): company history, vision and process
- [Products](${ORIGIN}/products): petrochemical product families
- [Services](${ORIGIN}/services): import and distribution, indenting, exports, clearing and logistics
- [Industries Served](${ORIGIN}/industries-served)
- [Accord Interact app](${ORIGIN}/app)
- [Contact Us](${ORIGIN}/contact-us): request a quotation

## Product families
${products.map((p) => `- ${p.name}: ${p.desc}`).join("\n")}

## Guides
${sortedPosts()
  .map((p) => `- [${p.title}](${ORIGIN}/blog/${p.slug}): ${p.description}`)
  .join("\n")}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
