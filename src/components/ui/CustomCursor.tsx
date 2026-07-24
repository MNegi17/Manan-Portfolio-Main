"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useCursor } from "@/src/context/CursorContext";

export const CustomCursor = () => {
  const { cursorType, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only disable custom cursor on small mobile screen viewports (<768px)
    const checkMobile = () => {
      return window.innerWidth < 768;
    };

    if (checkMobile()) {
      setIsMobileScreen(true);
    } else {
      setIsMobileScreen(false);
    }

    const handleResize = () => {
      setIsMobileScreen(checkMobile());
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  // Disable custom cursor on mobile viewports (<768px), keep 100% active on desktop (>=768px)
  if (isMobileScreen || !isVisible) return null;

  // Variants for cursor states
  const getVariants = () => {
    switch (cursorType) {
      case "pointer":
      case "magnetic":
        return {
          width: 48,
          height: 48,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          mixBlendMode: "difference" as const,
          scale: 1.1,
        };
      case "project":
        return {
          width: 90,
          height: 90,
          backgroundColor: "#ffffff",
          color: "#000000",
          scale: 1,
        };
      case "text":
        return {
          width: 32,
          height: 32,
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(4px)",
          scale: 1.2,
        };
      default:
        return {
          width: 14,
          height: 14,
          backgroundColor: "#ffffff",
          mixBlendMode: "difference" as const,
          scale: 1,
        };
    }
  };

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full transition-colors duration-200"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={getVariants()}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      {cursorType === "project" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="text-xs font-mono font-bold tracking-widest text-black uppercase"
        >
          {cursorText || "VIEW"}
        </motion.span>
      )}
    </motion.div>
  );
};
