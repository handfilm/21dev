"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";

function scrollToQuiz() {
  document.getElementById("fit-quiz")?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      {/* Video placeholder layer — replace src/poster with the real campaign
          film once it's graded. Falls back to a plain black frame if the
          asset 404s, which still reads fine against the gradient overlay. */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50"
        autoPlay
        muted
        loop
        playsInline
        poster="/media/obsidian-poster.jpg"
      >
        <source src="/media/obsidian-campaign.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/70 to-black" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.04] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27120%27%20height=%27120%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.9%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url(%23n)%27/%3E%3C/svg%3E')]"
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-neutral-400"
        >
          RAWx — Full-Grain Leather
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16vw] font-black uppercase leading-[0.82] tracking-tight text-white sm:text-[11vw] lg:text-[7.5vw]"
        >
          Project
          <br />
          Obsidian
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 max-w-md text-balance text-sm text-neutral-400 sm:text-base"
        >
          100 jackets. Hand-numbered. Never restocked.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10"
        >
          <MagneticButton onClick={scrollToQuiz}>Secure Your Edition</MagneticButton>
        </motion.div>

        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ opacity: { delay: 1, duration: 0.6 }, y: { delay: 1.2, duration: 1.6, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute bottom-8 h-9 w-5 rounded-full border border-white/20"
        >
          <span className="mx-auto mt-1.5 block size-1 rounded-full bg-white/50" />
        </motion.div>
      </div>
    </section>
  );
}
