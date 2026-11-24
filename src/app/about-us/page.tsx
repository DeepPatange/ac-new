import Shell from "@/components/home2/Shell";
import ContactBand from "@/components/home2/ContactBand";
import { ButtonLink, PageHeader } from "@/components/home2/blocks";
import { PHOTOS, R, v2Meta } from "@/components/home2/shared";
import AboutProcess from "@/components/home2/about/AboutProcess";
import {
  AboutFigures,
  AtAGlance,
  Capabilities,
  Journey,
  Locations,
  Recognition,
  Story,
  VisionMission,
} from "@/components/home2/about/AboutSections";

/* About us v2: Swiss / editorial version of /about-us. Same content, sourced
   from src/lib/site.ts; ICIS block renders only once approved. */
export const metadata = v2Meta(
  "About us",
  "Accord Chemical Corporation is among India's leading petrochemical distribution companies, engaged in the import, export and indenting of petrochemicals from Mumbai since 2009 across 60+ countries."
);

export default function AboutUsTwo() {
  return (
    <Shell>
      <PageHeader
        crumb="About us"
        lead={
          <>
            Imports. Exports.
            <br />
            <span className="text-accord-red">Indenting.</span>
          </>
        }
        note={
          <>
            Headquartered in Mumbai.
            <br />
            Branches in Ahmedabad and Gandhidham.
            <br />
            60+ countries served.
          </>
        }
        title={[
          [{ text: "One desk" }],
          [{ text: "from indent" }],
          [
            { text: "to", tone: "light" },
            { text: "delivery.", tone: "red" },
          ],
        ]}
        intro="Among India's leading petrochemical distribution houses, importing, exporting and indenting a diverse portfolio of petrochemicals and delivering them from producer to customer."
        image={{ id: PHOTOS.portAerial, alt: "Aerial view of a container port terminal with gantry cranes" }}
        figure={{ value: "Since 2009", label: "Mumbai · India" }}
      >
        <ButtonLink href={R.contact}>Request a quote</ButtonLink>
        <ButtonLink href={R.products} variant="outline">
          Products
        </ButtonLink>
      </PageHeader>

      <AtAGlance />
      <Story />
      <Journey />
      <AboutFigures />
      <Recognition />
      <AboutProcess />
      <Capabilities />
      <VisionMission />
      <Locations />
      <ContactBand />
    </Shell>
  );
}
