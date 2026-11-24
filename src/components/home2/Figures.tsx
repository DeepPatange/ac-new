"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { statsNote, yearsInBusiness } from "@/lib/site";
import { easeOut } from "@/lib/motion";
import { MaskLine } from "./primitives";
import { WRAP, photo } from "./shared";

/* Figures — red field fading to paper, with each headline figure pinned to a
   B&W refinery skyline by a thin red leader line (a "survey marker" chart).
   Desktop: absolutely positioned pins at staggered heights.
   Mobile: a two-column grid with red rule markers, skyline beneath. */

type Pin = {
  value: string;
  label: [string, string];
  /** Desktop placement inside the pin canvas. */
  left: string;
  top: number;
};

const PINS: Pin[] = [
  { value: "198,000+", label: ["Metric tons", "FY 2025-26"], left: "1%", top: 30 },
  { value: "$153M", label: ["Revenue", "FY 2025-26"], left: "18%", top: 190 },
  { value: "60+", label: ["Countries", "served"], left: "42%", top: 90 },
  { value: "500+", label: ["Active", "clients"], left: "53%", top: 250 },
  { value: "3,000+", label: ["Customers", "since 2009"], left: "70%", top: 40 },
  { value: String(yearsInBusiness()), label: ["Years of", "trade"], left: "87%", top: 170 },
];

const REFINERY = photo("1516937941344-00b4e0337589", 2400);

const skylineMask = {
  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 55%)",
  maskImage: "linear-gradient(to bottom, transparent 0%, #000 55%)",
} as const;

export default function Figures() {
  return (
    <section
      aria-labelledby="figures-heading"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #E11B22 0%, #E11B22 20%, #EA6A6E 40%, #F4D3D4 58%, #F3F3F3 74%, #F3F3F3 100%)",
      }}
    >
      <div className={`${WRAP} pt-16 lg:pt-20`}>
        <h2
          id="figures-heading"
          className="font-sans text-[clamp(1.9rem,4.2vw,3.75rem)] font-light leading-[1.04] tracking-[-0.035em] text-[#fff]"
        >
          <MaskLine>Established in 2009.</MaskLine>
          <MaskLine delay={0.08}>Trading across 60+ countries.</MaskLine>
          <MaskLine delay={0.16}>
            <span className="font-medium">Accountable from indent to delivery.</span>
          </MaskLine>
        </h2>

        <div className="mt-8 flex items-stretch gap-6 text-[#fff]">
          <div>
            <p className="text-[clamp(1.1rem,1.6vw,1.4rem)] font-semibold leading-tight">FY 2025-26</p>
            <p className="mt-1 text-[13px] text-[#fff]/85">Consolidated sales figures</p>
          </div>
          <span aria-hidden className="w-px bg-[#fff]/60" />
          <div>
            <p className="text-[clamp(1.1rem,1.6vw,1.4rem)] font-light leading-tight">Mumbai, India</p>
            <p className="mt-1 text-[13px] text-[#fff]/85">Headquarters since 2009</p>
          </div>
        </div>

        {/* MOBILE / TABLET: grid of figures */}
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:hidden">
          {PINS.map((p) => (
            <div key={p.value} className="border-l-2 border-accord-red pl-3">
              <dt className="sr-only">{p.label.join(" ")}</dt>
              <dd>
                <span className="block font-sans text-[clamp(2rem,7vw,2.75rem)] font-medium leading-none tracking-[-0.04em] tabular-nums text-[#0A0A0A]">
                  {p.value}
                </span>
                <span className="mt-2 block text-[12px] font-medium leading-tight text-[#2B2B2B]">
                  {p.label[0]} {p.label[1]}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* DESKTOP: pinned figures over the skyline */}
      <div className="relative mt-6 hidden h-[600px] lg:block">
        <div className="absolute inset-x-0 bottom-0 h-[300px]" style={skylineMask}>
          <Image
            src={REFINERY}
            alt="Refinery skyline with distillation columns and flare stacks"
            fill
            sizes="100vw"
            className="object-cover object-[center_68%] grayscale contrast-[1.15]"
          />
        </div>

        <div className={`${WRAP} h-full`}>
        <dl className="relative h-full">
          {PINS.map((p, i) => (
            <div
              key={p.value}
              className="absolute bottom-0 flex flex-col"
              style={{ left: p.left, top: p.top }}
            >
              <dt className="sr-only">{p.label.join(" ")}</dt>
              <motion.dd
                className="flex items-start gap-2"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: easeOut, delay: 0.1 + i * 0.08 }}
              >
                <span className="font-sans text-[clamp(2.5rem,4.2vw,4rem)] font-medium leading-[0.85] tracking-[-0.045em] tabular-nums text-[#0A0A0A]">
                  {p.value}
                </span>
                <span aria-hidden className="pt-1 text-[12px] font-medium leading-[1.2] text-[#1A1A1A]">
                  {p.label[0]}
                  <br />
                  {p.label[1]}
                </span>
              </motion.dd>
              {/* leader line + dot */}
              <div aria-hidden className="relative ml-[0.35rem] mt-3 flex-1">
                <span className="absolute -left-[3.5px] top-0 h-2 w-2 rounded-full bg-accord-red" />
                <motion.span
                  className="absolute left-0 top-1 block h-[calc(100%-4px)] w-px origin-top bg-accord-red"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.3, ease: easeOut, delay: 0.3 + i * 0.08 }}
                />
              </div>
            </div>
          ))}
        </dl>
        </div>
      </div>

      {/* MOBILE skyline */}
      <div className="relative mt-10 h-[200px] sm:h-[260px] lg:hidden" style={skylineMask}>
        <Image
          src={REFINERY}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_68%] grayscale contrast-[1.15]"
        />
      </div>

      <div className="bg-[#F3F3F3]">
        <p className={`${WRAP} py-5 text-[11px] leading-relaxed text-[#6B6B6B]`}>{statsNote}</p>
      </div>
    </section>
  );
}
