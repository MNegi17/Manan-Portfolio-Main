"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const letters = ["M", "A", "N", "A", "N"];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        const diff = Math.floor(Math.random() * 12) + 5;
        return Math.min(prev + diff, 100);
      });
    }, 90);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#080808] p-4 sm:p-8 md:p-12 text-white bg-noise overflow-hidden select-none"
        >
          {/* Top metadata */}
          <div className="flex justify-between items-center font-mono text-[10px] sm:text-xs text-neutral-400 tracking-widest uppercase gap-2 w-full max-w-7xl mx-auto">
            <span>MANAN PORTFOLIO &copy; 2026</span>
            <span className="text-right">SYSTEM INITIALIZING</span>
          </div>

          {/* Center Giant Letters Reveal - Perfectly fitted for mobile & desktop */}
          <div className="flex items-center justify-center my-auto w-full max-w-7xl mx-auto overflow-hidden">
            <div className="flex items-center justify-center gap-1 sm:gap-3 md:gap-5 max-w-full px-2">
              {letters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "120%", opacity: 0, scale: 0.8, filter: "blur(12px)" }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 * index,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="font-display font-black text-[clamp(2.5rem,14.5vw,13rem)] tracking-tighter leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500 shrink-0"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Bottom Counter & Bar */}
          <div className="space-y-3 sm:space-y-4 w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-end gap-2">
              <span className="font-mono text-[10px] sm:text-xs text-neutral-400 tracking-wider">
                DATA • AUTOMATION • ANALYTICS
              </span>
              <motion.span
                className="font-mono text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : progress}
                <span className="text-xs sm:text-sm font-normal text-neutral-500 ml-1">%</span>
              </motion.span>
            </div>

            <div className="w-full h-[2px] bg-neutral-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
