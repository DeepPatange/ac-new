import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Post, readingMinutes } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function PostMeta({ post, className }: { post: Post; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-steel-400", className)}>
      <span className="font-semibold uppercase tracking-[0.14em] text-accord-red">{post.category}</span>
      <span aria-hidden>·</span>
      <time dateTime={post.published}>{formatDate(post.published)}</time>
      <span aria-hidden>·</span>
      <span>{readingMinutes(post)} min read</span>
    </p>
  );
}

export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink transition-[border-color,box-shadow] duration-300 hover:border-white/20 hover:shadow-[0_24px_60px_-36px_rgba(0,0,0,0.35)]",
        featured && "lg:grid lg:grid-cols-[1.25fr_1fr]"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-ink-900",
          featured ? "aspect-[16/9] lg:aspect-auto lg:min-h-[380px]" : "aspect-[16/10]"
        )}
      >
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          priority={featured}
          sizes={featured ? "(min-width: 1024px) 700px, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className={cn("flex flex-1 flex-col p-6", featured && "lg:justify-center lg:p-10")}>
        <PostMeta post={post} />
        <h3
          className={cn(
            "mt-3 font-display font-semibold leading-snug tracking-[-0.01em] text-white text-balance",
            featured ? "text-2xl sm:text-[1.875rem]" : "text-lg sm:text-xl"
          )}
        >
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className={cn("mt-3 leading-relaxed text-steel-300", featured ? "text-base sm:text-lg" : "line-clamp-3 text-[15px]")}>
          {post.description}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-white transition-colors group-hover:text-accord-red">
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
