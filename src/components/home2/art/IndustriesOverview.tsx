"use client";

/* All ten industries at a glance, above the scroll story. Tapping a tile
   jumps straight into that industry's chapter (no waiting on animation). */

import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { industriesDetail } from "@/lib/site";
import { INDUSTRY_SCENE, INDUSTRY_STORY_ID } from "./industryScenes";

export default function IndustriesOverview() {
  const go = (index: number) =>
    window.dispatchEvent(new CustomEvent("artscroll:goto", { detail: { id: INDUSTRY_STORY_ID, index } }));

  return (
    <section aria-labelledby="ind-glance" className="mx-auto w-full max-w-[1440px] px-5 pb-12 pt-14 sm:px-8 lg:px-12 lg:pb-14 lg:pt-20">
      <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#888888]">
            <span className="mr-2 inline-block h-2 w-2 bg-accord-red align-middle" />
            {industriesDetail.length} industries at a glance
          </p>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#5A5A5A]">
            Pick an industry to jump straight to its story, or scroll on to see each one come to life.
          </p>
        </div>
        <h2
          id="ind-glance"
          className="font-sans text-[clamp(2.2rem,5.4vw,5rem)] font-medium uppercase leading-[0.92] tracking-[-0.045em] text-[#3C3C3C] lg:col-span-7 lg:text-right"
        >
          From our <span className="font-extralight text-[#888888]">families to</span>{" "}
          <span className="text-accord-red">your industry</span>
        </h2>
      </div>

      <ol className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
        {industriesDetail.map((d, i) => {
          const sc = INDUSTRY_SCENE[d.name];
          return (
            <li key={d.name}>
              <button
                type="button"
                onClick={() => go(i)}
                className="group block w-full overflow-hidden bg-[#EFF1F0] text-left transition-colors hover:bg-accord-red"
              >
                <span className="relative block aspect-[16/10] overflow-hidden">
                  {sc && (
                    <Image
                      src={`/v2/scenes/${sc.scene}.jpg`}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 46vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                  )}
                  <span className="absolute left-0 top-0 bg-[#fff] px-2.5 py-1 text-[11px] font-medium tabular-nums text-[#3C3C3C]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className="flex items-start justify-between gap-2 p-3.5 sm:p-4">
                  <span>
                    <span className="block text-[14px] font-medium leading-snug text-[#3C3C3C] group-hover:text-[#fff] sm:text-[15px]">
                      {d.name}
                    </span>
                    <span className="mt-1 block text-[11px] leading-snug text-[#6D6D6D] group-hover:text-[#fff]/70">
                      {d.families.join(" · ")}
                    </span>
                  </span>
                  <ArrowDownRight className="mt-0.5 h-4 w-4 shrink-0 text-accord-red transition-colors group-hover:text-[#fff]" strokeWidth={2} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
