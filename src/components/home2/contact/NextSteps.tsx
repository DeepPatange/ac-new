import { process as steps } from "@/lib/site";
import { SplitHeading } from "../blocks";
import { Fade } from "../primitives";
import { WRAP } from "../shared";

/* What happens after an enquiry: the same four steps a consignment follows,
   as four columns split by dashed rules with light red numerals. */
export default function NextSteps() {
  return (
    <section aria-label="What happens next" className={`${WRAP} border-t border-[#E6E6E6] py-12 lg:py-20`}>
      <SplitHeading
        red
        note="After you hit send, every enquiry follows the same four steps a consignment does."
        title={[[{ text: "What" }, { text: "happens", tone: "light" }], [{ text: "next", tone: "red" }]]}
      />
      <ol className="mt-12 grid gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:mt-16 lg:grid-cols-4 lg:gap-0">
        {steps.map((s, i) => (
          <li
            key={s.step}
            className={`border-t border-[#0A0A0A] pt-6 lg:border-t-0 lg:px-6 lg:pt-0 ${
              i > 0 ? "lg:border-l lg:border-dashed lg:border-[#BDBDBD]" : "lg:pl-0"
            }`}
          >
            <Fade delay={i * 0.08}>
              <span className="block font-sans text-[clamp(3rem,5vw,4.5rem)] font-extralight leading-none tracking-[-0.04em] tabular-nums text-accord-red">
                {s.step}
              </span>
              <h3 className="mt-6 font-sans text-[14px] font-semibold uppercase tracking-[0.03em] text-[#0A0A0A]">
                {s.title}
              </h3>
              <p className="mt-2 max-w-[300px] text-[14px] leading-relaxed text-[#4A4A4A]">{s.desc}</p>
            </Fade>
          </li>
        ))}
      </ol>
    </section>
  );
}
