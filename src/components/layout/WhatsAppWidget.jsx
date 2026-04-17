"use client";
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 bg-theme border border-border-theme rounded-2xl shadow-2xl overflow-hidden w-80"
          >
            <div className="bg-brand-green text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-green font-bold text-xs">
                  MO'
                </div>
                <div>
                  <h4 className="font-bold">Monsieur Mo'</h4>
                  <p className="text-[10px] opacity-80 leading-tight">Nous vous répondrons dès que possible...</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 bg-background-surface">
              <div className="bg-theme p-4 rounded-xl shadow-sm text-sm border border-border-theme mb-4">
                L'équipe du Marché de Mo' est à votre écoute !
              </div>
              <a 
                href="#"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-4 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-hover"
                data-cursor-text="OUVRIR"
              >
                Ouvrir WhatsApp <MessageCircle size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-green text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform focus:outline-none cursor-hover"
        data-cursor-text="AIDE"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
