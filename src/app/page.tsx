import Shell from "@/components/home2/Shell";
import Hero from "@/components/home2/Hero";
import WhatWeDo from "@/components/home2/WhatWeDo";
import { HomeJourney } from "@/components/home2/art/stories";
import Figures from "@/components/home2/Figures";
import Statement from "@/components/home2/Statement";
import Products from "@/components/home2/Products";
import Scene from "@/components/home2/Scene";
import Industries from "@/components/home2/Industries";
import Process from "@/components/home2/Process";
import Record from "@/components/home2/Record";
import Presence from "@/components/home2/Presence";
import ContactBand from "@/components/home2/ContactBand";
import type { Metadata } from "next";

/* Home: Swiss / editorial direction (B&W photography, solid red fields,
   grotesk type). No title here, so the tab shows the site's full SEO title
   from the root layout. Kept out of search while the site is in review. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function HomeTwo() {
  return (
    <Shell>
      <Hero />
      <WhatWeDo />
      <HomeJourney />
      <Figures />
      <Statement />
      <Products />
      <Scene />
      <Industries />
      <Process />
      <Record />
      <Presence />
      <ContactBand />
    </Shell>
  );
}
