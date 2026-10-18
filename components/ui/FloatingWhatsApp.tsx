"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/config";
import { officialStores } from "@/data/stores";

export const FloatingWhatsApp: React.FC = () => {
  // If phone number is configured, use wa.me, otherwise direct to Flagship Store chat (Shopee PC Pusat)
  const isWaAvailable = siteConfig.adminWhatsApp.isAvailable;
  const pusatStore = officialStores.find((s) => s.id === "pc-pusat-pasuruan-shopee") || officialStores[0];
  
  const targetUrl = isWaAvailable
    ? `https://wa.me/${siteConfig.adminWhatsApp.phoneNumber}?text=${encodeURIComponent(
        siteConfig.adminWhatsApp.defaultMessage
      )}`
    : pusatStore.url;

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
