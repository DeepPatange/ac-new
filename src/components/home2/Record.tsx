"use client";

import { motion } from "framer-motion";
import { growth, growthCopy } from "@/lib/site";
import { easeOut } from "@/lib/motion";
import { Fade, MaskLine, Square } from "./primitives";
import { WRAP } from "./shared";

/* The record — 17 years of volume as thin black bars, the latest in red.
   Hover/focus a bar to read its year and tonnage. */

const fmt = (kt: number) => Math.round(kt * 1000).toLocaleString("en-US");

export default function Record() {
  const max = Math.max(...growth.map((g) => g.volumeKT));
  const first = growth[0];
  const last = growth[growth.length - 1];

  return (
    <section aria-labelledby="record-heading" className={`${WRAP} border-t border-[#E0E2E1] py-14 lg:py-20`}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Fade>
            <Square red />
            <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#888888]">
              {growthCopy.eyebrow}
            </p>
          </Fade>
          <h2
            id="record-heading"
            className="mt-4 font-sans text-[clamp(2.2rem,4vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.04em] text-[#3C3C3C]"
          >
            <MaskLine>
              <span className="font-extralight text-[#888888]">From {fmt(first.volumeKT)}</span>
            </MaskLine>
            <MaskLine delay={0.08}>
              to <span className="text-accord-red">{fmt(last.volumeKT)}</span>
            </MaskLine>
            <MaskLine delay={0.16}>metric tons.</MaskLine>
          </h2>
          <Fade delay={0.2}>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-[#5A5A5A]">{growthCopy.intro}</p>
          </Fade>
        </div>

        <div className="lg:col-span-8">
          <div className="mb-8 flex items-end justify-between gap-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#888888]">
              Annual volume handled
            </p>
            <div className="text-right">
              <p className="font-sans text-[clamp(1.6rem,2.6vw,2.25rem)] font-medium leading-none tracking-[-0.04em] tabular-nums text-accord-red">
                {fmt(last.volumeKT)}
              </p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[#6D6D6D]">
                MT · FY {last.year}
              </p>
            </div>
          </div>
          <div className="relative flex h-[240px] items-end gap-[3px] sm:h-[300px] sm:gap-1.5">
            {growth.map((g, i) => {
              const isLast = i === growth.length - 1;
              return (
                <div
                  key={g.year}
                  tabIndex={0}
                  aria-label={`FY ${g.year}: ${fmt(g.volumeKT)} metric tons`}
                  className="group relative flex h-full flex-1 items-end outline-none"
                >
                  <motion.div
                    className={`w-full origin-bottom ${
                      isLast ? "bg-accord-red" : "bg-[#C4C6C5] group-hover:bg-accord-red group-focus-visible:bg-accord-red"
                    } transition-colors`}
                    style={{ height: `${(g.volumeKT / max) * 100}%` }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, ease: easeOut, delay: i * 0.035 }}
                  />
                  <span
                    className={`pointer-events-none absolute z-10 mb-2 whitespace-nowrap ${i >= growth.length - 3 ? "right-0" : i <= 1 ? "left-0" : "left-1/2 -translate-x-1/2"} bg-[#3C3C3C] px-2 py-1 text-[11px] font-medium tabular-nums text-[#fff] transition-opacity ${
                      isLast ? "opacity-0" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                    }`}
                    style={{ bottom: `${(g.volumeKT / max) * 100}%` }}
                  >
                    {fmt(g.volumeKT)} MT · {g.year}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex justify-between border-t border-[#3C3C3C] pt-3 text-[11px] font-medium tabular-nums text-[#6D6D6D]">
            <span>FY {first.year}</span>
            <span>FY {growth[Math.floor(growth.length / 2)].year}</span>
            <span>FY {last.year}</span>
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-[#888888]">
            Metric tons handled per financial year, FY {first.year} to FY {last.year}.
          </p>
        </div>
      </div>
    </section>
  );
}
