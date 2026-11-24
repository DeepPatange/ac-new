import Image from "next/image";
import { Fade, Grow, Square } from "../primitives";
import { PHOTOS, WRAP, photo } from "../shared";
import { DISPLAY, Label, TitleLines } from "../blocks";
import { INTRO, STORAGE_PORTS } from "./data";

/* Intro: B&W port photograph with a red field, beside the company copy and
   the storage / discharge ports as a numbered ledger. */
export default function Intro() {
  return (
    <section aria-labelledby="svc-intro-heading" className={`${WRAP} py-12 lg:py-20`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="relative min-h-[340px] overflow-hidden bg-[#D9D9D9] sm:min-h-[440px] lg:col-span-5 lg:min-h-[600px]">
          <Image
            src={photo(PHOTOS.portAerial)}
            alt="Imported chemical containers staged at a port terminal"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover grayscale contrast-[1.1]"
          />
          <Grow
            axis="x"
            origin="left"
            className="absolute bottom-0 left-0 h-[20%] max-h-[140px] w-[64%]"
            fill="bg-accord-red mix-blend-multiply"
          />
          <p className="absolute bottom-0 left-0 p-6 text-[12px] font-medium uppercase tracking-[0.2em] text-[#fff] sm:p-8">
            Port · Bulk · Bonded
          </p>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7">
          <Fade>
            <Square red />
          </Fade>
          <h2 id="svc-intro-heading" className={`${DISPLAY} mt-5 text-[clamp(2.2rem,4.6vw,4.25rem)]`}>
            <TitleLines
              lines={[
                [{ text: "Port." }, { text: "Bulk.", tone: "light" }],
                [{ text: "Bonded.", tone: "red" }],
              ]}
            />
          </h2>
          <Fade delay={0.15} className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-8">
            {INTRO.map((p) => (
              <p key={p.slice(0, 24)} className="text-[15px] leading-relaxed text-[#5E5E5E]">
                {p}
              </p>
            ))}
          </Fade>

          <Fade delay={0.25} className="mt-10">
            <Label>Storage & discharge ports</Label>
            <ol className="mt-4 grid grid-cols-2 border-t border-[#E6E6E6]">
              {STORAGE_PORTS.map((port, i) => (
                <li
                  key={port}
                  className={`flex items-baseline gap-3 border-b border-[#E6E6E6] py-3.5 ${
                    i % 2 === 1 ? "border-l pl-4 sm:pl-6" : "pr-4"
                  }`}
                >
                  <span className="text-[12px] font-medium tabular-nums text-accord-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium text-[#0A0A0A]">{port}</span>
                </li>
              ))}
            </ol>
          </Fade>
        </div>
      </div>
    </section>
  );
}
