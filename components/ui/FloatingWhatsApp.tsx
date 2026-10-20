"use client";

import React from "react";
import Image from "next/image";
import { useSiteData } from "@/context/DataContext";

export const FloatingWhatsApp: React.FC = () => {
  const { config, stores } = useSiteData();
  const waPhone = config.adminWhatsApp?.phoneNumber?.trim() || "";
  const isWaAvailable = waPhone.length > 0;
  const pusatStore = stores.find((s) => s.id === "pc-pusat-pasuruan-shopee") || stores[0];
  
  const targetUrl = isWaAvailable
    ? `https://wa.me/${waPhone}?text=${encodeURIComponent(
        config.adminWhatsApp?.defaultMessage || "Halo Admin PC Store"
      )}`
    : (pusatStore?.url || "https://shopee.co.id");

  return (
    <aside
      aria-label="Kontak WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex items-center group focus:outline-hidden"
    >
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi Admin Kami via WhatsApp / Official Chat"
        className="block relative transform transition-all duration-300 hover:scale-105 active:scale-95 drop-shadow-xl hover:drop-shadow-2xl"
      >
        {/* Animated green pulse ripple behind badge */}
        <span
          className="absolute inset-2 rounded-full bg-emerald-400 opacity-60 animate-ping pointer-events-none"
          style={{ animationDuration: "2.8s" }}
        />

        {/* WhatsApp Badge Image (100% Transparent PNG) */}
        <div className="relative w-40 sm:w-48 h-16 sm:h-20 transition-transform">
          <Image
            src="/images/badge-whatsapp.png"
            alt="Hubungi Admin Kami"
            fill
            className="object-contain"
            priority
          />
        </div>
      </a>
    </aside>
  );
};
