"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function ParticleSphereAnimation() {
  return (
    <div className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/20 bg-primary/5 shadow-[0_0_40px_rgba(var(--primary),0.1)]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-dashed border-accent/40"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 rounded-full border border-dotted border-primary/40"
      />
      <Zap className="h-8 w-8 text-accent opacity-80" />
    </div>
  );
}