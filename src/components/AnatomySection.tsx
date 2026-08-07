"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Mandarin Collar",
    desc: "Structured stand collar, hand-stitched with waxed thread for a clean, closed line.",
  },
  {
    title: "Articulated Sleeves",
    desc: "Pre-curved paneling follows the natural arm bend — zero bunching at the elbow.",
  },
  {
    title: "Matte Hardware",
    desc: "Custom-cast zinc-alloy hardware, blackened and matte-sealed to kill glare.",
  },
];

export default function AnatomySection() {
  return (
    <section className="relative w-full bg-neutral-950 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-24">
        {/* Render placeholder — swap for a real high-res product render or
            an interactive 360 viewer once assets are ready. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black lg:order-1"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-600">
              Product Render — Obsidian.png
            </span>
          </div>
          <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-neutral-700">
            Fig. 01 / Front
          </div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500"
          >
            Anatomy
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-3xl font-bold text-balance text-white sm:text-4xl"
          >
            Built like it means it.
          </motion.h2>

          <ul className="mt-10 space-y-8">
            {FEATURES.map((feature, i) => (
              <motion.li
                key={feature.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="border-l-2 border-white/10 pl-6"
              >
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-1 text-sm text-neutral-400">{feature.desc}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
