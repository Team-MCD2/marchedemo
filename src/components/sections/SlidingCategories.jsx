"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  { name: "Primeurs", img: "/marchedemo_fruits.png" },
  { name: "Boucherie Halal", img: "/marchedemo_boucherie.png" },
  { name: "Épices du Monde", img: "/marchedemo_epices.png" },
  { name: "Saveurs d'Afrique", img: "/marchedemo_fruits.png" },
  { name: "Saveurs d'Asie", img: "/marchedemo_epices.png" },
  { name: "Méditerranéenne", img: "/marchedemo_boucherie.png" },
  { name: "Sud Américaine", img: "/marchedemo_fruits.png" },
  { name: "Balkans & Turques", img: "/marchedemo_epices.png" },
  { name: "Surgelé", img: "/marchedemo_boucherie.png" },
  { name: "Produits Courants", img: "/marchedemo_fruits.png" },
];

export default function SlidingCategories() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 320;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-theme relative">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-5xl font-display font-black text-[var(--foreground)]">
            Nos Rayons
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border border-[var(--border-m)] flex items-center justify-center transition-all ${
                canScrollLeft ? "hover:bg-brand-green hover:text-white hover:border-brand-green text-[var(--foreground)]" : "opacity-30 cursor-not-allowed text-[var(--foreground-muted)]"
              }`}
            >
              ←
            </button>
            <button 
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border border-[var(--border-m)] flex items-center justify-center transition-all ${
                canScrollRight ? "hover:bg-brand-green hover:text-white hover:border-brand-green text-[var(--foreground)]" : "opacity-30 cursor-not-allowed text-[var(--foreground-muted)]"
              }`}
            >
              →
            </button>
          </div>
        </div>
      </div>
      
      {/* Scrollable Track */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            className="flex-shrink-0 w-60 group cursor-hover"
            data-cursor-text="EXPLORER"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[var(--background-surface)] border border-[var(--border-m)] mb-4 transition-shadow duration-300 group-hover:shadow-xl group-hover:border-brand-green/30">
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="font-display font-bold text-center text-[var(--foreground)] group-hover:text-brand-green transition-colors">
              {cat.name}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* Fade edges */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--background)] to-transparent pointer-events-none z-10" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none z-10" />
      )}
    </section>
  );
}
