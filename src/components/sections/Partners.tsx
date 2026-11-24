"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Quote, UserRound } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeSoft, stagger } from "@/lib/motion";
import {
  PARTNER_PLACEHOLDERS,
  TESTIMONIAL_PLACEHOLDERS,
  partners,
  testimonials,
} from "@/lib/site";

/* ============================================================================
   Partners + Client Testimonials (replace the former Gallery).
   Both are data-driven from site.ts. While the client has not yet supplied
   logos / approved testimonials, each renders neutral, clearly-labelled
   placeholder slots. Nothing is invented.
   ========================================================================== */

export function PartnersSection({ id = "partners" }: { id?: string }) {
  const hasLogos = partners.length > 0;
  return (
    <section id={id} className="section-quiet">
      <Container>
        <SectionHeading
          eyebrow="Our Partners"
          title="Working with leading producers and principals"
          intro="We work with established petrochemical manufacturers, logistics providers and service partners worldwide to deliver consistent quality and dependable supply."
        />

        <motion.ul
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
          aria-label={hasLogos ? "Partner companies" : "Partner logos (coming soon)"}
        >
          {hasLogos
            ? partners.map((p) => {
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
                  <motion.li
                    key={p.name}
                    variants={fadeSoft}
                    className="group flex aspect-[5/3] items-center justify-center rounded-2xl border border-white/10 bg-ink p-5 transition-colors duration-300 hover:border-accord-red/40"
                  >
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
                  </motion.li>
                );
              })
            : Array.from({ length: PARTNER_PLACEHOLDERS }).map((_, i) => (
                <motion.li
                  key={i}
                  variants={fadeSoft}
                  aria-hidden
                  className="flex aspect-[5/2] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-ink-900 p-5 text-steel-500"
                >
                  <Building2 className="h-6 w-6" strokeWidth={1.5} />
                  <span className="text-xs font-medium">Partner logo</span>
                </motion.li>
              ))}
        </motion.ul>
      </Container>
    </section>
  );
}

export function TestimonialsSection({ id = "testimonials" }: { id?: string }) {
  const hasQuotes = testimonials.length > 0;
  return (
    <section id={id} className="section-quiet">
      <Container>
        <SectionHeading
          eyebrow="Client Testimonials"
          title="What our clients say"
          intro={
            hasQuotes
              ? "Feedback from the manufacturers and distributors we supply across India and international markets."
              : "We are collecting feedback from our clients across India and international markets. Their testimonials will appear here."
          }
        />

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {hasQuotes
            ? testimonials.map((t) => (
                <motion.li key={`${t.name}-${t.company}`} variants={fadeSoft}>
                  <figure className="glass-card flex h-full flex-col p-7">
                    <Quote
                      className="h-6 w-6 text-accord-red"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <blockquote className="mt-4 flex-1 text-base leading-relaxed text-steel-200">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-6 border-t border-white/10 pt-4">
                      <p className="font-display text-[15px] font-semibold text-white">
                        {t.name}
                      </p>
                      <p className="mt-0.5 text-sm text-steel-400">
                        {t.designation}, {t.company}
                      </p>
                    </figcaption>
                  </figure>
                </motion.li>
              ))
            : Array.from({ length: TESTIMONIAL_PLACEHOLDERS }).map((_, i) => (
                <motion.li key={i} variants={fadeSoft} aria-hidden>
                  <div className="flex h-full flex-col rounded-2xl border border-dashed border-white/15 bg-ink-900 p-7">
                    <Quote className="h-6 w-6 text-accord-red/40" strokeWidth={1.75} />
                    <div className="mt-5 space-y-2.5">
                      <span className="block h-2.5 w-full rounded-full bg-white/[0.06]" />
                      <span className="block h-2.5 w-11/12 rounded-full bg-white/[0.06]" />
                      <span className="block h-2.5 w-4/5 rounded-full bg-white/[0.06]" />
                    </div>
                    <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-steel-500">
                        <UserRound className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <div className="text-xs leading-relaxed text-steel-500">
                        <p className="font-medium">Client name</p>
                        <p>Designation, Company</p>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
        </motion.ul>
      </Container>
    </section>
  );
}
