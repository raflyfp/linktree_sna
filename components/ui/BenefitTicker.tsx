"use client";

import React from "react";
import { ShieldCheck, Truck, MapPin, MessageCircle, Sparkles, CheckCircle2 } from "lucide-react";

export const BenefitTicker: React.FC = () => {
  const items = [
    { icon: ShieldCheck, text: "100% Produk Perawatan Medis Original", color: "text-emerald-300" },
    { icon: MapPin, text: "7 Cabang Marketplace Resmi se-Indonesia", color: "text-amber-300" },
    { icon: Truck, text: "Pengiriman Cepat & Siap Kirim Setiap Hari", color: "text-cyan-300" },
    { icon: MessageCircle, text: "Layanan Customer Care Ramah & Siap Bantu", color: "text-purple-300" },
    { icon: Sparkles, text: "Produk Unggulan: Polifix Kemasan Baru & Policrepe", color: "text-pink-300" },
    { icon: CheckCircle2, text: "Akses Toko Langsung Aman & Terpercaya", color: "text-yellow-300" },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-[#2E1065] via-[#4C1D95] to-[#2E1065] py-3.5 border-y border-purple-400/20 overflow-hidden relative select-none">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs sm:text-sm font-bold text-white">
        {/* Sequence 1 */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`item-1-${idx}`} className="inline-flex items-center gap-2 px-3">
              <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
              <span>{item.text}</span>
              <span className="text-purple-400/60 ml-4 font-normal">•</span>
            </div>
          );
        })}

        {/* Sequence 2 (for continuous seamless loop) */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`item-2-${idx}`} className="inline-flex items-center gap-2 px-3">
              <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
              <span>{item.text}</span>
              <span className="text-purple-400/60 ml-4 font-normal">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
