"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/src/context/CursorContext";

export const Footer = () => {
  const { setCursor, resetCursor } = useCursor();

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/in/manan-negi-556983224" },
    { name: "GitHub", href: "https://github.com/MNegi17" },
    { name: "Email", href: "mailto:manannegi17@gmail.com" },
  ];

  return (
    <footer className="relative w-full bg-black text-white pt-24 pb-12 px-4 sm:px-8 md:px-16 border-t border-neutral-900 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[50vh]">
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-4">
              // DESIGN & ARCHITECTURE
            </span>
            <p className="font-mono text-xs text-neutral-400 leading-relaxed max-w-xs">
              Engineered with Next.js 15, GSAP, Three.js & Lenis. Inspired by ultra-luxury editorial aesthetic.
            </p>
          </div>

          <div>
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-4">
              // NAVIGATION LINKS
            </span>
            <div className="flex flex-col gap-2 font-mono text-xs">
              <a href="#projects" className="text-neutral-400 hover:text-white transition-colors">
                Work & Projects
              </a>
              <a href="#about" className="text-neutral-400 hover:text-white transition-colors">
                About & Mission
              </a>
              <a href="#skills" className="text-neutral-400 hover:text-white transition-colors">
                Technical Stack
              </a>
              <a href="#timeline" className="text-neutral-400 hover:text-white transition-colors">
                Chronology
              </a>
            </div>
          </div>

          <div>
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-4">
              // CONNECT
            </span>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursor("pointer")}
                  onMouseLeave={resetCursor}
                  className="font-mono text-xs px-3 py-1.5 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-white/40 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Massive Giant Animated Footer Typography */}
        <div className="w-full my-auto text-center overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setCursor("magnetic")}
            onMouseLeave={resetCursor}
            className="font-display font-black text-[clamp(3rem,15vw,14rem)] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-300 to-neutral-700 hover:to-white transition-all duration-700 max-w-full px-2"
          >
            MANAN
          </motion.h1>
        </div>

        {/* Bottom Copyright & Timestamp */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-neutral-900 font-mono text-xs text-neutral-500 uppercase tracking-widest">
          <span>&copy; {new Date().getFullYear()} MANAN. ALL RIGHTS RESERVED.</span>
          <span>BUILT FOR HIGH PERFORMANCE</span>
        </div>
      </div>
    </footer>
  );
};
