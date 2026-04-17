"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for smooth buttery tracking
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = (e) => {
      const target = e.target.closest("a, button, .cursor-hover");
      if (target) {
        setIsHovered(true);
        const dataText = target.getAttribute("data-cursor-text");
        setHoverText(dataText || "");
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // Adjust cursor size via variants without hooks
  const variants = {
    default: {
      width: 24,
      height: 24,
      left: -12,
      top: -12,
      opacity: isVisible ? 1 : 0,
      backgroundColor: "rgba(27, 142, 75, 0.2)",
      border: "1.5px solid var(--color-brand-green)",
      backdropFilter: "blur(2px)",
    },
    hover: {
      width: hoverText ? 80 : 48,
      height: hoverText ? 80 : 48,
      left: hoverText ? -40 : -24,
      top: hoverText ? -40 : -24,
      backgroundColor: "var(--color-brand-green)",
      border: "none",
      opacity: isVisible ? 1 : 0,
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center font-display text-[10px] uppercase font-bold text-white tracking-wider"
      style={{ x: cursorXSpring, y: cursorYSpring }}
      variants={variants}
      animate={isHovered ? "hover" : "default"}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      {hoverText && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {hoverText}
        </motion.span>
      )}
    </motion.div>
  );
}
