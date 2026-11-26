import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Fade, Grow, MaskLine } from "./primitives";
import { WRAP, photo, R } from "./shared";

/* About statement — B&W photograph on the left, paper on the right, and a
   red field with a cut corner that overlaps the seam between them. */

const CUT = "polygon(0 0, 56% 0, 100% 36%, 100% 100%, 0 100%)";

function RedField() {
  return (
    <div className="relative h-full" style={{ clipPath: CUT }}>
      <Grow axis="x" origin="left" duration={1.2} className="absolute inset-0" />
      <div className="relative flex h-full flex-col justify-end p-8 pt-28 text-[#fff] sm:p-12 sm:pt-36 lg:p-14">
        <h2 className="font-sans text-[clamp(2.4rem,4.6vw,4.5rem)] font-semibold uppercase leading-[0.94] tracking-[-0.035em]">
          <MaskLine delay={0.3}>One desk</MaskLine>
          <MaskLine delay={0.38}>from indent</MaskLine>
          <MaskLine delay={0.46}>to delivery.</MaskLine>
        </h2>
        <Fade delay={0.6}>
          <p className="mt-6 max-w-xl text-[clamp(0.95rem,1.25vw,1.1rem)] uppercase leading-snug tracking-[0.01em] text-[#fff]/95">
            Producer-direct relationships, transparent indent pricing and
            in-house clearing, storage, insurance and logistics. One point of
            contact for the entire consignment.
          </p>
          <Link
            href={R.about}
            className="group mt-8 inline-flex items-center gap-2 border-b border-[#fff]/60 pb-1 text-[14px] font-medium text-[#fff] transition-colors hover:border-[#fff]"
          >
            About Accord
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
          </Link>
        </Fade>
      </div>
    </div>
  );
}

export default function Statement() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#F6F6F6]">
      <div className="grid lg:min-h-[760px] lg:grid-cols-2">
        {/* Photo */}
        <div className="relative h-[380px] sm:h-[460px] lg:h-auto">
          <Image
            src={photo("1587293852726-70cdb56c2866")}
            alt="Long warehouse aisle with racked, palletised stock"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover grayscale contrast-[1.15]"
          />
          <div className="absolute left-5 top-5 text-[#fff] sm:left-8 sm:top-8 lg:left-12 lg:top-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#fff]/80">
              Since 2009
            </p>
            <p className="mt-1 text-[14px] font-medium">Mumbai · Ahmedabad · Gandhidham</p>
          </div>
        </div>

        {/* Paper side (desktop keeps it as the canvas for the red field) */}
        <div className="relative hidden lg:block">
          <p className="absolute bottom-10 right-12 text-[14px] font-medium tracking-[0.02em] text-accord-red">
            www.accordchemicals.com
          </p>
        </div>
      </div>

      {/* Red field — overlaps the seam on desktop, overlaps the photo on mobile */}
      <div className="relative -mt-24 px-5 pb-16 sm:-mt-32 sm:px-8 lg:absolute lg:inset-y-[13%] lg:left-[36%] lg:right-[7%] lg:mt-0 lg:p-0">
        <RedField />
      </div>
    </section>
  );
}
