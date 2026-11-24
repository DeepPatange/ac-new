"use client";

/* ==========================================================================
   ArtScroll: pinned "pencil first, life second" chapters.
   Each chapter is one Canva scene in three aligned layers derived from the
   same render (tools/artwork/derive.py):
     <id>-pencil.jpg  the whole scene as graphite
     <id>.jpg + <id>-mask.png  only the key object in colour
     <id>.jpg  everything in colour
   plus a paper cover that slides away. Scroll scrubs every beat:

     0.00  panel in · paper slides off · camera settles (1.07 → 1)
     0.10  text rises in
     0.34  key object comes alive
     0.56  whole scene in colour
     0.88  text leaves (not on the last chapter)
     0.96  panel fades (not on the last chapter)

   Only transform and opacity animate. Reduced motion shows full colour.
   ========================================================================== */

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { lenisStore } from "@/lib/lenis-store";
import focus from "./focus.json";

export type Chapter = {
  /** Scene id: files at /v2/scenes/<id>.jpg, -pencil.jpg, -mask.png */
  scene: string;
  kicker: string;
  title: string;
  body: string;
  chips?: readonly string[];
  cta?: { href: string; label: string };
  alt: string;
};

const HEADER = 72;
const FOCUS = focus as Record<string, { fx: number; fy: number }>;

function Chapter({
  c,
  i,
  n,
  progress,
  reduced,
}: {
  c: Chapter;
  i: number;
  n: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const a = i / n;
  const b = (i + 1) / n;
  const at = (t: number) => a + (b - a) * t;
  const last = i === n - 1;
  const first = i === 0;

  // panel visibility (cross-fade between chapters)
  const panel = useTransform(
    progress,
    first
      ? last
        ? [0, 1]
        : [at(0), at(0.96), at(1)]
      : last
        ? [at(-0.04), at(0.02), 1]
        : [at(-0.04), at(0.02), at(0.96), at(1)],
    first ? (last ? [1, 1] : [1, 1, 0]) : last ? [0, 1, 1] : [0, 1, 1, 0]
  );
  // the sheet starts half-slid so the pencil drawing is visible at once
  const cover = useTransform(progress, [at(0), at(0.26)], ["48%", "105%"]);
  const cam = useTransform(progress, [at(0), at(0.9)], [1.07, 1]);
  const alive = useTransform(progress, [at(0.3), at(0.42)], [0, 1]);
  const full = useTransform(progress, [at(0.52), at(0.66)], [0, 1]);
  const textIn = useTransform(progress, last ? [at(0.06), at(0.2)] : [at(0.06), at(0.2), at(0.86), at(0.95)], last ? [0, 1] : [0, 1, 1, 0]);
  const textY = useTransform(progress, last ? [at(0.06), at(0.2)] : [at(0.06), at(0.2), at(0.86), at(0.95)], last ? [28, 0] : [28, 0, 0, -28]);

  const f = FOCUS[c.scene] ?? { fx: 60, fy: 55 };
  const pos = `${f.fx}% ${f.fy}%`;
  const src = `/v2/scenes/${c.scene}`;


  const maskStyle = {
    WebkitMaskImage: `url(${src}-mask.png)`,
    maskImage: `url(${src}-mask.png)`,
    WebkitMaskSize: "cover",
    maskSize: "cover",
    WebkitMaskPosition: pos,
    maskPosition: pos,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  } as const;
  const imgCls = "absolute inset-0 h-full w-full select-none object-cover";
  const eager = i < 2 ? "eager" : "lazy";

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity: reduced ? (i === 0 ? 1 : panel) : panel, willChange: "opacity" }}
      aria-hidden={undefined}
    >
      {/* Artwork: right 70% on desktop, lower 56% on phones */}
      <div className="absolute inset-x-0 bottom-0 top-[44%] overflow-hidden bg-[#fff] lg:inset-y-0 lg:left-[30vw] lg:top-0">
        <motion.div className="absolute inset-0" style={{ scale: reduced ? 1 : cam, willChange: "transform" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${src}-pencil.jpg`} alt={c.alt} className={imgCls} style={{ objectPosition: pos }} loading={eager} decoding="async" draggable={false} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img src={`${src}.jpg`} alt="" aria-hidden className={imgCls} style={{ objectPosition: pos, opacity: reduced ? 1 : alive, ...maskStyle }} loading={eager} decoding="async" draggable={false} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img src={`${src}.jpg`} alt="" aria-hidden className={imgCls} style={{ objectPosition: pos, opacity: reduced ? 1 : full }} loading={eager} decoding="async" draggable={false} />
        </motion.div>
        {/* paper sheet sliding away (the drawing "draws in") */}
        {!reduced && (
          <motion.div aria-hidden className="absolute inset-y-0 -left-[10%] w-[120%] bg-[#fff]" style={{ x: cover }} />
        )}
        {/* soft fades into the paper under the text */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-[#F7F7F5] to-transparent lg:inset-y-0 lg:left-0 lg:right-auto lg:h-full lg:w-[26%] lg:bg-gradient-to-r" />
      </div>

      {/* Text */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[44%] lg:inset-y-0 lg:h-auto">
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center px-5 sm:px-8 lg:px-12">
          <motion.div
            className="pointer-events-auto max-w-[460px] lg:max-w-[min(30vw,440px)]"
            style={{ opacity: reduced ? 1 : textIn, y: reduced ? 0 : textY }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accord-red">
              {String(i + 1).padStart(2, "0")} <span className="mx-1.5 text-[#C8C8C8]">|</span> {c.kicker}
            </p>
            <h3 className="mt-3 font-sans text-[clamp(1.6rem,2.6vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#0A0A0A]">
              {c.title}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-[#4A4A4A]">{c.body}</p>
            {c.chips && c.chips.length > 0 && (
              <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium text-[#0A0A0A]">
                {c.chips.map((chip, k) => (
                  <span key={chip} className="inline-flex items-center gap-2">
                    {k > 0 && <span aria-hidden className="h-1 w-1 bg-accord-red" />}
                    {chip}
                  </span>
                ))}
              </p>
            )}
            {c.cta && (
              <Link
                href={c.cta.href}
                className="mt-6 inline-flex h-11 items-center bg-[#0A0A0A] px-5 text-[14px] font-medium text-[#fff] transition-colors hover:bg-accord-red"
              >
                {c.cta.label}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ArtScroll({
  chapters,
  heading,
  vhPerChapter = 130,
  ariaLabel,
  id,
}: {
  chapters: Chapter[];
  heading?: ReactNode;
  vhPerChapter?: number;
  ariaLabel: string;
  /** Lets other components jump here: dispatch `artscroll:goto` {id, index}. */
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const n = chapters.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(n - 1, Math.max(0, Math.floor(v * n - 0.02)));
    if (idx !== active) setActive(idx);
  });

  /* Manual navigation never waits for the animation: the page jumps
     straight to the chapter with its scene already in full colour. */
  const jump = useCallback(
    (i: number) => {
      const el = ref.current;
      if (!el) return;
      const k = Math.max(0, Math.min(n - 1, i));
      const top = el.getBoundingClientRect().top + window.scrollY;
      const scrollable = el.offsetHeight - window.innerHeight;
      const y = Math.round(top + scrollable * ((k + 0.7) / n));
      const lenis = lenisStore.current;
      if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
      else window.scrollTo({ top: y, behavior: "auto" });
    },
    [n]
  );

  useEffect(() => {
    if (!id) return;
    const onGoto = (e: Event) => {
      const d = (e as CustomEvent<{ id: string; index: number }>).detail;
      if (d?.id === id) jump(d.index);
    };
    window.addEventListener("artscroll:goto", onGoto);
    return () => window.removeEventListener("artscroll:goto", onGoto);
  }, [id, jump]);

  return (
    <>
    {heading && (
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-6 pt-14 sm:px-8 lg:px-12 lg:pb-8 lg:pt-20">{heading}</div>
    )}
    <section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      className="relative"
      style={{ height: `calc(${n * vhPerChapter}vh + 100svh)` }}
    >
      <div
        className="sticky overflow-hidden bg-[#F7F7F5]"
        style={{ top: HEADER, height: `calc(100svh - ${HEADER}px)` }}
      >
        {chapters.map((c, i) => (
          <Chapter key={c.scene + i} c={c} i={i} n={n} progress={scrollYProgress} reduced={reduced} />
        ))}

        {/* Glass chapter control over the artwork: prev / bars / next */}
        <nav
          aria-label={`${ariaLabel} chapters`}
          className="absolute bottom-4 left-5 z-10 flex items-center gap-1 border border-[#E6E6E6] bg-[#fff] p-1.5 shadow-[0_6px_20px_-12px_rgba(0,0,0,0.35)] sm:left-8 lg:bottom-8 lg:left-[calc(30vw+28px)]"
        >
          <button
            type="button"
            onClick={() => jump(active - 1)}
            disabled={active === 0}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center text-[#0A0A0A] transition-colors hover:bg-[#F3F3F3] disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <div className="hidden items-center gap-1.5 px-1.5 sm:flex">
            {chapters.map((c, i) => (
              <button
                key={c.scene + i}
                type="button"
                onClick={() => jump(i)}
                aria-label={`${String(i + 1).padStart(2, "0")} ${c.title}`}
                aria-current={i === active ? "step" : undefined}
                title={c.title}
                className="group flex h-9 items-center"
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-accord-red" : "w-3.5 bg-[#0A0A0A]/25 group-hover:bg-[#0A0A0A]"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="min-w-[46px] text-center text-[12px] font-medium tabular-nums text-[#0A0A0A]">
            {String(active + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => jump(active + 1)}
            disabled={active === n - 1}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center bg-[#0A0A0A] text-[#fff] transition-colors hover:bg-accord-red disabled:opacity-30"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </nav>
      </div>
    </section>
    </>
  );
}
