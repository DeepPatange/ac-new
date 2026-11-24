import { cta } from "@/lib/site";
import { R, WRAP } from "../shared";
import { ButtonLink, SplitHeading } from "../blocks";
import { FLOW_INTRO } from "./data";
import Flow from "./Flow";

/* Logistical presence: heading + the ports → hub → warehouses flow. */
export default function Presence() {
  return (
    <section aria-label="Logistical presence" className="border-t border-[#E6E6E6]">
      <div className={`${WRAP} py-12 lg:py-20`}>
        <SplitHeading
          red
          note={FLOW_INTRO}
          title={[[{ text: "Nationwide", tone: "light" }], [{ text: "logistical" }], [{ text: "presence", tone: "red" }]]}
        />
        <div className="mt-12 lg:mt-16">
          <Flow />
        </div>
        <div className="mt-12 flex justify-center">
          <ButtonLink href={R.contact}>{cta.primary.label}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
