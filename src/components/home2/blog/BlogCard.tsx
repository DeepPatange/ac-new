import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/blog";
import { PostMeta, postHref } from "./meta";

/* v2 article cards.
   - featured: B&W cover with a red field multiplied over its lower half, text
     panel beside it (stacked on mobile).
   - default: grey card that flips to black on hover; the red field rises
     over the B&W cover. Whole card is the link (stretched anchor). */

export function FeaturedCard({ post }: { post: Post }) {
  return (
    <article className="group relative grid overflow-hidden bg-[#EFF1F0] transition-colors duration-300 hover:bg-accord-red lg:grid-cols-12">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#D8DAD9] lg:col-span-7 lg:aspect-auto lg:min-h-[460px]">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover grayscale contrast-[1.1] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[18%] bg-accord-red mix-blend-multiply transition-[height] duration-700 ease-out group-hover:h-[30%]"
        />
        <span className="absolute left-0 top-0 bg-accord-red px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#fff]">
          Latest
        </span>
      </div>
      <div className="flex flex-col p-6 sm:p-10 lg:col-span-5 lg:justify-center">
        <PostMeta post={post} className="text-[#6D6D6D] transition-colors group-hover:text-[#fff]/60" />
        <h2 className="mt-4 font-sans text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[#3C3C3C] transition-colors group-hover:text-[#fff]">
          <Link href={postHref(post.slug)} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[#5A5A5A] transition-colors group-hover:text-[#fff]/75">
          {post.description}
        </p>
        <span className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-accord-red group-hover:text-[#fff]">
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

export default function BlogCard({ post, index }: { post: Post; index?: number }) {
  return (
    <article className="group relative flex h-full flex-col bg-[#EFF1F0] transition-colors duration-300 hover:bg-accord-red">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#D8DAD9]">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover grayscale contrast-[1.1] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-0 bg-accord-red mix-blend-multiply transition-[height] duration-700 ease-out group-hover:h-[20%]"
        />
        {typeof index === "number" && (
          <span className="absolute left-0 top-0 bg-[#fff] px-2.5 py-1 text-[12px] font-light tabular-nums text-accord-red">
            {String(index).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <PostMeta post={post} className="text-[#6D6D6D] transition-colors group-hover:text-[#fff]/60" />
        <h3 className="mt-3 font-sans text-[19px] font-medium leading-snug tracking-[-0.015em] text-[#3C3C3C] transition-colors group-hover:text-[#fff]">
          <Link href={postHref(post.slug)} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mb-6 mt-3 line-clamp-3 text-[14px] leading-relaxed text-[#5A5A5A] transition-colors group-hover:text-[#fff]/70">
          {post.description}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 border-t border-[#D8DAD9] pt-4 text-[12px] font-medium text-accord-red transition-colors group-hover:border-[#fff]/20 group-hover:text-[#fff]">
          Read article
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
      </div>
    </article>
  );
}
