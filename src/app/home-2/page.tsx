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
import { v2Meta } from "@/components/home2/shared";

/* Home 2: design preview of the Swiss / editorial direction (B&W
   photography, solid red fields, grotesk type). Part of the separate v2
   preview site; not linked from the live pages and kept out of search. */
export const metadata = v2Meta("Home");

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
