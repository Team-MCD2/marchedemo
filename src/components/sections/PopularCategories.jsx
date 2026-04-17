"use client";
import React from "react";
import Image from "next/image";

const categories = [
  { name: "Primeurs", img: "/marchedemo_fruits.png" },
  { name: "Boulangerie", img: "/marchedemo_boucherie.png" }, // reusing placeholder images correctly
  { name: "Boucherie Halal", img: "/marchedemo_boucherie.png" },
  { name: "Produits laitiers et œufs", img: "/marchedemo_epices.png" },
  { name: "Épicerie sucrée", img: "/marchedemo_epices.png" },
  { name: "Épicerie salée", img: "/marchedemo_fruits.png" },
  { name: "Boissons", img: "/marchedemo_fruits.png" },
  { name: "Maison & Entretien", img: "/marchedemo_boucherie.png" }
];

export default function PopularCategories() {
  return (
    <section className="py-24 bg-theme">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-display font-black text-theme mb-12">
          Les catégories les plus populaires
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-border-theme">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="aspect-square border-b border-r border-border-theme flex flex-col items-center justify-center p-6 group cursor-hover transition-colors hover:bg-background-surface"
              data-cursor-text="VOIR"
            >
              <div className="relative w-3/4 h-3/4 mb-4 transform group-hover:scale-110 transition-transform duration-500">
                {/* Fallback to background if image mapping isn't fully accurate locally */}
                <Image 
                  src={cat.img} 
                  alt={cat.name} 
                  fill 
                  className="object-contain drop-shadow-xl saturate-150"
                  onError={(e) => e.currentTarget.src = "/marchedemo_hero.png"} 
                />
              </div>
              <h3 className="font-medium text-center text-theme group-hover:text-brand-green transition-colors">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
