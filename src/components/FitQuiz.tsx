"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// TODO: replace with your real Make.com webhook URL.
const WEBHOOK_URL = "https://hook.us1.make.com/REPLACE_WITH_YOUR_WEBHOOK_ID";

type FitPreference = "snug" | "tailored" | "relaxed";

interface FitData {
  heightCm: string;
  weightKg: string;
  fit: FitPreference | null;
  chestCm: string;
  sleeveCm: string;
}

const EMPTY_DATA: FitData = {
  heightCm: "",
  weightKg: "",
  fit: null,
  chestCm: "",
  sleeveCm: "",
};

const STEP_COUNT = 3;

const FIT_OPTIONS: { value: FitPreference; label: string; desc: string }[] = [
  { value: "snug", label: "Snug", desc: "Close to the body, minimal layering room." },
  { value: "tailored", label: "Tailored", desc: "Our standard cut — room for a midweight layer." },
  { value: "relaxed", label: "Relaxed", desc: "Roomier through the chest and shoulders." },
];

function isStepValid(step: number, data: FitData): boolean {
  if (step === 0) return data.heightCm.trim() !== "" && data.weightKg.trim() !== "";
  if (step === 1) return data.fit !== null;
  if (step === 2) return data.chestCm.trim() !== "" && data.sleeveCm.trim() !== "";
  return false;
}

export default function FitQuiz() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FitData>(EMPTY_DATA);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const update = (patch: Partial<FitData>) => setData((prev) => ({ ...prev, ...patch }));

  const goNext = () => {
    if (!isStepValid(step, data)) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    if (!isStepValid(2, data)) return;
    setStatus("submitting");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "Project Obsidian",
          submittedAt: new Date().toISOString(),
          ...data,
        }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      setStatus("success");
    } catch (err) {
      console.error("Fit Quiz submission failed:", err);
      setStatus("error");
    }
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <section id="fit-quiz" className="relative w-full bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-lg px-6">
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            Fit Quiz
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white">Lock your schematic.</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Every jacket is cut to order. Three quick steps, no size chart guesswork.
          </p>
        </div>

        {/* Step indicator */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: STEP_COUNT }).map((_, i) => (
            <span
              key={i}
              className={`h-1 w-10 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-white" : "bg-white/15"
              }`}
            />
          ))}
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-8">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-6 text-center"
            >
              <h3 className="text-xl font-semibold text-white">Schematic locked.</h3>
              <p className="mt-2 text-sm text-neutral-400">
                We&apos;ve sent your measurements to production. Redirecting to checkout shortly.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 0 && (
                  <div className="space-y-5">
                    <Field
                      label="Height (cm)"
                      value={data.heightCm}
                      onChange={(v) => update({ heightCm: v })}
                      placeholder="e.g. 180"
                    />
                    <Field
                      label="Weight (kg)"
                      value={data.weightKg}
                      onChange={(v) => update({ weightKg: v })}
                      placeholder="e.g. 78"
                    />
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-3">
                    {FIT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => update({ fit: opt.value })}
                        className={`w-full rounded-xl border p-4 text-left transition-colors duration-200 ${
                          data.fit === opt.value
                            ? "border-white bg-white/10"
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <span className="block text-sm font-semibold text-white">{opt.label}</span>
                        <span className="mt-0.5 block text-xs text-neutral-400">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <Field
                      label="Chest (cm)"
                      value={data.chestCm}
                      onChange={(v) => update({ chestCm: v })}
                      placeholder="Measured at fullest point"
                    />
                    <Field
                      label="Sleeve (cm)"
                      value={data.sleeveCm}
                      onChange={(v) => update({ sleeveCm: v })}
                      placeholder="Shoulder seam to wrist"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {status !== "success" && (
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="text-sm font-medium text-neutral-400 transition-opacity hover:text-white disabled:opacity-0"
              >
                Back
              </button>

              {step < STEP_COUNT - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!isStepValid(step, data)}
                  className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-semibold text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isStepValid(2, data) || status === "submitting"}
                  className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-semibold text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {status === "submitting" ? "Locking…" : "Lock Schematic & Checkout"}
                </button>
              )}
            </div>
          )}

          {status === "error" && (
            <p className="mt-4 text-center text-xs text-red-400">
              Something went wrong sending your schematic. Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-400">
        {label}
      </span>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-white/40 focus:outline-none"
      />
    </label>
  );
}
