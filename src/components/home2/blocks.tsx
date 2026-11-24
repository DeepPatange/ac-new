/* v2 shared layout blocks (server components that use the client motion
   primitives). Every v2 page opens with <PageHeader> and titles its sections
   with <SplitHeading>, so the type system stays identical everywhere. */

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Fade, Grow, MaskLine, Square } from "./primitives";
import { R, WRAP, photo } from "./shared";

/* -------------------------------------------------------------------------- */
/* Display-type lines                                                         */
/* -------------------------------------------------------------------------- */

/** One word-run in a display line. dark = black, light = thin grey, red = brand. */
export type Seg = { text: string; tone?: "dark" | "light" | "red" };
export type Lines = Seg[][];

const TONE: Record<NonNullable<Seg["tone"]>, string> = {
  dark: "",
  light: "font-extralight text-[#A3A3A3]",
  red: "text-accord-red",
};

/** Renders display lines; each line rises out of its own mask. */
export function TitleLines({ lines, delay = 0 }: { lines: Lines; delay?: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <MaskLine key={i} delay={delay + i * 0.08}>
          {line.map((s, j) => (
            <span key={j} className={TONE[s.tone ?? "dark"]}>
              {j > 0 ? " " : ""}
              {s.text}
            </span>
          ))}
        </MaskLine>
      ))}
    </>
  );
}

/** Shared class string for big uppercase display headings. */
export const DISPLAY =
  "font-sans font-medium uppercase leading-[0.9] tracking-[-0.045em] text-[#0A0A0A]";

/* -------------------------------------------------------------------------- */
/* Page header (inner pages)                                                  */
/* -------------------------------------------------------------------------- */

export function PageHeader({
  crumb,
  lead,
  note,
  title,
  intro,
  image,
  figure,
  children,
}: {
  /** Breadcrumb label for this page. */
  crumb: string;
  /** Small dark text block beside the square marker (e.g. two short lines). */
  lead?: ReactNode;
  /** Small grey text beside the lead. */
  note?: ReactNode;
  title: Lines;
  intro?: ReactNode;
  /** B&W photo with a red field over its lower part (omit for a type-only header). */
  image?: { id: string; alt: string; position?: string };
  /** Figure printed in white on the red field. */
  figure?: { value: string; label: string };
  /** Actions under the intro (buttons, links). */
  children?: ReactNode;
}) {
  const withImage = Boolean(image);
  return (
    <section className={`${WRAP} pb-12 pt-4 lg:pb-16 lg:pt-6`}>
      <nav aria-label="Breadcrumb" className="text-[12px] text-[#8A8A8A]">
        <Link href={R.home} className="transition-colors hover:text-[#0A0A0A]">
          Home
        </Link>
        <span aria-hidden className="mx-2 text-[#C8C8C8]">
          /
        </span>
        <span aria-current="page" className="text-[#0A0A0A]">
          {crumb}
        </span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div
          className={
            withImage
              ? "flex flex-col lg:col-span-7 lg:min-h-[520px] lg:justify-between"
              : "lg:col-span-12"
          }
        >
          {(lead || note) && (
            <div className="grid max-w-xl grid-cols-2 gap-6">
              <Fade>
                <Square />
                {lead && (
                  <div className="mt-4 text-[15px] font-medium leading-snug text-[#0A0A0A]">{lead}</div>
                )}
              </Fade>
              {note && (
                <Fade delay={0.1}>
                  <div className="pt-6 text-[12px] leading-relaxed text-[#8A8A8A]">{note}</div>
                </Fade>
              )}
            </div>
          )}

          <div className={lead || note ? "mt-10 lg:mt-10" : ""}>
            <h1
              className={`${DISPLAY} ${
                withImage
                  ? "text-[clamp(2.4rem,6vw,5.75rem)]"
                  : "mt-4 text-[clamp(2.6rem,8.2vw,8.25rem)] lg:mt-6"
              }`}
            >
              <TitleLines lines={title} />
            </h1>

            {(intro || children) && (
              <Fade
                delay={0.3}
                className={`mt-8 flex flex-col gap-6 ${
                  withImage
                    ? "sm:flex-row sm:items-end sm:justify-between"
                    : "lg:grid lg:grid-cols-12 lg:items-end lg:gap-8"
                }`}
              >
                {intro && (
                  <div
                    className={`max-w-xl text-[15px] leading-relaxed text-[#5E5E5E] ${
                      withImage ? "" : "lg:col-span-6"
                    }`}
                  >
                    {intro}
                  </div>
                )}
                {children && (
                  <div
                    className={`flex shrink-0 flex-wrap items-center gap-3 ${
                      withImage ? "" : "lg:col-span-6 lg:justify-end"
                    }`}
                  >
                    {children}
                  </div>
                )}
              </Fade>
            )}
          </div>
        </div>

        {image && (
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#D9D9D9] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[520px]">
              <Image
                src={photo(image.id)}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className={`object-cover grayscale contrast-[1.1] ${image.position ?? ""}`}
              />
              <Grow
                axis="y"
                origin="bottom"
                delay={0.2}
                duration={1.2}
                className="absolute inset-x-0 bottom-0 h-[22%] max-h-[150px]"
                fill="bg-accord-red mix-blend-multiply"
              />
              {figure && (
                <Fade delay={0.9} className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6">
                  <div className="text-right text-[#fff]">
                    <p className="font-sans text-[clamp(1.7rem,2.8vw,2.6rem)] font-medium leading-none tracking-[-0.04em] tabular-nums [text-shadow:0_1px_12px_rgba(0,0,0,0.25)]">
                      {figure.value}
                    </p>
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#fff]/90">
                      {figure.label}
                    </p>
                  </div>
                </Fade>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section heading: small note + link on the left, big title on the right     */
/* -------------------------------------------------------------------------- */

export function SplitHeading({
  title,
  note,
  link,
  red = false,
  as: Tag = "h2",
  align = "right",
}: {
  title: Lines;
  note?: ReactNode;
  link?: { href: string; label: string };
  /** Red square marker instead of black. */
  red?: boolean;
  as?: "h2" | "h3";
  align?: "right" | "left";
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <Fade className={`lg:col-span-4 ${align === "left" ? "lg:order-2 lg:col-start-9" : ""}`}>
        <Square red={red} />
        {note && (
          <div className="mt-5 max-w-[320px] text-[14px] font-medium leading-snug text-[#0A0A0A]">{note}</div>
        )}
        {link && (
          <Link
            href={link.href}
            className="mt-3 inline-block text-[12px] text-[#8A8A8A] underline decoration-[#C8C8C8] underline-offset-4 transition-colors hover:text-[#0A0A0A]"
          >
            {link.label}
          </Link>
        )}
      </Fade>
      <Tag
        className={`${DISPLAY} text-[clamp(2.4rem,6.4vw,6rem)] lg:col-span-8 ${
          align === "left" ? "lg:order-1" : "lg:text-right"
        }`}
      >
        <TitleLines lines={title} />
      </Tag>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Small pieces                                                               */
/* -------------------------------------------------------------------------- */

/** Black solid button / outlined button, as links. */
export function ButtonLink({
  href,
  children,
  variant = "solid",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light";
  external?: boolean;
}) {
  const cls =
    variant === "solid"
      ? "bg-[#0A0A0A] text-[#fff] hover:bg-accord-red"
      : variant === "outline"
        ? "border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#fff]"
        : "border border-[#fff] text-[#fff] hover:bg-[#fff] hover:text-accord-red";
  const className = `inline-flex h-12 items-center px-6 text-[14px] font-medium transition-colors ${cls}`;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** Small uppercase label used above figures and in ledgers. */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A8A8A] ${className}`}>
      {children}
    </p>
  );
}
