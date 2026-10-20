"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSiteData } from "@/context/DataContext";
import { IndonesiaSvgMap } from "@/components/map/IndonesiaSvgMap";
import { PriorityCareLogo } from "@/components/ui/PriorityCareLogo";
import { Sparkles, ExternalLink, ShoppingBag, X } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { cityGroups } = useSiteData();
  const [pasuruanPickerOpen, setPasuruanPickerOpen] = useState(false);
  const pasuruanGroup = cityGroups.find((c) => c.cityId === "pasuruan");

  return (
    <section id="hero" className="relative w-full bg-[#5537EA] text-white overflow-hidden">
      {/* Header Intro Area: Smooth gradient from deep purple down to map ocean color */}
      <div className="w-full bg-gradient-to-b from-[#2A084E] via-[#3B147D] to-[#5537EA] pt-5 sm:pt-7 pb-4 sm:pb-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          {/* Left Text directly combined with Priority Care Logo */}
          <div className="text-center md:text-left space-y-2.5 max-w-2xl">
            {/* Directly combined row: Priority Care Logo Badge + Official Network Badge */}
            <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
              <PriorityCareLogo size="sm" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs text-purple-200 font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "8s" }} />
                <span>Jaringan Resmi Indonesia</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Selamat Datang di{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-purple-200">
                Priority Care
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-normal">
              Pusat produk fiksasi medis &amp; perban elastis berkualitas (<strong>Polifix</strong> &amp; <strong>Policrepe</strong>). Klik pin lokasi kota pada <strong>Peta Indonesia</strong> di bawah untuk langsung berbelanja di official marketplace cabang terdekat.
            </p>
          </div>

          {/* Right Mascot: Cute 3D Polifix Chibi Character with Welcome Speech Bubble */}
          <div className="relative flex items-center justify-center shrink-0 pr-4 sm:pr-8 overflow-visible">
            {/* Ambient Purple/Amber Glow */}
            <div className="absolute w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

            <div className="relative w-44 h-36 sm:w-56 sm:h-44">
              <div className="relative w-full h-full animate-float hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/products/polifix-chibi-thumbsup.png"
                  alt="Maskot Polifix Chibi Resmi PC Store"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Speech bubble "Selamat Datang!" */}
              <div
                className="absolute -top-3 -right-2 sm:-top-2 sm:-right-4 w-28 sm:w-32 h-11 sm:h-13 animate-bounce-subtle z-20"
                style={{ animationDelay: "-1.5s" }}
              >
                <Image
                  src="/images/badge-welcome.png"
                  alt="Selamat Datang!"
                  fill
                  className="object-contain drop-shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Floating Animated Chibi Background Companions in Hero Sky */}
      <div className="absolute top-32 left-4 lg:left-10 opacity-40 hover:opacity-100 transition-opacity pointer-events-none hidden sm:block animate-float" style={{ animationDuration: "5.5s" }}>
        <div className="relative w-16 h-16 sm:w-20 sm:h-20">
          <Image
            src="/images/products/poligyp-chibi-cheer.png"
            alt="Poligyp Cheer Floating"
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>

      <div className="absolute top-28 right-6 lg:right-16 opacity-35 hover:opacity-100 transition-opacity pointer-events-none hidden sm:block animate-float" style={{ animationDuration: "6.5s", animationDelay: "-2.5s" }}>
        <div className="relative w-16 h-16 sm:w-22 sm:h-22">
          <Image
            src="/images/products/caressa-cotton-balls.png"
            alt="Caressa Floating"
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* 3. Pasuruan Quick Multi-Store Selector Popover */}
      {pasuruanPickerOpen && pasuruanGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-purple-200 relative text-gray-900">
            <button
              onClick={() => setPasuruanPickerOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-purple-50"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-[#4C1D95] mb-1">
              Pasuruan (Kantor Pusat)
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              Pilih marketplace resmi pusat yang ingin Anda tuju:
            </p>

            <div className="space-y-2.5">
              {pasuruanGroup.stores.map((store) => (
                <a
                  key={store.id}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setPasuruanPickerOpen(false)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold text-white shadow-xs transition-transform hover:scale-[1.02] ${
                    store.platform === "tiktok"
                      ? "bg-black hover:bg-gray-900"
                      : "bg-[#EE4D2D] hover:bg-[#d63f21]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    {store.name}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Edge-to-Edge Seamless Indonesia Map with Anti-Collision Pins */}
      <IndonesiaSvgMap />
    </section>
  );
};
