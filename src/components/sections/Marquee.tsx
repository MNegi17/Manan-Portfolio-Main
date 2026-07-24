"use client";

import React from "react";
import { useCursor } from "@/src/context/CursorContext";

const marqueeItems = [
  "DATA",
  "AUTOMATION",
  "ANALYTICS",
  "BUSINESS",
  "SQL",
  "PYTHON",
  "POWER BI",
  "AI",
];

export const Marquee = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section className="relative py-20 bg-[#080808] overflow-hidden border-t border-b border-neutral-800 select-none">
      {/* Row 1 - Left to Right */}
      <div
        onMouseEnter={() => setCursor("magnetic")}
        onMouseLeave={resetCursor}
        className="flex whitespace-nowrap overflow-hidden py-4"
      >
        <div className="flex animate-marquee gap-8 md:gap-16 items-center">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 md:gap-16">
              <span className="font-display font-black text-5xl sm:text-7xl md:text-9xl tracking-tighter text-transparent text-stroke-outline hover:text-white transition-colors duration-300">
                {item}
              </span>
              <span className="w-3 h-3 md:w-5 md:h-5 rounded-full border border-neutral-700 bg-neutral-900" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Right to Left */}
      <div
        onMouseEnter={() => setCursor("magnetic")}
        onMouseLeave={resetCursor}
        className="flex whitespace-nowrap overflow-hidden py-4"
      >
        <div className="flex animate-marquee-reverse gap-8 md:gap-16 items-center">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 md:gap-16">
              <span className="font-display font-black text-5xl sm:text-7xl md:text-9xl tracking-tighter text-white/90">
                {item}
              </span>
              <span className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-white" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
