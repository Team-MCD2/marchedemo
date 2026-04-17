"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import TiltCard from "./TiltCard";
import { ArrowRight } from "lucide-react";

export default function DepartmentShowcase({ 
  title, 
  subtitle, 
  imageSrc, 
  align = "left", 
  accentColor = "from-brand-green to-brand-green-light" 
}) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Exaggerated Parallax effects
  const yImage = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  
  const xContent = useTransform(
    scrollYProgress, 
    [0.1, 0.4], 
    [align === "left" ? -100 : 100, 0]
  );
  
  const opacityContent = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[90vh] py-24 flex items-center overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className={`flex flex-col ${align === "right" ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16`}>
          
          {/* Text Content */}
          <motion.div 
            style={{ x: xContent, opacity: opacityContent }}
            className="flex-1 space-y-8 max-w-xl"
          >
            <div className="space-y-4">
              <h2 className={`text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br ${accentColor}`}>
                {title}
              </h2>
              <p className="text-xl text-muted leading-relaxed">
                {subtitle}
              </p>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`btn bg-gradient-to-br ${accentColor} text-white shadow-lg shadow-primary-light/20 group relative overflow-hidden`}
            >
              <span className="relative z-10 flex items-center gap-2">
                Découvrir <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
            </motion.button>
          </motion.div>

          {/* Visual Content with 3D Tilt */}
          <div className="flex-1 w-full relative">
            <TiltCard>
              <motion.div 
                className="relative aspect-[4/5] md:aspect-square w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
                style={{ 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 80px rgba(27, 107, 58, 0.15)"
                }}
              >
                {/* Clip-path reveal overlay that sweeps away */}
                <motion.div
                  className="absolute inset-0 z-20 bg-theme"
                  style={{
                    clipPath: useTransform(
                      scrollYProgress, 
                      [0.2, 0.6], 
                      ["polygon(0 0, 100% 0, 100% 100%, 0 100%)", "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"]
                    )
                  }}
                />
                
                <motion.div style={{ y: yImage, scale: scaleImage }} className="absolute inset[-20%] w-[140%] h-[140%] -left-[20%] -top-[20%]">
                  <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-dark/60 via-transparent to-transparent mix-blend-multiply" />
                </motion.div>

                {/* Decorative border glow */}
                <div className="absolute inset-0 border border-white/20 rounded-[2rem] pointer-events-none mix-blend-overlay" />
              </motion.div>
            </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
}
