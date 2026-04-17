"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-theme border-t border-border-theme pt-16 pb-8 text-theme relative z-[50] overflow-hidden">
      {/* Selective Grain Texture for Footer depth */}
      <div className="film-grain z-0 opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4 cursor-hover" data-cursor-text="MARCHÉ">
            <h3 className="font-display font-black text-2xl text-brand-green uppercase tracking-tighter">
              Marché de<br/><span className="text-4xl leading-none">mo'</span>
            </h3>
            <p className="text-sm bg-brand-red text-white inline-block px-2 py-0.5 font-bold uppercase tracking-wider">
              Commerçant engagé
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-brand-green text-lg">Menu</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#" className="hover:text-brand-green transition-colors">Accueil</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Notre enseigne</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Nos Rayons</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Nos engagements</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Magasins</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-brand-green text-lg">Infos</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#" className="hover:text-brand-green transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Service client</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Politique de cookie</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Mentions légales</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-brand-green text-lg">Besoin d'aide ?</h4>
            <p className="text-sm text-muted">
              Page <a href="#" className="text-brand-green underline cursor-hover" data-cursor-text="AIDE">Service Client</a> pour obtenir de l'aide ou appelez-nous au 05 82 95 82 52.
            </p>
          </div>
        </div>
        <div className="border-t border-border-theme pt-8 text-center text-sm text-muted font-medium">
          &copy; {new Date().getFullYear()} Marché de Mo'. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
