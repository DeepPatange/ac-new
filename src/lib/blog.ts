/**
 * Blog / Insights — content for /blog and /blog/[slug].
 *
 * Written for both search and generative engines (GEO):
 *  - every post opens with a one-paragraph direct answer (`answer`) that an
 *    AI assistant can quote on its own,
 *  - followed by scannable key takeaways, question-style H2s, comparison
 *    tables and an FAQ block (emitted as FAQPage JSON-LD),
 *  - company facts are ONLY those already on the site (site.ts). Industry
 *    facts are general, well-established knowledge; anything rate- or
 *    regulation-specific tells the reader to verify the current notification.
 *
 * Inline formatting inside text: **bold** and [link text](/path).
 * To add a post: append to `posts`, give it a unique slug, and use images
 * from an allowed host (next.config.mjs).
 */

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string }
  | { type: "figure"; src: string; alt: string; caption?: string };

export interface Post {
  slug: string;
  title: string;
  /** Meta description, about 150 characters. */
  description: string;
  category: "Trade & Import" | "Products" | "Quality" | "Buying Guide";
  tags: string[];
  /** ISO dates. */
  published: string;
  updated: string;
  cover: { src: string; alt: string };
  /** Self-contained direct answer, quotable on its own. */
  answer: string;
  takeaways: string[];
  body: Block[];
  faqs: { q: string; a: string }[];
}

export const blogAuthor = {
  name: "Accord Trading Desk",
  role: "Petrochemical sourcing, indenting and logistics team, Mumbai",
};

export const blogCopy = {
  eyebrow: "Insights",
  heading: "Petrochemical trade, explained plainly.",
  intro:
    "Practical guides on importing, indenting, quality documents and the molecules we trade, written by the team that moves them every day.",
} as const;

/** Unsplash helper. Sizes are re-encoded by next/image. */
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1600&h=900&fit=crop&crop=entropy&auto=format&q=72`;

export const posts: Post[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "what-is-indenting-in-petrochemical-trading",
    title: "What Is Indenting in Petrochemical Trading? How It Works and When to Use It",
    description:
      "Indenting connects a buyer directly with an overseas producer at producer pricing. How the process works, what it costs and when it beats buying from stock.",
    category: "Trade & Import",
    tags: ["Indenting", "Sourcing", "Imports"],
    published: "2026-11-23",
    updated: "2026-11-23",
    cover: {
      src: u("1516937941344-00b4e0337589"),
      alt: "Petrochemical refinery with processing towers and flare stacks",
    },
    answer:
      "Indenting is a trade arrangement in which an indenting agent connects a buyer directly with an overseas producer. The sales contract is between the producer and the buyer, the cargo ships from the producer straight to the buyer, and the buyer imports it in its own name. The agent holds no inventory and is paid a commission, so the buyer gets producer pricing in exchange for buying in shipment-sized lots and handling import clearance.",
    takeaways: [
      "In an indent deal the contract, invoice and bill of lading run from the producer to the buyer, not through the agent.",
      "The buyer is the importer of record, so it needs an Importer Exporter Code (IEC) and pays customs duty itself.",
      "Indenting suits buyers who take full container loads, ISO tanks or bulk parcels regularly and want producer pricing.",
      "Buying from local stock suits smaller, urgent or irregular requirements where speed matters more than unit price.",
    ],
    body: [
      { type: "h2", text: "How does an indent order work?" },
      {
        type: "p",
        text: "An indenting agent represents one or more overseas producers (the principals) in a market. When a buyer needs a product, the agent obtains an offer from the producer, negotiates terms on the buyer's behalf and coordinates the paperwork. A typical indent order moves through these steps:",
      },
      {
        type: "ol",
        items: [
          "**Enquiry.** The buyer shares product, grade, quantity, packing, destination port and preferred delivery window.",
          "**Offer.** The agent obtains a firm offer from the producer, usually on CFR or CIF terms to an Indian port, with a validity period.",
          "**Contract.** Once accepted, the producer issues a sales contract or proforma invoice addressed directly to the buyer.",
          "**Payment security.** The buyer opens a letter of credit (LC) or agrees documentary terms (DP or DA) in favour of the producer.",
          "**Shipment.** The producer loads the cargo and sends shipping documents (invoice, packing list, bill of lading, certificate of analysis) to the buyer or the buyer's bank.",
          "**Clearance and delivery.** The buyer, or a clearing agent it appoints, files the Bill of Entry, pays duty and takes delivery.",
        ],
      },
      {
        type: "figure",
        src: u("1605745341112-85968b19335b"),
        alt: "Loaded container vessel at sea",
        caption: "In an indent deal the cargo ships straight from the producer's port to the buyer's port.",
      },
      { type: "h2", text: "Indenting vs buying from a distributor's stock" },
      {
        type: "table",
        caption: "How the two buying routes compare",
        head: ["", "Indenting", "Buying from local stock"],
        rows: [
          ["Who imports", "The buyer, in its own name", "The distributor"],
          ["Price basis", "Producer price plus agent commission", "Distributor's landed cost plus margin"],
          ["Currency", "Usually USD, settled by the buyer", "INR"],
          ["Typical lot size", "Full container, ISO tank, flexitank or bulk parcel", "Any quantity the distributor stocks, down to drums"],
          ["Lead time", "Weeks: production plus ocean transit", "Days: from a domestic warehouse"],
          ["Customs and duty", "Handled and paid by the buyer", "Already paid; included in the price"],
          ["Best for", "Regular, planned, larger volumes", "Smaller, urgent or irregular needs"],
        ],
      },
      { type: "h2", text: "When does indenting make sense?" },
      {
        type: "ul",
        items: [
          "Your consumption is steady and large enough to take shipment-sized lots.",
          "You can plan purchases several weeks ahead of need.",
          "You already import, or are prepared to, with an IEC and a banking line for letters of credit.",
          "You want price transparency against the producer's own offer.",
        ],
      },
      {
        type: "p",
        text: "If any of these are missing, buying from duty-paid stock in India is usually simpler. Many buyers use both routes: indenting for base volumes and local stock to cover gaps.",
      },
      {
        type: "callout",
        title: "How Accord handles indent orders",
        text: "Accord works producer-direct: indent contracts run between the producer and the buyer at producer pricing, with a transparent commission and no intermediate inventory. For buyers who prefer not to manage the import themselves, Accord's in-house team can also handle customs clearing, storage, insurance and inland logistics. See [our services](/services) or [request a quote](/contact-us).",
      },
    ],
    faqs: [
      {
        q: "Who pays the indenting agent's commission?",
        a: "In most indent arrangements the overseas producer pays the agent's commission, and it is reflected in the price offered to the buyer. The commission arrangement should be disclosed and agreed in writing.",
      },
      {
        q: "Do I need an IEC to buy on indent?",
        a: "Yes. In an indent deal the buyer is the importer of record, so it needs a valid Importer Exporter Code (IEC) issued by the DGFT and must clear the goods through Indian customs.",
      },
      {
        q: "Is indenting always cheaper than buying from stock?",
        a: "Not always. Indenting removes the distributor's inventory margin, but the buyer takes on ocean transit time, customs duty, clearing charges, currency exposure and the cost of financing the cargo. Compare the full landed cost, not just the unit price.",
      },
      {
        q: "What is the minimum quantity for an indent order?",
        a: "It depends on the producer and product. Liquid chemicals are commonly sold by the ISO tank, flexitank or container of drums or IBCs, and larger volumes by bulk parcel. Producers rarely accept less than one container load.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "how-to-import-chemicals-into-india",
    title: "How to Import Chemicals into India: Documents, Duties and the Step-by-Step Process",
    description:
      "A practical guide to importing chemicals into India: IEC, HS classification, regulatory checks, shipping documents, the Bill of Entry and how customs duty is calculated.",
    category: "Trade & Import",
    tags: ["Imports", "Customs", "Compliance", "India"],
    published: "2026-11-23",
    updated: "2026-11-23",
    cover: {
      src: u("1494412574643-ff11b0a5c1c3"),
      alt: "Aerial view of a container port terminal with gantry cranes",
    },
    answer:
      "To import chemicals into India you need an Importer Exporter Code (IEC) from the DGFT, the correct ITC(HS) classification for the product, and any product-specific approvals that apply. The overseas seller ships with a commercial invoice, packing list, bill of lading, certificate of analysis and safety data sheet. You or your customs broker then file a Bill of Entry on ICEGATE, pay Basic Customs Duty, the Social Welfare Surcharge and IGST, and take delivery once customs issues the out-of-charge order.",
    takeaways: [
      "An IEC is mandatory for commercial imports into India.",
      "The 8-digit ITC(HS) code decides the duty rate, the import policy and whether any extra approval applies.",
      "Import duty is typically Basic Customs Duty plus a 10% Social Welfare Surcharge on it, plus IGST on the total.",
      "IGST paid on import is generally available as input tax credit; Basic Customs Duty and the surcharge are not.",
      "Check for anti-dumping duty: several chemicals from specific origins attract it.",
    ],
    body: [
      { type: "h2", text: "Step 1: Get an Importer Exporter Code (IEC)" },
      {
        type: "p",
        text: "The IEC is a 10-character code issued online by the Directorate General of Foreign Trade (DGFT), linked to the business PAN. Customs will not process a commercial import without it, and banks need it to remit payment overseas.",
      },
      { type: "h2", text: "Step 2: Classify the product and check the import policy" },
      {
        type: "p",
        text: "Every chemical has an 8-digit ITC(HS) code. Most organic chemicals sit in Chapter 29 and many solvents, plasticisers and preparations in Chapters 27, 32, 34 and 38. The code determines:",
      },
      {
        type: "ul",
        items: [
          "the import policy: most industrial chemicals are \"Free\", but some are \"Restricted\" and need an authorisation;",
          "the Basic Customs Duty rate and the IGST rate;",
          "whether a Quality Control Order (QCO) under BIS applies, requiring the overseas producer to hold a BIS licence;",
          "whether anti-dumping or safeguard duty applies to that product from that country of origin.",
        ],
      },
      {
        type: "callout",
        title: "Check these before you sign",
        text: "QCO lists and anti-dumping notifications change regularly. Confirm the current position for your exact HS code and origin with your customs broker before you confirm the purchase, not after the vessel sails.",
      },
      { type: "h2", text: "Step 3: Plan storage and handling approvals" },
      {
        type: "p",
        text: "Many solvents are flammable petroleum-class liquids. Storing them above the exempted quantities needs a licence from PESO (the Petroleum and Explosives Safety Organisation), and sites handling listed hazardous chemicals must also comply with the Manufacture, Storage and Import of Hazardous Chemical Rules, 1989. Make sure the receiving site is licensed for the product and quantity.",
      },
      { type: "h2", text: "Step 4: Agree terms and the shipping documents" },
      {
        type: "p",
        text: "Agree the Incoterm (commonly CFR or CIF to an Indian port; see our [Incoterms guide](/blog/incoterms-for-chemical-shipments)), the payment terms and the documents the seller must provide:",
      },
      {
        type: "table",
        caption: "Standard documents for a chemical import",
        head: ["Document", "Why it matters"],
        rows: [
          ["Commercial invoice", "Basis for customs valuation and payment"],
          ["Packing list", "Packages, net and gross weights, batch numbers"],
          ["Bill of lading", "Title document; needed to take delivery from the shipping line"],
          ["Certificate of analysis (COA)", "Proves the lot meets the agreed specification"],
          ["Safety data sheet (SDS)", "Hazard, handling and transport information"],
          ["Certificate of origin", "Needed to claim lower duty under a trade agreement, such as India's agreements with ASEAN, Japan, Korea or the UAE"],
          ["Insurance certificate", "Required when the seller insures (CIF)"],
        ],
      },
      {
        type: "figure",
        src: u("1494412651409-8963ce7935a7"),
        alt: "Aerial view of a stacked shipping-container yard",
        caption: "Hazardous cargo is typically moved from the terminal to a container freight station or the buyer's site for examination and delivery.",
      },
      { type: "h2", text: "Step 5: File the Bill of Entry and pay duty" },
      {
        type: "p",
        text: "The customs broker files the Bill of Entry electronically on ICEGATE, ideally before the vessel arrives. Customs assesses the value and duty, may examine or sample the cargo, and issues an out-of-charge order once duty is paid.",
      },
      { type: "h3", text: "How is import duty calculated?" },
      {
        type: "p",
        text: "Duty is calculated on the assessable value, which is broadly the CIF value converted to INR at the customs exchange rate. The illustrative example below uses assumed rates; always use the rates notified for your HS code.",
      },
      {
        type: "table",
        caption: "Illustrative duty calculation on an assessable value of ₹100 (assumed rates)",
        head: ["Component", "Assumed rate", "Calculated on", "Amount (₹)"],
        rows: [
          ["Basic Customs Duty (BCD)", "7.5%", "Assessable value ₹100", "7.50"],
          ["Social Welfare Surcharge (SWS)", "10% of BCD", "BCD ₹7.50", "0.75"],
          ["IGST", "18%", "₹100 + 7.50 + 0.75 = ₹108.25", "19.49"],
          ["Total duty", "", "", "27.74"],
        ],
      },
      {
        type: "p",
        text: "In this example the IGST of ₹19.49 can generally be claimed as input tax credit, so the non-recoverable cost is the BCD and SWS of ₹8.25.",
      },
      { type: "h2", text: "Step 6: Take delivery and move the cargo" },
      {
        type: "p",
        text: "After out of charge, pay the shipping line and terminal charges, collect the delivery order and arrange inland transport with vehicles and drivers suitable for the hazard class of the product.",
      },
      {
        type: "callout",
        title: "Prefer not to import yourself?",
        text: "Accord imports on its own account and holds duty-paid stock in India, so buyers can purchase in INR, in the quantity they need. For buyers who do import, Accord's team handles customs clearing, storage, survey, marine insurance and inland logistics. [Talk to our desk](/contact-us).",
      },
    ],
    faqs: [
      {
        q: "Do I need a licence to import chemicals into India?",
        a: "Most industrial chemicals are \"Free\" under India's import policy and need only an IEC. Some are restricted, controlled or covered by a BIS Quality Control Order, and storing flammable or hazardous chemicals needs site approvals such as a PESO licence. Check by HS code.",
      },
      {
        q: "Can I claim the import duty back as GST credit?",
        a: "The IGST paid at import is generally available as input tax credit, subject to GST rules. Basic Customs Duty and the Social Welfare Surcharge are costs and are not creditable.",
      },
      {
        q: "What is anti-dumping duty on chemicals?",
        a: "Anti-dumping duty is an additional duty imposed on specific products from specific countries, following an investigation by India's DGTR, where imports are found to be sold below fair value. It is notified by HS code and origin, sometimes per producer, and can be significant.",
      },
      {
        q: "How long does customs clearance take in India?",
        a: "When documents are complete and the Bill of Entry is filed in advance, clearance can be completed within a few days of arrival. Examination, sampling, incorrect classification or missing documents are the usual causes of delay.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "incoterms-for-chemical-shipments",
    title: "Incoterms for Chemical Shipments: FOB, CFR, CIF and DAP Explained",
    description:
      "Which Incoterm should a chemical buyer use? FOB, CFR, CIF, FCA and DAP compared: who pays freight and insurance, and where the risk passes.",
    category: "Trade & Import",
    tags: ["Incoterms", "Shipping", "Contracts"],
    published: "2026-11-23",
    updated: "2026-11-23",
    cover: {
      src: u("1578575437130-527eed3abbec"),
      alt: "Container ship docked under cranes at a shipping terminal",
    },
    answer:
      "Incoterms are standard trade rules published by the International Chamber of Commerce that define who pays for transport and insurance and where risk passes from seller to buyer. For sea shipments of chemicals into India, CFR and CIF are the most common: the seller pays ocean freight (and, under CIF, minimum insurance), but risk passes to the buyer once the goods are loaded on board at the port of shipment. Under DAP, the seller carries the risk until the goods arrive at the named destination.",
    takeaways: [
      "The current version is Incoterms 2020; name it in the contract, for example \"CFR Nhava Sheva, Incoterms 2020\".",
      "Under FOB, CFR and CIF, risk passes when the goods are on board the vessel at the loading port, not on arrival.",
      "CIF requires only minimum insurance (Institute Cargo Clauses C); ask for clauses A if you want broader cover.",
      "For containerised cargo, such as ISO tanks, the ICC recommends FCA, CPT or CIP rather than FOB, CFR or CIF.",
      "Incoterms do not cover payment, title or demurrage; those belong in the sales contract.",
    ],
    body: [
      { type: "h2", text: "What do the main Incoterms mean for a chemical buyer?" },
      {
        type: "table",
        caption: "The terms most used in chemical trade (Incoterms 2020)",
        head: ["Term", "Seller pays to", "Risk passes to buyer", "Insurance"],
        rows: [
          ["FOB: Free On Board", "Loading on the vessel at the origin port", "On board at the origin port", "Buyer arranges"],
          ["CFR: Cost and Freight", "Destination port (ocean freight)", "On board at the origin port", "Buyer arranges"],
          ["CIF: Cost, Insurance and Freight", "Destination port, plus insurance", "On board at the origin port", "Seller, minimum ICC (C)"],
          ["FCA: Free Carrier", "Handover to the buyer's carrier", "At handover to the carrier", "Buyer arranges"],
          ["DAP: Delivered At Place", "Named destination, unloading excluded", "On arrival, ready for unloading", "Seller's choice (seller bears risk)"],
          ["DDP: Delivered Duty Paid", "Named destination, import duty paid", "On arrival, ready for unloading", "Seller's choice (seller bears risk)"],
        ],
      },
      { type: "h2", text: "Why does the risk point matter so much?" },
      {
        type: "p",
        text: "Under CFR and CIF the seller pays the freight to India, which makes these terms feel like delivered terms. They are not. If the cargo is damaged or lost at sea, the buyer bears the loss and must claim on the cargo insurance. Under CFR the buyer must arrange that insurance itself, from the moment of loading.",
      },
      {
        type: "figure",
        src: u("1473445730015-841f29a9490b"),
        alt: "Truck on a highway carrying freight inland",
        caption: "Under DAP the seller carries risk all the way to the named place, which can include inland transport.",
      },
      { type: "h2", text: "Which Incoterm should I choose?" },
      {
        type: "ul",
        items: [
          "**CFR or CIF** if the seller can secure better freight rates and you are comfortable insuring or relying on the seller's minimum cover.",
          "**FOB or FCA** if you have your own freight contract or forwarder and want control over the vessel and schedule.",
          "**DAP** if you want the seller to carry risk until the cargo reaches your port or site.",
          "**DDP** is rarely practical for imports into India, because the importer of record must hold an Indian IEC and clear customs.",
        ],
      },
      { type: "h2", text: "How do Incoterms affect Indian customs value?" },
      {
        type: "p",
        text: "Indian customs assesses duty on a CIF basis. If you buy FOB, the actual freight and insurance are added to reach the assessable value. Where they cannot be ascertained, the Customs Valuation Rules add freight at 20% of FOB value and insurance at 1.125% of FOB value, which can overstate the duty. Keep freight and insurance invoices ready.",
      },
      {
        type: "callout",
        title: "Not sure which terms to quote on?",
        text: "Accord quotes indent and import business on the terms that suit the buyer, and handles marine insurance and inland logistics in-house. [Request a quote](/contact-us) with your destination port and we will advise.",
      },
    ],
    faqs: [
      {
        q: "Is CIF better than CFR for importers?",
        a: "CIF is simpler because the seller arranges insurance, but it only requires minimum cover (Institute Cargo Clauses C). Many importers prefer CFR and buy their own all-risks cover, which gives broader protection and makes claims easier to manage locally.",
      },
      {
        q: "Who pays demurrage and detention on a CFR shipment?",
        a: "Incoterms do not deal with demurrage or detention. They are governed by the sales contract, the charter party or the shipping line's terms. At the destination the buyer usually bears container detention once free days expire.",
      },
      {
        q: "Should I use FOB for ISO tank shipments?",
        a: "The ICC recommends FCA instead of FOB for containerised cargo, because the seller usually hands the container to the carrier at a terminal before it is loaded on board, and FOB leaves that period unclear.",
      },
      {
        q: "Do Incoterms transfer ownership of the goods?",
        a: "No. Incoterms define delivery, costs and risk. Transfer of title is governed by the sales contract and, in sea trade, by the bill of lading.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "certificate-of-analysis-coa-chemicals",
    title: "Certificate of Analysis (COA) for Chemicals: What It Shows and What to Check",
    description:
      "What a certificate of analysis contains, how it differs from a specification sheet and SDS, and the checks to run before accepting a chemical consignment.",
    category: "Quality",
    tags: ["COA", "Quality", "Specifications"],
    published: "2026-11-23",
    updated: "2026-11-23",
    cover: {
      src: u("1579154204601-01588f351e67"),
      alt: "Quality control laboratory with analytical instruments",
    },
    answer:
      "A certificate of analysis (COA) is a document issued by the producer's quality laboratory that reports the actual test results for one specific batch of a product against its specification limits. It identifies the product, grade and batch number, lists each parameter tested with the method used, and is signed by an authorised quality person. Buyers use it to confirm that the lot delivered meets the agreed specification before accepting it.",
    takeaways: [
      "A COA is batch-specific; a specification sheet is generic and applies to every batch.",
      "The batch number on the COA must match the drums, labels and packing list.",
      "Check every parameter in your purchase specification against the actual results, not just the \"Pass\" column.",
      "Test methods (for example ASTM or ISO) should be stated, so your lab can repeat the test.",
      "For critical uses, add independent pre-shipment inspection or retain samples.",
    ],
    body: [
      { type: "h2", text: "What does a certificate of analysis contain?" },
      {
        type: "ul",
        items: [
          "Producer name, address and the issuing laboratory",
          "Product name, grade and, where relevant, CAS number",
          "Batch or lot number, and the manufacturing date",
          "Expiry or retest date, where the product has one",
          "Each test parameter with its specification limit, actual result and test method",
          "A statement of conformity, the date of issue and an authorised signature",
        ],
      },
      { type: "h2", text: "COA vs specification sheet vs SDS" },
      {
        type: "table",
        head: ["Document", "What it covers", "Batch-specific?"],
        rows: [
          ["Certificate of analysis (COA)", "Actual test results for one batch against limits", "Yes"],
          ["Technical data or specification sheet", "The limits the product is sold against", "No"],
          ["Safety data sheet (SDS)", "Hazards, safe handling, storage and transport", "No"],
        ],
      },
      { type: "h2", text: "Which parameters appear on a typical solvent or glycol COA?" },
      {
        type: "table",
        caption: "Common parameters for liquid petrochemicals",
        head: ["Parameter", "Typical method", "Why it matters"],
        rows: [
          ["Purity or assay", "Gas chromatography (GC)", "Confirms the main component content"],
          ["Water content", "Karl Fischer titration", "Water affects reactions, resins and stability"],
          ["Colour", "APHA / Pt-Co scale", "Critical for coatings, plastics and fibres"],
          ["Acidity", "Titration", "Indicates degradation or contamination"],
          ["Density or specific gravity", "Density meter or hydrometer", "Identity check and volume to weight conversion"],
          ["Distillation range", "Distillation test", "Volatility, important for solvents"],
        ],
      },
      {
        type: "figure",
        src: u("1581093450021-4a7360e9a6b5"),
        alt: "Laboratory analysts testing samples",
        caption: "Your own lab should be able to repeat any test on the COA using the stated method.",
      },
      { type: "h2", text: "What should I check before accepting a consignment?" },
      {
        type: "ol",
        items: [
          "The product name and grade match your purchase order exactly.",
          "The batch number matches the drum or tank labels and the packing list.",
          "Every parameter in your specification appears on the COA, with an actual result.",
          "Each result is within your limits, which may be tighter than the producer's standard limits.",
          "The COA is dated, signed and issued by the producer, not retyped by an intermediary.",
          "The product is within its shelf life or retest date for the time you will use it.",
        ],
      },
      {
        type: "callout",
        title: "Accord's practice",
        text: "Accord supplies a COA with every consignment, and pre-shipment inspection is part of the contract and quality step on every lot. If you need specific parameters or an independent surveyor, include them in your [enquiry](/contact-us).",
      },
    ],
    faqs: [
      {
        q: "Is a COA legally required?",
        a: "Requirements depend on the product and the end use; pharmaceutical, food and some regulated chemicals have strict documentation rules. In industrial trade, a COA is a standard commercial requirement and should be written into the purchase contract.",
      },
      {
        q: "What if my lab result differs from the COA?",
        a: "First confirm that the same test method and sampling procedure were used. If the difference is real and outside specification, notify the seller promptly in writing, retain sealed samples, and consider a joint or independent survey as the contract provides.",
      },
      {
        q: "What is pre-shipment inspection?",
        a: "Pre-shipment inspection is an independent check, by a surveyor, of quantity, packing and quality, usually including sampling and testing before the cargo is loaded. It reduces the risk of disputes after arrival.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "meg-vs-deg-glycol-differences-and-uses",
    title: "MEG vs DEG: Differences, Properties and Industrial Uses of Ethylene Glycols",
    description:
      "Monoethylene glycol (MEG) and diethylene glycol (DEG) compared: chemistry, key properties, main applications and why DEG control matters in pharmaceuticals.",
    category: "Products",
    tags: ["Glycols", "MEG", "DEG", "Polyester"],
    published: "2026-11-23",
    updated: "2026-11-23",
    cover: {
      src: u("1532094349884-543bc11b234d"),
      alt: "Laboratory glassware with a clear liquid",
    },
    answer:
      "MEG (monoethylene glycol) and DEG (diethylene glycol) are both made by reacting ethylene oxide with water, and MEG is the main product of that process. MEG is a smaller molecule with a lower boiling point (about 197°C) and is used mainly to make polyester fibre and PET resin, and in antifreeze and coolants. DEG has a higher boiling point (about 245°C) and is used in unsaturated polyester resins, polyurethanes, plasticisers and as a solvent. DEG is toxic if ingested, so it must never be substituted for pharmaceutical-grade glycols.",
    takeaways: [
      "MEG, DEG and TEG are co-products of ethylene oxide hydration; MEG is by far the largest share.",
      "MEG's biggest market is polyester: textile fibre, filament yarn and PET bottle resin.",
      "DEG goes mainly into unsaturated polyester resins, polyols, plasticisers and solvent uses.",
      "Fibre-grade MEG has tight limits on colour and UV transmittance; check the grade, not just purity.",
      "Pharmaceutical excipients are tested for DEG and EG contamination because both are toxic.",
    ],
    body: [
      { type: "h2", text: "How are MEG and DEG made?" },
      {
        type: "p",
        text: "Ethylene is oxidised to ethylene oxide (EO), which is then hydrolysed with water. One EO molecule plus water gives MEG; when MEG reacts with a further EO molecule, DEG forms, and then triethylene glycol (TEG). Producers tune the conditions to maximise MEG, so DEG and TEG are smaller co-product streams. MEG can also be made from coal-derived syngas, a route used at scale in China.",
      },
      { type: "h2", text: "MEG vs DEG at a glance" },
      {
        type: "table",
        caption: "Typical properties (approximate)",
        head: ["Property", "MEG", "DEG"],
        rows: [
          ["Chemical formula", "C₂H₆O₂", "C₄H₁₀O₃"],
          ["CAS number", "107-21-1", "111-46-6"],
          ["Boiling point", "about 197°C", "about 245°C"],
          ["Freezing point", "about −13°C", "about −10°C"],
          ["Density at 20°C", "about 1.11 g/cm³", "about 1.12 g/cm³"],
          ["Main uses", "Polyester fibre and PET resin, antifreeze, heat-transfer fluids", "Unsaturated polyester resins, polyols, plasticisers, solvents"],
        ],
      },
      { type: "h2", text: "What is MEG used for?" },
      {
        type: "ul",
        items: [
          "**Polyester:** reacted with PTA to make polyester staple fibre, filament yarn and PET bottle resin. This is the largest end use.",
          "**Antifreeze and coolants:** engine coolants and industrial heat-transfer fluids.",
          "**Gas processing:** as a hydrate inhibitor in natural-gas pipelines.",
          "**Chemical intermediate:** for resins, explosives and other derivatives.",
        ],
      },
      {
        type: "figure",
        src: u("1532187863486-abf9dbad1b69"),
        alt: "Pipette dispensing samples into a laboratory tray",
        caption: "Fibre-grade MEG is tested for colour and UV transmittance as well as purity.",
      },
      { type: "h2", text: "What is DEG used for?" },
      {
        type: "ul",
        items: [
          "**Unsaturated polyester resins** for fibreglass composites, laminates and coatings.",
          "**Polyurethane polyols** and polyester polyols.",
          "**Plasticisers** such as dibenzoate esters.",
          "**Solvent and humectant** uses in inks, dyes and textile processing.",
        ],
      },
      { type: "h2", text: "Why does DEG matter in pharmaceuticals?" },
      {
        type: "p",
        text: "DEG and MEG are toxic if swallowed. Contamination of pharmaceutical excipients such as glycerin and propylene glycol with DEG or EG has caused fatal poisonings worldwide, and regulators, including India's, now require these excipients to be tested for DEG and EG before use. Industrial-grade glycols must never be supplied into pharmaceutical or food applications.",
      },
      {
        type: "callout",
        title: "Sourcing glycols through Accord",
        text: "Accord supplies [glycols and glycol ethers](/products) for polyester, resins, coatings and antifreeze applications, sourced producer-direct with a COA on every lot. Share your grade and volume to [request a quote](/contact-us).",
      },
    ],
    faqs: [
      {
        q: "Is MEG the same as ethylene glycol?",
        a: "Yes. Monoethylene glycol (MEG) and ethylene glycol (EG) are names for the same compound, ethane-1,2-diol, CAS 107-21-1.",
      },
      {
        q: "Can DEG be used instead of MEG in antifreeze?",
        a: "Not in standard coolant formulations. Coolant specifications are based on MEG or propylene glycol, and DEG has different freezing behaviour and viscosity.",
      },
      {
        q: "What is fibre-grade MEG?",
        a: "Fibre-grade MEG is high-purity MEG meeting tight limits on colour, UV transmittance, water and impurities, as required by polyester producers. It is the main traded grade.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "2-ethylhexanol-vs-n-butanol-oxo-alcohols",
    title: "2-Ethylhexanol vs n-Butanol: OXO Alcohols Explained",
    description:
      "How OXO alcohols are made, and how 2-ethylhexanol (2-EH), n-butanol and isobutanol compare in properties and uses: plasticisers, acrylates, acetates and solvents.",
    category: "Products",
    tags: ["OXO Alcohols", "2-EH", "n-Butanol", "Plasticisers"],
    published: "2026-11-23",
    updated: "2026-11-23",
    cover: {
      src: u("1513828583688-c52646db42da"),
      alt: "Stainless-steel pipework at a chemical processing plant",
    },
    answer:
      "OXO alcohols are made by hydroformylation of propylene with synthesis gas, which gives butyraldehydes that are then hydrogenated. n-Butanol and isobutanol are four-carbon alcohols made directly this way; 2-ethylhexanol (2-EH) is an eight-carbon alcohol made by condensing two n-butyraldehyde molecules before hydrogenation. 2-EH is used mainly to make plasticisers such as DOTP and 2-ethylhexyl acrylate, while n-butanol is used mainly to make butyl acrylate, butyl acetate and glycol ethers, and as a solvent.",
    takeaways: [
      "All three main OXO alcohols start from propylene and syngas.",
      "2-EH (C₈) is far less water-soluble and less volatile than n-butanol (C₄).",
      "2-EH demand follows PVC plasticisers and acrylic adhesives; n-butanol demand follows coatings.",
      "Non-phthalate plasticisers such as DOTP are also made from 2-EH, so 2-EH demand continues as formulators move away from DEHP.",
    ],
    body: [
      { type: "h2", text: "How are OXO alcohols made?" },
      {
        type: "ol",
        items: [
          "**Hydroformylation:** propylene reacts with carbon monoxide and hydrogen (syngas) to form n-butyraldehyde and isobutyraldehyde.",
          "**Hydrogenation:** the aldehydes are hydrogenated to n-butanol and isobutanol.",
          "**For 2-EH:** two n-butyraldehyde molecules undergo aldol condensation to 2-ethylhexenal, which is hydrogenated to 2-ethylhexanol.",
        ],
      },
      { type: "h2", text: "2-EH vs n-butanol vs isobutanol" },
      {
        type: "table",
        caption: "Typical properties (approximate)",
        head: ["Property", "2-Ethylhexanol", "n-Butanol", "Isobutanol"],
        rows: [
          ["Formula", "C₈H₁₈O", "C₄H₁₀O", "C₄H₁₀O"],
          ["CAS number", "104-76-7", "71-36-3", "78-83-1"],
          ["Boiling point", "about 184°C", "about 118°C", "about 108°C"],
          ["Solubility in water", "Very low (about 0.1%)", "Moderate (about 7 to 8%)", "Moderate (about 8 to 9%)"],
          ["Main derivatives", "Plasticisers, 2-EH acrylate, 2-EH nitrate", "Butyl acrylate, butyl acetate, glycol ethers", "Isobutyl acetate, plasticisers, solvents"],
        ],
      },
      { type: "h2", text: "What is 2-ethylhexanol used for?" },
      {
        type: "ul",
        items: [
          "**Plasticisers for PVC:** DOTP (DEHT), DEHP (DOP), DOA and TOTM. Plasticisers are the largest use.",
          "**2-Ethylhexyl acrylate** for pressure-sensitive adhesives, coatings and sealants.",
          "**2-Ethylhexyl nitrate,** a cetane improver for diesel fuel.",
          "Low-volatility solvent and dispersing uses.",
        ],
      },
      {
        type: "figure",
        src: u("1516937941344-00b4e0337589"),
        alt: "Petrochemical complex with distillation columns",
        caption: "OXO alcohol plants are usually integrated with propylene supply from a cracker or refinery.",
      },
      { type: "h2", text: "What is n-butanol used for?" },
      {
        type: "ul",
        items: [
          "**Butyl acrylate,** for acrylic emulsions in paints, adhesives and textiles.",
          "**Butyl acetate,** a widely used solvent in coatings and inks.",
          "**Glycol ethers** such as ethylene glycol monobutyl ether (butyl glycol).",
          "Direct solvent use in coatings, resins and extraction.",
        ],
      },
      {
        type: "callout",
        title: "OXO alcohols from Accord",
        text: "Accord sources [OXO alcohols](/products), including 2-EH, n-butanol and isobutanol, for plasticiser, acrylate and coatings producers, producer-direct and on specification. [Request a quote](/contact-us).",
      },
    ],
    faqs: [
      {
        q: "Is 2-EH the same as octanol?",
        a: "Commercially, 2-ethylhexanol is often called \"octanol\" or \"iso-octanol\" in plasticiser markets, but it is a branched C₈ alcohol and differs from straight-chain 1-octanol (n-octanol). Specify by name and CAS number, 104-76-7.",
      },
      {
        q: "Why are 2-EH and n-butanol prices linked?",
        a: "Both come from the same OXO plants and share propylene and syngas as feedstock. Producers can shift output between butanols and 2-EH, so their prices tend to move together, with spreads driven by plasticiser and acrylate demand.",
      },
      {
        q: "Is DOTP made from 2-EH?",
        a: "Yes. DOTP (dioctyl terephthalate, also called DEHT) is made by esterifying terephthalic acid or DMT with 2-ethylhexanol. It is a widely used non-phthalate alternative to DEHP.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "how-to-choose-a-petrochemical-supplier-in-india",
    title: "How to Choose a Petrochemical Supplier in India: A Buyer's Checklist",
    description:
      "Ten questions to ask a petrochemical distributor or trader in India, covering sourcing, documentation, quality, logistics, payment terms and track record.",
    category: "Buying Guide",
    tags: ["Supplier selection", "Procurement", "India"],
    published: "2026-11-23",
    updated: "2026-11-23",
    cover: {
      src: u("1586528116311-ad8dd3c8310d"),
      alt: "Large distribution warehouse with palletised stock",
    },
    answer:
      "When choosing a petrochemical supplier in India, check five things: where the material comes from (producer-direct or secondary traders), the quality documents supplied with every lot, whether the supplier can both indent and supply from duty-paid stock, who handles clearing, storage and delivery, and the supplier's verifiable track record and financial stability. A good supplier gives you a COA with every consignment, clear Incoterms and payment terms, and a single accountable contact from order to delivery.",
    takeaways: [
      "Ask for the producer and country of origin on every offer.",
      "Insist on a batch-specific COA and the SDS with every consignment.",
      "A supplier that can both indent and supply from stock lets you balance price against lead time.",
      "In-house logistics reduces hand-offs and makes one party accountable.",
      "Verify the track record: years in business, volumes handled and client references.",
    ],
    body: [
      { type: "h2", text: "10 questions to ask a petrochemical supplier" },
      {
        type: "ol",
        items: [
          "**Who is the producer, and what is the country of origin?** Origin affects quality consistency, duty and eligibility for trade-agreement benefits.",
          "**Do you buy producer-direct?** Each extra intermediary adds cost and weakens traceability.",
          "**Will every lot come with a COA and SDS?** See our guide to [checking a certificate of analysis](/blog/certificate-of-analysis-coa-chemicals).",
          "**Can you offer both indent and ex-stock supply?** Indent for planned volumes, local stock for urgent needs. See [indenting explained](/blog/what-is-indenting-in-petrochemical-trading).",
          "**Which Incoterms and payment terms do you offer?** LC, DP, DA or open account, and who carries the risk in transit.",
          "**Who handles clearing, storage and inland transport?** Ask whether these are in-house or subcontracted.",
          "**What packing options are available?** Drums, IBCs, ISO tanks, flexitanks or bulk.",
          "**How quickly do you quote?** In a volatile market, offer validity and response time matter.",
          "**What is your track record?** Years in business, annual volumes and the industries you supply.",
          "**Who is my single point of contact?** One accountable person reduces errors from order to delivery.",
        ],
      },
      {
        type: "figure",
        src: u("1587293852726-70cdb56c2866"),
        alt: "Warehouse racking stocked with goods",
        caption: "Duty-paid local stock shortens lead times for urgent or smaller requirements.",
      },
      { type: "h2", text: "Red flags to watch for" },
      {
        type: "ul",
        items: [
          "Reluctance to name the producer or the origin.",
          "COAs that look retyped, or batch numbers that do not match the packaging.",
          "Prices far below the market with no clear reason.",
          "Vague answers on who pays duty, freight and insurance.",
          "No physical office, registration details or verifiable references.",
        ],
      },
      { type: "h2", text: "How Accord measures up" },
      {
        type: "table",
        head: ["What to look for", "Accord Chemical Corporation"],
        rows: [
          ["Track record", "Trading petrochemicals from Mumbai since 2009"],
          ["Scale", "198,000+ metric tons in FY 2025-26; 500+ active clients across 60+ countries"],
          ["Sourcing", "Producer-direct relationships worldwide"],
          ["Buying routes", "Import and distribution from duty-paid stock, indenting and exports"],
          ["Quality documents", "COA supplied with every consignment; IEC-registered exporter"],
          ["Logistics", "Customs clearing, storage, survey, marine insurance and inland logistics in-house"],
          ["Offices", "Headquarters in Mumbai; branch offices in Ahmedabad and Gandhidham, Gujarat"],
        ],
      },
      {
        type: "callout",
        title: "Talk to the Accord desk",
        text: "Share the product, grade, volume and destination and we will respond with a quotation, typically within one business day. [Request a quote](/contact-us) or browse our [product families](/products).",
      },
    ],
    faqs: [
      {
        q: "What is the difference between a petrochemical distributor and a trader?",
        a: "A distributor typically imports and holds stock to sell locally in smaller lots. A trader or indenting agent may arrange producer-to-buyer contracts without holding stock. Many firms, including Accord, do both.",
      },
      {
        q: "How do I verify a chemical supplier in India?",
        a: "Check the company's registration details (CIN and GSTIN), IEC if it imports or exports, its physical office, sample COAs and SDSs, and references from existing customers in your industry.",
      },
      {
        q: "Which industries does Accord supply?",
        a: "Accord supplies paints and coatings, adhesives and sealants, pharmaceuticals, textiles, construction, personal care, agrochemicals, plastics and polymers, automotive, and inks and printing, among others.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Newest first; ties keep declaration order. */
export function sortedPosts(): Post[] {
  return [...posts].sort((a, b) => b.published.localeCompare(a.published));
}

function blockText(b: Block): string {
  switch (b.type) {
    case "ul":
    case "ol":
      return b.items.join(" ");
    case "table":
      return [...b.head, ...b.rows.flat()].join(" ");
    case "callout":
      return `${b.title} ${b.text}`;
    case "figure":
      return b.caption ?? "";
    default:
      return b.text;
  }
}

/** Reading time at ~220 words per minute. */
export function readingMinutes(p: Post): number {
  const text = [p.answer, ...p.takeaways, ...p.body.map(blockText), ...p.faqs.map((f) => `${f.q} ${f.a}`)].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

/** Stable anchor id for a heading. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Strip inline markup for meta / JSON-LD. */
export function plain(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[(.+?)\]\((.+?)\)/g, "$1");
}

/** Related posts: same category first, then most recent. */
export function relatedPosts(slug: string, n = 3): Post[] {
  const cur = getPost(slug);
  const others = sortedPosts().filter((p) => p.slug !== slug);
  if (!cur) return others.slice(0, n);
  return [
    ...others.filter((p) => p.category === cur.category),
    ...others.filter((p) => p.category !== cur.category),
  ].slice(0, n);
}
