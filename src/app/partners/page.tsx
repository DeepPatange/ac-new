import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import {
  PartnersSection,
  TestimonialsSection,
} from "@/components/sections/Partners";

export const metadata: Metadata = {
  title: "Partners & Testimonials | Accord Chemical Corporation",
  description:
    "Accord Chemical Corporation's producer, logistics and service partners, and feedback from the clients we supply across India and international markets.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 sm:pt-24">
        <PartnersSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
