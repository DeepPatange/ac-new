import { verticals, verticalsIntro } from "@/lib/site";
import { Fade } from "../primitives";
import { WRAP } from "../shared";
import { TitleLines } from "../blocks";

/* The four business lines (site.ts verticals) on a black field: the page's
   dark beat between the white intro and the service cards. */
export default function Verticals() {
  return (
    <section aria-labelledby="svc-verticals-heading" className="bg-[#0A0A0A] text-[#fff]">
      <div className={`${WRAP} py-12 lg:py-20`}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2
            id="svc-verticals-heading"
            className="font-sans text-[clamp(2.4rem,6.4vw,6rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em] text-[#fff] lg:col-span-8"
          >
            <TitleLines
              lines={[
                [{ text: "Four ways" }],
                [{ text: "we", tone: "light" }, { text: "trade.", tone: "red" }],
              ]}
            />
          </h2>
          <Fade className="lg:col-span-4">
            <p className="max-w-sm text-[14px] leading-relaxed text-[#9A9A9A] lg:ml-auto lg:text-right">
              {verticalsIntro}
            </p>
          </Fade>
        </div>

        <ol className="mt-12 grid border-t border-[#fff]/15 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {verticals.map((v, i) => (
            <li
              key={v.id}
              className={`border-b border-[#fff]/15 py-8 sm:px-6 lg:border-b-0 lg:py-10 ${
                i % 2 === 1 ? "sm:border-l" : "sm:pl-0"
              } ${i > 0 ? "lg:border-l lg:pl-6" : "lg:pl-0"}`}
            >
              <Fade delay={i * 0.08}>
                <span className="font-sans text-[clamp(3rem,5vw,4.5rem)] font-extralight leading-none tracking-[-0.05em] tabular-nums text-accord-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 font-sans text-[18px] font-medium uppercase tracking-[-0.01em] text-[#fff]">
                  {v.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[#9A9A9A]">{v.blurb}</p>
              </Fade>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
