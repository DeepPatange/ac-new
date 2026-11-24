"use client";

/* ==========================================================================
   Home 2 — shared motion primitives.
   Swiss / editorial direction: B&W photography, solid red fields, grotesk
   type. Motion is restrained: masked line rises, hairline/red-block wipes,
   soft fades. All variants respect `prefers-reduced-motion` via the global
   <MotionConfig reducedMotion="user"> in the root layout.
   ========================================================================== */

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { easeOut } from "@/lib/motion";

/** One line of display type that rises out of a clipping mask.
 *  The in-view trigger lives on the (untransformed) mask; the moving child
 *  starts clipped, so observing it directly would never report "in view". */
export function MaskLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={`block overflow-hidden pb-[0.04em] ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
        transition={{ duration: 0.9, ease: easeOut, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Soft fade + small lift for body copy and blocks. */
export function Fade({
  children,
  delay = 0,
  className = "",
  y = 16,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A coloured field that wipes in along one axis.
 *  `className` positions the (untransformed, observed) box; `fill` styles the
 *  layer that scales. Observing the scaled layer itself is unreliable because
 *  it starts at zero width/height. */
export function Grow({
  axis = "x",
  origin = "left",
  delay = 0,
  duration = 1.1,
  className = "",
  fill = "bg-accord-red",
  style,
}: {
  axis?: "x" | "y";
  origin?: "left" | "right" | "top" | "bottom";
  delay?: number;
  duration?: number;
  className?: string;
  fill?: string;
  style?: CSSProperties;
}) {
  const hidden = axis === "x" ? { scaleX: 0 } : { scaleY: 0 };
  const show = axis === "x" ? { scaleX: 1 } : { scaleY: 1 };
  return (
    <motion.div
      aria-hidden
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className={`absolute inset-0 ${fill}`}
        style={{ transformOrigin: origin }}
        variants={{ hidden, show }}
        transition={{ duration, ease: easeOut, delay }}
      />
    </motion.div>
  );
}

/** Small square marker used as the editorial "bullet" above intros. */
export function Square({ red = false }: { red?: boolean }) {
  return (
    <span
      aria-hidden
      className={`block h-2.5 w-2.5 ${red ? "bg-accord-red" : "bg-[#0A0A0A]"}`}
    />
  );
}
