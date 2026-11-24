"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { PORTS, WAREHOUSES } from "./data";

/* Logistical presence: source ports → Accord hub → regional warehouses.
   Desktop/tablet: an SVG with thin red leader curves that draw in.
   Phone: a stacked ledger. Square, flat Swiss nodes; Inter labels. */

const RED = "#E11B22";
const INK = "#0A0A0A";
const FONT = "var(--font-sans), system-ui, sans-serif";

function Node({
  x,
  label,
  primary = false,
}: {
  x: number;
  label: string;
  primary?: boolean;
}) {
  const w = 156;
  const h = primary ? 104 : 92;
  const words = label.split(" ");
  return (
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: primary ? 0.35 : 0.2 }}
    >
      <rect
        x={x - w / 2}
        y={320 - h / 2}
        width={w}
        height={h}
        fill={primary ? RED : "#FFFFFF"}
        stroke={primary ? RED : INK}
        strokeWidth={1.25}
      />
      <text
        x={x}
        y={320}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={primary ? "#FFFFFF" : INK}
        style={{ fontFamily: FONT, fontSize: 15, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}
      >
        {words.map((word, i) => (
          <tspan key={word} x={x} dy={i === 0 ? (words.length > 1 ? "-0.55em" : "0.05em") : "1.2em"}>
            {word.toUpperCase()}
          </tspan>
        ))}
      </text>
    </motion.g>
  );
}

function Diagram() {
  const reduced = useReducedMotion();
  const draw = (delay: number) => ({
    initial: { pathLength: reduced ? 1 : 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: reduced ? 0 : 1.1, ease: "easeInOut" as const, delay },
  });

  const portY = PORTS.map((_, i) => 70 + i * 100);
  const whY = WAREHOUSES.map((_, i) => 130 + i * 120);

  return (
    <svg
      viewBox="0 0 1160 640"
      className="h-auto w-full"
      role="img"
      aria-label="Logistical presence: source ports feed the logistics hub, which distributes to regional warehouses."
    >
      <defs>
        <marker id="v2-flow-arrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
          <path d="M1,1 L7,4.5 L1,8" fill="none" stroke={RED} strokeWidth="1.6" />
        </marker>
      </defs>

      {/* Ports → PORTS node */}
      {portY.map((y, i) => (
        <g key={`p-${i}`}>
          <motion.path
            d={`M 150 ${y} C 250 ${y}, 300 320, 342 320`}
            fill="none"
            stroke={RED}
            strokeWidth={1.25}
            {...draw(0.05 * i)}
          />
          <rect x={146} y={y - 4} width={8} height={8} fill={RED} />
          <text
            x={134}
            y={y}
            textAnchor="end"
            dominantBaseline="middle"
            fill={INK}
            style={{ fontFamily: FONT, fontSize: 17, fontWeight: 500 }}
          >
            {PORTS[i]}
          </text>
          <text
            x={24}
            y={y}
            dominantBaseline="middle"
            fill={RED}
            style={{ fontFamily: FONT, fontSize: 12, fontWeight: 500 }}
          >
            {String(i + 1).padStart(2, "0")}
          </text>
        </g>
      ))}

      {/* Chain connectors */}
      <motion.path d="M 498 320 L 515 320" stroke={RED} strokeWidth={2} fill="none" markerEnd="url(#v2-flow-arrow)" {...draw(0.45)} />
      <motion.path d="M 678 320 L 695 320" stroke={RED} strokeWidth={2} fill="none" markerEnd="url(#v2-flow-arrow)" {...draw(0.55)} />

      <Node x={420} label="Ports" />
      <Node x={600} label="Logistical Presence" primary />
      <Node x={780} label="Warehouse" />

      {/* WAREHOUSE node → warehouses */}
      {whY.map((y, i) => (
        <g key={`w-${i}`}>
          <motion.path
            d={`M 858 320 C 904 320, 950 ${y}, 1010 ${y}`}
            fill="none"
            stroke={RED}
            strokeWidth={1.25}
            {...draw(0.6 + 0.06 * i)}
          />
          <rect x={1006} y={y - 4} width={8} height={8} fill={RED} />
          <text
            x={1026}
            y={y}
            textAnchor="start"
            dominantBaseline="middle"
            fill={INK}
            style={{ fontFamily: FONT, fontSize: 17, fontWeight: 500 }}
          >
            {WAREHOUSES[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Stacked() {
  const List = ({ title, items }: { title: string; items: string[] }) => (
    <div className="bg-[#F3F3F3] p-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accord-red">{title}</p>
      <ol className="mt-3 grid grid-cols-2 gap-x-4">
        {items.map((it, i) => (
          <li key={it} className="flex items-baseline gap-2 border-b border-[#DADADA] py-2 text-[14px] font-medium text-[#0A0A0A]">
            <span className="text-[11px] tabular-nums text-accord-red">{String(i + 1).padStart(2, "0")}</span>
            {it}
          </li>
        ))}
      </ol>
    </div>
  );
  return (
    <div className="flex flex-col items-stretch gap-3">
      <List title="Source ports" items={PORTS} />
      <ArrowDown className="mx-auto h-5 w-5 text-accord-red" strokeWidth={1.5} aria-hidden />
      <div className="bg-accord-red p-5 text-center text-[#fff]">
        <p className="font-sans text-[18px] font-medium uppercase tracking-[0.04em]">Logistical presence</p>
        <p className="mt-1 text-[13px] text-[#fff]/85">The Accord hub</p>
      </div>
      <ArrowDown className="mx-auto h-5 w-5 text-accord-red" strokeWidth={1.5} aria-hidden />
      <List title="Regional warehouses" items={WAREHOUSES} />
    </div>
  );
}

export default function Flow() {
  return (
    <>
      <div className="hidden md:block">
        <Diagram />
      </div>
      <div className="md:hidden">
        <Stacked />
      </div>
    </>
  );
}
