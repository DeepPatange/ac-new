import Shell from "@/components/home2/Shell";
import ContactBand from "@/components/home2/ContactBand";
import { ButtonLink, PageHeader } from "@/components/home2/blocks";
import { v2Meta } from "@/components/home2/shared";
import {
  Benefits,
  OfficeMosaic,
  OpenRoles,
  ROLES,
  careersMailto,
} from "@/components/home2/career/CareerSections";

/* Career v2: Swiss / editorial version of /career. Same roles, benefits and
   application links as the live page. */
export const metadata = v2Meta(
  "Career",
  "Build a career at Accord Chemical Corporation, a people-centric petrochemical trading house in Mumbai. Open roles in Sales, Procurement, Business Development, Logistics and Accounts."
);

export default function CareerTwo() {
  return (
    <Shell>
      <PageHeader
        crumb="Career"
        lead={
          <>
            Now hiring.
            <br />
            <span className="text-accord-red">{ROLES.length} open roles.</span>
          </>
        }
        note={
          <>
            Sales, procurement,
            <br />
            business development,
            <br />
            logistics and accounts.
          </>
        }
        title={[
          [{ text: "Careers" }],
          [
            { text: "at", tone: "light" },
            { text: "Accord", tone: "red" },
          ],
        ]}
        intro="Enabling our human capital is one of our core principles. As a people-centric, process-driven organisation, we run a sustainable talent-management framework, a high-energy workplace built on inclusivity and equal opportunity, with fair, transparent HR practices that help every employee build competencies and plan their career progression."
      >
        <ButtonLink href="#roles">View open roles</ButtonLink>
        <a
          href={careersMailto}
          className="inline-flex h-12 items-center border border-[#D8DAD9] bg-[#fff] px-6 text-[14px] font-medium text-[#3C3C3C] transition-colors hover:border-accord-red hover:text-accord-red"
        >
          Send your CV
        </a>
      </PageHeader>

      <OfficeMosaic />
      <Benefits />
      <OpenRoles />
      <ContactBand />
    </Shell>
  );
}
