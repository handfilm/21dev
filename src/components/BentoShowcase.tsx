"use client";

import { type ElementType, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Camera,
  Play,
  PlayCircle,
  ShoppingBag,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

type Tag = "film" | "shop" | "gallery" | "reel" | "brand";

const TAG_STYLES: Record<Tag, string> = {
  film: "bg-primary/15 text-primary ring-primary/25",
  shop: "bg-accent/15 text-accent ring-accent/25",
  gallery: "bg-surface-raised text-foreground ring-border",
  reel: "bg-primary/15 text-primary ring-primary/25",
  brand: "bg-accent/15 text-accent ring-accent/25",
};

interface BentoCardProps {
  className?: string;
  tag: Tag;
  tagLabel: string;
  title: string;
  subtitle: string;
  meta?: string;
  cta: string;
  icon: ElementType;
  children?: ReactNode;
}

/**
 * A single bento cell. Media area doubles as a poster placeholder — swap the
 * `absolute inset-0` gradient div for a `next/image`/`next/video` element
 * once real assets exist; the framing (corner brackets, tag, CTA reveal)
 * is designed to sit on top of either.
 */
function BentoCard({
  className,
  tag,
  tagLabel,
  title,
  subtitle,
  meta,
  cta,
  icon: Icon,
}: BentoCardProps) {
  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={cn(
        "group glass relative flex flex-col justify-end overflow-hidden rounded-2xl border p-6",
        "shadow-soft transition-shadow duration-base ease-out-expo hover:shadow-float",
        className,
      )}
    >
      {/* Poster / media placeholder layer */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-surface-raised via-surface to-background"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <div
        aria-hidden
        className="grid-bg absolute inset-0 -z-10 opacity-20 mix-blend-overlay"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,theme(colors.primary/25%),transparent_65%)]"
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
      />

      {/* Viewfinder corner brackets — the signature cinematic touch */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-3"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1, transition: { staggerChildren: 0.05 } },
        }}
      >
        {(["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"] as const).map(
          (pos) => (
            <motion.span
              key={pos}
              variants={{ rest: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1 } }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={cn("absolute size-4 border-primary/70", pos)}
            />
          ),
        )}
      </motion.div>

      {/* Tag */}
      <span
        className={cn(
          "absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-fluid-xs font-medium ring-1",
          TAG_STYLES[tag],
        )}
      >
        <Icon className="size-3.5" aria-hidden />
        {tagLabel}
      </span>

      {meta && (
        <span className="absolute top-5 right-5 rounded-full bg-background/60 px-2.5 py-1 font-mono text-fluid-xs tabular-nums text-muted-foreground ring-1 ring-border backdrop-blur-sm">
          {meta}
        </span>
      )}

      {/* Center play affordance for media cards */}
      {(tag === "film" || tag === "reel") && (
        <motion.div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
          variants={{
            rest: { opacity: 0, scale: 0.7 },
            hover: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span className="glass flex size-14 items-center justify-center rounded-full shadow-elevated">
            <Play className="size-5 translate-x-0.5 text-foreground" aria-hidden fill="currentColor" />
          </span>
        </motion.div>
      )}

      {/* Copy block */}
      <div className="relative">
        <h3 className="text-fluid-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-fluid-sm text-muted-foreground">{subtitle}</p>

        <motion.span
          className="mt-3 inline-flex items-center gap-1 text-fluid-sm font-medium text-primary"
          variants={{
            rest: { opacity: 0, y: 6 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {cta}
          <ArrowUpRight className="size-3.5" aria-hidden />
        </motion.span>
      </div>
    </motion.article>
  );
}

export default function BentoShowcase() {
  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden px-6 py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-blob animate-aurora absolute top-0 left-1/4 h-[28rem] w-[28rem] opacity-50" />
      </div>

      <StaggerItem>
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-fluid-xs uppercase tracking-[0.18em] text-muted-foreground">
          Archive — SS25
        </span>
        <h2 className="mt-5 max-w-lg text-fluid-3xl font-semibold leading-tight text-balance">
          Where the{" "}
          <span className="gradient-text animate-gradient-shift">film</span>{" "}
          meets the fit.
        </h2>
      </StaggerItem>

      <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[13rem]">
        <StaggerItem className="lg:col-span-2 lg:row-span-2">
          <BentoCard
            className="min-h-[22rem] lg:min-h-0 lg:h-full"
            tag="film"
            tagLabel="Film — SS25"
            icon={PlayCircle}
            title="Static In Motion"
            subtitle="The full campaign film, shot on 16mm."
            meta="04:12"
            cta="Watch the film"
          />
        </StaggerItem>

        <StaggerItem className="sm:col-span-2 lg:col-span-2">
          <BentoCard
            className="min-h-[13rem] lg:h-full"
            tag="shop"
            tagLabel="Shop"
            icon={ShoppingBag}
            title="The Capsule Drop"
            subtitle="12 pieces. Limited run, numbered."
            cta="Shop now"
          />
        </StaggerItem>

        <StaggerItem className="lg:col-span-1">
          <BentoCard
            className="min-h-[13rem] lg:h-full"
            tag="gallery"
            tagLabel="Lookbook"
            icon={Camera}
            title="Vol. 04"
            subtitle="38 frames, unretouched."
            cta="View gallery"
          />
        </StaggerItem>

        <StaggerItem className="lg:col-span-1">
          <BentoCard
            className="min-h-[13rem] lg:h-full"
            tag="reel"
            tagLabel="Behind the Scenes"
            icon={Play}
            title="Raw Cuts"
            subtitle="No color grade, no script."
            meta="01:47"
            cta="Play clip"
          />
        </StaggerItem>

        <StaggerItem className="sm:col-span-2 lg:col-span-4">
          <BentoCard
            className="min-h-[9rem] lg:h-full"
            tag="brand"
            tagLabel="Aperture"
            icon={ArrowUpRight}
            title="Cinematic drops, engineered for motion."
            subtitle="Every release starts as a film before it's ever a garment."
            cta="Explore the archive"
          />
        </StaggerItem>
      </Stagger>
    </section>
  );
}