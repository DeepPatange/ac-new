import Shell from "@/components/home2/Shell";
import ContactBand from "@/components/home2/ContactBand";
import { v2Meta } from "@/components/home2/shared";
import { AppFeatures, AppHero, AppRoles, AppScreens } from "@/components/home2/app/AppSections";

export const metadata = v2Meta(
  "Accord Interact",
  "Accord Interact is the all-in-one app for chemical-industry professionals, with live market prices, in-app trading and bids, broker and supplier tools, real-time chat and industry intelligence."
);

export default function AppTwo() {
  return (
    <Shell>
      <AppHero />
      <AppFeatures />
      <AppScreens />
      <AppRoles />
      <ContactBand />
    </Shell>
  );
}
