import Link from "next/link";
import { contactCopy, siteConfig } from "@/lib/site";
import { Fade, MaskLine } from "./primitives";
import { WRAP, R } from "./shared";

/* Contact — the page's full red field: oversized white call to action on the
   left, direct lines on the right. */
export default function ContactBand() {
  const c = siteConfig.contact;
  return (
    <section id="contact" className="relative overflow-hidden bg-accord-red text-[#fff]">
      <div className={`${WRAP} relative z-10 grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24`}>
        <div className="lg:col-span-7">
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#fff]/75">
            {contactCopy.eyebrow}
          </p>
          <h2 className="mt-6 font-sans text-[clamp(2.6rem,6.2vw,6rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em]">
            <MaskLine>Tell us</MaskLine>
            <MaskLine delay={0.08}>what you need</MaskLine>
            <MaskLine delay={0.16}>
              <span className="font-extralight">moved.</span>
            </MaskLine>
          </h2>
          <Fade delay={0.2}>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[#fff]/85">{contactCopy.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={R.contact}
                className="inline-flex h-12 items-center bg-[#fff] px-6 text-[14px] font-medium text-accord-red transition-colors hover:bg-[#EFF1F0]"
              >
                Request a quote
              </Link>
              <a
                href={c.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center border border-[#fff] px-6 text-[14px] font-medium text-[#fff] transition-colors hover:bg-[#fff] hover:text-accord-red"
              >
                WhatsApp our desk
              </a>
            </div>
          </Fade>
        </div>

        <Fade delay={0.15} className="lg:col-span-5 lg:border-l lg:border-[#fff]/30 lg:pl-10">
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#fff]/70">Call</dt>
              <dd className="mt-2">
                <a href={c.phoneHref} className="text-[clamp(1.25rem,2vw,1.6rem)] font-medium tracking-[-0.02em] hover:underline">
                  {c.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#fff]/70">Email</dt>
              <dd className="mt-2">
                <a href={c.emailHref} className="text-[clamp(1.25rem,2vw,1.6rem)] font-medium tracking-[-0.02em] hover:underline">
                  {c.email}
                </a>
              </dd>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#fff]/70">Office</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-[#fff]/90">
                {c.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <a
                  href={c.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block border-b border-[#fff]/60 pb-0.5 text-[13px] font-medium text-[#fff] hover:border-[#fff]"
                >
                  Open in Google Maps
                </a>
              </dd>
            </div>
          </dl>
        </Fade>
      </div>
    </section>
  );
}
