"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Sparkles, ShoppingBag, Package } from "lucide-react";

const greetingMessages = [
  "Hai Sahabat PC Store! Cari cabang terdekat?",
  "Butuh plester Polifix atau perban Policrepe?",
  "Pengiriman cepat & bergaransi ke seluruh Indonesia!",
  "Ada pertanyaan produk? Chat admin di kanan bawah ya!",
];

export const ScrollGreetingMascot: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show greeting once user scrolls down past 260px
      if (window.scrollY > 260 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 260) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  // Cycle messages every 5 seconds
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % greetingMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (isDismissed || !isVisible) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToStores = () => {
    const el = document.getElementById("stores-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProducts = () => {
    const el = document.getElementById("products-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Sapaan Maskot Interaktif PC Store"
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-end gap-2.5 transition-all duration-500 transform animate-in slide-in-from-bottom-6 fade-in"
    >
      <div className="relative group max-w-[220px] sm:max-w-[270px]">
        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2.5 -right-2.5 z-20 w-6 h-6 rounded-full bg-white border border-purple-200 text-gray-400 hover:text-gray-700 hover:bg-purple-100 flex items-center justify-center shadow-md transition-colors"
          aria-label="Tutup sapaan maskot"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Dynamic Speech Bubble */}
        <div className="mb-2 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-purple-200 shadow-xl text-left hover:border-purple-400 transition-all">
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#6D28D9] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: "5s" }} />
            <span>PC Store Assistant</span>
          </div>

          <p className="text-xs text-gray-700 leading-snug font-medium min-h-[32px] transition-all">
            {greetingMessages[msgIndex]}
          </p>

          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-purple-100">
            <button
              onClick={scrollToStores}
              className="inline-flex items-center gap-1 text-[10px] font-bold text-[#6D28D9] hover:text-[#4C1D95] bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3 h-3" />
              Marketplace
            </button>
            <button
              onClick={scrollToProducts}
              className="inline-flex items-center gap-1 text-[10px] font-bold text-[#8B5CF6] hover:text-[#6D28D9] bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <Package className="w-3 h-3" />
              Produk
            </button>
          </div>
        </div>

        {/* Chibi Mascot Character Image (100% Transparent PNG) */}
        <div
          onClick={scrollToTop}
          className="relative w-20 h-24 sm:w-26 sm:h-30 cursor-pointer animate-bounce-subtle transition-transform hover:scale-115 hover:rotate-6 active:scale-95"
          title="Klik untuk kembali ke atas"
        >
          <Image
            src="/images/products/poligyp-chibi-cheer.png"
            alt="Maskot Chibi PC Store Menyapa Pengunjung"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </aside>
  );
};
