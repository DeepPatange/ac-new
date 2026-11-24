import Shell from "@/components/home2/Shell";
import ContactBand from "@/components/home2/ContactBand";
import { ButtonLink, PageHeader } from "@/components/home2/blocks";
import { PHOTOS, R, v2Meta } from "@/components/home2/shared";
import { PartnerGrid, TestimonialGrid } from "@/components/home2/partners/PartnerSections";

export const metadata = v2Meta(
  "Partners and testimonials",
  "Accord Chemical Corporation's producer, logistics and service partners, and feedback from the clients we supply across India and international markets."
);

export default function PartnersTwo() {
  return (
    <Shell>
      <PageHeader
        crumb="Partners"
        lead={
          <>
            Producers. Logistics.
            <br />
            <span className="text-accord-red">Service</span> partners.
          </>
        }
        note={
          <>
            Worldwide sourcing.
            <br />
            One accountable desk.
          </>
        }
        title={[[{ text: "Our partners" }], [{ text: "and", tone: "light" }], [{ text: "clients", tone: "red" }]]}
        intro="We work with established petrochemical manufacturers, logistics providers and service partners worldwide to deliver consistent quality and dependable supply to the clients we serve."
        image={{ id: PHOTOS.portAerial, alt: "Aerial view of a container port terminal with gantry cranes" }}
      >
        <ButtonLink href={R.contact}>Talk to our desk</ButtonLink>
      </PageHeader>

      <PartnerGrid />
      <TestimonialGrid />
      <ContactBand />
    </Shell>
  );
}
