import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

/* globals.css sets `body { overflow-x: hidden }`. With html at overflow-x:
   clip that makes <body> its own scroll container, which silently disables
   every `position: sticky` inside it (pinned scroll scenes, sticky sidebars).
   `clip` still blocks sideways scroll but does not create a scroll container.
   Scoped to v2 pages only, so the live site is untouched. */
const STICKY_FIX = "body{overflow-x:clip}";

/** v2 page frame: header, main (anchor #top), footer. */
export default function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#fff] text-[#3C3C3C]">
      <style>{STICKY_FIX}</style>
      <Nav />
      <main id="top">{children}</main>
      <Footer />
    </div>
  );
}
