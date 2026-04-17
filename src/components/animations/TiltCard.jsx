"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

export default function TiltCard({ children, className = "" }) {
  const ref = useRef(null);

  // Range 0 to 1 for tilt calculation
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [0, 1], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-10deg", "10deg"]);

  // Calculate pixel values for spotlight overlay
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightOpacity = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    
    // Percent from 0 to 1
    const xPct = mX / rect.width;
    const yPct = mY / rect.height;
    
    x.set(xPct);
    y.set(yPct);
    mouseX.set(mX);
    mouseY.set(mY);
    spotlightOpacity.set(0.12); // Show spotlight intensity
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    spotlightOpacity.set(0);
  };

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, var(--color-brand-green), transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full transition-shadow duration-500 ease-out ${className}`}
    >
      <motion.div 
        style={{ background, opacity: spotlightOpacity, mixBlendMode: "screen" }} 
        className="w-full h-full absolute inset-0 rounded-[inherit] pointer-events-none z-10 transition-opacity duration-300"
      />
      <div style={{ transform: "translateZ(30px)" }} className="relative w-full h-full z-20 pointer-events-none">
        {children}
      </div>
    </motion.div>
  );
}
