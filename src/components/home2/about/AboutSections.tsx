/* About v2: page sections (server components). Content mirrors the live
   /about-us page (AboutContent.tsx) and is sourced from src/lib/site.ts. */

import Image from "next/image";
import {
  FOUNDING_YEAR,
  LATEST_FY,
  aboutCopy,
  icisRecognition,
  stats,
  statsNote,
} from "@/lib/site";
import { Label } from "../blocks";
import { Fade, Grow, MaskLine, Square } from "../primitives";
import { WRAP } from "../shared";

/* Same facts as the live page. */
const AT_A_GLANCE = [
  { label: "Established", value: `${FOUNDING_YEAR}` },
  { label: "Headquarters", value: "Mumbai, India" },
  { label: "Branch offices", value: "Ahmedabad · Gandhidham" },
  { label: "Global reach", value: "60+ countries" },
  { label: "Active clients", value: "500+" },
];

const MILESTONES = [
  {
    year: "2009",
    title: "The desk opens",
    desc: "Founded in Mumbai, handling 4,500 metric tons in its first year on a foundation of trust and transparency.",
  },
  {
    year: "2014",
    title: "Accord Chemcorp Pvt. Ltd.",
    desc: "A sister company established to broaden sourcing and the product portfolio, serving industrial applications more comprehensively.",
  },
  {
    year: LATEST_FY,
    title: "198,000+ MT a year",
    desc: "A distribution network spanning India and 60+ countries, serving 500+ active clients with branch offices in Ahmedabad and Gandhidham.",
  },
];

const LOCATIONS = [
  { city: "Mumbai", role: "Headquarters", note: "Maharashtra" },
  { city: "Ahmedabad", role: "Branch office", note: "Gujarat" },
  { city: "Gandhidham", role: "Branch office", note: "Gujarat" },
];

const H2 = "font-sans font-medium uppercase leading-[0.92] tracking-[-0.04em] text-[#0A0A0A]";

/* -------------------------------------------------------------------------- */
/* At a glance: hairline fact ledger directly under the header                */
/* -------------------------------------------------------------------------- */

export function AtAGlance() {
  return (
    <section aria-label="At a glance" className={WRAP}>
      {/* Every cell carries a top rule (rows read as a ledger on small
          screens); on desktop the five sit in one row split by column rules. */}
      <dl className="grid grid-cols-2 gap-x-6 border-b border-[#E6E6E6] sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0">
        {AT_A_GLANCE.map((f, i) => (
          <Fade
            key={f.label}
            delay={i * 0.06}
            className={`border-t border-[#E6E6E6] py-6 pr-4 ${i > 0 ? "lg:border-l lg:pl-6" : ""}`}
          >
            <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A8A8A]">{f.label}</dt>
            <dd className="mt-2 text-[clamp(1.1rem,1.7vw,1.5rem)] font-medium leading-tight tracking-[-0.02em] text-[#0A0A0A]">
              {f.value}
            </dd>
          </Fade>
        ))}
      </dl>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Story: B&W office photograph + the company narrative                       */
/* -------------------------------------------------------------------------- */

export function Story() {
  return (
    <section aria-labelledby="about-story" className={`${WRAP} py-12 lg:py-20`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
        <Fade className="lg:col-span-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#D9D9D9] lg:aspect-[4/5]">
            <Image
              src="/gallery/staff-14.webp"
              alt="The Accord team at work in the office"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover grayscale contrast-[1.1]"
            />
            <Grow
              axis="x"
              origin="left"
              duration={1.2}
              className="absolute bottom-0 left-0 h-[20%] max-h-[140px] w-[46%]"
              fill="bg-accord-red mix-blend-multiply"
            />
            <div className="absolute bottom-0 right-0 bg-[#0A0A0A] px-5 py-4 text-[#fff] sm:px-6 sm:py-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#fff]/70">
                Mumbai · Since {FOUNDING_YEAR}
              </p>
              <p className="mt-1 text-[15px] font-medium">Trust &amp; transparency, in bulk.</p>
            </div>
          </div>
        </Fade>

        <div className="lg:col-span-5 lg:col-start-8">
          <Fade>
            <Square red />
            <Label className="mt-5">{aboutCopy.eyebrow}</Label>
          </Fade>
          <h2 id="about-story" className={`${H2} mt-4 text-[clamp(2rem,3.4vw,3.25rem)]`}>
            <MaskLine>A colossal network,</MaskLine>
            <MaskLine delay={0.08}>
              <span className="font-extralight text-[#A3A3A3]">one accountable</span>{" "}
              <span className="text-accord-red">desk.</span>
            </MaskLine>
          </h2>
          {aboutCopy.body.map((p, i) => (
            <Fade key={i} delay={0.15 + i * 0.08}>
              <p className="mt-6 text-[15px] leading-relaxed text-[#5E5E5E]">{p}</p>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Journey: milestone timeline on a red rule                                  */
/* -------------------------------------------------------------------------- */

export function Journey() {
  return (
    <section aria-labelledby="about-journey" className="bg-[#F3F3F3] py-12 lg:py-20">
      <div className={WRAP}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Fade className="lg:col-span-4">
            <Square />
            <Label className="mt-5">The journey</Label>
          </Fade>
          <h2
            id="about-journey"
            className={`${H2} text-[clamp(2.2rem,5vw,5rem)] lg:col-span-8 lg:text-right`}
          >
            <MaskLine>From 4,500 tonnes</MaskLine>
            <MaskLine delay={0.08}>
              <span className="font-extralight text-[#A3A3A3]">to a</span>{" "}
              <span className="text-accord-red">global desk.</span>
            </MaskLine>
          </h2>
        </div>

        <ol className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          <span aria-hidden className="absolute left-0 right-0 top-[6px] hidden h-px bg-[#CFCFCF] md:block" />
          <Grow
            axis="x"
            origin="left"
            duration={1.6}
            className="absolute left-0 right-0 top-[6px] hidden h-px md:block"
          />
          {MILESTONES.map((m, i) => {
            const fy = m.year.startsWith("FY ");
            return (
              <li key={m.year} className="relative">
                <Fade delay={0.2 + i * 0.15}>
                  <span aria-hidden className="relative block h-3.5 w-3.5 bg-accord-red" />
                  <p className="mt-6 flex items-start gap-2 font-sans text-[clamp(2.8rem,5vw,4.75rem)] font-extralight leading-[0.85] tracking-[-0.05em] tabular-nums text-accord-red">
                    {fy && (
                      <span className="mt-1 text-[12px] font-medium tracking-[0.12em] text-[#0A0A0A]">FY</span>
                    )}
                    {fy ? m.year.slice(3) : m.year}
                  </p>
                  <h3 className="mt-5 font-sans text-[15px] font-semibold uppercase tracking-[0.03em] text-[#0A0A0A]">
                    {m.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-[#5E5E5E]">{m.desc}</p>
                </Fade>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Figures: black band, red rules                                             */
/* -------------------------------------------------------------------------- */

export function AboutFigures() {
  return (
    <section aria-labelledby="about-figures" className="bg-[#0A0A0A] text-[#fff]">
      <div className={`${WRAP} py-16 lg:py-20`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="about-figures"
            className="font-sans text-[clamp(1.6rem,2.6vw,2.4rem)] font-light leading-tight tracking-[-0.03em]"
          >
            The figures, <span className="font-medium">{LATEST_FY}.</span>
          </h2>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A8A8A]">
            Consolidated sales
          </p>
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <Fade key={s.label} delay={i * 0.07} className="border-l-2 border-accord-red pl-4">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-sans text-[clamp(2rem,3.4vw,3.25rem)] font-medium leading-none tracking-[-0.045em] tabular-nums">
                  {s.prefix ?? ""}
                  {s.value.toLocaleString("en-US")}
                  {s.suffix}
                </span>
                <span className="mt-3 block text-[13px] font-medium text-[#fff]/85">{s.label}</span>
                {s.sublabel && <span className="mt-1 block text-[11px] text-[#8A8A8A]">{s.sublabel}</span>}
              </dd>
            </Fade>
          ))}
        </dl>
        <p className="mt-12 border-t border-[#fff]/10 pt-5 text-[11px] leading-relaxed text-[#8A8A8A]">{statsNote}</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* ICIS recognition: renders ONLY once the client approves the details        */
/* -------------------------------------------------------------------------- */

export function Recognition() {
  if (!icisRecognition) return null;
  const r = icisRecognition;
  return (
    <section aria-labelledby="about-icis" className={`${WRAP} pt-16 lg:pt-24`}>
      <Fade className="grid bg-[#F3F3F3] lg:grid-cols-12">
        <div className="bg-accord-red p-8 text-[#fff] lg:col-span-4 lg:p-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#fff]/75">Industry recognition</p>
          <p className="mt-4 font-sans text-[clamp(3rem,6vw,5.5rem)] font-extralight leading-none tracking-[-0.05em] tabular-nums">
            {r.year}
          </p>
        </div>
        <div className="p-8 lg:col-span-8 lg:p-12">
          <h2
            id="about-icis"
            className="font-sans text-[clamp(1.6rem,2.8vw,2.5rem)] font-medium leading-tight tracking-[-0.03em] text-[#0A0A0A]"
          >
            {r.title}
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#5E5E5E]">{r.detail}</p>
          <p className="mt-6 text-[12px] text-[#8A8A8A]">
            Source:{" "}
            {r.url ? (
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A0A0A] underline underline-offset-4 hover:text-accord-red"
              >
                {r.source}
              </a>
            ) : (
              r.source
            )}
          </p>
        </div>
      </Fade>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Why Accord: numbered capability index                                      */
/* -------------------------------------------------------------------------- */

export function Capabilities() {
  return (
    <section aria-labelledby="about-why" className="bg-[#F3F3F3] py-12 lg:py-20">
      <div className={WRAP}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Fade className="lg:col-span-4">
            <Square />
            <Label className="mt-5">Why Accord</Label>
          </Fade>
          <h2
            id="about-why"
            className={`${H2} text-[clamp(2.2rem,5vw,5rem)] lg:col-span-8 lg:text-right`}
          >
            <MaskLine>Reliability</MaskLine>
            <MaskLine delay={0.08}>
              <span className="font-extralight text-[#A3A3A3]">our clients can</span>
            </MaskLine>
            <MaskLine delay={0.16}>
              <span className="text-accord-red">plan around.</span>
            </MaskLine>
          </h2>
        </div>

        <ol className="mt-12 border-t border-[#D6D6D6] lg:mt-16">
          {aboutCopy.pillars.map((p, i) => (
            <li
              key={p.title}
              className="grid grid-cols-12 items-center gap-x-4 gap-y-3 border-b border-[#D6D6D6] py-7 lg:py-9"
            >
              <span className="col-span-3 font-sans text-[clamp(2.25rem,4.5vw,4rem)] font-extralight leading-none tracking-[-0.04em] tabular-nums text-accord-red sm:col-span-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="col-span-9 font-sans text-[clamp(1.15rem,2.3vw,2.1rem)] font-medium uppercase leading-tight tracking-[-0.025em] text-[#0A0A0A] sm:col-span-5">
                {p.title}
              </h3>
              <p className="col-span-9 col-start-4 text-[14px] leading-relaxed text-[#5E5E5E] sm:col-span-5 sm:col-start-auto">
                {p.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Vision & Mission: red field (cut corner) + black field                     */
/* -------------------------------------------------------------------------- */

const CUT = "polygon(0 0, 78% 0, 100% 22%, 100% 100%, 0 100%)";

export function VisionMission() {
  const items = [
    { label: "Vision", text: aboutCopy.vision, red: true },
    { label: "Mission", text: aboutCopy.mission, red: false },
  ];
  return (
    <section aria-label="Vision and mission" className={`${WRAP} py-12 lg:py-20`}>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((it, i) => (
          <Fade key={it.label} delay={i * 0.1}>
            <figure
              className={`flex h-full min-h-[320px] flex-col justify-between gap-10 p-8 text-[#fff] sm:p-10 lg:min-h-[420px] lg:p-12 ${
                it.red ? "bg-accord-red" : "bg-[#0A0A0A]"
              }`}
              style={it.red ? { clipPath: CUT } : undefined}
            >
              <figcaption className="flex items-center gap-3">
                <span aria-hidden className={`h-2.5 w-2.5 ${it.red ? "bg-[#fff]" : "bg-accord-red"}`} />
                <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#fff]/80">{it.label}</span>
              </figcaption>
              <blockquote className="font-sans text-[clamp(1.3rem,2vw,1.85rem)] font-light leading-snug tracking-[-0.015em]">
                {it.text}
              </blockquote>
            </figure>
          </Fade>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Locations: office photo + three-city ledger                                */
/* -------------------------------------------------------------------------- */

export function Locations() {
  return (
    <section aria-labelledby="about-where" className={`${WRAP} pb-16 lg:pb-24`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
        <Fade className="lg:col-span-5">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#D9D9D9]">
            <Image
              src="/gallery/reception.webp"
              alt="Reception area of the Accord office"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover grayscale contrast-[1.1]"
            />
            <Grow
              axis="y"
              origin="bottom"
              duration={1.2}
              className="absolute inset-x-0 bottom-0 h-[20%] max-h-[140px]"
              fill="bg-accord-red mix-blend-multiply"
            />
          </div>
        </Fade>

        <div className="lg:col-span-6 lg:col-start-7">
          <Fade>
            <Square red />
            <Label className="mt-5">Where we operate</Label>
          </Fade>
          <h2 id="about-where" className={`${H2} mt-4 text-[clamp(2rem,3.4vw,3.25rem)]`}>
            <MaskLine>Three offices.</MaskLine>
            <MaskLine delay={0.08}>
              <span className="font-extralight text-[#A3A3A3]">One</span>{" "}
              <span className="text-accord-red">desk.</span>
            </MaskLine>
          </h2>
          <ul className="mt-8 border-t border-[#E6E6E6]">
            {LOCATIONS.map((l, i) => (
              <li key={l.city} className="flex items-baseline justify-between gap-6 border-b border-[#E6E6E6] py-4">
                <span className="flex items-center gap-3">
                  <span aria-hidden className={`h-2 w-2 ${i === 0 ? "bg-accord-red" : "bg-[#0A0A0A]"}`} />
                  <span className="font-sans text-[clamp(1.4rem,2.4vw,2.1rem)] font-medium uppercase leading-none tracking-[-0.03em] text-[#0A0A0A]">
                    {l.city}
                  </span>
                </span>
                <span className="text-right">
                  <span className={`block text-[13px] font-medium ${i === 0 ? "text-accord-red" : "text-[#0A0A0A]"}`}>
                    {l.role}
                  </span>
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-[#8A8A8A]">{l.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
