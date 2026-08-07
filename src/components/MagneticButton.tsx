"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  /** 0–1, how strongly the button chases the cursor. Default 0.35. */
  strength?: number;
}

export default function MagneticButton({
  children,
  onClick,
  href,
  className,
  disabled = false,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const contentClassName = cn(
    "group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full border px-8 text-sm font-semibold uppercase tracking-wide transition-colors duration-300",
    disabled
      ? "cursor-not-allowed border-white/10 text-white/30"
      : "border-white/15 text-white",
    className,
  );

  // Liquid-fill layer: a white sheet that rises from the bottom edge on
  // hover, then the label crossfades to black so it stays legible on top.
  const inner = (
    <>
      {!disabled && (
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
      )}
      <span
        className={cn(
          "relative z-10 transition-colors duration-300",
          !disabled && "group-hover:text-black",
        )}
      >
        {children}
      </span>
    </>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {href && !disabled ? (
        <a href={href} onClick={onClick} className={contentClassName}>
          {inner}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          aria-disabled={disabled}
          className={contentClassName}
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}
