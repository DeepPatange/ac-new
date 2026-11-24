import Image from "next/image";
import Link from "next/link";
import { Fragment, ReactNode } from "react";
import { Info } from "lucide-react";
import { Block, slugify } from "@/lib/blog";

/** Renders **bold** and [text](/href) inside a string. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const bold = part.match(/^\*\*(.+)\*\*$/);
        if (bold) {
          return (
            <strong key={i} className="font-semibold text-white">
              {bold[1]}
            </strong>
          );
        }
        const link = part.match(/^\[(.+?)\]\((.+?)\)$/);
        if (link) {
          const [, label, href] = link;
          const cls =
            "font-medium text-accord-red underline decoration-accord-red/30 underline-offset-4 transition-colors hover:decoration-accord-red";
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={cls}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} className={cls} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

function Cell({ children, head }: { children: ReactNode; head?: boolean }) {
  const Tag = head ? "th" : "td";
  return (
    <Tag
      scope={head ? "col" : undefined}
      className={
        head
          ? "border-b border-white/15 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-steel-400"
          : "border-b border-white/10 px-4 py-3 align-top text-[15px] leading-relaxed text-steel-200"
      }
    >
      {children}
    </Tag>
  );
}

export default function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={slugify(b.text)}
                className="scroll-mt-28 pt-6 font-display text-2xl font-semibold leading-snug tracking-[-0.015em] text-white sm:text-[1.75rem]"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                id={slugify(b.text)}
                className="scroll-mt-28 pt-2 font-display text-xl font-semibold leading-snug text-white"
              >
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-[17px] leading-[1.75] text-steel-200">
                <Inline text={b.text} />
              </p>
            );
          case "ul":
          case "ol": {
            const List = b.type === "ul" ? "ul" : "ol";
            return (
              <List
                key={i}
                className={
                  b.type === "ul"
                    ? "space-y-3 pl-5 text-[17px] leading-[1.7] text-steel-200 marker:text-accord-red [list-style:disc]"
                    : "space-y-3 pl-6 text-[17px] leading-[1.7] text-steel-200 marker:font-semibold marker:text-accord-red [list-style:decimal]"
                }
              >
                {b.items.map((it, j) => (
                  <li key={j} className="pl-1.5">
                    <Inline text={it} />
                  </li>
                ))}
              </List>
            );
          }
          case "table":
            return (
              <figure key={i} className="my-2">
                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-ink-900">
                  <table className="w-full min-w-[520px] border-collapse">
                    <thead>
                      <tr>
                        {b.head.map((h, j) => (
                          <Cell key={j} head>
                            {h}
                          </Cell>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child_td]:border-b-0">
                      {b.rows.map((r, j) => (
                        <tr key={j}>
                          {r.map((c, k) => (
                            <Cell key={k}>
                              {k === 0 ? (
                                <span className="font-medium text-white">
                                  <Inline text={c} />
                                </span>
                              ) : (
                                <Inline text={c} />
                              )}
                            </Cell>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {b.caption && (
                  <figcaption className="mt-2.5 text-sm text-steel-400">{b.caption}</figcaption>
                )}
              </figure>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="rounded-2xl border border-accord-red/20 bg-accord-red/[0.05] p-5 sm:p-6"
              >
                <p className="flex items-center gap-2 font-display text-base font-semibold text-white">
                  <Info className="h-4 w-4 text-accord-red" strokeWidth={2} />
                  {b.title}
                </p>
                <p className="mt-2 text-[16px] leading-relaxed text-steel-200">
                  <Inline text={b.text} />
                </p>
              </aside>
            );
          case "figure":
            return (
              <figure key={i} className="my-2">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-ink-900">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    fill
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="object-cover"
                  />
                </div>
                {b.caption && (
                  <figcaption className="mt-2.5 text-sm text-steel-400">{b.caption}</figcaption>
                )}
              </figure>
            );
        }
      })}
    </div>
  );
}
