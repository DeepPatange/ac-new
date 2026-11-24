import { R, WRAP } from "../shared";
import { SplitHeading } from "../blocks";
import { SECTORS } from "./data";

/* Every sector on the live page, as a fast typographic index (no animation,
   no scroll-jacking). */
export default function SectorList() {
  return (
    <section aria-label="All sectors" className={`${WRAP} border-t border-[#E6E6E6] py-12 lg:py-20`}>
      <SplitHeading
        title={[[{ text: "Eighteen" }], [{ text: "sectors.", tone: "light" }], [{ text: "One desk.", tone: "red" }]]}
        note="From paints and packaging to pharmaceuticals and polymers, every sector is supplied from the same Mumbai trading desk."
        link={{ href: R.contact, label: "Not listed? Ask the desk" }}
      />
      <ol className="mt-12 grid grid-cols-2 border-t border-[#E6E6E6] sm:grid-cols-3 lg:mt-16 lg:grid-cols-6">
        {SECTORS.map((s, i) => (
          <li key={s.name} className="flex items-baseline gap-3 border-b border-[#E6E6E6] py-4 pr-3">
            <span className="text-[12px] font-light tabular-nums text-accord-red">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[15px] font-medium text-[#0A0A0A]">{s.name}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
