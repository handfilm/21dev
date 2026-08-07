"use client";

import { motion } from "framer-motion";

const MANIFESTO =
  "No mass production. No compromises. Engineered for the urban grid. Only 100 pieces will ever exist.";

// Split on whitespace but keep the words intact — each word becomes its own
// animated span so the blur-reveal reads as a wave, not a fade.
const WORDS = MANIFESTO.split(" ");

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const word = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 8 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ManifestoReveal() {
  return (
    <section className="relative w-full bg-black py-32 sm:py-40">
      {/* Faint corner coordinates — reinforces the "engineered" / schematic
          language used elsewhere (FitQuiz calls this a "schematic"). */}
      <div className="pointer-events-none absolute top-8 left-6 font-mono text-[10px] tracking-widest text-neutral-700 uppercase sm:left-10">
        RAWx / 001—100
      </div>

      <div className="mx-auto max-w-4xl px-6">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={container}
          className="text-center text-2xl leading-snug font-bold text-balance text-white sm:text-4xl lg:text-5xl"
        >
          {WORDS.map((w, i) => (
            <motion.span
              key={i}
              variants={word}
              className="inline-block will-change-[filter,transform,opacity]"
            >
              {w}
              {i < WORDS.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </section>
  );
}
