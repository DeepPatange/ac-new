import Shell from "@/components/home2/Shell";
import ContactBand from "@/components/home2/ContactBand";
import { ButtonLink, PageHeader } from "@/components/home2/blocks";
import { PHOTOS, R, enquire, v2Meta } from "@/components/home2/shared";
import MoleculeRail from "@/components/home2/products/MoleculeRail";
import FamilyIndex from "@/components/home2/products/FamilyIndex";
import Supply from "@/components/home2/products/Supply";
import { FOUNDING_YEAR, cta, products, productsIntro, stats } from "@/lib/site";

export const metadata = v2Meta(
  "Products",
  "Eight petrochemical families supplied producer-direct by Accord Chemical Corporation, with a COA on every lot."
);

export default function ProductsTwo() {
  const countries = stats.find((s) => s.label === "Countries");
  const countriesLabel = countries ? `${countries.value}${countries.suffix}` : "";
  const families = String(products.length).padStart(2, "0");

  return (
    <Shell>
      <PageHeader
        crumb="Products"
        lead={
          <>
            Producer-direct sourcing.
            <br />
            <span className="text-accord-red">COA</span> on every lot.
          </>
        }
        note={
          <>
            {families} families.
            <br />
            {countriesLabel} countries.
            <br />
            Since {FOUNDING_YEAR}.
          </>
        }
        title={[
          [{ text: "What" }, { text: "we", tone: "light" }],
          [{ text: "carry", tone: "red" }],
        ]}
        intro={productsIntro}
        image={{ id: PHOTOS.pipework, alt: "Stainless pipework and valves at a chemical processing facility" }}
        figure={{ value: families, label: "Product families" }}
      >
        <ButtonLink href={R.contact}>{cta.primary.label}</ButtonLink>
        <ButtonLink href={enquire("custom-sourcing")} variant="outline">
          Custom sourcing
        </ButtonLink>
      </PageHeader>
      <MoleculeRail />
      <FamilyIndex />
      <Supply />
      <ContactBand />
    </Shell>
  );
}
