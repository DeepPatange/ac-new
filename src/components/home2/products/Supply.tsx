import Image from "next/image";
import { Fade, Grow, Square } from "../primitives";
import { PHOTOS, WRAP, photo } from "../shared";
import { DISPLAY, Label, TitleLines } from "../blocks";

/* How we supply: B&W port photograph with a red field, beside the four
   supply facts. Every line is traceable to site.ts canon. */
const SUPPLY = [
  {
    title: "COA on every lot",
    desc: "A certificate of analysis is supplied with every consignment we ship.",
  },
  {
    title: "Producer-direct",
    desc: "Direct relationships with producers worldwide, offering producer pricing, transparent terms and no intermediate inventory.",
  },
  {
    title: "Custom sourcing",
    desc: "Niche and campaign-quantity chemicals sourced through our producer network. Send us the specification.",
  },
  {
    title: "One desk, end to end",
    desc: "Clearing, storage, survey, insurance and inland logistics handled in-house.",
  },
];

export default function Supply() {
  return (
    <section aria-labelledby="supply-heading" className="bg-[#EFF1F0]">
      <div className={`${WRAP} grid gap-10 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24`}>
        <div className="relative min-h-[340px] overflow-hidden bg-[#D8DAD9] sm:min-h-[420px] lg:col-span-5 lg:min-h-[560px]">
          <Image
            src={photo(PHOTOS.portAerial)}
            alt="Aerial view of a container port terminal with gantry cranes"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover grayscale contrast-[1.1]"
          />
          <Grow
            axis="x"
            origin="left"
            className="absolute bottom-0 left-0 h-[20%] max-h-[140px] w-[62%]"
            fill="bg-accord-red mix-blend-multiply"
          />
          <p className="absolute bottom-0 left-0 p-6 text-[12px] font-medium uppercase tracking-[0.18em] text-[#fff] sm:p-8">
            Every consignment
          </p>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7">
          <Fade>
            <Square red />
            <Label className="mt-5">How we supply</Label>
          </Fade>
          <h2 id="supply-heading" className={`${DISPLAY} mt-4 text-[clamp(2.2rem,4.4vw,4rem)]`}>
            <TitleLines
              lines={[
                [{ text: "What comes with" }],
                [{ text: "every", tone: "light" }, { text: "consignment.", tone: "red" }],
              ]}
            />
          </h2>

          <dl className="mt-10 grid border-t border-[#D8DAD9] sm:grid-cols-2">
            {SUPPLY.map((s, i) => (
              <Fade
                key={s.title}
                delay={i * 0.06}
                className={`border-b border-[#D8DAD9] py-6 sm:pr-8 ${i % 2 === 1 ? "sm:border-l sm:pl-8" : ""}`}
              >
                <span className="font-sans text-[28px] font-extralight leading-none tracking-[-0.03em] tabular-nums text-accord-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="mt-4 text-[16px] font-medium text-[#3C3C3C]">{s.title}</dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-[#5A5A5A]">{s.desc}</dd>
              </Fade>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
