"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/src/context/CursorContext";

const stats = [
  { label: "Gross Revenue Analyzed", value: "₹6.72Cr", detail: "FY25-26 Sales MIS" },
  { label: "Return Rate Reduced", value: "44%", detail: "Python ML Model" },
  { label: "Auto-Listing Efficiency", value: ">99%", detail: "REST API Pipeline" },
  { label: "ASP Markdown Growth", value: "+59.6%", detail: "Data-Driven Pricing" },
];

export const About = () => {
  const { setCursor, resetCursor } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0.1, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-20 sm:py-32 px-4 sm:px-8 md:px-16 w-full max-w-7xl mx-auto bg-noise text-white border-t border-neutral-800 overflow-hidden"
    >
      {/* Label */}
      <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-6 sm:mb-8">
        // ABOUT MANAN
      </span>

      {/* Main Editorial Statement */}
      <div ref={textRef} className="space-y-4 sm:space-y-6 md:space-y-10 max-w-5xl mb-16 sm:mb-24">
        <h2
          onMouseEnter={() => setCursor("text")}
          onMouseLeave={resetCursor}
          className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white break-words"
        >
          Not just dashboards.
        </h2>
        <p
          onMouseEnter={() => setCursor("text")}
          onMouseLeave={resetCursor}
          className="font-display text-xl sm:text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-neutral-400 leading-[1.15]"
        >
          I solve complex business problems with raw data, robust automation & predictive insights.
        </p>
      </div>

      {/* Narrative Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 sm:mb-24 pt-8 sm:pt-12 border-t border-neutral-900">
        <div className="space-y-4 sm:space-y-6 text-neutral-300 font-sans text-base sm:text-lg leading-relaxed">
          <p>
            With a multidisciplinary foundation across <strong className="text-white">Data Analytics</strong>, <strong className="text-white">Business Analysis</strong>, and <strong className="text-white">Automation Engineering</strong>, I bridge the gap between technical data infrastructure and strategic decision-making.
          </p>
          <p>
            Whether architecting automated Python pipelines, tuning SQL warehouse queries, or designing intuitive Power BI dashboards, my focus is delivering actionable metrics that directly improve operational efficiency.
          </p>
        </div>
        <div className="space-y-4 sm:space-y-6 text-neutral-400 font-mono text-xs sm:text-sm leading-relaxed glass-panel p-6 sm:p-8 rounded-2xl border border-neutral-800">
          <div className="flex items-center gap-2 text-white font-bold tracking-wider mb-1 sm:mb-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            CORE MISSION & PHILOSOPHY
          </div>
          <p>
            "Data without automated workflows is static noise. My objective is turning unorganized data points into scalable, self-sustaining intelligence systems."
          </p>
        </div>
      </div>

      {/* Animated Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 * idx }}
            onMouseEnter={() => setCursor("pointer")}
            onMouseLeave={resetCursor}
            className="p-3.5 sm:p-6 rounded-xl glass-card border border-neutral-800 hover:border-white/30 transition-all duration-300 flex flex-col justify-between"
          >
            <span className="font-mono text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest">
              0{idx + 1}
            </span>
            <div className="my-2 sm:my-4">
              <span className="font-display text-xl sm:text-3xl font-black tracking-tight text-white block">
                {stat.value}
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-neutral-400 font-medium block mt-1">
                {stat.detail}
              </span>
            </div>
            <span className="font-sans text-[11px] sm:text-xs text-neutral-300 font-semibold border-t border-neutral-900 pt-2 sm:pt-3 leading-tight">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
