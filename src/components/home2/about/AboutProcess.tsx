"use client";

/* About v2: the four-stage business process (same FLOW data as the live
   About page), drawn as a progress rail: a grey hairline per stage that
   fills red in sequence as it scrolls into view. */

import { FLOW } from "@/components/sections/About";
import { processCopy } from "@/lib/site";
import { Fade, Grow, MaskLine, Square } from "../primitives";
import { WRAP } from "../shared";

export default function AboutProcess() {
  return (
    <section aria-labelledby="about-process" className={`${WRAP} py-12 lg:py-20`}>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Fade className="lg:col-span-4">
          <Square red />
          <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.16em] text-[#888888]">
            {processCopy.eyebrow}
          </p>
          <p className="mt-3 max-w-[300px] text-[14px] font-medium leading-snug text-[#3C3C3C]">
            Four stages, one accountable desk, from the producer to your facility.
          </p>
        </Fade>
        <h2
          id="about-process"
          className="font-sans text-[clamp(2.2rem,5vw,5rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em] text-[#3C3C3C] lg:col-span-8 lg:text-right"
        >
          <MaskLine>From requirement</MaskLine>
          <MaskLine delay={0.08}>
            <span className="font-extralight text-[#888888]">to</span>{" "}
            <span className="text-accord-red">delivery.</span>
          </MaskLine>
        </h2>
      </div>

      <ol className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {FLOW.map((f, i) => (
          <li key={f.step} className="relative pt-7">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-[#E5E7E6]" />
            <Grow
              axis="x"
              origin="left"
              delay={0.15 + i * 0.25}
              duration={0.9}
              className="absolute inset-x-0 top-0 h-[2px]"
            />
            <Fade delay={0.1 + i * 0.12}>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accord-red">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-sans text-[clamp(1.1rem,1.5vw,1.35rem)] font-medium uppercase leading-tight tracking-[-0.02em] text-[#3C3C3C]">
                {f.step}
              </h3>
              <p className="mt-3 max-w-[300px] text-[13px] leading-relaxed text-[#5A5A5A]">{f.note}</p>
            </Fade>
          </li>
        ))}
      </ol>
    </section>
  );
}
