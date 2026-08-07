"use client";

import { type ElementType, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Layers, Scissors, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Material {
  icon: ElementType;
  title: string;
  desc: string;
  stat: string;
  statLabel: string;
  className?: string;
}

const MATERIALS: Material[] = [
  {
    icon: Layers,
    title: "Full-Grain Italian Leather",
    desc: "Sourced from a single Tuscan tannery, vegetable-tanned over 40 days for a patina that only gets better with wear.",
    stat: "1.4mm",
    statLabel: "Average thickness",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    icon: Scissors,
    title: "Zero-Waste Cut Pattern",
    desc: "Every panel is nested by algorithm before the blade touches hide — nothing goes to landfill.",
    stat: "0%",
    statLabel: "Material waste",
  },
  {
    icon: Zap,
    title: "Aerospace-Grade Aluminum Zippers",
    desc: "CNC-machined from 6061 aluminum, anodized matte black, rated for 10,000+ pull cycles.",
    stat: "6061",
    statLabel: "Aluminum alloy",
  },
];

function BentoCard({ icon: Icon, title, desc, stat, statLabel, className }: Material) {
  // Cursor-follow spotlight — tracked as motion values so the radial
  // gradient position updates without triggering React re-renders.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 70%)`;

  return (
    <div className={cn("group relative rounded-2xl p-px", className)}>
      {/* Rotating border-beam: an oversized conic gradient spinning behind
          a 1px inset, so only a thin arc of light ever traces the edge. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-2xl opacity-25 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.9) 8%, transparent 20%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      <div
        onMouseMove={handleMouseMove}
        className="relative flex h-full flex-col justify-between overflow-hidden rounded-[calc(1rem_-_1px)] bg-zinc-950 p-7"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <div className="relative">
          <span className="inline-flex size-10 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
            <Icon className="size-4.5 text-white" aria-hidden />
          </span>
          <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 max-w-sm text-sm text-neutral-400">{desc}</p>
        </div>

        <div className="relative mt-8 border-t border-white/10 pt-4">
          <span className="block font-mono text-2xl font-bold tabular-nums text-white">
            {stat}
          </span>
          <span className="block text-xs uppercase tracking-widest text-neutral-500">
            {statLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function BentoShowcase() {
  return (
    <section className="relative w-full bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            The Material Engine
          </span>
          <h2 className="mt-3 text-3xl font-bold text-balance text-white sm:text-4xl">
            Nothing on this jacket is arbitrary.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[13rem]">
          {MATERIALS.map((material) => (
            <BentoCard key={material.title} {...material} />
          ))}
        </div>
      </div>
    </section>
  );
}
