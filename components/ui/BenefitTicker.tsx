"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Truck, MapPin, MessageCircle, Sparkles, CheckCircle2 } from "lucide-react";

export const BenefitTicker: React.FC = () => {
  const items = [
    {
      chibi: "/images/products/polifix-chibi-thumbsup.png",
      icon: ShieldCheck,
      text: "100% Produk Original Polifix & Policrepe",
      color: "text-emerald-300"
    },
    {
      chibi: "/images/products/poligyp-chibi-cheer.png",
      icon: MapPin,
      text: "7 Cabang Marketplace Resmi se-Indonesia",
      color: "text-amber-300"
    },
    {
      chibi: "/images/products/polifix-chibi-running.png",
      icon: Truck,
      text: "Pengiriman Cepat & Siap Kirim Hari Ini",
      color: "text-cyan-300"
    },
    {
      chibi: "/images/products/polidine-chibi-shield.png",
      icon: Sparkles,
      text: "Proteksi Luka Teruji & Higienis Maksimal",
      color: "text-pink-300"
    },
    {
      chibi: "/images/products/caressa-cotton-balls.png",
      icon: CheckCircle2,
      text: "Kapas Alami Murni Ramah Kulit Bayi & Dewasa",
      color: "text-yellow-300"
    },
    {
      icon: MessageCircle,
      text: "Customer Care Sigap & Siap Konsultasi",
      color: "text-purple-300"
    },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-[#230847] via-[#4C1D95] to-[#230847] py-3 border-y border-purple-400/30 overflow-hidden relative select-none shadow-inner">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs sm:text-sm font-black text-white">
        {/* Sequence 1 */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`item-1-${idx}`} className="inline-flex items-center gap-2.5 px-3">
              {item.chibi && (
                <div className="relative w-6 h-6 shrink-0 animate-bounce-subtle">
                  <Image
                    src={item.chibi}
                    alt="Chibi Mascot"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
              <span className="tracking-wide">{item.text}</span>
              <span className="text-purple-400/70 ml-4 font-normal">•</span>
            </div>
          );
        })}

        {/* Sequence 2 (for seamless loop) */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`item-2-${idx}`} className="inline-flex items-center gap-2.5 px-3">
              {item.chibi && (
                <div className="relative w-6 h-6 shrink-0 animate-bounce-subtle">
                  <Image
                    src={item.chibi}
                    alt="Chibi Mascot"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
              <span className="tracking-wide">{item.text}</span>
              <span className="text-purple-400/70 ml-4 font-normal">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
