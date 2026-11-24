"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { Fade, MaskLine, Square } from "./primitives";
import { R, WRAP } from "./shared";
import { PORTS } from "./services/data";

/* The client's Spline port scene as a full-bleed band, with a Swiss caption
   card over it. Same loading rules as the live hero:
   - the pre-tinted poster renders instantly (and is all WebKit / reduced
     motion ever get: Safari and iOS can't apply the red tint filter to WebGL);
   - the ~4.2MB Spline chunk loads only when the band nears the viewport and
     the browser is idle;
   - the render loop pauses while the band is off screen. */

const SplineScene = dynamic(() => import("@/components/three/SplineScene"), { ssr: false });

const LOCAL_SCENE = "/spline/hero_banner_for_transport_and_logistics_company_gmw_24_25.spline";
const POSTER = "/spline/hero-poster.webp";

function webkitIgnoresCanvasFilter() {
  const ua = navigator.userAgent;
  return /AppleWebKit\//.test(ua) && !/(Chrome|Chromium)\//.test(ua);
}

/* Source ports from the Services page data (kept in one place). */
const LEGS = PORTS;

export default function Scene() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const near = useInView(ref, { margin: "600px 0px 600px 0px" });
  const active = useInView(ref, { margin: "200px 0px 200px 0px" });
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (load || !near || reduced || webkitIgnoresCanvasFilter()) return;
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idle = 0;
    let timer = 0;
    const start = () => setLoad(true);
    if (w.requestIdleCallback) idle = w.requestIdleCallback(start, { timeout: 2000 });
    else timer = window.setTimeout(start, 800);
    return () => {
      if (idle && w.cancelIdleCallback) w.cancelIdleCallback(idle);
      if (timer) clearTimeout(timer);
    };
  }, [near, reduced, load]);

  return (
    <section ref={ref} aria-labelledby="scene-heading" className="relative overflow-hidden bg-[#ECECEC]">
      <div className="relative h-[520px] sm:h-[620px] lg:h-[760px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image src={POSTER} alt="" fill sizes="100vw" className="select-none object-cover object-center" />
          {load && (
            <div className="absolute inset-0">
              <SplineScene scene={siteConfig.splineSceneUrl || LOCAL_SCENE} active={active} />
            </div>
          )}
        </div>

        {/* Caption card */}
        <div className={`${WRAP} pointer-events-none relative flex h-full items-end pb-6 sm:pb-10 lg:pb-12`}>
          <Fade className="pointer-events-auto w-full max-w-[560px] bg-[#fff] p-6 sm:p-8">
            <Square red />
            <h2
              id="scene-heading"
              className="mt-5 font-sans text-[clamp(1.9rem,3.4vw,3rem)] font-medium uppercase leading-[0.92] tracking-[-0.04em] text-[#0A0A0A]"
            >
              <MaskLine>
                Six <span className="font-extralight text-[#A3A3A3]">source</span> ports.
              </MaskLine>
              <MaskLine delay={0.08}>
                <span className="text-accord-red">One desk.</span>
              </MaskLine>
            </h2>
            <ol className="mt-6 grid grid-cols-3 gap-x-4 gap-y-3 border-t border-[#E6E6E6] pt-4 sm:grid-cols-6">
              {LEGS.map((l, i) => (
                <li key={l} className="text-[12px] leading-snug text-[#5E5E5E]">
                  <span className="block text-[11px] font-medium tabular-nums text-accord-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l}
                </li>
              ))}
            </ol>
            <Link
              href={R.services}
              className="mt-6 inline-block text-[12px] font-medium text-[#0A0A0A] underline decoration-[#C8C8C8] underline-offset-4 hover:decoration-[#0A0A0A]"
            >
              Our port and logistics network
            </Link>
          </Fade>
        </div>
      </div>
    </section>
  );
}
