"use client";

/* Global presence: interactive dotted world map.
   - Region rows filter the map and draw trade lanes from the Mumbai HQ.
   - Hover / tap a country (marker or list) to label it and draw its lane.
   Countries, regions and marker positions come from src/lib/countries.ts and
   src/lib/map-points.json (regenerate with `npm run map` after editing). */

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { presenceCopy } from "@/lib/site";
import { HQ, REGIONS, countries, type Region } from "@/lib/countries";
import mapPoints from "@/lib/map-points.json";
import { Fade, MaskLine, Square } from "./primitives";
import { WRAP } from "./shared";

type Filter = "All" | Region;
const PTS = mapPoints.countries as Record<string, { x: number; y: number }>;
const ASPECT = mapPoints.aspect ?? 1.98;
const VW = 1000;
const VH = VW / ASPECT;

/** Curved lane (quadratic) from HQ to a country, in viewBox units. */
function lane(x: number, y: number) {
  const x1 = (mapPoints.hq.x / 100) * VW;
  const y1 = (mapPoints.hq.y / 100) * VH;
  const x2 = (x / 100) * VW;
  const y2 = (y / 100) * VH;
  const d = Math.hypot(x2 - x1, y2 - y1);
  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - d * 0.28;
  return `M${x1.toFixed(1)},${y1.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
}

export default function Presence() {
  const [filter, setFilter] = useState<Filter>("All");
  const [hover, setHover] = useState<string | null>(null);

  const byRegion = useMemo(
    () =>
      REGIONS.map((r) => ({ region: r as Filter, list: countries.filter((c) => c.region === r) })).sort(
        (a, b) => b.list.length - a.list.length
      ),
    []
  );
  const shown = filter === "All" ? countries : countries.filter((c) => c.region === filter);
  const hovered = hover ? countries.find((c) => c.iso3 === hover) : undefined;
  const lanes = filter === "All" ? (hovered ? [hovered] : []) : shown;

  return (
    <section id="presence" className="bg-[#EFF1F0] py-12 lg:py-20">
      <div className={`${WRAP} grid gap-10 lg:grid-cols-12 lg:gap-10`}>
        {/* Left: heading + region filter ledger */}
        <div className="lg:col-span-4">
          <Fade>
            <Square />
            <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#888888]">{presenceCopy.eyebrow}</p>
          </Fade>
          <h2 className="mt-4 font-sans text-[clamp(2.2rem,4vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.04em] text-[#3C3C3C]">
            <MaskLine>60+ countries.</MaskLine>
            <MaskLine delay={0.08}>
              <span className="font-extralight text-[#888888]">One trading desk.</span>
            </MaskLine>
          </h2>
          <Fade delay={0.15}>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-[#5A5A5A]">{presenceCopy.intro}</p>
          </Fade>

          <div role="group" aria-label="Filter by region" className="mt-7 border-t border-[#D8DAD9]">
            {[{ region: "All" as Filter, list: countries }, ...byRegion].map((r) => {
              const on = filter === r.region;
              return (
                <button
                  key={r.region}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(on && r.region !== "All" ? "All" : r.region)}
                  className={`flex w-full items-baseline justify-between border-b border-[#D8DAD9] px-3 py-2.5 text-left transition-colors ${
                    on ? "bg-accord-red text-[#fff]" : "text-[#3C3C3C] hover:bg-[#fff]"
                  }`}
                >
                  <span className="text-[14px] font-medium">{r.region === "All" ? "All regions" : r.region}</span>
                  <span className={`font-sans text-[24px] font-light leading-none tracking-[-0.03em] tabular-nums ${on ? "text-[#fff]" : "text-accord-red"}`}>
                    {String(r.list.length).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] text-[#888888]">Select a region or a country. Headquarters: {HQ.name}.</p>
        </div>

        {/* Right: map + country list */}
        <div className="lg:col-span-8">
          <div className="relative w-full select-none" style={{ aspectRatio: String(ASPECT) }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/world-dots.svg" alt="" aria-hidden className="absolute inset-0 h-full w-full" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/world-dots-served.svg"
              alt="World map highlighting the countries Accord serves"
              className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${filter === "All" ? "opacity-100" : "opacity-40"}`}
            />

            {/* Trade lanes from Mumbai */}
            <svg viewBox={`0 0 ${VW} ${VH}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
              <AnimatePresence>
                {lanes.map((c) => {
                  const p = PTS[c.iso3];
                  if (!p) return null;
                  return (
                    <motion.path
                      key={`${filter}-${c.iso3}`}
                      d={lane(p.x, p.y)}
                      fill="none"
                      stroke="#E11B22"
                      strokeWidth={hover === c.iso3 ? 1.8 : 1.1}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: hover && hover !== c.iso3 ? 0.35 : 0.85 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  );
                })}
              </AnimatePresence>
            </svg>

            {/* Country markers */}
            {countries.map((c) => {
              const p = PTS[c.iso3];
              if (!p) return null;
              const inFilter = filter === "All" || c.region === filter;
              const isHover = hover === c.iso3;
              return (
                <button
                  key={c.iso3}
                  type="button"
                  aria-label={`${c.name}, ${c.region}`}
                  onMouseEnter={() => setHover(c.iso3)}
                  onMouseLeave={() => setHover((h) => (h === c.iso3 ? null : h))}
                  onFocus={() => setHover(c.iso3)}
                  onBlur={() => setHover((h) => (h === c.iso3 ? null : h))}
                  onClick={() => setHover((h) => (h === c.iso3 ? null : c.iso3))}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 p-1.5 outline-none"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, zIndex: isHover ? 20 : 10 }}
                >
                  <span
                    className={`block rounded-full ring-2 ring-[#fff] transition-all duration-200 ${
                      isHover
                        ? "h-3 w-3 bg-[#3C3C3C]"
                        : inFilter
                          ? "h-2 w-2 bg-accord-red group-hover:h-3 group-hover:w-3"
                          : "h-1.5 w-1.5 bg-[#C4C6C5]"
                    }`}
                  />
                </button>
              );
            })}

            {/* HQ */}
            <span className="pointer-events-none absolute z-30" style={{ left: `${mapPoints.hq.x}%`, top: `${mapPoints.hq.y}%` }}>
              <span className="absolute -left-[6px] -top-[6px] h-3 w-3 rounded-full bg-[#3C3C3C] ring-2 ring-[#fff]" />
              <span className="absolute -left-[13px] -top-[13px] h-[26px] w-[26px] animate-ping rounded-full border border-[#3C3C3C]/50" />
            </span>

            {/* Tooltip */}
            <AnimatePresence>
              {hovered && PTS[hovered.iso3] && (
                <motion.div
                  key={hovered.iso3}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute z-40 -translate-x-1/2 whitespace-nowrap bg-[#3C3C3C] px-2.5 py-1.5 text-[11px] font-medium text-[#fff]"
                  style={{ left: `${PTS[hovered.iso3].x}%`, top: `calc(${PTS[hovered.iso3].y}% - 36px)` }}
                >
                  {hovered.name}
                  <span className="ml-1.5 text-[#fff]/60">{hovered.region}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Country list (linked to the markers) */}
          <div className="mt-6 border-t border-[#D8DAD9] pt-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#888888]">
              {filter === "All" ? "All countries" : filter} · {shown.length}
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {shown.map((c) => (
                <li key={c.iso3}>
                  <button
                    type="button"
                    onMouseEnter={() => setHover(c.iso3)}
                    onMouseLeave={() => setHover((h) => (h === c.iso3 ? null : h))}
                    onClick={() => setHover((h) => (h === c.iso3 ? null : c.iso3))}
                    className={`border px-2.5 py-1 text-[12px] transition-colors ${
                      hover === c.iso3
                        ? "border-accord-red bg-accord-red text-[#fff]"
                        : "border-[#D8DAD9] bg-[#fff] text-[#3C3C3C] hover:border-[#3C3C3C]"
                    }`}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
