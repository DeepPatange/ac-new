import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Plus } from "lucide-react";
import Shell from "@/components/home2/Shell";
import ContactBand from "@/components/home2/ContactBand";
import { Label, SplitHeading } from "@/components/home2/blocks";
import { Fade, Grow } from "@/components/home2/primitives";
import { R, WRAP, v2Meta } from "@/components/home2/shared";
import BlogCard from "@/components/home2/blog/BlogCard";
import Prose, { Inline } from "@/components/home2/blog/Prose";
import { PostMeta, formatDate } from "@/components/home2/blog/meta";
import { blogAuthor, getPost, plain, posts, relatedPosts, slugify } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const ORIGIN = "https://www.accordchemicals.com";
const FAQ_LABEL = "Frequently asked questions";
const two = (n: number) => String(n).padStart(2, "0");

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return v2Meta("Blog");
  return {
    ...v2Meta(post.title, post.description),
    keywords: post.tags,
    /* The live article is the canonical copy of this preview. */
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: blogAuthor.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.published,
      modifiedTime: post.updated,
      section: post.category,
      tags: post.tags,
      images: [{ url: post.cover.src, width: 1600, height: 900, alt: post.cover.alt }],
    },
  };
}

export default function BlogTwoPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const toc = post.body.filter((b) => b.type === "h2").map((b) => (b as { text: string }).text);
  const tocItems = [
    ...toc.map((h, i) => ({ n: two(i + 1), label: h, id: slugify(h) })),
    { n: two(toc.length + 1), label: FAQ_LABEL, id: "faq" },
  ];
  const related = relatedPosts(post.slug);
  const url = `${ORIGIN}/blog/${post.slug}`;

  /* Same structured data as the live article (canonical live URLs). */
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
      author: { "@type": "Organization", name: `${siteConfig.name}: ${blogAuthor.name}`, url: ORIGIN },
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
    <Shell>
      <article>
        {/* Header */}
        <header className={`${WRAP} pb-10 pt-6 lg:pb-14 lg:pt-8`}>
          <nav aria-label="Breadcrumb" className="text-[12px] text-[#888888]">
            <Link href={R.home} className="transition-colors hover:text-[#3C3C3C]">
              Home
            </Link>
            <span aria-hidden className="mx-2 text-[#C4C6C5]">
              /
            </span>
            <Link href={R.blog} className="transition-colors hover:text-[#3C3C3C]">
              Blog
            </Link>
            <span aria-hidden className="mx-2 text-[#C4C6C5]">
              /
            </span>
            <span aria-current="page" className="text-[#3C3C3C]">
              {post.category}
            </span>
          </nav>

          <Fade className="mt-10 lg:mt-14">
            <PostMeta post={post} className="text-[#6D6D6D]" />
            <h1 className="mt-5 max-w-[22ch] font-sans text-[clamp(2rem,4.4vw,4rem)] font-medium leading-[1.04] tracking-[-0.035em] text-[#3C3C3C]">
              {post.title}
            </h1>
          </Fade>
          <Fade delay={0.15} className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <p className="max-w-2xl text-[17px] leading-relaxed text-[#5A5A5A] lg:col-span-7">{post.description}</p>
            <p className="text-[13px] leading-relaxed text-[#888888] lg:col-span-4 lg:col-start-9 lg:self-end">
              By <span className="font-medium text-[#3C3C3C]">{blogAuthor.name}</span>, {blogAuthor.role}
              {post.updated !== post.published && <> · Updated {formatDate(post.updated)}</>}
            </p>
          </Fade>
        </header>

        {/* Cover */}
        <div className={WRAP}>
          <div className="relative aspect-[16/10] overflow-hidden bg-[#D8DAD9] sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={post.cover.src}
              alt={post.cover.alt}
              fill
              priority
              sizes="(min-width: 1440px) 1344px, 100vw"
              className="object-cover grayscale contrast-[1.1]"
            />
            <Grow
              axis="x"
              origin="left"
              delay={0.2}
              duration={1.2}
              className="absolute bottom-0 left-0 h-[20%] max-h-[120px] w-[38%]"
              fill="bg-accord-red mix-blend-multiply"
            />
          </div>
        </div>

        {/* Body */}
        <div className={`${WRAP} mt-12 grid gap-12 pb-16 lg:mt-16 lg:grid-cols-12 lg:gap-8 lg:pb-24`}>
          {/* Sticky contents (desktop) */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <Label>On this page</Label>
              <ol className="mt-4 border-t border-[#E0E2E1]">
                {tocItems.map((t) => (
                  <li key={t.id} className="border-b border-[#E0E2E1]">
                    <a
                      href={`#${t.id}`}
                      className="group grid grid-cols-[2rem_1fr] gap-2 py-3 text-[13px] leading-snug text-[#5A5A5A] transition-colors hover:text-[#3C3C3C]"
                    >
                      <span className="font-light tabular-nums text-accord-red">{t.n}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">{t.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-8 bg-accord-red p-6 text-[#fff]">
                <p className="font-sans text-[17px] font-medium leading-snug">Need a quotation?</p>
                <p className="mt-2 text-[13px] leading-relaxed text-[#fff]/85">
                  Share product, grade, volume and destination.
                </p>
                <Link
                  href={R.contact}
                  className="group mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-[#fff]"
                >
                  Request a quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </aside>

          <div className="min-w-0 max-w-[760px] lg:col-span-8 lg:col-start-5">
            {/* Contents (mobile / tablet) */}
            <details className="group mb-8 border-y border-[#E0E2E1] lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
                <Label>On this page</Label>
                <Plus className="h-4 w-4 text-accord-red transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <ol className="pb-4">
                {tocItems.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="grid grid-cols-[2rem_1fr] gap-2 py-2 text-[14px] leading-snug text-[#3C3C3C]">
                      <span className="font-light tabular-nums text-accord-red">{t.n}</span>
                      <span>{t.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            {/* Direct answer: the paragraph answer engines quote. */}
            <section aria-labelledby="quick-answer" className="border-l-2 border-accord-red bg-[#EFF1F0] p-7 sm:p-9">
              <h2
                id="quick-answer"
                className="flex items-center gap-3 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#888888]"
              >
                <span aria-hidden className="h-2.5 w-2.5 bg-accord-red" />
                Quick answer
              </h2>
              <p className="mt-4 text-[18px] leading-[1.7] text-[#3C3C3C]">{post.answer}</p>
            </section>

            <section aria-labelledby="takeaways" className="mt-12">
              <h2 id="takeaways" className="font-sans text-[20px] font-semibold tracking-[-0.015em] text-[#3C3C3C]">
                Key takeaways
              </h2>
              <ol className="mt-5 border-t border-[#E0E2E1]">
                {post.takeaways.map((t, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[2.75rem_1fr] gap-2 border-b border-[#E0E2E1] py-4 text-[16px] leading-relaxed text-[#3C3C3C]"
                  >
                    <span className="font-sans text-[22px] font-extralight leading-[1.15] tabular-nums text-accord-red">
                      {two(i + 1)}
                    </span>
                    <span>
                      <Inline text={t} />
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-14">
              <Prose blocks={post.body} />
            </div>

            {/* FAQ */}
            <section aria-labelledby="faq" className="mt-16 border-t border-[#3C3C3C] pt-10">
              <h2
                id="faq"
                className="scroll-mt-28 font-sans text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.15] tracking-[-0.025em] text-[#3C3C3C]"
              >
                <span className="mb-3 block text-[13px] font-light tabular-nums tracking-normal text-accord-red">
                  {two(toc.length + 1)}
                </span>
                {FAQ_LABEL}
              </h2>
              <div className="mt-6 border-t border-[#E0E2E1]">
                {post.faqs.map((f, i) => (
                  <details key={i} className="group border-b border-[#E0E2E1]" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                      <h3 className="font-sans text-[17px] font-medium leading-snug text-[#3C3C3C]">{f.q}</h3>
                      <Plus className="mt-0.5 h-5 w-5 shrink-0 text-accord-red transition-transform duration-200 group-open:rotate-45" />
                    </summary>
                    <p className="pb-6 pr-10 text-[16px] leading-relaxed text-[#3C3C3C]">
                      <Inline text={f.a} />
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Quotation prompt (mobile / tablet; desktop has it in the sidebar) */}
            <section className="mt-12 flex flex-col gap-5 bg-accord-red p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9 lg:hidden">
              <div>
                <p className="font-sans text-[20px] font-medium text-[#fff]">Need a quotation?</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[#fff]/85">
                  Share product, grade, volume and destination. We reply within one business day.
                </p>
              </div>
              <Link
                href={R.contact}
                className="inline-flex h-12 shrink-0 items-center gap-2 self-start bg-[#fff] px-6 text-[14px] font-medium text-accord-red transition-colors hover:bg-[#EFF1F0] sm:self-auto"
              >
                Request a quote <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section aria-label="Keep reading" className={`${WRAP} border-t border-[#E0E2E1] py-12 lg:py-20`}>
          <SplitHeading
            note="More guides from the trading desk."
            link={{ href: R.blog, label: "All articles" }}
            title={[[{ text: "Keep" }, { text: "reading", tone: "red" }]]}
          />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {related.map((p, i) => (
              <li key={p.slug} className={i === 2 ? "sm:hidden lg:block" : ""}>
                <Fade delay={i * 0.06} className="h-full">
                  <BlogCard post={p} />
                </Fade>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ContactBand />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Shell>
  );
}
