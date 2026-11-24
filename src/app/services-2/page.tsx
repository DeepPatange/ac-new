import Shell from "@/components/home2/Shell";
import ContactBand from "@/components/home2/ContactBand";
import { ButtonLink, PageHeader } from "@/components/home2/blocks";
import { PHOTOS, R, v2Meta } from "@/components/home2/shared";
import Intro from "@/components/home2/services/Intro";
import Verticals from "@/components/home2/services/Verticals";
import { ServicesJourney } from "@/components/home2/art/stories";
import Presence from "@/components/home2/services/Presence";
import { HERO_INTRO, PORTS } from "@/components/home2/services/data";
import { cta } from "@/lib/site";

export const metadata = v2Meta(
  "Services",
  "Import, export, distribution and indenting of petrochemicals, CHA & surveyor, port bulk storage, survey & insurance, and PAN-India logistics."
);

export default function ServicesTwo() {
  return (
    <Shell>
      <PageHeader
        crumb="Services"
        lead={
          <>
            What we handle.
            <br />
            <span className="text-accord-red">Port</span> to plant gate.
          </>
        }
        note={
          <>
            Import. Export.
            <br />
            Distribution.
            <br />
            Indenting.
          </>
        }
        title={[
          [{ text: "From", tone: "light" }, { text: "port" }],
          [{ text: "to plant gate.", tone: "red" }],
        ]}
        intro={HERO_INTRO}
        image={{ id: PHOTOS.containerYard, alt: "Aerial view of a stacked shipping container yard" }}
        figure={{ value: String(PORTS.length).padStart(2, "0"), label: "Source ports" }}
      >
        <ButtonLink href={R.contact}>{cta.primary.label}</ButtonLink>
      </PageHeader>
      <Intro />
      <Verticals />
      <ServicesJourney />
      <Presence />
      <ContactBand />
    </Shell>
  );
}
