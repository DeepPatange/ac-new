import Shell from "@/components/home2/Shell";
import ContactBand from "@/components/home2/ContactBand";
import { PageHeader, SplitHeading } from "@/components/home2/blocks";
import { Fade } from "@/components/home2/primitives";
import { PHOTOS, WRAP, v2Meta } from "@/components/home2/shared";
import BlogCard, { FeaturedCard } from "@/components/home2/blog/BlogCard";
import { blogCopy, posts, sortedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const description =
  "Guides on importing chemicals into India, indenting, Incoterms, certificates of analysis, glycols and OXO alcohols, from Accord Chemical Corporation's trading desk.";

export const metadata = v2Meta("Blog", description);

export default function BlogTwoPage() {
  const all = sortedPosts();
  const [featured, ...rest] = all;
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  /* Same structured data as the live /blog (canonical live URLs). */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    description,
    url: "https://www.accordchemicals.com/blog",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: "https://www.accordchemicals.com/logo.png" },
    },
    blogPost: all.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://www.accordchemicals.com/blog/${p.slug}`,
      datePublished: p.published,
      dateModified: p.updated,
      image: p.cover.src,
    })),
  };

  return (
    <Shell>
      <PageHeader
        crumb="Blog"
        lead={
          <>
            Petrochemical trade,
            <br />
            <span className="text-accord-red">explained plainly.</span>
          </>
        }
        note={
          <>
            {posts.length} guides from the desk.
            <br />
            {categories.join(" · ")}
          </>
        }
        title={[
          [{ text: "Insights" }],
          [{ text: "from the", tone: "light" }],
          [{ text: "desk.", tone: "red" }],
        ]}
        intro={blogCopy.intro}
        image={{ id: PHOTOS.welder, alt: "Welder at work in a fabrication plant" }}
        figure={{ value: String(posts.length).padStart(2, "0"), label: "Guides from the desk" }}
      />

      <section aria-label="Latest article" className={`${WRAP} pb-16 lg:pb-24`}>
        {featured && (
          <Fade>
            <FeaturedCard post={featured} />
          </Fade>
        )}
      </section>

      <section aria-label="All guides" className={`${WRAP} border-t border-[#E0E2E1] py-12 lg:py-20`}>
        <SplitHeading
          note="Importing, indenting, quality documents and the molecules we trade, written by the team that moves them every day."
          title={[[{ text: "All" }, { text: "guides", tone: "red" }]]}
        />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {rest.map((p, i) => (
            <li key={p.slug}>
              <Fade delay={(i % 3) * 0.06} className="h-full">
                <BlogCard post={p} index={i + 2} />
              </Fade>
            </li>
          ))}
        </ul>
      </section>

      <ContactBand />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Shell>
  );
}
