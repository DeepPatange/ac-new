import Image from "next/image";
import { Fade } from "../primitives";
import { WRAP } from "../shared";
import { Label } from "../blocks";

/* The six molecule renders in /public/products: decorative only. There are
   six renders for eight families, so the rail is presented as illustrative
   and never sits beside a family name (no implied one-to-one mapping). */
const RAIL = [
  { src: "/products/fumarate.png", lift: "lg:-translate-y-6" },
  { src: "/products/succinate.png", lift: "lg:translate-y-4" },
  { src: "/products/theanine.png", lift: "lg:-translate-y-2" },
  { src: "/products/pyroglutamic-acid.png", lift: "lg:translate-y-6" },
  { src: "/products/ethylene-carbonate.png", lift: "lg:-translate-y-4" },
  { src: "/products/propylene-carbonate.png", lift: "lg:translate-y-2" },
];

export default function MoleculeRail() {
  return (
    <section className={`${WRAP} pb-6`}>
      <div className="border-t border-[#E6E6E6] pt-5">
        <Label>Illustrative molecular renders</Label>
      </div>
      <ul aria-hidden className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3 lg:mt-12">
        {RAIL.map(({ src, lift }, i) => (
          <li key={src} className={lift}>
            <Fade delay={i * 0.05}>
              <div className="group relative aspect-square overflow-hidden bg-[#F3F3F3]">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 16vw, 31vw"
                  className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accord-red transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </Fade>
          </li>
        ))}
      </ul>
    </section>
  );
}
