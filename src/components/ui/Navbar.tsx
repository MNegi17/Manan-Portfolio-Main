"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useCursor } from "@/src/context/CursorContext";

export const Navbar = () => {
  const { setCursor, resetCursor } = useCursor();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Timeline", href: "#timeline" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-120%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav className="glass-panel flex items-center justify-between w-full max-w-6xl px-6 py-3.5 rounded-full border border-white/10 shadow-2xl backdrop-blur-xl bg-black/40">
        {/* Left Logo */}
        <a
          href="#"
          onMouseEnter={() => setCursor("magnetic")}
          onMouseLeave={resetCursor}
          className="group flex items-center gap-2 font-display text-lg font-black tracking-tighter text-white"
        >
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-white group-hover:scale-150 transition-transform duration-300" />
          MANAN
        </a>

        {/* Right Navigation */}
        <div className="flex items-center gap-1 sm:gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              onMouseEnter={() => setCursor("pointer")}
              onMouseLeave={resetCursor}
              className="relative px-3 py-1.5 text-xs sm:text-sm font-mono text-neutral-400 hover:text-white transition-colors duration-200 group"
            >
              <span>{item.name}</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
};
