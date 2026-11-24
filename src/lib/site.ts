/**
 * Accord Chemical Corporation — central content + config.
 * Single source of truth. Section components import from here so copy stays
 * consistent and the client can edit content in one place.
 *
 * Number canon (do not contradict anywhere). Source: client "SALES DATA.xlsx"
 * (consolidated), USD converted at ₹94.20 / USD (RBI reference rate):
 *   198,000+ MT (FY 2025-26) · $153M / ₹1,445 Cr (FY 2025-26) · 60+ countries ·
 *   500+ active clients · 3,000+ customers served · tenure via yearsInBusiness().
 * Every USD figure on the site, including the historical growth series, is
 * INR ÷ USD_INR_RATE. Change the rate in ONE place: USD_INR_RATE below.
 *
 * Client-input slots (empty until the client supplies real data — sections
 * must render nothing for empty slots, never placeholders or invented facts):
 *   credibility.memberships / logos / testimonial · contactMeta.gstin / iec /
 *   hours · productListPdf · siteConfig.social.* · legal.cin / gst.
 */

export const FOUNDING_YEAR = 2009;

/** USD/INR conversion used for every USD figure (RBI reference rate). */
export const USD_INR_RATE = 94.2;

/** Latest reported financial year for the headline figures. */
export const LATEST_FY = "FY 2025-26";

/** Tenure, computed — never hardcode a year count anywhere in copy. */
export function yearsInBusiness(): number {
  return new Date().getFullYear() - FOUNDING_YEAR;
}

export const siteConfig = {
  name: "Accord Chemical Corporation",
  legalName: "Accord Chemicals Private Limited",
  tagline: "Petrochemicals traded across 60+ countries from Mumbai, since 2009.",
  established: FOUNDING_YEAR,
  description:
    "Mumbai-based petrochemical trading house engaged in the import, export and indenting of commodity and specialty petrochemicals. Since 2009, Accord has grown to 198,000+ metric tons a year across 60+ countries.",
  /**
   * Paste a PUBLISHED Spline runtime URL here (ends in .splinecode) to render
   * the client's real Spline hero. While empty, the custom WebGL logistics
   * scene is shown instead. See README → "Wiring the Spline scene".
   * e.g. "https://prod.spline.design/XXXXXXXX/scene.splinecode"
   */
  splineSceneUrl: "",
  contact: {
    addressLines: [
      "Kanakia Western Edge II,",
      "A-405, Western Express Highway,",
      "Behind Metro Store, Borivali East,",
      "Mumbai, Maharashtra 400066.",
    ],
    phone: "+91-7710005176",
    phoneHref: "tel:+917710005176",
    email: "info@accordchemicals.com",
    emailHref: "mailto:info@accordchemicals.com",
    whatsappHref: "https://wa.me/917710005176",
    /** Exact Google Business listing — dark map card links here. */
    mapHref: "https://www.google.com/maps/search/?api=1&query=Kanakia+Western+Edge+II%2C+Borivali+East%2C+Mumbai",
  },
  /**
   * Social profiles — EMPTY until the client supplies real URLs.
   * Footer renders an icon only when its value is a non-empty string.
   */
  social: {
    facebook: "",
    linkedin: "",
  },
  /** Relationship unconfirmed — footer renders "Site by {poweredBy}". */
  poweredBy: "Itarsia India Limited",
  /** Legal registration slots — render only when confirmed by the client. */
  legal: {
    cin: "",
    gst: "",
  },
} as const;

/** Nav — labels and order mirror the page's section order EXACTLY. */
export const nav = [
  { label: "Home", href: "#home" },
  { label: "Accord Interact", href: "/app" },
  { label: "About Us", href: "/about-us" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Industries Served", href: "/industries-served" },
  { label: "Career", href: "/career" },
  { label: "Partners", href: "/partners" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

/**
 * CTA vocabulary — the ONLY conversion verbs allowed anywhere on the page.
 * Sections import these; never write CTA labels inline.
 */
export const cta = {
  /** Primary conversion verb — navbar, hero primary, products, per-family Enquire. */
  primary: { label: "Request a quote", href: "#contact" },
  /** Secondary — hero ghost CTA. */
  secondary: { label: "Explore products", href: "#products" },
  /** Relationship verb — footer red-field band button ONLY. */
  desk: { label: "Talk to our desk", href: "#contact" },
  /** Contact form submit label. */
  submit: "Send enquiry",
  /** Per-family enquire label (Products grid rows). */
  enquire: "Enquire",
} as const;

/** Accord Interact — the company's Android trading app (Google Play). */
export const appMeta = {
  name: "Accord Interact",
  packageId: "com.accord.accordinteract",
  url: "https://play.google.com/store/apps/details?id=com.accord.accordinteract",
  appStoreUrl: "https://apps.apple.com/in/app/accord-interact/id6756520729",
  tagline:
    "The all-in-one platform for chemical-industry professionals, connecting customers, brokers, suppliers and sales teams to trade smarter and stay informed.",
  rating: "5.0",
  downloads: "100+",
  category: "Business",
  updated: "18 Feb 2026",
  /** icon key maps to a lucide-react icon in AppContent. */
  features: [
    {
      icon: "LineChart",
      title: "Live market prices",
      desc: "Real-time pricing across domestic, China, import/export, aromatics and Singapore (SGX) markets by port, with ready & incoming stock and interactive charts from 1 day to 5 years.",
    },
    {
      icon: "Handshake",
      title: "Seamless trading",
      desc: "Place buy orders, submit bids and negotiate directly in-app on packing, delivery, port, tax and payment terms, with a transparent counteroffer-to-approval workflow.",
    },
    {
      icon: "Briefcase",
      title: "Broker & enquiry management",
      desc: "Brokers submit enquiries on behalf of multiple companies, track negotiations and manage their whole portfolio from one dedicated dashboard.",
    },
    {
      icon: "Ship",
      title: "Supplier collaboration",
      desc: "Suppliers receive product requests and submit detailed quotes covering price, currency, terms, load/discharge ports, origin, make, ETA and vessel details.",
    },
    {
      icon: "MessagesSquare",
      title: "Real-time chat",
      desc: "Message your assigned salesperson or team directly. Group chats, read receipts, typing indicators and instant notifications keep everyone aligned.",
    },
    {
      icon: "Newspaper",
      title: "Industry intelligence",
      desc: "Curated news and blog articles, plant-shutdown calendars, manufacturer capacity data and a built-in currency converter.",
    },
  ],
  roles: ["Customers", "Brokers", "Suppliers", "Sales teams"],
  screens: [
    { src: "/app/screen-1.webp", label: "Transactions: orders, bids & enquiries" },
    { src: "/app/screen-2.webp", label: "Live market data & price charts" },
    { src: "/app/screen-3.webp", label: "Industry news & intelligence" },
    { src: "/app/screen-4.webp", label: "Trading tools & calculators" },
  ],
} as const;


/** Hero overlay copy — Spline scene + text overlay ONLY. */
export const hero = {
  eyebrow: "Mumbai · Est. 2009 · 60+ countries",
  headline: "Pioneering Petrochemical Excellence Since 2009",
  /** The words rendered in accord-red within the headline (accent → end). */
  headlineAccent: "Since 2009",
  subtext:
    "Accord Chemical Corporation, established in 2009, is a company actively engaged in Trading, Indenting, Distribution, Imports & Exports of various petrochemicals.",
  trustChip: "Trusted since 2009 · 500+ active clients",
} as const;

/** 01 — About: "One desk from indent to delivery." */
export const aboutCopy = {
  eyebrow: "About Us",
  heading: "One desk from indent to delivery.",
  body: [
    "Accord Chemical Corporation is among the top petrochemical distribution companies in India, engaged in the import, export and indenting of various petrochemicals. Headquartered in Mumbai with branch offices in Ahmedabad and Gandhidham, Gujarat, it has, since 2009, built a colossal distribution network across India and international markets, led by an ardent team of qualified professionals on a foundation of trust and transparency.",
    "From 4,500 metric tons in its first year, Accord handled 198,000+ metric tons in FY 2025-26 and today serves 500+ active clients across 60+ countries. Clients choose Accord for consistent quality, cost-effectiveness, speed and competence: producer-direct relationships, transparent indent pricing, and in-house clearing, storage, insurance and logistics, so a single point of contact covers the entire consignment. In 2014, the group established Accord Chemcorp Pvt. Ltd., broadening its sourcing and product portfolio to serve industrial applications more comprehensively.",
  ],
  pillars: [
    {
      title: "Producer-direct",
      desc: "Direct relationships with producers worldwide, offering producer pricing, transparent terms and no intermediate inventory.",
    },
    {
      title: "198,000+ MT a year",
      desc: "From 4,500 tonnes in the first year to 198,000+ metric tons in FY 2025-26, a growth record backed by audited figures.",
    },
    {
      title: "End-to-end",
      desc: "Clearing, storage, survey, insurance and inland logistics handled in-house, with a single team accountable through to delivery.",
    },
  ],
  /** Verbatim from accordchemicals.com. */
  vision:
    "To evolve into a top-notch, globally recognised petrochemical trading company, with insistent growth and outstanding performance.",
  mission:
    "To consistently deliver customer delight, elite-quality products and innovative services, committed to employee well-being, safety, and the growth of every stakeholder, alongside our socio-economic responsibility.",
} as const;

/**
 * Headline metrics — the About proof band. The page's ONLY count-ups.
 * Each stat appears exactly once here; other sections reference in prose only.
 */
export const stats: Stat[] = [
  { value: 198000, suffix: "+", label: "Metric tons", sublabel: "FY 2025-26" },
  { value: 153, prefix: "$", suffix: "M", label: "Revenue", sublabel: "₹1,445 Cr · FY 2025-26" },
  { value: 60, suffix: "+", label: "Countries" },
  { value: 500, suffix: "+", label: "Active clients" },
  { value: 3000, suffix: "+", label: "Customers served", sublabel: "Since 2009" },
];

/** Footnote shown under the headline figures. */
export const statsNote = `Source: consolidated sales, ${LATEST_FY}. USD at ₹${USD_INR_RATE.toFixed(2)} / USD (RBI reference rate).`;

export interface Stat {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  /** Optional secondary mono line under the stat (e.g. INR equivalent). */
  sublabel?: string;
}

/**
 * ICIS recognition — CLIENT-APPROVED SLOT. Renders on /about-us only when
 * non-null. Fill with the latest verified ICIS ranking/recognition exactly as
 * approved by the client, including the edition year and source, e.g.
 *   { title: "ICIS Top 100 Chemical Distributors", detail: "Ranked #__ ...",
 *     year: "2026", source: "ICIS Chemical Business, June 2026", url: "" }
 * Never fill this with an unverified ranking.
 */
export const icisRecognition: {
  title: string;
  detail: string;
  year: string;
  source: string;
  url?: string;
} | null = null;

/**
 * Partners — CLIENT-INPUT SLOT. Logos and details to be supplied by the
 * client (with permission to display). Add files to public/partners/ and list
 * them here; until then the Partners section shows neutral placeholder tiles.
 */
export const partners: { name: string; logo: string; url?: string; category?: string }[] = [];

/** Number of placeholder tiles shown while `partners` is empty. */
export const PARTNER_PLACEHOLDERS = 8;

/**
 * Client testimonials — CLIENT-INPUT SLOT. Only real, approved testimonials.
 * Never fabricate. While empty, the section shows designated placeholder
 * cards that state testimonials are being collected.
 */
export const testimonials: {
  quote: string;
  name: string;
  designation: string;
  company: string;
}[] = [];

/** Number of placeholder cards shown while `testimonials` is empty. */
export const TESTIMONIAL_PLACEHOLDERS = 3;

/** 02 — What we do (Verticals). */
export const verticalsIntro =
  "Four ways petrochemicals move through Accord, from producer to plant gate.";

export const verticals = [
  {
    id: "import",
    title: "Import & Distribution",
    blurb:
      "We import on our own account and hold duty-paid stock in India, so you buy in INR, in the quantity you need, when you need it.",
    icon: "Import",
  },
  {
    id: "indenting",
    title: "Indenting",
    blurb:
      "Direct contracts between producer and buyer at producer pricing, with a transparent commission and no intermediate inventory.",
    icon: "Handshake",
  },
  {
    id: "exports",
    title: "Exports",
    blurb:
      "Indian-origin petrochemicals shipped to buyers on five continents, with documentation, inspection and freight handled end to end.",
    icon: "Globe",
  },
  {
    id: "services",
    title: "Comprehensive Services",
    blurb:
      "Customs clearing, bonded storage, survey, marine insurance and inland logistics, with one team accountable for the whole consignment.",
    icon: "Wrench",
  },
] as const;

/**
 * CredibilityStrip — one line, mono voice. Memberships, logos and the
 * testimonial are CLIENT-INPUT slots: render nothing while empty/null.
 * Never invent certifications, logos or quotes.
 */
export const credibility: Credibility = {
  line: "IEC-registered exporter · COA supplied with every consignment · Est. 2009, Mumbai",
  memberships: [],
  logos: [],
  testimonial: null,
};

export interface Credibility {
  line: string;
  /** e.g. ["CHEMEXCIL", "FIEO"] — only when the client confirms. */
  memberships: string[];
  /** Client/principal logos — only with permission. { name, src } */
  logos: { name: string; src: string }[];
  /** One attributed quote — only when the client supplies it. */
  testimonial: { quote: string; name: string; role: string } | null;
}

/** 03 — Products. */
export const productsIntro =
  "Eight product families, sourced producer-direct and delivered on specification, with a COA on every lot.";

/**
 * Product-list PDF — CLIENT-INPUT slot. The "Download product list (PDF)"
 * link renders only when this is a non-empty path/URL.
 */
export const productListPdf = "";

/** Product families — slug feeds the enquiry pre-fill (#contact?product=<slug>). */
export const products = [
  {
    name: "Acrylates & Monomers",
    slug: "acrylates-monomers",
    desc: "Building-block acrylates and monomers for coatings, adhesives and polymers.",
  },
  {
    name: "Aromatics & Hydrocarbons",
    slug: "aromatics-hydrocarbons",
    desc: "Benzene, toluene, xylene and solvent-grade hydrocarbon streams.",
  },
  {
    name: "Amines",
    slug: "amines",
    desc: "Ethanolamines and specialty amines for gas treating and surfactants.",
  },
  {
    name: "Chlorinated Solvents & Chemicals",
    slug: "chlorinated-solvents",
    desc: "High-purity chlorinated solvents for cleaning and synthesis.",
  },
  {
    name: "Glycols & Glycol Ethers",
    slug: "glycols-glycol-ethers",
    desc: "MEG, DEG and glycol ethers for antifreeze, resins and formulations.",
  },
  {
    name: "OXO Alcohols",
    slug: "oxo-alcohols",
    desc: "2-EH, n-butanol and iso-butanol for plasticisers and esters.",
  },
  {
    name: "Specialty Acrylates",
    slug: "specialty-acrylates",
    desc: "Functional and multi-functional acrylates for UV-cure systems.",
  },
  {
    name: "Custom Sourcing",
    slug: "custom-sourcing",
    desc: "Don't see your molecule? We source niche and campaign-quantity chemicals through our producer network. Send us the specification.",
  },
] as const;

/** 04 — Industries. */
export const industriesIntro =
  "Ten downstream industries source through Accord, from paints and coatings to pharmaceuticals and personal care.";

/** Flat list — feeds the single slow ticker row (texture only). */
export const industries = [
  "Paints & Coatings",
  "Adhesives & Sealants",
  "Pharmaceuticals",
  "Textiles",
  "Construction",
  "Personal Care",
  "Agrochemicals",
  "Plastics & Polymers",
  "Automotive",
  "Inks & Printing",
] as const;

/**
 * Industry → product-family mapping grid. `families` entries are exact
 * `products[].name` values — never invent families outside the eight.
 */
export const industriesDetail: IndustryDetail[] = [
  {
    name: "Paints & Coatings",
    icon: "Paintbrush",
    families: ["Acrylates & Monomers", "Glycols & Glycol Ethers", "Aromatics & Hydrocarbons"],
  },
  {
    name: "Adhesives & Sealants",
    icon: "Link",
    families: ["Acrylates & Monomers", "Specialty Acrylates", "Aromatics & Hydrocarbons"],
  },
  {
    name: "Pharmaceuticals",
    icon: "Pill",
    families: ["Chlorinated Solvents & Chemicals", "Glycols & Glycol Ethers", "Amines"],
  },
  {
    name: "Textiles",
    icon: "Shirt",
    families: ["Glycols & Glycol Ethers", "Amines", "Aromatics & Hydrocarbons"],
  },
  {
    name: "Construction",
    icon: "HardHat",
    families: ["Acrylates & Monomers", "Specialty Acrylates", "Glycols & Glycol Ethers"],
  },
  {
    name: "Personal Care",
    icon: "Sparkles",
    families: ["Glycols & Glycol Ethers", "Amines", "Custom Sourcing"],
  },
  {
    name: "Agrochemicals",
    icon: "Sprout",
    families: ["Amines", "Chlorinated Solvents & Chemicals", "Aromatics & Hydrocarbons"],
  },
  {
    name: "Plastics & Polymers",
    icon: "Hexagon",
    families: ["Glycols & Glycol Ethers", "OXO Alcohols", "Acrylates & Monomers"],
  },
  {
    name: "Automotive",
    icon: "Car",
    families: ["Glycols & Glycol Ethers", "OXO Alcohols", "Specialty Acrylates"],
  },
  {
    name: "Inks & Printing",
    icon: "Printer",
    families: ["Specialty Acrylates", "Glycols & Glycol Ethers", "Aromatics & Hydrocarbons"],
  },
];

export interface IndustryDetail {
  name: string;
  icon: string;
  families: string[];
}

/** 05 — Growth → "The record". */
export const growthCopy = {
  eyebrow: "Track record",
  heading: "The record",
  intro:
    "From 4,500 tonnes in our first year to 198,000 tonnes and $153M in FY 2025-26. Every year is on the record.",
  caption: `FY 2009-10 to FY 2025-26. USD at ₹${USD_INR_RATE.toFixed(2)} / USD (RBI reference rate) for every year.`,
} as const;

/**
 * Growth story. volumeKT = thousand metric tons, revenueINR = INR crore
 * (audited, from the client's "Quantum of Volume in MTS and Revenue" chart
 * for FY 2009-10 to 2022-23, and "SALES DATA.xlsx" for FY 2023-24 onwards).
 * revenueUSD (USD millions) is DERIVED from INR at USD_INR_RATE for every
 * year, so the whole series uses one consistent rate. Edit INR only.
 */
const growthRaw = [
  { year: "2009-10", volumeKT: 4.5, revenueINR: 4.23 },
  { year: "2010-11", volumeKT: 6.9, revenueINR: 67.36 },
  { year: "2011-12", volumeKT: 10.9, revenueINR: 100.3 },
  { year: "2012-13", volumeKT: 15.1, revenueINR: 145.28 },
  { year: "2013-14", volumeKT: 26.0, revenueINR: 220.0 },
  { year: "2014-15", volumeKT: 37.6, revenueINR: 314.65 },
  { year: "2015-16", volumeKT: 36.6, revenueINR: 274.28 },
  { year: "2016-17", volumeKT: 41.8, revenueINR: 427.9 },
  { year: "2017-18", volumeKT: 56.2, revenueINR: 498.04 },
  { year: "2018-19", volumeKT: 76.9, revenueINR: 593.06 },
  // NOTE: volume 71.45 KT equals the old USD figure for this year; confirm with client.
  { year: "2019-20", volumeKT: 71.45, revenueINR: 500.12 },
  { year: "2020-21", volumeKT: 93.2, revenueINR: 647.35 },
  { year: "2021-22", volumeKT: 90.2, revenueINR: 1155.23 },
  { year: "2022-23", volumeKT: 110.2, revenueINR: 1400.01 },
  { year: "2023-24", volumeKT: 172.2, revenueINR: 1374.29 },
  { year: "2024-25", volumeKT: 176.5, revenueINR: 1369.78 },
  { year: "2025-26", volumeKT: 198.0, revenueINR: 1445.65 },
] as const;

export const growth = growthRaw.map((d) => ({
  ...d,
  revenueUSD: Math.round(((d.revenueINR * 10) / USD_INR_RATE) * 100) / 100,
}));

/** 06 — GlobalPresence → "58 countries. One desk." */
export const presenceCopy = {
  eyebrow: "Presence",
  heading: "60+ countries. One trading desk.",
  intro:
    "Sourcing from producers across the Americas, Europe, the Middle East and Asia, and supplying buyers on five continents, all coordinated from our Mumbai headquarters.",
} as const;

/** 07 — Process: "How a consignment moves." Quiet, mono numerals. */
export const processCopy = {
  eyebrow: "Our Process",
  heading: "From requirement to delivery",
} as const;

export const process: ProcessStep[] = [
  {
    step: "01",
    title: "Requirement Analysis",
    desc: "We assess your product, grade, specification, volume and destination to define the optimal sourcing route.",
  },
  {
    step: "02",
    title: "Strategic Sourcing & Pricing",
    desc: "Competitive indent or import pricing from our global producer network, typically within one business day.",
  },
  {
    step: "03",
    title: "Contract & Quality Assurance",
    desc: "Commercial terms under LC, DA or DP, with a certificate of analysis and pre-shipment inspection on every lot.",
  },
  {
    step: "04",
    title: "Logistics & Delivery",
    desc: "Customs clearance, marine insurance and tracked inland logistics through to your facility.",
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

/** 08 — Contact. */
export const contactCopy = {
  eyebrow: "Contact",
  heading: "Tell us what you need moved.",
  intro:
    "Share the product, volume and destination for sourcing, indenting, export or logistics. We respond with a quotation within one business day.",
} as const;

/**
 * Contact small print — CLIENT-INPUT slots. Each renders only when the
 * client confirms its value; empty strings render nothing.
 * e.g. gstin: "27XXXXX…", iec: "XXXXXXXXXX", hours: "Mon–Sat 9:30–18:30 IST"
 */
export const contactMeta = {
  gstin: "",
  iec: "",
  hours: "",
} as const;

/** Footer — quiet, plus the red-field CTA band (the page's final flourish). */
export const footerCopy = {
  ctaHeadline: "Ready to move your next consignment?",
  oneLiner:
    "Mumbai-based petrochemical trading house engaged in imports, exports and indenting across 60+ countries since 2009.",
  /** Itarsia relationship unconfirmed — render as a plain credit line. */
  byline: `Site by ${siteConfig.poweredBy}`,
  productsCollapsedLabel: "View all products",
  backToTop: "Back to top",
} as const;

export type Vertical = (typeof verticals)[number];
export type Product = (typeof products)[number];
export type GrowthPoint = (typeof growth)[number];
export type Industry = (typeof industries)[number];
export type NavItem = (typeof nav)[number];
