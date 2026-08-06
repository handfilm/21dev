import type { Config } from "tailwindcss";

/**
 * Tailwind v4 reads this file because `globals.css` opts in with `@config`.
 *
 * Split of responsibilities:
 *   globals.css        -> raw design tokens (CSS custom properties), base layer,
 *                         custom utilities, dark variant, reduced-motion guards
 *   tailwind.config.ts -> the *scale*: which utilities exist and what they map to
 *
 * Colors intentionally point at `var(--token)` rather than literal values so a
 * single `.dark` block (or a runtime theme swap) restyles every utility at once.
 * Tailwind v4 resolves opacity modifiers such as `bg-primary/40` through
 * `color-mix()`, so `var()` values keep working with the `/opacity` syntax.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          DEFAULT: "var(--surface)",
          raised: "var(--surface-raised)",
          sunken: "var(--surface-sunken)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },

      borderRadius: {
        xs: "calc(var(--radius) - 6px)",
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 10px)",
        "3xl": "calc(var(--radius) + 18px)",
      },

      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },

      // Fluid type — each step interpolates between a mobile and desktop size,
      // so headings scale with the viewport without breakpoint overrides.
      fontSize: {
        "fluid-sm": ["clamp(0.875rem, 0.85rem + 0.15vw, 0.95rem)", { lineHeight: "1.6" }],
        "fluid-base": ["clamp(1rem, 0.96rem + 0.2vw, 1.125rem)", { lineHeight: "1.65" }],
        "fluid-lg": ["clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)", { lineHeight: "1.55" }],
        "fluid-xl": ["clamp(1.5rem, 1.3rem + 1vw, 2rem)", { lineHeight: "1.3" }],
        "fluid-2xl": ["clamp(2rem, 1.6rem + 2vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "fluid-3xl": ["clamp(2.5rem, 1.8rem + 3.5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "fluid-4xl": ["clamp(3rem, 1.9rem + 5.5vw, 7rem)", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
      },

      boxShadow: {
        soft: "0 1px 2px -1px oklch(0% 0 0 / 0.10), 0 2px 8px -2px oklch(0% 0 0 / 0.08)",
        elevated:
          "0 2px 4px -2px oklch(0% 0 0 / 0.12), 0 12px 32px -8px oklch(0% 0 0 / 0.18)",
        float:
          "0 8px 16px -8px oklch(0% 0 0 / 0.20), 0 32px 64px -16px oklch(0% 0 0 / 0.25)",
        glow: "0 0 0 1px var(--ring), 0 0 24px -4px var(--primary)",
        "inner-top": "inset 0 1px 0 0 oklch(100% 0 0 / 0.08)",
      },

      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, var(--background)), radial-gradient(var(--border) 1px, transparent 1px)",
        "brand-gradient":
          "linear-gradient(120deg, var(--primary), var(--accent), var(--primary))",
        "radial-glow":
          "radial-gradient(60% 60% at 50% 0%, var(--primary) 0%, transparent 70%)",
        "shine":
          "linear-gradient(105deg, transparent 30%, oklch(100% 0 0 / 0.35) 50%, transparent 70%)",
      },

      backgroundSize: {
        grid: "32px 32px",
        "size-200": "200% 200%",
      },

      // Named curves keep motion consistent between CSS animations and
      // framer-motion transitions (mirror these arrays in `ease:` props).
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
        slower: "700ms",
      },

      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          from: { opacity: "0", transform: "translateY(-16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.06)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          // Pairs with a duplicated track: -50% lands exactly on the seam.
          to: { transform: "translateX(-50%)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(-10%, -10%) rotate(0deg)" },
          "50%": { transform: "translate(10%, 10%) rotate(180deg)" },
        },
        "caret-blink": {
          "0%, 70%, 100%": { opacity: "1" },
          "20%, 50%": { opacity: "0" },
        },
      },

      animation: {
        "fade-in": "fade-in 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-up": "fade-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-down": "fade-down 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-left": "slide-in-left 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-right": "slide-in-right 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "scale-in 400ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 30s linear infinite",
        aurora: "aurora 20s ease-in-out infinite",
        "caret-blink": "caret-blink 1.2s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
