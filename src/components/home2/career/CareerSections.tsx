/* Career v2: page sections (server components). Content mirrors the live
   /career page (CareerContent.tsx). BENEFITS and ROLES are copied from there
   because that module keeps them private; keep the two lists in sync (each
   role's Apply link is the client's live Google Form). */

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Label } from "../blocks";
import { Fade, Grow, MaskLine, Square } from "../primitives";
import { WRAP } from "../shared";

export const BENEFITS = [
  {
    title: "Fair HR Practices",
    desc: "Transparent, equitable policies that give every employee a clear pathway to success.",
  },
  {
    title: "Upskilling Opportunities",
    desc: "Avenues to build competencies and grow your expertise across the trade.",
  },
  {
    title: "Access to Leadership",
    desc: "Direct access to leadership for guidance, mentorship and career succession.",
  },
  {
    title: "Respect & Trust",
    desc: "A people-centric culture, high on positivity, inclusivity and equal opportunity.",
  },
];

export const ROLES = [
  { title: "Sales", form: "https://forms.gle/khng8gXR7QdKEQRh7" },
  { title: "Procurement", form: "https://forms.gle/7LxASRKrPdhwPXwy5" },
  { title: "Business Development", form: "https://forms.gle/bNVUXkosqa1Mc8E39" },
  { title: "Logistics", form: "https://forms.gle/JWebunnoeZxWb5Xg8" },
  { title: "Accounts", form: "https://forms.gle/pqWUVhQs2HmUsWUU8" },
];

export const careersMailto = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
  "Career enquiry: Accord Chemical Corporation"
)}`;

const H2 = "font-sans font-medium uppercase leading-[0.9] tracking-[-0.045em] text-[#3C3C3C]";

/* -------------------------------------------------------------------------- */
/* Office mosaic: real team photographs in B&W                                */
/* -------------------------------------------------------------------------- */

export function OfficeMosaic() {
  return (
    <section aria-label="Our team at work" className={WRAP}>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:h-[600px] lg:grid-cols-12 lg:grid-rows-2">
        <Fade className="relative col-span-2 aspect-[4/3] overflow-hidden bg-[#D8DAD9] lg:col-span-8 lg:row-span-2 lg:aspect-auto">
          <Image
            src="/gallery/staff-13.webp"
            alt="Accord team members at their desks"
            fill
            priority
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-cover grayscale contrast-[1.1]"
          />
          <Grow
            axis="y"
            origin="bottom"
            duration={1.2}
            className="absolute inset-x-0 bottom-0 h-[20%] max-h-[140px]"
            fill="bg-accord-red mix-blend-multiply"
          />
          <p className="absolute bottom-0 left-0 bg-accord-red px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#fff]">
            Our team at work
          </p>
        </Fade>
        <Fade delay={0.1} className="relative aspect-square overflow-hidden bg-[#D8DAD9] lg:col-span-4 lg:aspect-auto">
          <Image
            src="/gallery/staff-09.webp"
            alt="Colleagues working at a row of desks"
            fill
            sizes="(min-width: 1024px) 31vw, 50vw"
            className="object-cover grayscale contrast-[1.1]"
          />
        </Fade>
        <Fade delay={0.2} className="relative aspect-square overflow-hidden bg-[#D8DAD9] lg:col-span-4 lg:aspect-auto">
          <Image
            src="/gallery/staff-19.webp"
            alt="Open-plan office floor"
            fill
            sizes="(min-width: 1024px) 31vw, 50vw"
            className="object-cover grayscale contrast-[1.1]"
          />
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-[20%] max-h-[120px] bg-accord-red mix-blend-multiply" />
        </Fade>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Why join us: four numbered cards                                           */
/* -------------------------------------------------------------------------- */

export function Benefits() {
  return (
    <section aria-labelledby="career-why" className={`${WRAP} py-12 lg:py-20`}>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Fade className="lg:col-span-4">
          <Square red />
          <Label className="mt-5">Why join us</Label>
        </Fade>
        <h2 id="career-why" className={`${H2} text-[clamp(2.2rem,5.4vw,5.25rem)] lg:col-span-8 lg:text-right`}>
          <MaskLine>A desk worth</MaskLine>
          <MaskLine delay={0.08}>
            <span className="font-extralight text-[#888888]">building a</span>
          </MaskLine>
          <MaskLine delay={0.16}>
            <span className="text-accord-red">career on.</span>
          </MaskLine>
        </h2>
      </div>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {BENEFITS.map((b, i) => (
          <li key={b.title}>
            <Fade delay={i * 0.06} className="h-full">
              <div className="group flex h-full flex-col bg-[#EFF1F0] p-6 transition-colors duration-300 hover:bg-accord-red sm:min-h-[260px]">
                <span className="font-sans text-[44px] font-extralight leading-none tracking-[-0.04em] tabular-nums text-accord-red transition-colors group-hover:text-[#fff]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1" />
                <h3 className="mt-6 font-sans text-[18px] sm:mt-10 font-medium leading-snug tracking-[-0.01em] text-[#3C3C3C] transition-colors group-hover:text-[#fff]">
                  {b.title}
                </h3>
                <p className="mt-3 border-t border-[#D8DAD9] pt-4 text-[13px] leading-relaxed text-[#5A5A5A] transition-colors group-hover:border-[#fff]/20 group-hover:text-[#fff]/70">
                  {b.desc}
                </p>
              </div>
            </Fade>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Open roles: numbered index, each row opens the role's Google Form          */
/* -------------------------------------------------------------------------- */

export function OpenRoles() {
  return (
    <section id="roles" aria-labelledby="career-roles" className="scroll-mt-24 bg-[#EFF1F0] py-12 lg:py-20">
      <div className={WRAP}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Fade className="lg:col-span-4">
            <Square />
            <Label className="mt-5">Open positions</Label>
            <p className="mt-3 max-w-[300px] text-[14px] font-medium leading-snug text-[#3C3C3C]">
              Pick a role and apply in minutes; each opens its dedicated application form.
            </p>
          </Fade>
          <h2 id="career-roles" className={`${H2} text-[clamp(2.2rem,5.4vw,5.25rem)] lg:col-span-8 lg:text-right`}>
            <MaskLine>Areas where</MaskLine>
            <MaskLine delay={0.08}>
              <span className="font-extralight text-[#888888]">we&rsquo;re</span>{" "}
              <span className="text-accord-red">hiring.</span>
            </MaskLine>
          </h2>
        </div>

        <ol className="mt-12 border-t border-[#D8DAD9] lg:mt-16">
          {ROLES.map((r, i) => (
            <li key={r.title}>
              <a
                href={r.form}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative grid grid-cols-12 items-center gap-x-4 gap-y-2 border-b border-[#D8DAD9] py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accord-red lg:py-8"
              >
                <span className="col-span-2 font-sans text-[clamp(1.8rem,3.6vw,3.25rem)] font-extralight leading-none tracking-[-0.04em] tabular-nums text-accord-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 font-sans text-[clamp(1.3rem,2.6vw,2.4rem)] font-medium uppercase leading-tight tracking-[-0.03em] text-[#3C3C3C] transition-transform duration-500 group-hover:translate-x-2 sm:col-span-6">
                  {r.title}
                </span>
                <span className="col-span-5 col-start-3 text-[13px] text-[#6D6D6D] sm:col-span-2 sm:col-start-auto">
                  Full-time · Mumbai
                </span>
                <span className="col-span-5 inline-flex items-center justify-end gap-1.5 text-[13px] font-medium text-accord-red sm:col-span-2">
                  Apply now
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </span>
                <span
                  aria-hidden
                  className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accord-red transition-transform duration-700 group-hover:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ol>

        <Fade className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-[#6D6D6D]">
          <span>Don&rsquo;t see your role?</span>
          <a
            href={careersMailto}
            className="inline-flex items-center gap-1.5 font-medium text-[#3C3C3C] underline decoration-accord-red/60 underline-offset-4 transition-colors hover:decoration-accord-red"
          >
            Send your CV to {siteConfig.contact.email}
            <ArrowUpRight className="h-3.5 w-3.5 text-accord-red" strokeWidth={2} />
          </a>
        </Fade>
      </div>
    </section>
  );
}
