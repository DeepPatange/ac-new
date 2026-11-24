import Image from "next/image";
import Link from "next/link";
import { appMeta } from "@/lib/site";
import { DISPLAY, Label, SplitHeading, TitleLines } from "../blocks";
import { Fade, Grow, MaskLine, Square } from "../primitives";
import { R, WRAP } from "../shared";
import { PhoneFrame, StoreButtons } from "./parts";

/* /app-2 sections. Content and screenshots are the client's own Google Play
   listing (site.ts appMeta). */

const pad = (n: number) => String(n).padStart(2, "0");

/* -------------------------------------------------------------------------- */

export function AppHero() {
  const stats = [
    { value: `${appMeta.rating}★`, label: "Rating" },
    { value: appMeta.downloads, label: "Downloads" },
    { value: appMeta.category, label: "Category" },
  ];
  return (
    <section className={`${WRAP} pb-14 pt-6 lg:pb-20 lg:pt-8`}>
      <nav aria-label="Breadcrumb" className="text-[12px] text-[#8A8A8A]">
        <Link href={R.home} className="transition-colors hover:text-[#0A0A0A]">
          Home
        </Link>
        <span aria-hidden className="mx-2 text-[#C8C8C8]">
          /
        </span>
        <span aria-current="page" className="text-[#0A0A0A]">
          Accord Interact
        </span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col lg:col-span-7 lg:justify-between">
          <Fade className="flex items-center gap-4">
            <span className="relative h-14 w-14 overflow-hidden rounded-2xl ring-1 ring-[#0A0A0A]/10">
              <Image src="/app/icon.png" alt={`${appMeta.name} app icon`} fill sizes="56px" className="object-cover" priority />
            </span>
            <span>
              <span className="block text-[15px] font-medium leading-snug text-[#0A0A0A]">{appMeta.name}</span>
              <span className="block text-[12px] text-[#8A8A8A]">Mobile app for the chemical trade</span>
            </span>
          </Fade>

          <div className="mt-12 lg:mt-16">
            <h1 className={`${DISPLAY} text-[clamp(2.4rem,6vw,5.75rem)]`}>
              <TitleLines
                lines={[
                  [{ text: "The trading" }],
                  [{ text: "desk," }, { text: "in your", tone: "light" }],
                  [{ text: "pocket.", tone: "red" }],
                ]}
              />
            </h1>

            <Fade delay={0.3}>
              <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-[#5E5E5E] sm:text-[17px]">{appMeta.tagline}</p>

              <dl className="mt-8 grid max-w-lg grid-cols-3 border-t border-[#E6E6E6]">
                {stats.map((s, i) => (
                  <div key={s.label} className={`pt-4 ${i > 0 ? "border-l border-[#E6E6E6] pl-4" : ""}`}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="block font-sans text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-none tracking-[-0.04em] text-[#0A0A0A]">
                        {s.value}
                      </span>
                      <span className="mt-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-[#8A8A8A]">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <StoreButtons />
              </div>
            </Fade>
          </div>
        </div>

        {/* Red field with the phone */}
        <div className="relative lg:col-span-5">
          <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden py-12 sm:min-h-[600px] lg:h-full">
            <Grow axis="y" origin="bottom" duration={1.2} className="absolute inset-0" />
            <Fade delay={0.35} className="relative w-[62%] max-w-[17.5rem]">
              <PhoneFrame src={appMeta.screens[1].src} priority />
            </Fade>
            <p className="absolute bottom-5 left-5 max-w-[60%] text-[12px] font-medium leading-snug text-[#fff] sm:bottom-6 sm:left-6">
              {appMeta.screens[1].label}
            </p>
            <p className="absolute bottom-6 right-6 hidden text-[11px] uppercase tracking-[0.14em] text-[#fff]/75 sm:block">
              Updated {appMeta.updated}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function AppFeatures() {
  return (
    <section aria-label="What the app does" className={`${WRAP} border-t border-[#E6E6E6] py-12 lg:py-20`}>
      <SplitHeading
        red
        title={[[{ text: "One app" }], [{ text: "for the", tone: "light" }], [{ text: "whole trade.", tone: "red" }]]}
        note="Built for chemical-industry professionals: customers, brokers, suppliers and sales teams."
      />
      <ol className="mt-12 border-t border-[#E6E6E6] lg:mt-16">
        {appMeta.features.map((f, i) => (
          <li key={f.title}>
            <Fade delay={(i % 3) * 0.04}>
              <div className="group relative grid grid-cols-12 items-start gap-x-4 gap-y-3 border-b border-[#E6E6E6] py-7 lg:items-center lg:py-8">
                <span className="col-span-3 font-sans text-[clamp(2.25rem,4.5vw,4rem)] font-extralight leading-none tracking-[-0.04em] tabular-nums text-accord-red sm:col-span-2">
                  {pad(i + 1)}
                </span>
                <h3 className="col-span-9 font-sans text-[clamp(1.15rem,2.1vw,1.9rem)] font-medium uppercase leading-tight tracking-[-0.025em] text-[#0A0A0A] transition-transform duration-500 group-hover:translate-x-2 sm:col-span-5">
                  {f.title}
                </h3>
                <p className="col-span-9 col-start-4 text-[13px] leading-relaxed text-[#6B6B6B] sm:col-span-5 sm:col-start-auto sm:pl-4">
                  {f.desc}
                </p>
                <span
                  aria-hidden
                  className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accord-red transition-transform duration-700 group-hover:scale-x-100"
                />
              </div>
            </Fade>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function AppScreens() {
  return (
    <section aria-label="App screenshots" className="bg-[#F3F3F3] py-12 lg:py-20">
      <div className={WRAP}>
        <SplitHeading
          title={[[{ text: "A look" }], [{ text: "inside", tone: "red" }]]}
          note="Built for how the desk actually works."
        />
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:mt-16 lg:grid-cols-4">
          {appMeta.screens.map((s, i) => (
            <li key={s.src}>
              <Fade delay={i * 0.06}>
                <figure>
                  <div className="mx-auto max-w-[17rem]">
                    <PhoneFrame src={s.src} sizes="(min-width: 1024px) 272px, 45vw" />
                  </div>
                  <figcaption className="mt-5 flex gap-3 border-t border-[#DADADA] pt-3">
                    <span className="text-[12px] font-medium tabular-nums text-accord-red">{pad(i + 1)}</span>
                    <span className="text-[13px] leading-snug text-[#2B2B2B]">{s.label}</span>
                  </figcaption>
                </figure>
              </Fade>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function AppRoles() {
  return (
    <section aria-labelledby="roles-heading" className="bg-[#0A0A0A] text-[#fff]">
      <div className={`${WRAP} grid gap-14 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24`}>
        <div className="lg:col-span-7">
          <Square red />
          <Label className="mt-5 text-[#9A9A9A]">Personalised for your role</Label>
          <h2
            id="roles-heading"
            className="mt-5 font-sans text-[clamp(2.4rem,5.4vw,5rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em]"
          >
            <MaskLine>Tailored</MaskLine>
            <MaskLine delay={0.08}>
              <span className="font-extralight text-[#8A8A8A]">for every</span>
            </MaskLine>
            <MaskLine delay={0.16}>
              <span className="text-accord-red">role.</span>
            </MaskLine>
          </h2>
          <ol className="mt-10 border-t border-[#fff]/15">
            {appMeta.roles.map((r, i) => (
              <li key={r} className="flex items-baseline gap-5 border-b border-[#fff]/15 py-4">
                <span className="w-8 text-[13px] font-light tabular-nums text-accord-red">{pad(i + 1)}</span>
                <span className="font-sans text-[clamp(1.4rem,2.4vw,2rem)] font-light tracking-[-0.03em]">{r}</span>
              </li>
            ))}
          </ol>
        </div>

        <Fade delay={0.15} className="flex flex-col justify-end lg:col-span-5 lg:border-l lg:border-[#fff]/15 lg:pl-10">
          <span className="relative h-20 w-20 overflow-hidden rounded-3xl ring-1 ring-[#fff]/15">
            <Image src="/app/icon.png" alt={`${appMeta.name} app icon`} fill sizes="80px" className="object-cover" />
          </span>
          <p className="mt-6 font-sans text-[clamp(1.6rem,2.6vw,2.25rem)] font-medium leading-tight tracking-[-0.03em]">
            Download {appMeta.name}.
          </p>
          <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#9A9A9A]">
            Free to download · {appMeta.rating}★ · {appMeta.downloads} installs · Updated {appMeta.updated}.
          </p>
          <div className="mt-8">
            <StoreButtons tone="light" />
          </div>
        </Fade>
      </div>
    </section>
  );
}
