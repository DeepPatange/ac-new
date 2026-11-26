import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { hero } from "@/lib/site";
import { Fade, Grow, MaskLine, Square } from "./primitives";
import { WRAP, photo, R } from "./shared";

/* Hero — editorial split. Left: tagline blocks + oversized grotesk headline.
   Right: B&W port photograph with a solid red field multiplied over its
   lower half and a black square CTA tucked into the corner. */
export default function Hero() {
  return (
    <section className={`${WRAP} relative pb-12 pt-6 lg:pb-14 lg:pt-8`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        {/* LEFT */}
        <div className="flex flex-col lg:col-span-7 lg:min-h-[560px] lg:justify-between xl:min-h-[600px]">
          <div className="grid max-w-xl grid-cols-2 gap-6">
            <Fade>
              <Square />
              <p className="mt-4 text-[15px] font-medium leading-snug text-[#3C3C3C]">
                Trading. Indenting.
                <br />
                <span className="text-accord-red">Imports</span> and exports.
              </p>
              <Link
                href={R.about}
                className="mt-3 inline-block text-[12px] text-[#888888] underline decoration-[#C4C6C5] underline-offset-4 transition-colors hover:text-[#3C3C3C]"
              >
                More about us
              </Link>
            </Fade>
            <Fade delay={0.1}>
              <p className="pt-6 text-[12px] leading-relaxed text-[#888888]">
                Mumbai headquarters.
                <br />
                Producer-direct sourcing.
                <br />
                60+ countries served.
              </p>
            </Fade>
          </div>

          <div className="mt-10 lg:mt-12">
            <h1 className="font-sans text-[clamp(2.4rem,6vw,5.75rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em] text-[#3C3C3C]">
              <MaskLine>Pioneering</MaskLine>
              <MaskLine delay={0.08}>Petrochemical</MaskLine>
              <MaskLine delay={0.16}>
                <span className="font-extralight text-[#888888]">Excellence</span>
              </MaskLine>
              <MaskLine delay={0.24}>
                <span className="text-accord-red">Since 2009</span>
              </MaskLine>
            </h1>

            <Fade delay={0.35} className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-[15px] leading-relaxed text-[#5A5A5A]">
                {hero.subtext}
              </p>
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href="#contact"
                  className="inline-flex h-12 items-center bg-accord-red px-6 text-[14px] font-medium text-[#fff] transition-colors hover:bg-accord-redDark"
                >
                  Request a quote
                </Link>
                <Link
                  href="#products"
                  className="inline-flex h-12 items-center border border-[#D8DAD9] bg-[#fff] px-6 text-[14px] font-medium text-[#3C3C3C] transition-colors hover:border-accord-red hover:text-accord-red"
                >
                  Products
                </Link>
              </div>
            </Fade>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#D8DAD9] sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[560px]">
            <Image
              src={photo("1578575437130-527eed3abbec")}
              alt="Container ship berthed beneath gantry cranes at a port terminal"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover grayscale contrast-[1.1]"
            />
            <Grow
              axis="y"
              origin="bottom"
              delay={0.2}
              duration={1.2}
              className="absolute inset-x-0 bottom-0 h-[24%] max-h-[170px]"
              fill="bg-accord-red mix-blend-multiply"
            />
            <Fade delay={0.9} className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7">
              <div className="text-right text-[#fff]">
                <p className="font-sans text-[clamp(1.8rem,3vw,2.8rem)] font-medium leading-none tracking-[-0.04em] tabular-nums [text-shadow:0_1px_12px_rgba(0,0,0,0.25)]">
                  198,000+
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#fff]/90">
                  Metric tons · FY 2025-26
                </p>
              </div>
            </Fade>
            <Link
              href="#contact"
              aria-label="Request a quote"
              className="group absolute bottom-0 left-0 flex h-16 w-16 items-center justify-center bg-accord-red text-[#fff] transition-colors hover:bg-accord-redDark "
            >
              <ArrowUpRight
                className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
