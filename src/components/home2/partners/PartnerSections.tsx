import Image from "next/image";
import { Building2, Quote, UserRound } from "lucide-react";
import { PARTNER_PLACEHOLDERS, TESTIMONIAL_PLACEHOLDERS, partners, testimonials } from "@/lib/site";
import { SplitHeading } from "../blocks";
import { Fade } from "../primitives";
import { R, WRAP } from "../shared";

/* Partners + client testimonials, data-driven from site.ts. While the client
   has not supplied logos / approved quotes, both render neutral, clearly
   labelled placeholder slots. Nothing is invented. */

const pad = (n: number) => String(n).padStart(2, "0");

export function PartnerGrid() {
  const hasLogos = partners.length > 0;
  return (
    <section aria-label="Our partners" className={`${WRAP} border-t border-[#E6E6E6] py-12 lg:py-20`}>
      <SplitHeading
        title={[[{ text: "Producers" }], [{ text: "and", tone: "light" }, { text: "principals", tone: "red" }]]}
        note="The manufacturers we source from, and the logistics and service partners who help move every consignment."
        link={{ href: R.contact, label: "Partner with Accord" }}
      />

      <ul
        className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:mt-16 lg:grid-cols-4"
        aria-label={hasLogos ? "Partner companies" : "Partner logos (coming soon)"}
      >
        {hasLogos
          ? partners.map((p, i) => {
              const logo = (
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={200}
                  height={80}
                  className="h-12 w-auto max-w-[75%] object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-14"
                />
              );
              return (
                <li key={p.name}>
                  <Fade delay={(i % 4) * 0.05}>
                    <div className="group relative flex aspect-[5/3] items-center justify-center bg-[#F3F3F3] p-5 transition-colors duration-300 hover:bg-[#EAEAEA]">
                      <span className="absolute left-4 top-3 text-[11px] font-medium tabular-nums text-[#8A8A8A]">
                        {pad(i + 1)}
                      </span>
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-full w-full items-center justify-center"
                        >
                          {logo}
                        </a>
                      ) : (
                        logo
                      )}
                      {p.category && (
                        <span className="absolute bottom-3 left-4 text-[11px] text-[#8A8A8A]">{p.category}</span>
                      )}
                    </div>
                  </Fade>
                </li>
              );
            })
          : Array.from({ length: PARTNER_PLACEHOLDERS }).map((_, i) => (
              <li key={i} aria-hidden>
                <Fade delay={(i % 4) * 0.05}>
                  <div className="relative flex aspect-[2/1] flex-col items-center justify-center gap-2 border border-dashed border-[#CFCFCF] bg-[#F7F7F7] p-5 text-[#9A9A9A] lg:aspect-[5/2]">
                    <span className="absolute left-4 top-3 text-[11px] font-medium tabular-nums text-[#B5B5B5]">
                      {pad(i + 1)}
                    </span>
                    <Building2 className="h-6 w-6" strokeWidth={1.25} />
                    <span className="text-[12px] font-medium">Partner logo</span>
                  </div>
                </Fade>
              </li>
            ))}
      </ul>
      {!hasLogos && (
        <p className="mt-4 text-[12px] text-[#8A8A8A]">
          Partner logos will appear here once each partner has approved their use.
        </p>
      )}
    </section>
  );
}

export function TestimonialGrid() {
  const hasQuotes = testimonials.length > 0;
  return (
    <section aria-label="Client testimonials" className="bg-[#F3F3F3] py-12 lg:py-20">
      <div className={WRAP}>
        <SplitHeading
          red
          title={[[{ text: "What our" }], [{ text: "clients", tone: "red" }, { text: "say", tone: "light" }]]}
          note={
            hasQuotes
              ? "Feedback from the manufacturers and distributors we supply across India and international markets."
              : "We are collecting feedback from our clients across India and international markets. Their testimonials will appear here."
          }
        />

        <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {hasQuotes
            ? testimonials.map((t, i) => (
                <li key={`${t.name}-${t.company}`}>
                  <Fade delay={(i % 3) * 0.06} className="h-full">
                    <figure className="flex h-full flex-col bg-[#fff] p-7">
                      <span className="text-[11px] font-medium text-[#8A8A8A]">{t.company}</span>
                      <blockquote className="mt-4 flex-1 text-[18px] font-medium leading-snug tracking-[-0.01em] text-[#0A0A0A]">
                        <Quote className="mb-3 h-5 w-5 text-accord-red" strokeWidth={1.75} aria-hidden />
                        {t.quote}
                      </blockquote>
                      <figcaption className="mt-8 border-t border-[#E6E6E6] pt-4">
                        <p className="text-[14px] font-medium text-[#0A0A0A]">{t.name}</p>
                        <p className="mt-0.5 text-[12px] text-[#8A8A8A]">
                          {t.designation}, {t.company}
                        </p>
                      </figcaption>
                    </figure>
                  </Fade>
                </li>
              ))
            : Array.from({ length: TESTIMONIAL_PLACEHOLDERS }).map((_, i) => (
                <li key={i} aria-hidden>
                  <Fade delay={(i % 3) * 0.06} className="h-full">
                    <div className="flex h-full flex-col border border-dashed border-[#CFCFCF] bg-[#fff] p-7">
                      <span className="text-[11px] font-medium text-[#B5B5B5]">Company</span>
                      <Quote className="mt-4 h-5 w-5 text-accord-red/40" strokeWidth={1.75} />
                      <div className="mt-4 space-y-2.5">
                        <span className="block h-2.5 w-full bg-[#EDEDED]" />
                        <span className="block h-2.5 w-11/12 bg-[#EDEDED]" />
                        <span className="block h-2.5 w-4/5 bg-[#EDEDED]" />
                      </div>
                      <div className="mt-10 flex items-center gap-3 border-t border-[#E6E6E6] pt-4">
                        <span className="flex h-10 w-10 items-center justify-center bg-[#F3F3F3] text-[#9A9A9A]">
                          <UserRound className="h-5 w-5" strokeWidth={1.5} />
                        </span>
                        <div className="text-[12px] leading-relaxed text-[#9A9A9A]">
                          <p className="font-medium">Client name</p>
                          <p>Designation, Company</p>
                        </div>
                      </div>
                    </div>
                  </Fade>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}
