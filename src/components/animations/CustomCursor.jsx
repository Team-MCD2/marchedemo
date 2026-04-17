"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch devices and hide cursor
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = (e) => {
      const target = e.target.closest("a, button, .cursor-hover, input, textarea");
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

  return (
    <>
      {/* Main dot cursor – always visible, acts as pointer replacement */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          backgroundColor: "var(--color-brand-green)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", duration: 0 }}
      />

      {/* Outer ring – expands on hover */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center font-display text-[10px] uppercase font-bold text-white tracking-wider"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          width: isHovered ? (hoverText ? 80 : 40) : 32,
          height: isHovered ? (hoverText ? 80 : 40) : 32,
          marginLeft: isHovered ? (hoverText ? -40 : -20) : -16,
          marginTop: isHovered ? (hoverText ? -40 : -20) : -16,
          backgroundColor: isHovered ? "var(--color-brand-green)" : "rgba(27, 142, 75, 0.08)",
          border: isHovered ? "none" : "1.5px solid var(--color-brand-green)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        {hoverText && isHovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 }}
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
