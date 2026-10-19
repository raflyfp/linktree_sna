"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cityGroups } from "@/data/stores";
import { IndonesiaSvgMap } from "@/components/map/IndonesiaSvgMap";
import { Sparkles, ExternalLink, ShoppingBag, X } from "lucide-react";

export const HeroSection: React.FC = () => {
  const [pasuruanPickerOpen, setPasuruanPickerOpen] = useState(false);
  const pasuruanGroup = cityGroups.find((c) => c.cityId === "pasuruan");

  return (
    <section id="hero" className="relative w-full bg-[#3B0764] text-white overflow-hidden">
      {/* 1. Header Intro Area: Greeting, Headline, & Welcoming Mascot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-2 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Text */}
          <div className="text-center md:text-left space-y-3.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs sm:text-sm text-purple-200 font-bold">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: "8s" }} />
              <span>Official Store Jaringan PC Store Indonesia</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.18]">
              Selamat Datang di{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-200 to-white">
                Official PC Store
              </span>
            </h1>

            <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed font-normal">
              Pusat produk fiksasi medis &amp; perban elastis berkualitas (<strong>Polifix</strong> &amp; <strong>Policrepe</strong>). Klik lokasi kota pada <strong>Peta Indonesia</strong> di bawah untuk langsung berbelanja di official marketplace cabang terdekat.
            </p>
          </div>

          {/* Right Mascot: Cute 3D Polifix Chibi Character with Welcome Speech Bubble */}
          <div className="relative flex items-center justify-center shrink-0">
            {/* Ambient Purple/Amber Glow */}
            <div className="absolute w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

            <div className="relative w-40 h-40 sm:w-52 sm:h-52">
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
                className="absolute -top-3 -right-6 sm:-top-2 sm:-right-8 w-28 sm:w-36 h-12 sm:h-14 animate-bounce-subtle z-20"
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

      {/* Floating Animated Chibi Background Companions in Hero */}
      <div className="absolute top-12 left-6 lg:left-12 opacity-35 hover:opacity-80 transition-opacity pointer-events-none hidden sm:block animate-float" style={{ animationDuration: "6s" }}>
        <div className="relative w-16 h-16 sm:w-20 sm:h-20">
          <Image
            src="/images/products/poligyp-chibi-cheer.png"
            alt="Poligyp Cheer Floating"
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>

      <div className="absolute bottom-6 right-8 lg:right-20 opacity-30 hover:opacity-80 transition-opacity pointer-events-none hidden sm:block animate-float" style={{ animationDuration: "7s", animationDelay: "-3s" }}>
        <div className="relative w-16 h-16 sm:w-22 sm:h-22">
          <Image
            src="/images/products/caressa-cotton-balls.png"
            alt="Caressa Floating"
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* 2. Pasuruan Quick Multi-Store Selector Popover */}
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

      {/* 3. Edge-to-Edge Seamless Indonesia Map with Anti-Collision Pins */}
      <IndonesiaSvgMap />
    </section>
  );
};
