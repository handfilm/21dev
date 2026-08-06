"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Client-side motion primitives.
 *
 * Every component here checks `useReducedMotion()`. The CSS reset in
 * globals.css neutralizes @keyframes animations, but framer-motion drives
 * transforms via inline styles/WAAPI, so it has to opt out in JS as well —
 * otherwise reduced-motion users still get the movement.
 *
 * The easing arrays mirror `transitionTimingFunction` in tailwind.config.ts
 * so CSS and JS motion feel like the same system.
 */

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  /** Seconds. Use with `Stagger` for sequenced groups. */
  delay?: number;
  direction?: Direction;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  const { x, y } = reduced ? OFFSET.none : OFFSET[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      // `amount: 0.2` fires once a fifth of the element is visible, which
      // avoids tall sections never triggering on short viewports.
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration: reduced ? 0 : 0.7,
        delay: reduced ? 0 : delay,
        ease: EASE_OUT_EXPO,
      }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

/** Wrap a list; each direct `<StaggerItem>` child animates in sequence. */
export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduced ? undefined : containerVariants}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} variants={reduced ? undefined : itemVariants}>
      {children}
    </motion.div>
  );
}

/** Subtle lift + press feedback for cards and buttons. */
export function Interactive({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      whileHover={reduced ? undefined : { y: -4, scale: 1.015 }}
      whileTap={reduced ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {children}
    </motion.div>
  );
}
