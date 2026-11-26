import Link from "next/link";
import { ArrowUpRight, FileDown } from "lucide-react";
import { cta, productListPdf, products } from "@/lib/site";
import { Fade } from "../primitives";
import { R, WRAP, enquire } from "../shared";
import { ButtonLink, Label, SplitHeading } from "../blocks";

/* The eight families as a numbered ledger. Custom Sourcing (kept last in
   site.ts) is the catch-all, so it closes the index as a red panel. */
export default function FamilyIndex() {
  const last = products[products.length - 1];
  const indexed = products.slice(0, -1);
  const count = String(products.length).padStart(2, "0");

  return (
    <section id="families" className={`${WRAP} py-12 lg:py-20`}>
      <SplitHeading
        red
        note="Each family is quoted on indent or from duty-paid stock in India. Share the grade, volume and destination, and we will send a quotation within one business day."
        title={[
          [{ text: "Eight" }, { text: "families,", tone: "light" }],
          [{ text: "one desk.", tone: "red" }],
        ]}
      />

      <ol className="mt-12 border-t border-[#E0E2E1] lg:mt-16">
        {indexed.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={enquire(p.slug)}
              aria-label={`${cta.enquire}: ${p.name}`}
              className="group relative grid grid-cols-12 items-center gap-x-4 gap-y-2 border-b border-[#E0E2E1] py-6 lg:py-8"
            >
              <span className="col-span-3 font-sans text-[clamp(2rem,4vw,3.5rem)] font-extralight leading-none tracking-[-0.04em] tabular-nums text-accord-red sm:col-span-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-9 font-sans text-[clamp(1.1rem,2.1vw,1.85rem)] font-medium uppercase leading-tight tracking-[-0.025em] text-[#3C3C3C] transition-transform duration-500 group-hover:translate-x-2 sm:col-span-5">
                {p.name}
              </span>
              <span className="col-span-9 col-start-4 text-[13px] leading-relaxed text-[#6D6D6D] sm:col-span-3 sm:col-start-auto">
                {p.desc}
              </span>
              <span className="col-span-9 col-start-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accord-red sm:col-span-2 sm:col-start-auto sm:justify-end">
                {cta.enquire}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                />
              </span>
              <span
                aria-hidden
                className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accord-red transition-transform duration-700 group-hover:scale-x-100"
              />
            </Link>
          </li>
        ))}
      </ol>

      {/* Closing panel: Custom Sourcing */}
      <Fade className="mt-3">
        <div className="grid gap-8 bg-accord-red p-8 text-[#fff] sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12">
          <div className="lg:col-span-8">
            <span className="font-sans text-[clamp(2rem,4vw,3.5rem)] font-extralight leading-none tracking-[-0.04em] tabular-nums text-[#fff]/80">
              {count}
            </span>
            <h3 className="mt-5 font-sans text-[clamp(1.9rem,3.6vw,3.25rem)] font-medium uppercase leading-[0.95] tracking-[-0.035em]">
              {last.name}
            </h3>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#fff]/90">{last.desc}</p>
            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#fff]/75">
              Product · Grade · Volume · Destination
            </p>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Link
              href={enquire(last.slug)}
              className="inline-flex h-12 items-center gap-2 bg-accord-red px-6 text-[14px] font-medium text-[#fff] transition-colors hover:bg-accord-redDark "
            >
              {cta.enquire}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </Fade>

      {/* Ledger meta: count, the client's PDF slot, and the primary CTA */}
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Label className="text-[#3C3C3C]">{count} families</Label>
        {/* CLIENT-INPUT slot: renders only when site.ts provides the file. */}
        {productListPdf ? (
          <a
            href={productListPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#3C3C3C] underline decoration-[#C4C6C5] underline-offset-4 hover:decoration-accord-red"
          >
            <FileDown className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            Download product list (PDF)
          </a>
        ) : null}
        <div className="sm:ml-auto">
          <ButtonLink href={R.contact} variant="outline">
            {cta.primary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
