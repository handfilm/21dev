"use client";

import { motion, useReducedMotion } from "framer-motion";

type MarqueeItem = { type: "text"; label: string } | { type: "image"; alt: string };

const SEQUENCE: MarqueeItem[] = [
  { type: "text", label: "URBAN ARMOR" },
  { type: "image", alt: "Lookbook still — city, night" },
  { type: "text", label: "ZERO RESISTANCE" },
  { type: "image", alt: "Lookbook still — motion blur" },
  { type: "text", label: "HANDFILM STUDIO" },
  { type: "image", alt: "Lookbook still — studio, matte black" },
];

export default function LifestyleMarquee() {
  const shouldReduceMotion = useReducedMotion();
  // Content is duplicated once so the loop can run from 0% to -50% and land
  // exactly back on frame one — no jump, no seam.
  const track = [...SEQUENCE, ...SEQUENCE];

  return (
    <section className="relative w-full overflow-hidden bg-black py-16 sm:py-20">
      <div className="flex">
        <motion.div
          className="flex shrink-0 items-center"
          animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {track.map((item, i) =>
            item.type === "text" ? (
              <span
                key={i}
                className="flex shrink-0 items-center whitespace-nowrap px-6 text-[10vw] leading-none font-black tracking-tight text-white/90 uppercase sm:text-6xl lg:text-7xl"
              >
                {item.label}
                <span className="ml-6 text-white/20 sm:ml-10">//</span>
              </span>
            ) : (
              <div
                key={i}
                role="img"
                aria-label={item.alt}
                className="relative mx-4 h-40 w-60 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black sm:h-52 sm:w-80"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[10px] tracking-widest text-neutral-600 uppercase">
                    {item.alt}
                  </span>
                </div>
                <div className="absolute top-3 left-3 font-mono text-[9px] tracking-widest text-neutral-700 uppercase">
                  RAWx / Obsidian
                </div>
              </div>
            ),
          )}
        </motion.div>
      </div>

      {/* Edge fades so the loop never shows a hard cut */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent sm:w-32" />
    </section>
  );
}
