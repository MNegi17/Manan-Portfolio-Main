"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MetallicCanvas } from "@/src/components/canvas/MetallicCanvas";
import { useCursor } from "@/src/context/CursorContext";

const roles = ["Data Analyst", "Business Analyst", "Automation Engineer"];

export const Hero = () => {
  const { setCursor, resetCursor } = useCursor();
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Rotate roles every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // GSAP ScrollTrigger for Hero Parallax and Scale effect
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (heroRef.current && titleRef.current) {
      gsap.to(titleRef.current, {
        scale: 0.88,
        opacity: 0.1,
        y: -100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  const letters = ["M", "A", "N", "A", "N"];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 md:px-12 py-12 pt-28 overflow-hidden bg-noise select-none"
    >
      {/* 3D WebGL Background */}
      <MetallicCanvas />

      {/* Top Header Label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="z-10 w-full max-w-7xl flex justify-between items-center text-xs font-mono text-neutral-400 uppercase tracking-widest"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AVAILABLE FOR PROJECTS & FULL-TIME</span>
        </div>
        <span className="hidden sm:inline-block">BASED IN INDIA • GLOBAL REMOTE</span>
      </motion.div>

      {/* Center Giant Hero Title */}
      <div className="z-10 my-auto text-center w-full max-w-7xl flex flex-col items-center justify-center">
        <h1
          ref={titleRef}
          onMouseEnter={() => setCursor("magnetic")}
          onMouseLeave={resetCursor}
          className="flex justify-center items-center gap-1 sm:gap-3 md:gap-5 font-display font-black text-[clamp(2.5rem,14.5vw,13rem)] leading-none tracking-tighter text-white max-w-full px-2"
        >
          {letters.map((letter, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.2,
                delay: 0.5 + idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block hover:text-neutral-300 transition-colors duration-300 drop-shadow-2xl"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Dynamic Rotating Roles Ticker */}
        <div className="h-12 sm:h-16 flex items-center justify-center overflow-hidden mt-2 sm:mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={roles[roleIndex]}
              initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -40, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="px-6 py-2 rounded-full glass-panel border border-white/10 font-mono text-sm sm:text-xl font-semibold tracking-widest text-neutral-200 uppercase flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>{roles[roleIndex]}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="z-10 w-full max-w-7xl flex justify-between items-end font-mono text-xs text-neutral-500 uppercase tracking-widest"
      >
        <div className="flex flex-col gap-1">
          <span className="text-neutral-400 font-bold">PORTFOLIO EDITION</span>
          <span>2026 ARCHITECTURE</span>
        </div>

        <div className="flex items-center gap-3 group cursor-pointer">
          <span className="group-hover:text-white transition-colors duration-200">SCROLL DOWN</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-4 h-7 rounded-full border border-neutral-600 flex justify-center pt-1"
          >
            <div className="w-1 h-1.5 rounded-full bg-white" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
