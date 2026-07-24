"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/src/context/CursorContext";
import { Mail, ArrowUpRight, Copy, Check } from "lucide-react";

export const Contact = () => {
  const { setCursor, resetCursor } = useCursor();
  const [copied, setCopied] = useState(false);
  const email = "manannegi17@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative py-36 px-4 sm:px-8 md:px-16 w-full max-w-7xl mx-auto bg-noise text-white flex flex-col justify-between"
    >
      {/* Label */}
      <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-12">
        // INITIATE COLLABORATION
      </span>

      {/* Main Headline */}
      <div className="max-w-5xl space-y-8">
        <h2
          onMouseEnter={() => setCursor("text")}
          onMouseLeave={resetCursor}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-white"
        >
          Let's Build Something <span className="text-stroke-outline hover:text-white transition-colors duration-500">Amazing.</span>
        </h2>
        <p className="font-mono text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
          Open to enterprise consulting, data architecture roles, automated pipeline design, and high-impact analytics opportunities worldwide.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-16 flex flex-wrap items-center gap-6">
        <motion.a
          href={`mailto:${email}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => setCursor("magnetic")}
          onMouseLeave={resetCursor}
          className="group relative px-8 py-5 rounded-full bg-white text-black font-display text-lg font-bold tracking-tight flex items-center gap-3 shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:bg-neutral-200 transition-colors"
        >
          <Mail className="w-5 h-5 text-black" />
          <span>Contact Me</span>
          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </motion.a>

        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => setCursor("pointer")}
          onMouseLeave={resetCursor}
          className="px-6 py-5 rounded-full glass-panel border border-neutral-800 font-mono text-xs sm:text-sm text-neutral-300 hover:text-white hover:border-white/30 flex items-center gap-2 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">EMAIL COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-neutral-400" />
              <span>COPY EMAIL ADDRESS</span>
            </>
          )}
        </motion.button>
      </div>
    </section>
  );
};
