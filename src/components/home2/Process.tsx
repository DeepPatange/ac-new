import Image from "next/image";
import { process, processCopy } from "@/lib/site";
import { Fade, MaskLine } from "./primitives";
import { WRAP, photo } from "./shared";

/* Process — four columns split by dashed rules. Giant red numerals sink
   behind a B&W container-yard strip whose top edge is cut into a stepped
   "stacks and cranes" skyline. */

const SHORT = ["Analysis", "Sourcing", "Contract", "Delivery"];

/** Stepped skyline: container stacks with thin crane masts. */
const SKYLINE =
  "polygon(0% 34%, 6% 34%, 6% 14%, 11% 14%, 11% 42%, 18% 42%, 18% 24%, 22% 24%, 22% 0%, 23.2% 0%, 23.2% 24%, 30% 24%, 30% 48%, 37% 48%, 37% 30%, 44% 30%, 44% 10%, 49% 10%, 49% 32%, 55% 32%, 55% 44%, 61% 44%, 61% 18%, 67% 18%, 67% 38%, 72% 38%, 72% 2%, 73.2% 2%, 73.2% 30%, 81% 30%, 81% 46%, 88% 46%, 88% 22%, 95% 22%, 95% 40%, 100% 40%, 100% 100%, 0% 100%)";

export default function Process() {
  return (
    <section id="process" className={`${WRAP} py-12 lg:py-20`}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-sans text-[clamp(2.6rem,5.4vw,4.75rem)] font-semibold leading-none tracking-[-0.04em] text-accord-red">
          <MaskLine>{processCopy.eyebrow}</MaskLine>
        </h2>
        <Fade>
          <p className="max-w-sm text-[14px] leading-relaxed text-[#6B6B6B] sm:text-right">
            {processCopy.heading}: four stages, one accountable team.
          </p>
        </Fade>
      </div>

      <div className="relative mt-10 overflow-hidden lg:mt-14">
        {/* lg: numerals end 110px inside the 220px strip, so the stepped top
            edge hides anywhere from ~7% to ~57% of each glyph. */}
        <ol className="grid gap-y-10 pb-[190px] sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-0 lg:pb-[110px]">
          {process.map((s, i) => (
            <li
              key={s.step}
              className={`relative flex flex-col lg:px-6 ${
                i > 0 ? "lg:border-l lg:border-dashed lg:border-[#BDBDBD]" : "lg:pl-0"
              }`}
            >
              <Fade delay={i * 0.08}>
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[44px] font-semibold leading-none tracking-[-0.05em] text-accord-red lg:hidden">
                    {i + 1}
                  </span>
                  <span className="bg-accord-red px-1.5 py-0.5 text-[11px] font-medium text-[#fff]">
                    Step {s.step}
                  </span>
                </div>
                <h3 className="mt-4 font-sans text-[14px] font-semibold uppercase tracking-[0.03em] text-[#0A0A0A]">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-[280px] text-[13px] leading-relaxed text-[#4A4A4A]">
                  {s.desc}
                </p>
              </Fade>

              {/* Giant numeral (desktop) — sinks behind the skyline strip */}
              <div aria-hidden className="mt-auto hidden items-start pt-14 lg:flex">
                <span className="block font-sans text-[clamp(10rem,15vw,15rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-accord-red">
                  {i + 1}
                </span>
                <span className="ml-2 mt-3 text-[13px] font-medium text-[#0A0A0A]">{SHORT[i]}</span>
              </div>
            </li>
          ))}
        </ol>

        {/* Skyline strip (sits above the numerals) */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-10 h-[170px] lg:h-[220px]"
          style={{ clipPath: SKYLINE }}
        >
          <Image
            src={photo("1494412651409-8963ce7935a7")}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_60%] grayscale contrast-[1.15]"
          />
        </div>
      </div>
    </section>
  );
}
