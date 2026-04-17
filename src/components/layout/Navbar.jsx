"use client";
import React, { useState, useEffect } from "react";
import { User, Search } from "lucide-react";
import ShuffleText from "@/components/animations/ShuffleText";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-theme shadow-md py-0" : "bg-transparent py-2"
      }`}
    >
      {/* Top Banner */}
      <div className={`bg-brand-green text-white text-xs py-1.5 px-6 flex justify-between items-center transition-all ${scrolled ? "hidden" : "flex"}`}>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">À propos</a>
          <a href="#" className="hover:underline">Service client</a>
        </div>
        <div className="font-semibold text-center absolute left-1/2 -translate-x-1/2">
          Le spécialiste de l'ultra frais !
        </div>
        <div>
          <a href="#" className="flex items-center gap-1 hover:underline font-medium">
            <User size={14} /> Connexion
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <div className={`container mx-auto px-6 flex items-center justify-between transition-all ${scrolled ? "h-16" : "h-24"}`}>
        {/* Logo */}
        <a href="/" className="cursor-hover flex-shrink-0" data-cursor-text="ACCUEIL">
           {/* Fallback styling for the exact logo look */}
           <div className="flex flex-col items-start leading-none tracking-tight">
             <span className="text-brand-green font-display font-black text-2xl uppercase">Marché de</span>
             <span className="text-brand-green font-display font-black text-5xl -mt-2">mo'</span>
             <span className="bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 mt-1 uppercase w-full text-center tracking-wider">
               Commerçant engagé
             </span>
           </div>
        </a>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <input 
            type="text" 
            placeholder="Rechercher un produit, un rayon..." 
            className="w-full bg-brand-green text-white placeholder-white/70 rounded-full px-6 py-2.5 outline-none border border-transparent focus:border-brand-green-light transition-all"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white">
            <Search size={18} />
          </button>
        </div>

        {/* Espace Pro */}
        <a href="#" className="hidden lg:flex items-center gap-2 bg-brand-green text-white px-4 py-2 rounded-full font-bold hover:bg-brand-green-dark transition-colors text-sm cursor-hover" data-cursor-text="PRO">
          Espace Pro <span className="text-xs bg-white text-brand-green px-1 rounded">%</span>
        </a>
      </div>

      {/* Categories Links (Bottom part of nav) */}
      <div className={`border-t border-border-theme bg-theme transition-all overflow-hidden ${scrolled ? "h-0 border-transparent" : "h-12 border-m"}`}>
        <div className="container mx-auto px-6 h-full flex items-center justify-center gap-8 font-display font-bold text-sm tracking-wide">
          {["Accueil", "Notre enseigne", "Nos Rayons", "Nos engagements", "Magasins", "Recrutement", "Actualité", "Plus"].map((item) => (
            <a key={item} href="#" className="hover:text-brand-green transition-colors cursor-hover uppercase" data-cursor-text="DÉCOUVRIR">
              <ShuffleText text={item} />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
