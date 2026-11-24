"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Car,
  Factory,
  HardHat,
  Hexagon,
  Link as LinkIcon,
  Paintbrush,
  Pill,
  Printer,
  Shirt,
  Sparkles,
  Sprout,
  type LucideIcon,
} from "lucide-react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeSoft, stagger } from "@/lib/motion";
import { industriesDetail, industriesIntro } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------------------
   04 — Industries. One compact grid at every breakpoint: 5 × 2 on desktop,
   2 columns on mobile. Replaces the old 10-panel pinned scroll sequence
   (client feedback, Nov 2026: too much scrolling). The full 18-industry list
   lives on /industries-served. Data from site.ts `industriesDetail`.
   -------------------------------------------------------------------------- */

/** Lucide icons keyed by the `icon` strings in site.ts `industriesDetail`. */
const iconMap: Record<string, LucideIcon> = {
  Paintbrush,
  Link: LinkIcon,
  Pill,
  Shirt,
  HardHat,
  Sparkles,
  Sprout,
  Hexagon,
  Car,
  Printer,
};

function IndustryTile({
  name,
  icon,
  families,
}: {
  name: string;
  icon: string;
  families: readonly string[];
}) {
  const Icon = iconMap[icon] ?? Factory;
  return (
    <motion.li
      variants={fadeSoft}
      className={cn(
        "glass-card flex h-full flex-col p-4 sm:p-5",
        "transition-colors duration-300 hover:border-white/25"
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accord-red/25 bg-accord-red/[0.14]">
        <Icon className="h-4 w-4 text-accord-red" strokeWidth={2} aria-hidden="true" />
      </span>
      <h3 className="mt-3 text-sm font-medium leading-snug text-white sm:text-base">
        {name}
      </h3>
      {/* Product families: desktop only, so mobile tiles stay short. */}
      <p className="mt-2 hidden text-xs leading-relaxed text-steel-400 lg:block">
        {families.join(" · ")}
      </p>
    </motion.li>
  );
}

export default function Industries() {
  return (
    <section id="industries" className="relative bg-ink">
      <Container className="section-quiet">
        <SectionHeading number="04" title="Industries Served" intro={industriesIntro} />

        <motion.ul
          variants={stagger(0.04)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-5"
        >
          {industriesDetail.map((industry) => (
            <IndustryTile
              key={industry.name}
              name={industry.name}
              icon={industry.icon}
              families={industry.families}
            />
          ))}
        </motion.ul>

        <Link
          href="/industries-served"
          className={cn(
            "group mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-accord-red",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accord-red focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          )}
        >
          See all industries we serve
          <ArrowRight
            size={16}
            className="text-accord-red transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </Container>
    </section>
  );
}
