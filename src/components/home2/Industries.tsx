import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries, industriesIntro } from "@/lib/site";
import { Fade, MaskLine } from "./primitives";
import { WRAP, R } from "./shared";

/* Industries — a staggered row of B&W portraits, some with a red field over
   the lower third (it rises on hover). Scrolls sideways on small screens. */

const FEATURED = [
  { name: "Paints & Coatings", id: "1562259949-e8e7689d7828", red: true, h: "lg:h-[300px]" },
  { name: "Pharmaceuticals", id: "1584308666744-24d5c474f2ae", red: false, h: "lg:h-[380px]" },
  { name: "Automotive", id: "1567789884554-0b844b597180", red: true, h: "lg:h-[470px]" },
  { name: "Agrochemicals", id: "1574943320219-553eb213f72d", red: false, h: "lg:h-[340px]" },
  { name: "Textiles", id: "1441984904996-e0b6ba687e04", red: true, h: "lg:h-[410px]" },
  { name: "Adhesives & Sealants", id: "1589939705384-5185137a7f0f", red: false, h: "lg:h-[310px]" },
] as const;

const portrait = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&h=1200&fit=crop&crop=entropy&auto=format&q=72`;

export default function Industries() {
  const featured = new Set<string>(FEATURED.map((f) => f.name));
  const rest = industries.filter((n) => !featured.has(n));

  return (
    <section id="industries" className="py-12 lg:py-20">
      <div className={`${WRAP} text-center`}>
        <h2 className="font-sans text-[clamp(2.6rem,7vw,6.5rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em] text-[#3C3C3C]">
          <MaskLine>
            Industries <span className="text-accord-red">we serve</span>
          </MaskLine>
        </h2>
        <Fade>
          <p className="mx-auto mt-6 max-w-lg text-[14px] leading-relaxed text-[#5A5A5A]">
            {industriesIntro}
          </p>
        </Fade>
      </div>

      <div className="mt-12 lg:mt-16">
        <ul className="flex snap-x snap-mandatory items-end gap-2 overflow-x-auto px-5 pb-2 sm:gap-3 sm:px-8 lg:mx-auto lg:max-w-[1440px] lg:overflow-visible lg:px-12 [&::-webkit-scrollbar]:hidden">
          {FEATURED.map((f, i) => (
            <li key={f.name} className="w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-auto lg:flex-1">
              <Fade delay={i * 0.06}>
                <Link href={R.industries} className="group block">
                  <div className={`relative h-[360px] overflow-hidden bg-[#D8DAD9] ${f.h}`}>
                    <Image
                      src={portrait(f.id)}
                      alt={`${f.name} industry`}
                      fill
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 38vw, 62vw"
                      className="object-cover grayscale contrast-[1.1] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                    />
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 bottom-0 bg-accord-red mix-blend-multiply transition-[height] duration-700 ease-out ${
                        f.red ? "h-[18%] group-hover:h-[32%]" : "h-0 group-hover:h-[18%]"
                      }`}
                    />
                  </div>
                  <p className="mt-3 text-center text-[12px] font-medium uppercase tracking-[0.06em] text-[#3C3C3C] transition-colors group-hover:text-accord-red">
                    {f.name}
                  </p>
                </Link>
              </Fade>
            </li>
          ))}
        </ul>
      </div>

      <Fade className={`${WRAP} mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-8`}>
        <p className="text-[13px] text-[#6D6D6D]">
          Also serving{" "}
          <span className="text-[#3C3C3C]">{rest.join(" · ")}</span>
        </p>
        <Link
          href={R.industries}
          className="group inline-flex items-center gap-2 text-[13px] font-medium text-accord-red"
        >
          All industries
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
        </Link>
      </Fade>
    </section>
  );
}
