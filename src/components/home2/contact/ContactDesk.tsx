"use client";

/* v2 contact desk: direct lines + office map on the left, the enquiry form on
   the right. The form is the SAME contract as the live /contact-us form:
   same fields, ?product=<slug> pre-fill, POST /api/contact with the product
   family folded into the message, same success / error handling and the same
   per-field invalid flags (set only after a failed submit). */

import mapPoints from "@/lib/map-points.json";
import { Suspense, useCallback, useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { contactMeta, cta, products, siteConfig } from "@/lib/site";
import { Fade } from "../primitives";

/* -------------------------------------------------------------------------- */
/*  Form state (mirrors ContactContent.tsx)                                   */
/* -------------------------------------------------------------------------- */

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  /** Product-family slug from site.ts `products`; "" = general enquiry. */
  product: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: "", company: "", email: "", phone: "", product: "", message: "" };

interface ApiResponse {
  ok: boolean;
  message?: string;
  error?: string;
}

function isKnownSlug(slug: string): boolean {
  return products.some((p) => p.slug === slug);
}

/** Lifts ?product=<slug> into the form; isolated so useSearchParams sits in
    its own <Suspense> boundary and the page stays statically prerendered. */
function ProductParam({ onSlug }: { onSlug: (slug: string) => void }) {
  const slug = useSearchParams().get("product");
  useEffect(() => {
    if (slug && isKnownSlug(slug)) onSlug(slug);
  }, [slug, onSlug]);
  return null;
}

const input =
  "w-full border border-[#D8DAD9] bg-[#fff] px-4 py-3 text-[15px] text-[#3C3C3C] placeholder:text-[#888888] transition-colors duration-200 hover:border-[#888888] focus:border-accord-red focus:outline-none focus-visible:ring-1 focus-visible:ring-[#3C3C3C] aria-[invalid=true]:border-accord-red aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-accord-red";

const label = "mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-[#5A5A5A]";

function Req() {
  return (
    <span aria-hidden className="text-accord-red">
      {" "}
      *
    </span>
  );
}

/* -------------------------------------------------------------------------- */

export default function ContactDesk() {
  const { contact } = siteConfig;

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const selectProduct = useCallback((slug: string) => {
    setForm((prev) => ({ ...prev, product: slug }));
  }, []);

  // Flag only the specific field(s) at fault, and only after a failed submit.
  const errored = status === "error";
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameInvalid = errored && form.name.trim().length === 0;
  const emailInvalid = errored && !emailRe.test(form.email.trim());
  const messageInvalid = errored && form.message.trim().length === 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    const productName = products.find((p) => p.slug === form.product)?.name ?? "";

    // /api/contact only forwards { name, email, phone, company, message }:
    // fold the selected family into the message so it is never lost, and send
    // `product` alongside for when the route grows a dedicated field.
    const message = productName ? `Product family: ${productName}\n\n${form.message}` : form.message;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          message,
          product: productName || undefined,
        }),
      });

      const data = (await res.json().catch(() => null)) as ApiResponse | null;

      if (res.ok && data?.ok) {
        setStatus("success");
        setFeedback(data.message ?? "Thank you. We'll be in touch shortly.");
        setForm(EMPTY_FORM);
      } else {
        setStatus("error");
        setFeedback(data?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please check your connection and retry.");
    }
  }

  /* Small print: CLIENT-INPUT slots, each rendered only once confirmed. */
  const smallPrint: string[] = [
    contactMeta.gstin ? `GSTIN ${contactMeta.gstin}` : "",
    contactMeta.iec ? `IEC ${contactMeta.iec}` : "",
    contactMeta.hours,
  ].filter((s) => s.length > 0);

  const lines = [
    { label: "Call", value: contact.phone, href: contact.phoneHref, external: false },
    { label: "Email", value: contact.email, href: contact.emailHref, external: false },
    { label: "WhatsApp", value: contact.phone, href: contact.whatsappHref, external: true },
  ];

  return (
    <>
      <Suspense fallback={null}>
        <ProductParam onSlug={selectProduct} />
      </Suspense>

      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-8">
        {/* LEFT: direct lines + office */}
        <Fade className="lg:col-span-5">
          <dl className="border-t border-[#3C3C3C]">
            {lines.map((l) => (
              <div key={l.label} className="grid grid-cols-[96px_1fr] items-baseline gap-4 border-b border-[#E0E2E1] py-5 sm:grid-cols-[120px_1fr]">
                <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#888888]">{l.label}</dt>
                <dd className="min-w-0">
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex max-w-full items-center gap-2 font-sans text-[clamp(1rem,1.8vw,1.45rem)] font-medium [overflow-wrap:anywhere] tracking-[-0.02em] text-[#3C3C3C] transition-colors hover:text-accord-red"
                  >
                    {l.value}
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-accord-red opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-[96px_1fr] items-baseline gap-4 border-b border-[#E0E2E1] py-5 sm:grid-cols-[120px_1fr]">
              <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#888888]">Office</dt>
              <dd>
                <address className="text-[15px] not-italic leading-relaxed text-[#3C3C3C]">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </dd>
            </div>
          </dl>

          {/* Office map: grey dotted world, Mumbai pin, opens Google Maps */}
          <a
            href={contact.mapHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open our Mumbai office (${contact.addressLines[0].replace(/,\s*$/, "")}) in Google Maps`}
            className="group mt-8 block bg-[#EFF1F0] transition-colors duration-300 hover:bg-[#E5E7E6]"
          >
            <div className="relative w-full" style={{ aspectRatio: String(mapPoints.aspect ?? 1.98) }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/world-dots.svg" alt="" aria-hidden className="absolute inset-0 h-full w-full" draggable={false} />
              <span className="absolute" style={{ left: `${mapPoints.hq.x}%`, top: `${mapPoints.hq.y}%` }}>
                <span className="absolute -left-[11px] -top-[11px] h-[22px] w-[22px] rounded-full bg-accord-red/15" />
                <span className="absolute -left-[5px] -top-[5px] h-2.5 w-2.5 rounded-full bg-accord-red" />
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#3C3C3C] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#fff]">
                  Mumbai HQ
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-[#E0E2E1] px-5 py-4">
              <span className="text-[13px] font-medium text-[#3C3C3C]">Open in Google Maps</span>
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 text-accord-red transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </a>
        </Fade>

        {/* RIGHT: enquiry form */}
        <Fade delay={0.1} className="lg:col-span-7">
          <div className="bg-[#EFF1F0] p-6 sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-sans text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium tracking-[-0.025em] text-[#3C3C3C]">
                Send an enquiry
              </h3>
              <p className="text-[12px] text-[#6D6D6D]">
                Fields marked <span className="text-accord-red">*</span> are required.
              </p>
            </div>

            <form noValidate onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="v2-contact-name" className={label}>
                    Name
                    <Req />
                  </label>
                  <input
                    id="v2-contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={nameInvalid}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your full name"
                    className={input}
                  />
                </div>
                <div>
                  <label htmlFor="v2-contact-company" className={label}>
                    Company
                  </label>
                  <input
                    id="v2-contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Company name"
                    className={input}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="v2-contact-email" className={label}>
                    Email
                    <Req />
                  </label>
                  <input
                    id="v2-contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={emailInvalid}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@company.com"
                    className={input}
                  />
                </div>
                <div>
                  <label htmlFor="v2-contact-phone" className={label}>
                    Phone
                  </label>
                  <input
                    id="v2-contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+91 ..."
                    className={input}
                  />
                </div>
              </div>

              {/* Product / enquiry type: pre-fills from ?product=<slug> */}
              <div>
                <label htmlFor="v2-contact-product" className={label}>
                  Product / enquiry type
                </label>
                <div className="relative">
                  <select
                    id="v2-contact-product"
                    name="product"
                    value={form.product}
                    onChange={(e) => update("product", e.target.value)}
                    className={`${input} cursor-pointer appearance-none pr-10`}
                  >
                    <option value="">General enquiry</option>
                    {products.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6D6D6D]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="v2-contact-message" className={label}>
                  Message
                  <Req />
                </label>
                <textarea
                  id="v2-contact-message"
                  name="message"
                  rows={5}
                  required
                  aria-invalid={messageInvalid}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Product, grade, volume and destination…"
                  className={`${input} resize-y`}
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group mt-2 inline-flex h-14 w-full items-center justify-between bg-accord-red px-6 text-[15px] font-medium text-[#fff] transition-colors duration-300 hover:bg-accord-redDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accord-red focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF1F0] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#3C3C3C]"
              >
                {status === "submitting" ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Sending…
                  </span>
                ) : (
                  <>
                    {cta.submit}
                    <ArrowRight
                      aria-hidden
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              {(status === "success" || status === "error") && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  aria-live="polite"
                  className={`flex items-start gap-3 border-l-[3px] bg-[#fff] px-4 py-3 text-[14px] leading-relaxed text-[#3C3C3C] ${
                    status === "success" ? "border-[#3C3C3C]" : "border-accord-red"
                  }`}
                >
                  {status === "success" ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#3C3C3C]" aria-hidden />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accord-red" aria-hidden />
                  )}
                  {feedback}
                </motion.p>
              )}
            </form>
          </div>
        </Fade>
      </div>

      {/* Small print: renders only for confirmed client values */}
      {smallPrint.length > 0 && (
        <p className="mt-10 border-t border-[#E0E2E1] pt-5 text-[12px] tabular-nums tracking-[0.08em] text-[#6D6D6D]">
          {smallPrint.join(" · ")}
        </p>
      )}
    </>
  );
}
