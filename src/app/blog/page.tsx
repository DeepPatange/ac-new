import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PostCard from "@/components/blog/PostCard";
import { blogCopy, sortedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const description =
  "Guides on importing chemicals into India, indenting, Incoterms, certificates of analysis, glycols and OXO alcohols, from Accord Chemical Corporation's trading desk.";

export const metadata: Metadata = {
  title: "Blog: Petrochemical Trading Guides & Insights",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description,
    type: "website",
    url: "/blog",
  },
};

export default function BlogPage() {
  const [featured, ...rest] = sortedPosts();

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
    blogPost: sortedPosts().map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://www.accordchemicals.com/blog/${p.slug}`,
      datePublished: p.published,
      dateModified: p.updated,
      image: p.cover.src,
    })),
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28">
        <section className="section-quiet">
          <Container>
            <SectionHeading eyebrow={blogCopy.eyebrow} title={blogCopy.heading} intro={blogCopy.intro} />

            {featured && (
              <div className="mt-10 sm:mt-12">
                <PostCard post={featured} featured />
              </div>
            )}

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
