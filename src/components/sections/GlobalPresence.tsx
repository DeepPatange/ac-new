"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeSoft, inView } from "@/lib/motion";
import { presenceCopy } from "@/lib/site";
import { HQ, REGIONS, countries, type Region } from "@/lib/countries";
import mapPoints from "@/lib/map-points.json";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------------------
   06 · Global Presence. An interactive dotted world map:
   - grey base world + every served country filled in brand red (pre-rendered
     SVG layers, see scripts/generate-served-map.mjs);
   - one marker per country (hover / focus / tap for its name and region);
   - region filters that highlight a region's markers and list.
   Country data lives in src/lib/countries.ts (provisional until the client
   supplies the final list). Run `npm run map` after editing it.
   -------------------------------------------------------------------------- */

type Filter = Region | "All";

const points = mapPoints.countries as Record<string, { x: number; y: number }>;
const hq = mapPoints.hq;

export default function GlobalPresence() {
  const [filter, setFilter] = useState<Filter>("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const byRegion = useMemo(
    () =>
      REGIONS.map((region) => ({
        region,
        list: countries
          .filter((c) => c.region === region)
          .sort((a, b) => a.name.localeCompare(b.name)),
      })),
    []
  );

  const hoveredCountry = countries.find((c) => c.iso3 === hovered) ?? null;
  const visibleGroups =
    filter === "All" ? byRegion : byRegion.filter((g) => g.region === filter);

  return (
    <section id="presence" className="section-quiet relative overflow-hidden">
      <Container className="relative">
        <SectionHeading
          number="06"
          eyebrow={presenceCopy.eyebrow}
          title={presenceCopy.heading}
          intro={presenceCopy.intro}
        />

        <motion.div
          variants={fadeSoft}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 sm:mt-12"
        >
          {/* Region filters */}
          <div
            role="group"
            aria-label="Filter countries by region"
            className="flex flex-wrap gap-2"
          >
            {(["All", ...REGIONS] as Filter[]).map((r) => {
              const count =
                r === "All"
                  ? countries.length
                  : countries.filter((c) => c.region === r).length;
              const active = filter === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFilter(r)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accord-red",
                    active
                      ? "border-accord-red bg-accord-red text-white"
                      : "border-white/15 text-steel-300 hover:border-accord-red/50 hover:text-white"
                  )}
                >
                  {r === "All" ? "All regions" : r}
                  <span className={cn("ml-1.5", active ? "opacity-75" : "text-steel-500")}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Map */}
          <div className="glass-card mt-5 p-3 sm:p-5">
            <div
              className="relative w-full select-none"
              style={{ aspectRatio: String(mapPoints.aspect) }}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src="/world-dots.svg"
                alt=""
                fill
                unoptimized
                draggable={false}
                className="pointer-events-none object-contain"
              />
              <Image
                src="/world-dots-served.svg"
                alt=""
                fill
                unoptimized
                draggable={false}
                className="pointer-events-none object-contain"
              />

              {/* Country markers */}
              {countries.map((c) => {
                const p = points[c.iso3];
                if (!p) return null;
                const inFilter = filter === "All" || c.region === filter;
                const isHover = hovered === c.iso3;
                return (
                  <button
                    key={c.iso3}
                    type="button"
                    aria-label={`${c.name}, ${c.region}`}
                    onMouseEnter={() => setHovered(c.iso3)}
                    onFocus={() => setHovered(c.iso3)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setHovered(c.iso3)}
                    className="group absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    <span
                      className={cn(
                        "block rounded-full border-2 border-[#fff] bg-accord-red shadow-sm transition-all duration-200",
                        isHover ? "h-3.5 w-3.5" : inFilter ? "h-2.5 w-2.5" : "h-1.5 w-1.5 opacity-30",
                        "group-focus-visible:ring-2 group-focus-visible:ring-accord-red"
                      )}
                    />
                  </button>
                );
              })}

              {/* HQ */}
              <span
                aria-hidden
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${hq.x}%`, top: `${hq.y}%` }}
              >
                <span className="absolute left-1/2 top-1/2 block h-7 w-7 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full border border-accord-red/60" />
                <span className="block h-3 w-3 rounded-full bg-accord-redDark ring-2 ring-[#fff]" />
              </span>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredCountry && points[hoveredCountry.iso3] && (
                  <motion.div
                    key={hoveredCountry.iso3}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-ink px-3 py-2 text-left shadow-lg"
                    style={{
                      left: `${Math.min(92, Math.max(8, points[hoveredCountry.iso3].x))}%`,
                      top: `calc(${points[hoveredCountry.iso3].y}% + 14px)`,
                    }}
                  >
                    <p className="text-sm font-semibold text-white">{hoveredCountry.name}</p>
                    <p className="text-xs text-steel-400">{hoveredCountry.region}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-3 text-xs text-steel-400">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-accord-redDark ring-2 ring-[#fff]" />
                Headquarters: {HQ.name}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-[#fff] bg-accord-red shadow-sm" />
                Countries served
              </span>
              <span className="ml-auto hidden sm:inline">
                Hover or tap a marker for details
              </span>
            </div>
          </div>

          {/* Country list by region (also the accessible text alternative) */}
          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
            {visibleGroups.map(({ region, list }) => (
              <div key={region}>
                <h3 className="border-b border-white/10 pb-2 text-sm font-semibold text-white">
                  {region}
                  <span className="ml-1.5 font-normal text-steel-500">{list.length}</span>
                </h3>
                <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[13px] leading-relaxed text-steel-300 lg:flex-col lg:gap-0">
                  {list.map((c) => (
                    <li key={c.iso3}>
                      <button
                        type="button"
                        onMouseEnter={() => setHovered(c.iso3)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered(c.iso3)}
                        onBlur={() => setHovered(null)}
                        className={cn(
                          "text-left transition-colors hover:text-accord-red focus-visible:text-accord-red focus-visible:outline-none",
                          hovered === c.iso3 && "text-accord-red"
                        )}
                      >
                        {c.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
