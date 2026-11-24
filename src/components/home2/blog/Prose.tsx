import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { slugify, type Block } from "@/lib/blog";
import { v2Href } from "./meta";

/* v2 article renderer: calm Inter body (17px, ~70ch), red numerals for
   section heads and ordered steps, hairline tables, B&W figures. */

/** Renders **bold** and [text](/href) inside a string; internal links go to v2. */
export function Inline({ text, invert = false }: { text: string; invert?: boolean }) {
  const parts = text.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const bold = part.match(/^\*\*(.+)\*\*$/);
        if (bold) {
          return (
            <strong key={i} className={`font-semibold ${invert ? "text-[#fff]" : "text-[#0A0A0A]"}`}>
              {bold[1]}
            </strong>
          );
        }
        const link = part.match(/^\[(.+?)\]\((.+?)\)$/);
        if (link) {
          const [, label, href] = link;
          const cls = invert
            ? "font-medium text-[#fff] underline decoration-[#fff]/40 underline-offset-4 transition-colors hover:decoration-[#fff]"
            : "font-medium text-accord-red underline decoration-accord-red/30 underline-offset-4 transition-colors hover:decoration-accord-red";
          return href.startsWith("/") ? (
            <Link key={i} href={v2Href(href)} className={cls}>
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
          ? "border-b border-[#0A0A0A] px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-[#6B6B6B]"
          : "border-b border-[#E6E6E6] px-4 py-3 align-top text-[15px] leading-relaxed text-[#2B2B2B]"
      }
    >
      {children}
    </Tag>
  );
}

const two = (n: number) => String(n).padStart(2, "0");

export default function Prose({ blocks }: { blocks: Block[] }) {
  let h2Index = 0;
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2": {
            h2Index += 1;
            return (
              <h2
                key={i}
                id={slugify(b.text)}
                className="scroll-mt-28 border-t border-[#E6E6E6] pt-10 font-sans text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.15] tracking-[-0.025em] text-[#0A0A0A] first:border-t-0 first:pt-0"
              >
                <span className="mb-3 block text-[13px] font-light tabular-nums tracking-normal text-accord-red">
                  {two(h2Index)}
                </span>
                {b.text}
              </h2>
            );
          }
          case "h3":
            return (
              <h3
                key={i}
                id={slugify(b.text)}
                className="scroll-mt-28 pt-2 font-sans text-[19px] font-semibold leading-snug tracking-[-0.01em] text-[#0A0A0A]"
              >
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-[17px] leading-[1.75] text-[#2B2B2B]">
                <Inline text={b.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-3 text-[17px] leading-[1.7] text-[#2B2B2B]">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-4">
                    <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-accord-red" />
                    <span>
                      <Inline text={it} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="border-t border-[#E6E6E6] text-[17px] leading-[1.7] text-[#2B2B2B]">
                {b.items.map((it, j) => (
                  <li key={j} className="grid grid-cols-[2.75rem_1fr] gap-2 border-b border-[#E6E6E6] py-4">
                    <span className="font-sans text-[22px] font-extralight leading-[1.2] tabular-nums text-accord-red">
                      {two(j + 1)}
                    </span>
                    <span>
                      <Inline text={it} />
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <figure key={i} className="my-2">
                <div className="overflow-x-auto">
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
                    <tbody>
                      {b.rows.map((r, j) => (
                        <tr key={j} className="transition-colors hover:bg-[#F6F6F6]">
                          {r.map((c, k) => (
                            <Cell key={k}>
                              {k === 0 ? (
                                <span className="font-medium text-[#0A0A0A]">
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
                  <figcaption className="mt-3 text-[13px] text-[#8A8A8A]">{b.caption}</figcaption>
                )}
              </figure>
            );
          case "callout":
            return (
              <aside key={i} className="border-l-[3px] border-accord-red bg-[#F3F3F3] p-6 sm:p-7">
                <p className="font-sans text-[16px] font-semibold text-[#0A0A0A]">{b.title}</p>
                <p className="mt-2 text-[16px] leading-relaxed text-[#2B2B2B]">
                  <Inline text={b.text} />
                </p>
              </aside>
            );
          case "figure":
            return (
              <figure key={i} className="my-2">
                <div className="relative aspect-[16/9] overflow-hidden bg-[#D9D9D9]">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    fill
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="object-cover grayscale contrast-[1.1]"
                  />
                  <span aria-hidden className="absolute bottom-0 left-0 h-[22%] w-[18%] bg-accord-red mix-blend-multiply" />
                </div>
                {b.caption && (
                  <figcaption className="mt-3 text-[13px] text-[#8A8A8A]">{b.caption}</figcaption>
                )}
              </figure>
            );
        }
      })}
    </div>
  );
}
