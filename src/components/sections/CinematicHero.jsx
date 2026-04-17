"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import ShuffleText from "@/components/animations/ShuffleText";

export default function CinematicHero() {
  const { scrollYProgress } = useScroll();
  // Hero moves half as fast as you scroll for parallax depth
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section className="relative w-full h-[100vh] overflow-hidden flex flex-col items-center justify-center bg-black">
      {/* Background Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 origin-top"
        style={{ y, opacity, scale }}
      >
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        <div className="film-grain z-10" />
        <img 
          src="/marchedemo_hero.png" 
          className="w-full h-full object-cover" 
          alt="Marché de Mo Hero" 
          priority="true"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mix-blend-difference text-white w-full">
        <motion.h1 
          className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-none mb-6 text-white uppercase"
          initial={{ y: 150, opacity: 0, rotateX: 45 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1000 }}
        >
          <ShuffleText text="Marché" className="block" />
          <ShuffleText text="de Mo'" className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70" />
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-3xl font-medium text-white/80"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Commerçant engagé. Saveurs du Monde.
        </motion.p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center gap-4">
         <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">Découvrir</span>
         <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"
         />
      </div>
    </section>
  );
}
