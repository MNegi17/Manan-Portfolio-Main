"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useCursor } from "@/src/context/CursorContext";
import { X, ArrowUpRight } from "lucide-react";

export const Navbar = () => {
  const { setCursor, resetCursor } = useCursor();
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150 && !isOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Lock body scroll when mobile menu overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Timeline", href: "#timeline" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-120%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        {/* DESKTOP NAVBAR (md:flex) */}
        <nav className="hidden md:flex items-center justify-between w-full max-w-6xl px-6 py-3.5 rounded-full border border-white/10 shadow-2xl backdrop-blur-xl bg-black/50 glass-panel">
          <a
            href="#"
            onMouseEnter={() => setCursor("magnetic")}
            onMouseLeave={resetCursor}
            className="group flex items-center gap-2 font-display text-lg font-black tracking-tighter text-white"
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-white group-hover:scale-150 transition-transform duration-300" />
            MANAN
          </a>

          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                onMouseEnter={() => setCursor("pointer")}
                onMouseLeave={resetCursor}
                className="relative px-3 py-1.5 text-sm font-mono text-neutral-400 hover:text-white transition-colors duration-200 group"
              >
                <span>{item.name}</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </nav>

        {/* MOBILE HEADER BAR (md:hidden) */}
        <div className="md:hidden flex items-center justify-between w-full px-5 py-3 rounded-full border border-white/15 shadow-2xl backdrop-blur-2xl bg-black/80">
          <a href="#" className="flex items-center gap-2 font-display text-base font-black tracking-tighter text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            MANAN
          </a>

          {/* Two-Line Hamburger Button matching reference drawing */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-full border border-white/10 bg-neutral-900/80 text-white flex flex-col justify-center items-center gap-1.5 w-10 h-10 active:scale-95 transition-transform"
            aria-label="Open Navigation Menu"
          >
            <span className="w-5 h-[2px] bg-white rounded-full block" />
            <span className="w-5 h-[2px] bg-white rounded-full block" />
          </button>
        </div>
      </motion.header>

      {/* FULLSCREEN MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[10000] bg-[#080808] text-white flex flex-col justify-between p-6 sm:p-10 bg-noise overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
              <span className="flex items-center gap-2 font-display text-lg font-black tracking-tighter text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                MANAN
              </span>

              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full border border-neutral-700 bg-neutral-900 flex items-center justify-center text-white active:scale-90 transition-transform"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Center Massive Editorial Typography Navigation */}
            <div className="my-auto py-10 flex flex-col space-y-6">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                // NAVIGATION
              </span>
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
                  className="group flex items-baseline justify-between font-display text-4xl sm:text-6xl font-black tracking-tight text-white hover:text-neutral-400 transition-colors"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs font-normal text-neutral-500">0{idx + 1}</span>
                    <span>{item.name}</span>
                  </span>
                  <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>

            {/* Bottom Meta & Contact Link */}
            <div className="border-t border-neutral-800 pt-6 space-y-4 font-mono text-xs text-neutral-400">
              <div className="flex justify-between items-center">
                <span>MANAN NEGI</span>
                <span className="text-white">DATA & AUTOMATION</span>
              </div>
              <a
                href="mailto:manannegi17@gmail.com"
                className="text-white font-bold tracking-wider block hover:underline text-sm"
              >
                manannegi17@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
