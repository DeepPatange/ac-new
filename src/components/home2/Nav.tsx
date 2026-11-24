"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { lenisStore } from "@/lib/lenis-store";
import { R, WRAP } from "./shared";

/** Desktop bar (xl+). Home and Contact live on the logo and the CTA. */
const BAR = [
  { label: "About", href: R.about },
  { label: "Products", href: R.products },
  { label: "Services", href: R.services },
  { label: "Industries", href: R.industries },
  { label: "Accord Interact", href: R.app },
  { label: "Partners", href: R.partners },
  { label: "Career", href: R.career },
  { label: "Blog", href: R.blog },
] as const;

/** Full list for the menu overlay (below xl). */
const MENU = [
  { label: "Home", href: R.home },
  ...BAR,
  { label: "Contact", href: R.contact },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === R.home ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Freeze the page behind the menu overlay.
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      lenisStore.current?.stop();
      root.style.overflow = "hidden";
    } else {
      lenisStore.current?.start();
      root.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = "";
      lenisStore.current?.start();
    };
  }, [open]);

  const close = () => {
    // Unfreeze synchronously so the global anchor handler (SmoothScroll),
    // which runs right after this click, finds Lenis live.
    lenisStore.current?.start();
    document.documentElement.style.overflow = "";
    setOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 h-[72px] bg-[#fff]/95 backdrop-blur-md transition-[border-color] duration-300 ${
          scrolled ? "border-b border-[#E6E6E6]" : "border-b border-transparent"
        }`}
      >
        <div className={`${WRAP} flex h-full items-center justify-between gap-6`}>
          <Link href={R.home} aria-label={`${siteConfig.name}, home`} className="shrink-0">
            <Image
              src="/v2/logo-horizontal.png"
              alt={siteConfig.name}
              width={1280}
              height={196}
              priority
              className="h-[32px] w-auto sm:h-[40px]"
            />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-6">
              {BAR.map((l) => {
                const active = isActive(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative text-[13px] transition-colors hover:text-[#0A0A0A] ${
                        active ? "font-medium text-[#0A0A0A]" : "text-[#5E5E5E]"
                      }`}
                    >
                      {l.label}
                      {active && <span aria-hidden className="absolute -bottom-2 left-0 h-[2px] w-full bg-accord-red" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={R.contact}
              className="hidden h-10 items-center border border-[#0A0A0A] px-5 text-[13px] font-medium text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-[#fff] sm:inline-flex"
            >
              Request a quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="v2-menu"
              className="flex h-10 items-center gap-2 px-1 text-[13px] font-medium text-[#0A0A0A] xl:hidden"
            >
              Menu
              <span aria-hidden className="flex flex-col gap-[5px]">
                <span className="block h-px w-5 bg-[#0A0A0A]" />
                <span className="block h-px w-5 bg-[#0A0A0A]" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu overlay (below xl) */}
      <div
        id="v2-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-50 flex flex-col bg-[#fff] transition-[opacity,visibility] duration-300 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className={`${WRAP} flex h-[72px] items-center justify-between`}>
          <Image src="/v2/logo-horizontal.png" alt="" width={1280} height={196} className="h-[30px] w-auto" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="h-10 px-1 text-[13px] font-medium text-[#0A0A0A]"
          >
            Close
          </button>
        </div>
        <nav aria-label="Menu" className={`${WRAP} flex-1 overflow-y-auto pt-4`}>
          <ol className="border-t border-[#E6E6E6]">
            {MENU.map((l, i) => {
              const active = isActive(l.href);
              return (
                <li key={l.href} className="border-b border-[#E6E6E6]">
                  <Link
                    href={l.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className="flex items-baseline gap-4 py-3.5"
                  >
                    <span className="w-8 text-[13px] font-light tabular-nums text-accord-red">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-sans text-[26px] font-medium uppercase leading-none tracking-[-0.03em] ${
                        active ? "text-accord-red" : "text-[#0A0A0A]"
                      }`}
                    >
                      {l.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
        <div className={`${WRAP} pb-8 pt-6 text-[13px] text-[#6B6B6B]`}>
          <a href={siteConfig.contact.phoneHref} className="block">
            {siteConfig.contact.phone}
          </a>
          <a href={siteConfig.contact.emailHref} className="mt-1 block">
            {siteConfig.contact.email}
          </a>
        </div>
      </div>
    </>
  );
}
