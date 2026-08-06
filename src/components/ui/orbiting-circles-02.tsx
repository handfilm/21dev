"use client";

import React from "react";
// Figma এবং Slack এর বদলে Palette এবং MessageSquare যুক্ত করা হয়েছে
import { Database, Sparkles, Workflow, Palette, MessageSquare, Code2, AppWindow, Terminal } from "lucide-react";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

const orbits = [
  {
    size: "w-[280px] h-[280px] md:w-[400px] md:h-[400px]",
    duration: 18,
    icons: [
      { Icon: Database, alt: "Supabase", angle: -60, color: "text-green-400" },
      { Icon: Sparkles, alt: "Gemini", angle: 0, color: "text-blue-400" },
      { Icon: Workflow, alt: "Make", angle: 60, color: "text-purple-400" },
    ],
  },
  {
    size: "w-[380px] h-[380px] md:w-[540px] md:h-[540px]",
    duration: 24,
    icons: [
      // এখানে আইকন আপডেট করা হয়েছে
      { Icon: Palette, alt: "Design", angle: 0, color: "text-pink-400" },
      { Icon: MessageSquare, alt: "Chat", angle: -90, color: "text-yellow-400" },
    ],
  },
  {
    size: "w-[480px] h-[480px] md:w-[680px] md:h-[680px]",
    duration: 30,
    icons: [
      { Icon: AppWindow, alt: "Claude", angle: -60, color: "text-orange-400" },
      { Icon: Code2, alt: "React", angle: 0, color: "text-cyan-400" },
      { Icon: Terminal, alt: "Python", angle: 60, color: "text-blue-500" },
    ],
  },
];

// ... (ফাইলের নিচের বাকি কোডগুলো আগের মতোই থাকবে)

export default function OrbitingCirclesGlobeDemo() {
  return (
    <div className="relative flex h-[500px] w-full justify-center overflow-hidden md:h-[700px]">
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)) }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) - 360deg)) }
        }
        @keyframes counter-cw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) }
        }
        @keyframes counter-ccw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) }
        }
      `}</style>

      {/* Center particle globe */}
      <div className="absolute bottom-0 left-1/2 z-10 aspect-square w-[200px] -translate-x-1/2 translate-y-1/2 pointer-events-none md:w-[280px]">
        <ParticleSphereAnimation />
      </div>

      {/* Orbiting rings */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        const allIcons = [
          ...orbit.icons,
          ...orbit.icons.map((ic) => ({
            ...ic,
            angle: ic.angle + 180,
            alt: `${ic.alt}-mirror`,
          })),
        ];

        return (
          <div
            key={index}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-border/50 ${orbit.size}`}
          >
            {allIcons.map((iconData, iconIndex) => {
              const IconComponent = iconData.Icon;
              return (
                <div
                  key={iconIndex}
                  className="absolute left-1/2 top-0 flex h-1/2 -ml-8 flex-col items-center justify-start origin-bottom"
                  style={
                    {
                      "--start-angle": `${iconData.angle}deg`,
                      animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="relative z-10 -mt-6 rounded-full border border-border/50 bg-background/80 p-3 backdrop-blur-md sm:p-4"
                    style={
                      {
                        "--counter-offset": `${-iconData.angle}deg`,
                        animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                      } as React.CSSProperties
                    }
                  >
                    <IconComponent className={`h-6 w-6 md:h-8 md:w-8 ${iconData.color}`} aria-label={iconData.alt} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}