import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products, productsIntro } from "@/lib/site";
import { Fade, MaskLine, Square } from "./primitives";
import { WRAP, R, enquire } from "./shared";

/* Products — quiet grey cards (label · name · rule · description · action).
   Hover flips a card to black; the custom-sourcing card is the red one. */
export default function Products() {
  return (
    <section id="products" className={`${WRAP} py-12 lg:py-20`}>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Fade className="lg:col-span-4">
          <Square />
          <p className="mt-5 max-w-[300px] text-[14px] font-medium leading-snug text-[#3C3C3C]">
            {productsIntro}
          </p>
          <Link
            href={R.products}
            className="mt-3 inline-block text-[12px] text-[#888888] underline decoration-[#C4C6C5] underline-offset-4 transition-colors hover:text-[#3C3C3C]"
          >
            All products
          </Link>
        </Fade>
        <h2 className="font-sans text-[clamp(2.6rem,7vw,6.5rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em] text-[#3C3C3C] lg:col-span-8 lg:text-right">
          <MaskLine>
            Eight <span className="font-extralight text-[#888888]">product</span>
          </MaskLine>
          <MaskLine delay={0.08}>
            <span className="text-accord-red">families</span>
          </MaskLine>
        </h2>
      </div>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {products.map((p, i) => {
          const custom = p.slug === "custom-sourcing";
          return (
            <li key={p.slug}>
              <Fade delay={(i % 4) * 0.06} className="h-full">
                <Link
                  href={enquire(p.slug)}
                  className={`group flex h-full flex-col p-5 sm:min-h-[240px] sm:p-6 transition-colors duration-300 ${
                    custom
                      ? "bg-accord-red text-[#fff] hover:bg-accord-redDark"
                      : "bg-[#EFF1F0] text-[#3C3C3C] hover:bg-accord-red hover:text-[#fff]"
                  }`}
                >
                  <span
                    className={`text-[11px] font-medium tabular-nums ${
                      custom ? "text-[#fff]/75" : "text-[#888888] group-hover:text-[#fff]/60"
                    }`}
                  >
                    Family {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-3 text-[19px] font-medium leading-snug tracking-[-0.01em]">
                    {p.name}
                  </span>
                  <span className="flex-1" />
                  <span
                    className={`mt-6 border-t pt-4 text-[13px] leading-relaxed ${
                      custom
                        ? "border-[#fff]/30 text-[#fff]/85"
                        : "border-[#D8DAD9] text-[#6D6D6D] group-hover:border-[#fff]/20 group-hover:text-[#fff]/70"
                    }`}
                  >
                    {p.desc}
                  </span>
                  <span
                    className={`mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium ${
                      custom ? "text-[#fff]" : "text-accord-red group-hover:text-[#fff]"
                    }`}
                  >
                    {custom ? "Send a specification" : "Enquire"}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </Link>
              </Fade>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
