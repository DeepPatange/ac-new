/* Chapter sets for the pencil-to-life scroll stories (ArtScroll).
   Scenes were generated in Canva (design "Accord v2 scene export", DAHbx6u_P7Y,
   one scene per page, exported as 2560 px JPGs) and
   processed with tools/artwork/derive.py. All copy comes from site data;
   industry chips are the real family mapping in industriesDetail. */

import { aboutCopy, industriesDetail, process, verticals } from "@/lib/site";
import { SERVICES } from "../services/data";
import { R } from "../shared";
import ArtScroll, { type Chapter } from "./ArtScroll";
import { INDUSTRY_SCENE, INDUSTRY_STORY_ID } from "./industryScenes";

function Heading({ kicker, lines }: { kicker: string; lines: [string, string, string?] }) {
  const [a, b, c] = lines;
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A8A8A] lg:col-span-4">
        <span className="mr-2 inline-block h-2 w-2 bg-accord-red align-middle" />
        {kicker}
      </p>
      <h2 className="font-sans text-[clamp(2.2rem,5.4vw,5rem)] font-medium uppercase leading-[0.92] tracking-[-0.045em] text-[#0A0A0A] lg:col-span-8 lg:text-right">
        {a} <span className="font-extralight text-[#A3A3A3]">{b}</span>
        {c ? (
          <>
            {" "}
            <span className="text-accord-red">{c}</span>
          </>
        ) : null}
      </h2>
    </div>
  );
}

/* ---------------------------------------------------------------- Home */

const HOME: Chapter[] = [
  {
    scene: "producer",
    kicker: "Producer",
    title: "Sourced producer-direct.",
    body: aboutCopy.pillars[0].desc,
    chips: ["Producer pricing", "Transparent terms", "No intermediate inventory"],
    alt: "Pencil drawing of a refinery with the distillation column rendered in colour",
  },
  {
    scene: "shipment",
    kicker: "Shipment",
    title: "Contracted, inspected, shipped.",
    body: process[2].desc,
    chips: ["LC", "DA", "DP", "COA on every lot"],
    alt: "Pencil drawing of a port with a red chemical tanker at the berth",
  },
  {
    scene: "storage",
    kicker: "Port storage",
    title: "Held in India, ready for you.",
    body: verticals[0].blurb,
    chips: ["Duty-paid stock", "Buy in INR", "Bonded storage"],
    alt: "Pencil drawing of a port tank terminal with storage tanks in colour",
  },
  {
    scene: "delivery",
    kicker: "Plant gate",
    title: "Delivered to your gate.",
    body: process[3].desc,
    chips: ["Customs clearance", "Marine insurance", "Inland logistics"],
    cta: { href: R.contact, label: "Request a quote" },
    alt: "Pencil drawing of a factory gate with a red tanker truck arriving",
  },
];

export function HomeJourney() {
  return (
    <ArtScroll
      ariaLabel="The journey of a consignment"
      chapters={HOME}
      vhPerChapter={110}
      heading={<Heading kicker="From producer to plant gate" lines={["The journey", "of a", "consignment"]} />}
    />
  );
}

/* ------------------------------------------------------------ Services */

const SERVICE_SCENES: { scene: string; kicker: string; chips: string[]; alt: string }[] = [
  { scene: "cha", kicker: "At the port", chips: ["Customs House Agent", "Cargo surveyor"], alt: "Pencil drawing of a customs yard with a surveyor inspecting a red ISO tank container" },
  { scene: "storage", kicker: "Storage", chips: ["Dedicated tanks", "Commingled tanks"], alt: "Pencil drawing of a port tank terminal with storage tanks in colour" },
  { scene: "jetty", kicker: "Discharge", chips: ["Pre-discharge survey", "Post-discharge survey", "Insurance"], alt: "Pencil drawing of a chemical jetty with marine loading arms connected to a ship" },
  { scene: "delivery", kicker: "Delivery", chips: ["Cargo insurance", "Onward delivery"], alt: "Pencil drawing of a factory gate with a red tanker truck arriving" },
  { scene: "rail", kicker: "Network", chips: ["PAN-India network", "Every consignment"], alt: "Pencil drawing of a rail corridor with a train of red tank wagons" },
];

const SERVICES_CH: Chapter[] = SERVICES.map((s, i) => ({
  scene: SERVICE_SCENES[i]?.scene ?? "storage",
  kicker: SERVICE_SCENES[i]?.kicker ?? "Service",
  title: s.title,
  body: s.desc,
  chips: SERVICE_SCENES[i]?.chips,
  alt: SERVICE_SCENES[i]?.alt ?? s.title,
  cta: i === SERVICES.length - 1 ? { href: R.contact, label: "Talk to our desk" } : undefined,
}));

export function ServicesJourney() {
  return (
    <ArtScroll
      ariaLabel="Comprehensive services"
      chapters={SERVICES_CH}
      vhPerChapter={100}
      heading={<Heading kicker="One accountable chain" lines={["From vessel", "to", "your gate"]} />}
    />
  );
}

/* ---------------------------------------------------------- Industries */



const INDUSTRY_CH: Chapter[] = industriesDetail.map((d) => ({
  scene: INDUSTRY_SCENE[d.name]?.scene ?? "producer",
  kicker: "Industry",
  title: d.name,
  body: `The product families Accord supplies to ${d.name.toLowerCase()} manufacturers:`,
  chips: d.families,
  alt: INDUSTRY_SCENE[d.name]?.alt ?? d.name,
}));

export function IndustriesStory() {
  return (
    <ArtScroll id={INDUSTRY_STORY_ID} ariaLabel="Industries we serve" chapters={INDUSTRY_CH} vhPerChapter={70} />
  );
}
