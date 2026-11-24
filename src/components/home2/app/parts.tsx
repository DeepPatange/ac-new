import Image from "next/image";
import { appMeta } from "@/lib/site";

/* Accord Interact building blocks for /app-2: Swiss store buttons (same real
   Google Play / App Store links as the live StoreBadges) and a phone frame. */

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden>
      <path fill="#00D3FF" d="M47 24c-6 4-10 11-10 20v424c0 9 4 16 10 20l236-232L47 24z" />
      <path fill="#00F076" d="M47 24c4-3 10-3 16 1l318 181-72 71L47 24z" />
      <path fill="#FFCE00" d="M381 206l73 42c16 9 16 27 0 36l-73 42-72-80 72-80z" />
      <path fill="#FF3A44" d="M309 286l72 71-318 181c-6 4-12 4-16 1l262-253z" />
    </svg>
  );
}

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

/** Both store buttons. `tone="dark"` = black buttons (on white);
 *  `tone="light"` = white buttons (on black or red fields). */
export function StoreButtons({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const base =
    "inline-flex h-14 items-center gap-3 px-5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accord-red focus-visible:ring-offset-2";
  const skin =
    tone === "dark"
      ? "bg-[#0A0A0A] text-[#fff] hover:bg-accord-red"
      : "bg-[#fff] text-[#0A0A0A] hover:bg-accord-red hover:text-[#fff]";
  const sub = tone === "dark" ? "text-[#fff]/65" : "text-[#6B6B6B]";
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={appMeta.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Get ${appMeta.name} on Google Play`}
        className={`${base} ${skin} group`}
      >
        <PlayGlyph className="h-6 w-6 shrink-0" />
        <span className="text-left leading-tight">
          <span className={`block text-[10px] uppercase tracking-[0.14em] ${sub} group-hover:text-current`}>
            Get it on
          </span>
          <span className="block text-[16px] font-medium">Google Play</span>
        </span>
      </a>
      <a
        href={appMeta.appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download ${appMeta.name} on the App Store`}
        className={`${base} ${skin} group`}
      >
        <AppleGlyph className="h-6 w-6 shrink-0" />
        <span className="text-left leading-tight">
          <span className={`block text-[10px] uppercase tracking-[0.14em] ${sub} group-hover:text-current`}>
            Download on the
          </span>
          <span className="block text-[16px] font-medium">App Store</span>
        </span>
      </a>
    </div>
  );
}

/** Dark phone bezel around a real app screenshot. */
export function PhoneFrame({
  src,
  priority = false,
  sizes = "(min-width: 1024px) 300px, 60vw",
}: {
  src: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.2rem] border border-[#000]/50 bg-[#141418] p-2 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)]">
      <div className="relative h-full w-full overflow-hidden rounded-[1.7rem]">
        <Image src={src} alt="" fill sizes={sizes} className="object-cover object-top" priority={priority} />
      </div>
      <span aria-hidden className="absolute left-1/2 top-2 h-4 w-24 -translate-x-1/2 rounded-b-xl bg-[#141418]" />
    </div>
  );
}
