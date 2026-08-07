"use client";

import { motion } from "framer-motion";

// Swap these for a live count from your inventory source (Make.com,
// Shopify webhook, etc.) — hardcoded here so the banner ships today.
const TOTAL_EDITION = 100;
const REMAINING = 42;

export default function ScarcityEngine() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 top-0 z-50 h-10 border-b border-white/10 bg-black/70 backdrop-blur-md"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-center gap-2.5 px-4">
        <span className="relative flex size-2 shrink-0">
          <motion.span
            className="absolute inline-flex size-full rounded-full bg-red-500"
            animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="relative inline-flex size-2 rounded-full bg-red-500" />
        </span>

        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-200 sm:text-xs">
          Edition 01 / {TOTAL_EDITION} Minted
          <span className="text-neutral-600"> — </span>
          <span className="font-semibold text-red-400">{REMAINING} Remaining</span>
        </p>
      </div>
    </div>
  );
}
