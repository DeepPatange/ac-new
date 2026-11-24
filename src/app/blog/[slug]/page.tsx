import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Container from "@/components/ui/Container";
import Prose, { Inline } from "@/components/blog/Prose";
import PostCard, { PostMeta, formatDate } from "@/components/blog/PostCard";
import {
  blogAuthor,
  getPost,
  plain,
  posts,
  relatedPosts,
  slugify,
} from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const ORIGIN = "https://www.accordchemicals.com";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    authors: [{ name: blogAuthor.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.published,
      modifiedTime: post.updated,
      section: post.category,
      tags: post.tags,
      images: [{ url: post.cover.src, width: 1600, height: 900, alt: post.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.cover.src],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const toc = post.body.filter((b) => b.type === "h2").map((b) => (b as { text: string }).text);
  const related = relatedPosts(post.slug);
  const url = `${ORIGIN}/blog/${post.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      abstract: post.answer,
      image: [post.cover.src],
      datePublished: post.published,
      dateModified: post.updated,
      inLanguage: "en-IN",
      keywords: post.tags.join(", "),
      articleSection: post.category,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: {
        "@type": "Organization",
        name: `${siteConfig.name}: ${blogAuthor.name}`,
        url: ORIGIN,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: ORIGIN,
        logo: { "@type": "ImageObject", url: `${ORIGIN}/logo.png` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: ORIGIN },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${ORIGIN}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28">
        <article>
          {/* Header */}
          <Container className="max-w-[1120px]">
            <div className="max-w-[820px]">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[13px] text-steel-400">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/blog" className="hover:text-white">Blog</Link>
            </nav>
            <PostMeta post={post} />
            <h1 className="mt-4 font-display text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-white text-balance sm:text-[2.6rem]">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-steel-300">{post.description}</p>
            <p className="mt-5 text-sm text-steel-400">
              By <span className="font-medium text-steel-200">{blogAuthor.name}</span>, {blogAuthor.role}
              {post.updated !== post.published && <> · Updated {formatDate(post.updated)}</>}
            </p>
            </div>
          </Container>

          <Container className="mt-8 max-w-[1120px] sm:mt-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-ink-900">
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                fill
                priority
                sizes="(min-width: 1120px) 1120px, 100vw"
                className="object-cover"
              />
            </div>
          </Container>

          {/* Body + sidebar */}
          <Container className="mt-10 max-w-[1120px] sm:mt-14">
            <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div className="mx-auto w-full max-w-[760px] lg:mx-0">
                {/* Direct answer: the paragraph answer engines quote. */}
                <section aria-labelledby="quick-answer" className="rounded-2xl border border-white/10 bg-ink-900 p-6 sm:p-7">
                  <h2 id="quick-answer" className="text-xs font-semibold uppercase tracking-[0.2em] text-accord-red">
                    Quick answer
                  </h2>
                  <p className="mt-3 text-[17px] leading-[1.75] text-white">{post.answer}</p>
                </section>

                <section aria-labelledby="takeaways" className="mt-8">
                  <h2 id="takeaways" className="font-display text-lg font-semibold text-white">
                    Key takeaways
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {post.takeaways.map((t, i) => (
                      <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-steel-200">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accord-red" />
                        <span>
                          <Inline text={t} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="mt-10">
                  <Prose blocks={post.body} />
                </div>

                {/* FAQ */}
                <section aria-labelledby="faq" className="mt-14">
                  <h2 id="faq" className="scroll-mt-28 font-display text-2xl font-semibold tracking-[-0.015em] text-white sm:text-[1.75rem]">
                    Frequently asked questions
                  </h2>
                  <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
                    {post.faqs.map((f, i) => (
                      <details key={i} className="group py-1" open={i === 0}>
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 font-display text-[17px] font-semibold text-white [&::-webkit-details-marker]:hidden">
                          <h3>{f.q}</h3>
                          <Plus className="mt-0.5 h-5 w-5 shrink-0 text-accord-red transition-transform duration-200 group-open:rotate-45" />
                        </summary>
                        <p className="pb-5 pr-9 text-[16px] leading-relaxed text-steel-200">
                          <Inline text={f.a} />
                        </p>
                      </details>
                    ))}
                  </div>
                </section>

                {/* CTA */}
                <section className="mt-12 flex flex-col gap-5 rounded-3xl bg-accord-red p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
                  <div>
                    <p className="font-display text-xl font-semibold text-[#fff] sm:text-2xl">Need a quotation?</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[#fff]/85">
                      Share product, grade, volume and destination. We reply within one business day.
                    </p>
                  </div>
                  <Link
                    href="/contact-us"
                    className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-[#fff] px-5 py-3 text-sm font-semibold text-accord-red transition-opacity hover:opacity-90 sm:self-auto"
                  >
                    Request a quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </section>
              </div>

              {/* Sticky table of contents (desktop) */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-400">On this page</p>
                  <ol className="mt-4 space-y-2.5 border-l border-white/10">
                    {[...toc, "Frequently asked questions"].map((h) => (
                      <li key={h}>
                        <a
                          href={`#${h === "Frequently asked questions" ? "faq" : slugify(h)}`}
                          className="-ml-px block border-l border-transparent pl-4 text-[14px] leading-snug text-steel-300 transition-colors hover:border-accord-red hover:text-white"
                        >
                          {h}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
            </div>
          </Container>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="section-quiet mt-10">
            <Container>
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-semibold tracking-[-0.015em] text-white">Keep reading</h2>
                <Link href="/blog" className="text-sm font-medium text-steel-300 hover:text-accord-red">
                  All articles
                </Link>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
