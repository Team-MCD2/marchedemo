"use client";
import CinematicHero from "@/components/sections/CinematicHero";
import SlidingCategories from "@/components/sections/SlidingCategories";
import DepartmentShowcase from "@/components/animations/DepartmentShowcase";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ShuffleText from "@/components/animations/ShuffleText";

export default function Home() {
  const spacerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start end", "end start"]
  });

  const scaleText = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacityText = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <main className="bg-theme min-h-screen overflow-hidden">
      <CinematicHero />

      <div className="relative z-10 bg-theme">
        <SlidingCategories />
      </div>

      {/* Decorative Spacer / Transition */}
      <div ref={spacerRef} className="h-[40vh] flex items-center justify-center relative overflow-hidden">
        {/* Subtle transition grain */}
        <div className="film-grain z-0 opacity-20" />
        
        <motion.h2 
          style={{ scale: scaleText, opacity: opacityText }}
          className="text-4xl md:text-6xl font-display font-black text-theme opacity-10 tracking-[0.2em] uppercase text-center"
        >
          L'Excellence du Frais
        </motion.h2>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent" />
      </div>

      {/* Deep Department Blocks */}
      <div className="relative z-10 bg-theme">
        <DepartmentShowcase 
          title="Boucherie Halal"
          subtitle="Des viandes certifiées de qualité exceptionnelle, découpées sur place chaque jour par nos artisans bouchers. Un savoir-faire unique au service de la tendreté."
          imageSrc="/marchedemo_boucherie.png"
          align="left"
          accentColor="from-brand-red to-brand-red-light"
        />

        <DepartmentShowcase 
          title="Fruits & Légumes"
          subtitle="La fraîcheur absolue. Un arrivage quotidien de primeurs sélectionnés avec une exigence inégalée pour garantir des saveurs éclatantes."
          imageSrc="/marchedemo_fruits.png"
          align="right"
          accentColor="from-brand-green to-brand-green-light"
        />

        <DepartmentShowcase 
          title="Épices du Monde"
          subtitle="Un voyage sensoriel intense. Découvrez nos mélanges artisanaux et épices rares qui éveilleront vos sens et sublimeront vos plats traditionnels."
          imageSrc="/marchedemo_epices.png"
          align="left"
          accentColor="from-secondary to-secondary-light"
        />
      </div>

      {/* Footer / Outro Placeholder */}
      <section className="h-[80vh] flex items-center justify-center relative overflow-hidden mt-20">
        <div className="absolute inset-0 bg-brand-green-dark/5 mix-blend-color-burn" />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
          className="text-center space-y-6 flex flex-col items-center"
        >
          <ShuffleText text="À Suivre..." className="text-5xl md:text-8xl font-display font-bold text-theme" />
          <p className="text-xl text-muted font-medium">Explorez tous nos rayons très prochainement.</p>
        </motion.div>
      </section>
    </main>
  );
}
