import Shell from "@/components/home2/Shell";
import { PageHeader, SplitHeading } from "@/components/home2/blocks";
import { PHOTOS, WRAP, v2Meta } from "@/components/home2/shared";
import ContactDesk from "@/components/home2/contact/ContactDesk";
import NextSteps from "@/components/home2/contact/NextSteps";
import { contactCopy, siteConfig } from "@/lib/site";

export const metadata = v2Meta(
  "Contact Us",
  "Talk to Accord Chemical Corporation's Mumbai office for imports, indenting, exports and logistics of petrochemicals. Send the product, volume and destination and get a quote within one business day.",
);

const actionCls =
  "inline-flex h-12 items-center px-6 text-[14px] font-medium transition-colors";

export default function ContactUsTwoPage() {
  const { contact } = siteConfig;
  return (
    <Shell>
      <PageHeader
        crumb="Contact us"
        lead={
          <>
            Mumbai trading desk.
            <br />
            <span className="text-accord-red">Quotes</span> in one business day.
          </>
        }
        note={
          <>
            Kanakia Western Edge II,
            <br />
            Borivali East, Mumbai.
          </>
        }
        title={[[{ text: "Contact" }], [{ text: "the", tone: "light" }, { text: "desk", tone: "red" }]]}
        intro={contactCopy.intro}
        image={{
          id: PHOTOS.portAerial,
          alt: "Aerial view of a container port terminal with gantry cranes",
        }}
        figure={{ value: "1 day", label: "Quotation turnaround" }}
      >
        <a href={contact.phoneHref} className={`${actionCls} bg-accord-red text-[#fff] hover:bg-accord-redDark`}>
          Call the desk
        </a>
        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${actionCls} border border-[#D8DAD9] bg-[#fff] text-[#3C3C3C] hover:border-accord-red hover:text-accord-red`}
        >
          WhatsApp
        </a>
      </PageHeader>

      <section id="enquiry" aria-label="Our desk" className={`${WRAP} border-t border-[#E0E2E1] py-12 lg:py-20`}>
        <SplitHeading
          note="Share the product, grade, volume and destination. One team handles it from quote to delivery."
          title={[
            [{ text: "Tell us" }],
            [{ text: "what you need", tone: "light" }],
            [{ text: "moved.", tone: "red" }],
          ]}
        />
        <ContactDesk />
      </section>

      <NextSteps />
    </Shell>
  );
}
