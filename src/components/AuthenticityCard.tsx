"use client";

import { useRef, type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const EDITION_NUMBER = "01";
const EDITION_TOTAL = "100";

export default function AuthenticityCard() {
  const ref = useRef<HTMLDivElement>(null);

  // Raw cursor position within the card, in px — drives the glare gradient.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Normalized -0.5..0.5 position — drives the 3D rotation.
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    mouseX.set(px);
    mouseY.set(py);

    const normX = px / rect.width - 0.5;
    const normY = py / rect.height - 0.5;

    // Invert Y so tilting toward the cursor feels physically correct
    // (mouse near top → card leans back / top edge lifts).
    rotateX.set(normY * -12);
    rotateY.set(normX * 14);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const glare = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.18), transparent 60%)`;

  // A slow diagonal sheen that sweeps independently of the cursor, so the
  // card still reads as "metal/glass" even before the user moves the mouse.
  const sheenTransform = useTransform(rotateY, [-14, 14], ["-30%", "130%"]);
  const sheenX = useMotionTemplate`${sheenTransform}`;

  return (
    <section className="relative w-full bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            Proof of Ownership
          </span>
          <h2 className="mt-3 text-3xl font-bold text-balance text-white sm:text-4xl">
            Every jacket ships with its pass.
          </h2>
        </div>

        <div className="mt-14 flex justify-center [perspective:1200px]">
          <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative aspect-[1.586/1] w-full max-w-md [transform-style:preserve-3d]"
          >
            {/* Card body */}
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-zinc-900 via-neutral-950 to-black shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)]">
              {/* Brushed-metal texture */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:repeating-linear-gradient(115deg,white_0px,white_1px,transparent_1px,transparent_3px)]"
              />

              {/* Cursor glare */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: glare }}
              />

              {/* Ambient diagonal sheen */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{ left: sheenX }}
              />

              {/* Card content, lifted forward in Z-space for parallax */}
              <div
                style={{ transform: "translateZ(40px)" }}
                className="relative flex h-full flex-col justify-between p-6 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="block font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
                      RAWx
                    </span>
                    <span className="mt-1 block text-sm font-bold tracking-wide text-white uppercase">
                      Authenticity Pass
                    </span>
                  </div>
                  <div className="flex size-9 items-center justify-center rounded-full border border-white/20">
                    <div className="size-3 rounded-full bg-white" />
                  </div>
                </div>

                <div>
                  <span className="block font-mono text-4xl font-black tracking-tight text-white sm:text-5xl">
                    {EDITION_NUMBER}
                    <span className="text-neutral-600">/{EDITION_TOTAL}</span>
                  </span>
                  <span className="mt-1 block font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                    Project Obsidian — Hand-Numbered Edition
                  </span>
                </div>

                <div className="flex items-end justify-between border-t border-white/10 pt-4">
                  <span className="font-mono text-[9px] tracking-widest text-neutral-600 uppercase">
                    Non-transferable · Verified at checkout
                  </span>
                  {/* Faux chip */}
                  <div className="h-6 w-8 rounded-sm bg-gradient-to-br from-neutral-500 to-neutral-800" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
