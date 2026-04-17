"use client";
import React, { useState } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat"); // "chat" or "whatsapp"
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour ! 👋 L'équipe du Marché de Mo' est à votre écoute. Comment puis-je vous aider ?" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: inputValue }]);
    setInputValue("");
    // Mock bot response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Merci pour votre message ! Un conseiller vous répondra très prochainement. En attendant, n'hésitez pas à consulter notre page Service Client ou à nous appeler au 05 82 95 82 52." }
      ]);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 bg-theme border border-[var(--border-m)] rounded-2xl shadow-2xl overflow-hidden w-80"
          >
            {/* Header */}
            <div className="bg-brand-green text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <img src="/marchedemo_logo.png" alt="Marché de Mo'" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Monsieur Mo&apos;</h4>
                  <p className="text-[10px] opacity-80 leading-tight">Nous vous répondrons dès que possible...</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100 transition-opacity">
                <X size={18} />
              </button>
            </div>
            
            {/* Tab Switcher */}
            <div className="flex border-b border-[var(--border-m)]">
              <button 
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === "chat" ? "text-brand-green border-b-2 border-brand-green" : "text-[var(--foreground-muted)] hover:text-brand-green"
                }`}
              >
                <MessageCircle size={14} /> Assistance
              </button>
              <button 
                onClick={() => setActiveTab("whatsapp")}
                className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === "whatsapp" ? "text-[#25D366] border-b-2 border-[#25D366]" : "text-[var(--foreground-muted)] hover:text-[#25D366]"
                }`}
              >
                <Phone size={14} /> WhatsApp
              </button>
            </div>

            {/* Content */}
            {activeTab === "chat" ? (
              <div className="flex flex-col h-72">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                        msg.from === "user" 
                          ? "bg-brand-green text-white rounded-br-sm" 
                          : "bg-[var(--background-elevated)] text-[var(--foreground)] rounded-bl-sm"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Input */}
                <div className="border-t border-[var(--border-m)] p-3 flex gap-2">
                  <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tapez votre message..."
                    className="flex-1 bg-[var(--background-surface)] text-[var(--foreground)] text-sm px-3 py-2 rounded-full outline-none border border-[var(--border-m)] focus:border-brand-green transition-colors placeholder:text-[var(--foreground-muted)]"
                  />
                  <button 
                    onClick={handleSend}
                    className="w-9 h-9 bg-brand-green text-white rounded-full flex items-center justify-center hover:bg-brand-green-dark transition-colors flex-shrink-0"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-[var(--background-surface)]">
                <div className="bg-theme p-4 rounded-xl shadow-sm text-sm border border-[var(--border-m)] mb-4 text-[var(--foreground)]">
                  L&apos;équipe du Marché de Mo&apos; est à votre écoute ! Contactez-nous directement sur WhatsApp.
                </div>
                <a 
                  href="https://wa.me/33582958252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-4 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-hover"
                  data-cursor-text="OUVRIR"
                >
                  Ouvrir WhatsApp <Phone size={16} />
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
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
