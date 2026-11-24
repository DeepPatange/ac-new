/* Services content, mirrored verbatim from the live page
   (src/components/sections/ServicesContent.tsx, where these are local
   constants). Keep the two in sync if the client changes either. */

export const PORTS = ["Kandla", "Hazira", "JNPT", "Mundra", "Mumbai", "Cochin"];
export const WAREHOUSES = ["Bhiwandi", "Ahmedabad", "Cochin", "Gandhidham"];

/** Storage and discharge ports named in the page intro. */
export const STORAGE_PORTS = ["Kandla", "JNPT (Nhava Sheva)", "Hazira", "Mumbai"];

export const SERVICES = [
  {
    icon: "ClipboardCheck",
    title: "CHA & Surveyor",
    desc: "Appointment of Customs House Agent and cargo surveyor on behalf of our customers.",
  },
  {
    icon: "Fuel",
    title: "Port Storage Tanks",
    desc: "Arranging dedicated and commingled bulk storage tanks at the port for imported chemicals.",
  },
  {
    icon: "FileSearch",
    title: "Survey & Insurance",
    desc: "Pre-discharge and post-discharge survey and insurance for the consignment at the port.",
  },
  {
    icon: "Truck",
    title: "Insurance & Delivery",
    desc: "Arranging cargo insurance and onward delivery of the consignment to your gate.",
  },
  {
    icon: "Route",
    title: "Logistics Support",
    desc: "End-to-end logistics support for every consignment across our PAN-India network.",
  },
] as const;

export const INTRO = [
  "Accord Chemical Corporation is one of the largest petrochemical distribution companies, specialising in the import, export, distribution and indenting of diverse petrochemicals. As your trusted partner, we ensure seamless transport, catering to the dynamic demands of the industry nationwide.",
  "A decade-long industry standing, complemented by a vast PAN-India supply-chain network, earns us a strategic advantage. Dedicated and commingled bulk storage tanks at multiple ports let us extend logistics support for imported bulk chemicals to our clients.",
];

export const HERO_INTRO =
  "One of India’s leading petrochemical distribution houses, specialising in the import, export, distribution and indenting of diverse petrochemicals, and moving them seamlessly from port to plant gate.";

export const FLOW_INTRO =
  "Cargo lands at India’s major ports, moves through the Accord logistics hub, and is distributed to regional warehouses through one accountable chain, from vessel to customer.";
