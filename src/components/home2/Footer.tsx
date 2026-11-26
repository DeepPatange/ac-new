import Image from "next/image";
import Link from "next/link";
import { footerCopy, products, siteConfig } from "@/lib/site";
import { R, WRAP, enquire } from "./shared";

const COMPANY = [
  { label: "Home", href: R.home },
  { label: "About us", href: R.about },
  { label: "Services", href: R.services },
  { label: "Industries served", href: R.industries },
  { label: "Career", href: R.career },
  { label: "Partners", href: R.partners },
  { label: "Blog", href: R.blog },
  { label: "Contact us", href: R.contact },
];

export default function Footer() {
  const c = siteConfig.contact;
  return (
    <footer className="border-t border-[#D8DAD9] bg-[#E5E7E6] text-[#3C3C3C]">
      <div className={`${WRAP} grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8`}>
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href={R.home} aria-label={`${siteConfig.name}, home`} className="inline-block">
            <Image
              src="/v2/logo-horizontal.png"
              alt={siteConfig.name}
              width={1280}
              height={196}
              className="h-10 w-auto"
            />
          </Link>
          <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-[#5A5A5A]">{footerCopy.oneLiner}</p>
        </div>

        <nav aria-label="Company" className="lg:col-span-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#888888]">Company</p>
          <ul className="mt-5 space-y-2.5">
            {COMPANY.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[14px] text-[#3C3C3C] transition-colors hover:text-accord-red">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Products" className="lg:col-span-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#888888]">Products</p>
          <ul className="mt-5 space-y-2.5">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={enquire(p.slug)} className="text-[14px] text-[#3C3C3C] transition-colors hover:text-accord-red">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#888888]">Desk</p>
          <div className="mt-5 space-y-2.5 text-[14px] text-[#3C3C3C]">
            <a href={c.phoneHref} className="block hover:text-accord-red">
              {c.phone}
            </a>
            <a href={c.emailHref} className="block hover:text-accord-red">
              {c.email}
            </a>
          </div>
          <Link
            href={R.app}
            className="group mt-8 flex items-center justify-between border border-[#D8DAD9] bg-[#fff] p-4 transition-colors hover:border-accord-red"
          >
            <span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#888888]">App</span>
              <span className="mt-1 block text-[15px] font-medium">Accord Interact</span>
            </span>
            <span className="h-2.5 w-2.5 bg-accord-red transition-transform group-hover:rotate-45" />
          </Link>
        </div>
      </div>

      <div className="border-t border-[#D8DAD9]">
        <div className={`${WRAP} flex flex-col gap-3 py-6 text-[12px] text-[#6D6D6D] sm:flex-row sm:items-center sm:justify-between`}>
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <Link href="#top" className="hover:text-accord-red">
            {footerCopy.backToTop}
          </Link>
        </div>
      </div>
    </footer>
  );
}
