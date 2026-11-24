import Link from "next/link";
import { verticals, verticalsIntro } from "@/lib/site";
import { Fade, MaskLine, Square } from "./primitives";
import { WRAP, R } from "./shared";

/* What we do — numbered editorial index: red light numerals, uppercase
   titles, quiet grey descriptions on the right, hairline rules. */
export default function WhatWeDo() {
  return (
    <section id="what-we-do" className={`${WRAP} py-12 lg:py-20`}>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Fade className="lg:col-span-4">
          <p className="max-w-[280px] text-[13px] leading-relaxed text-[#8A8A8A]">
            {verticalsIntro}
          </p>
          <div className="mt-6">
            <Square red />
          </div>
        </Fade>
        <h2 className="font-sans text-[clamp(2.6rem,7vw,6.5rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em] text-[#0A0A0A] lg:col-span-8 lg:text-right">
          <MaskLine>
            What <span className="font-extralight text-[#A3A3A3]">we</span> do
          </MaskLine>
        </h2>
      </div>

      <ol className="mt-12 border-t border-[#E6E6E6] lg:mt-16">
        {verticals.map((v, i) => (
          <li key={v.id}>
            <Link
              href={R.services}
              className="group relative grid grid-cols-12 items-center gap-x-4 gap-y-3 border-b border-[#E6E6E6] py-7 lg:py-9"
            >
              <span className="col-span-3 font-sans text-[clamp(2.25rem,4.5vw,4rem)] font-extralight leading-none tracking-[-0.04em] tabular-nums text-accord-red sm:col-span-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-9 font-sans text-[clamp(1.15rem,2.3vw,2.1rem)] font-medium uppercase leading-tight tracking-[-0.025em] text-[#0A0A0A] transition-transform duration-500 group-hover:translate-x-2 sm:col-span-6">
                {v.title}
              </span>
              <span className="col-span-9 col-start-4 text-[13px] leading-relaxed text-[#7A7A7A] sm:col-span-4 sm:col-start-auto sm:pl-4">
                {v.blurb}
              </span>
              <span
                aria-hidden
                className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accord-red transition-transform duration-700 group-hover:scale-x-100"
              />
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
