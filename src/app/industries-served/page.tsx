import Shell from "@/components/home2/Shell";
import ContactBand from "@/components/home2/ContactBand";
import { ButtonLink, PageHeader, SplitHeading } from "@/components/home2/blocks";
import { PHOTOS, R, WRAP, v2Meta } from "@/components/home2/shared";
import { IndustriesStory } from "@/components/home2/art/stories";
import IndustriesOverview from "@/components/home2/art/IndustriesOverview";
import SectorList from "@/components/home2/industries/SectorList";
import { SECTORS } from "@/components/home2/industries/data";

export const metadata = v2Meta(
  "Industries served",
  "The downstream industries Accord Chemical Corporation supplies: paints, coatings, packaging, adhesives, resins, textiles, pharmaceuticals, agrochemicals, automobiles, polymers and more."
);

export default function IndustriesServedTwo() {
  return (
    <Shell>
      <PageHeader
        crumb="Industries served"
        lead={
          <>
            {SECTORS.length} downstream
            <br />
            <span className="text-accord-red">sectors</span> supplied.
          </>
        }
        note={
          <>
            Mumbai headquarters.
            <br />
            Import, export and indenting.
          </>
        }
        title={[[{ text: "Industries" }], [{ text: "we", tone: "light" }, { text: "serve", tone: "red" }]]}
        intro="Accord Chemical Corporation is a leading petrochemical distribution company, engaged in the import, export and indenting of a diverse portfolio of petrochemicals from our Mumbai headquarters. We supply each of the downstream industries below."
        image={{ id: PHOTOS.pipework, alt: "Stainless pipework and process vessels at a chemical plant" }}
        figure={{ value: String(SECTORS.length), label: "Downstream sectors" }}
      >
        <ButtonLink href={R.contact}>Request a quote</ButtonLink>
        <ButtonLink href={R.products} variant="outline">
          Products
        </ButtonLink>
      </PageHeader>

      <IndustriesOverview />
      <IndustriesStory />
      <SectorList />
      <ContactBand />
    </Shell>
  );
}
