"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowRight, ShoppingBag } from "lucide-react";
import { Interactive, Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

const specs = [
  { label: "Tempo", value: "128 BPM" },
  { label: "Range", value: "20 Hz – 20 kHz" },
  { label: "Resolution", value: "24-bit / 96 kHz" },
];

// A hand-authored oscilloscope trace with the asymmetric attack/decay of an
// actual kick-drum transient, rather than a generic sine wave — it echoes
// the "engineered for the low end" claim in the headline.
const WAVEFORM_PATH =
  "M0,60 L40,60 C55,60 60,10 75,10 C90,10 95,95 110,95 C122,95 126,55 140,55 L200,55 C215,55 220,15 235,15 C250,15 254,88 268,88 C280,88 284,58 300,58 L400,58 C412,58 416,20 430,20 C444,20 448,90 462,90 C474,90 478,60 492,60 L560,60";

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b bg-background">
      {/* Decorative backdrop. aria-hidden so the animated layers stay out of
          the accessibility tree and reading order. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />
        <div className="aurora-blob animate-pulse-glow absolute -top-32 right-1/4 h-[30rem] w-[30rem] opacity-70" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-28 pb-20 text-center sm:pt-36">
        <Reveal>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-fluid-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            Drop 004 · Signal Series
          </span>
        </Reveal>

        <Reveal delay={0.12}>
          <h1 className="mt-8 text-fluid-4xl font-semibold leading-[1.05] text-balance">
            Machines built{" "}
            <span className="gradient-text animate-gradient-shift">for the low end.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mx-auto mt-6 max-w-xl text-fluid-lg text-muted-foreground">
            Modular synths and drum machines, machined from a single billet of
            6061 aluminum — tuned on the floor, not in a lab.
          </p>
        </Reveal>

        <Reveal delay={0.36} className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Interactive>
              <Link
                href="/shop"
                className={cn(
                  "group inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6",
                  "bg-primary text-primary-foreground font-medium shadow-elevated",
                  "transition-colors duration-base ease-out-expo hover:bg-primary/90",
                )}
              >
                <ShoppingBag className="size-4" aria-hidden />
                Shop the series
                <ArrowRight
                  className="size-4 transition-transform duration-base ease-out-expo group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Interactive>

            <Interactive>
              <Link
                href="/spec-sheet"
                className="glass inline-flex h-12 items-center justify-center rounded-xl px-6 font-medium transition-colors duration-base hover:bg-surface-raised"
              >
                View the spec sheet
              </Link>
            </Interactive>
          </div>
        </Reveal>

        {/* Signature element: an oscilloscope trace that draws itself in,
            followed by a live-telemetry readout strip. This is the one bold
            move in an otherwise quiet layout — everything else stays still
            so this can move. */}
        <Reveal delay={0.5} className="mt-16 w-full">
          <div className="glass mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border shadow-soft">
            <div className="flex items-center justify-between border-b px-5 py-3">
              <span className="inline-flex items-center gap-2 font-mono text-fluid-xs uppercase tracking-[0.14em] text-muted-foreground">
                <Activity className="size-3.5 text-accent" aria-hidden />
                Channel 01 — Live trace
              </span>
              <span className="size-2 rounded-full bg-primary" aria-hidden />
            </div>

            <svg
              viewBox="0 0 560 120"
              className="h-28 w-full text-primary"
              role="img"
              aria-label="Oscilloscope trace of a kick-drum transient"
            >
              <line x1="0" y1="60" x2="560" y2="60" className="stroke-border" strokeWidth="1" />
              <motion.path
                d={WAVEFORM_PATH}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={
                  shouldReduceMotion
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              />
            </svg>

            <dl className="grid grid-cols-3 divide-x border-t font-mono text-fluid-xs">
              {specs.map((spec) => (
                <div key={spec.label} className="px-4 py-3">
                  <dt className="uppercase tracking-[0.1em] text-muted-foreground">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 font-medium tabular-nums">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}