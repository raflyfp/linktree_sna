"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSiteData } from "@/context/DataContext";
import { PlatformType } from "@/types/store";
import {
  ShoppingBag,
  ExternalLink,
  MapPin,
  Search,
  Sparkles,
  Store,
  Megaphone,
  Truck,
  Star,
  CheckCircle2,
  Clock,
  Zap
} from "lucide-react";

export const StoresSection: React.FC = () => {
  const { stores } = useSiteData();
  const [selectedFilter, setSelectedFilter] = useState<"all" | PlatformType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStores = stores.filter((store) => {
    const matchesFilter = selectedFilter === "all" || store.platform === selectedFilter;
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.province.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="stores-section" className="py-16 sm:py-24 bg-[#F5F3FF]/90 relative overflow-hidden">
      {/* Decorative background aura with gentle float */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-violet-200/35 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: "-2s" }} />

      {/* Playful Floating Chibi Product Mascots in Empty Background */}
      <div className="absolute top-20 left-4 xl:left-8 opacity-40 hover:opacity-100 transition-opacity pointer-events-none hidden lg:block animate-float" style={{ animationDuration: "5.5s" }}>
        <div className="relative w-24 h-24">
          <Image
            src="/images/products/poligyp-chibi-strong.png"
            alt="Poligyp Chibi Background"
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>

      <div className="absolute top-1/2 -right-2 xl:right-6 opacity-35 hover:opacity-100 transition-opacity pointer-events-none hidden lg:block animate-float" style={{ animationDuration: "6.5s", animationDelay: "-2.5s" }}>
        <div className="relative w-28 h-28">
          <Image
            src="/images/products/polidine-chibi-shield.png"
            alt="Polidine Shield Background"
            fill
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>

      <div className="absolute bottom-12 left-10 opacity-30 hover:opacity-100 transition-opacity pointer-events-none hidden lg:block animate-float" style={{ animationDuration: "7s", animationDelay: "-4s" }}>
        <div className="relative w-20 h-20">
          <Image
            src="/images/products/wound-dressing-pad.png"
            alt="Wound Dressing Background"
            fill
            className="object-contain drop-shadow-md"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Mascot Megaphone Announcement */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 sm:mb-14">
          <div className="space-y-3.5 max-w-2xl text-center lg:text-left">
            {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-200 text-xs font-black uppercase tracking-wider text-[#6D28D9] shadow-xs">
              <Store className="w-3.5 h-3.5" />
              <span>Official E-Commerce Hub • Jaringan Tersebar</span>
            </div> */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4C1D95] tracking-tight leading-[1.15]">
              Daftar Marketplace Resmi Cabang
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Pilih marketplace official terdekat dari domisili Anda untuk kecepatan kirim optimal, garansi 100% original, dan ongkir paling hemat.
            </p>
          </div>

          {/* Animated Chibi Mascot Delivery Callout */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border-2 border-purple-200 shadow-xl shadow-purple-500/10 self-center lg:self-start hover:border-purple-400 transition-all hover:scale-105 group relative overflow-hidden">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 animate-bounce-subtle">
              <Image
                src="/images/products/polifix-chibi-running.png"
                alt="Polifix Chibi Siap Antar Pesanan"
                fill
                className="object-contain group-hover:scale-110 group-hover:rotate-6 transition-transform"
                priority
              />
            </div>
            <div className="text-left max-w-[210px]">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-[#6D28D9] bg-purple-50 px-2.5 py-0.5 rounded-full">
                <Megaphone className="w-3 h-3 text-[#8B5CF6]" /> Info Pengiriman
              </span>
              <p className="text-xs font-black text-gray-900 mt-1 leading-snug">
                Pesan dari cabang terdekat agar pesanan sampai kilat &amp; ongkir hemat!
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Siap Kirim Hari Ini</span>
              </div>
            </div>
          </div>
        </div>



        {/* Store Cards Grid with 3D Chibi Mascots & Rich Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className={`rounded-3xl p-6 bg-white border transition-all duration-300 flex flex-col justify-between hover:-translate-y-2.5 hover:shadow-2xl hover:shadow-purple-500/15 group relative overflow-hidden ${store.isPusat
                ? "border-amber-300 ring-2 ring-amber-200/70 shadow-lg shadow-amber-500/10 hover:border-amber-400"
                : "border-purple-100 shadow-sm hover:border-purple-300"
                }`}
            >
              {/* Background Ambient Glow */}
              <div
                className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${store.platform === "tiktok"
                  ? "bg-pink-100 group-hover:scale-150"
                  : store.isPusat
                    ? "bg-amber-100 group-hover:scale-150"
                    : "bg-orange-100 group-hover:scale-150"
                  }`}
              />

              <div>
                {/* Header: Platform & Pusat Badge + Live Status */}
                <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-xs ${store.platform === "tiktok"
                        ? "bg-black text-white"
                        : "bg-[#EE4D2D] text-white"
                        }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{store.platformLabel}</span>
                    </span>

                    {/* Live Online Radar Indicator */}
                    {/* <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-radar" />
                      Buka
                    </span> */}
                  </div>

                  {store.isPusat ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
                      <Sparkles className="w-3 h-3 text-amber-600 animate-spin" style={{ animationDuration: "6s" }} />
                      Kantor Pusat
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                      {store.badge}
                    </span>
                  )}
                </div>

                {/* Chibi Mascot & Store Name Showcase */}
                <div className="flex items-start gap-4 mb-3.5 relative z-10">
                  {/* Chibi Mascot Avatar with Joyful Wiggle Animation */}
                  {store.chibiImage && (
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 shrink-0 bg-gradient-to-b from-purple-50 to-white rounded-2xl border border-purple-100 p-1 flex items-center justify-center shadow-inner group-hover:border-purple-300 transition-all">
                      <Image
                        src={store.chibiImage}
                        alt={store.name}
                        fill
                        className="object-contain drop-shadow-md group-hover:scale-115 group-hover:rotate-6 transition-all duration-300"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-lg text-gray-900 group-hover:text-[#6D28D9] transition-colors leading-snug">
                      {store.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                      <span>
                        {store.city}, {store.province}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center gap-1 text-[11px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{store.rating || "4.9"}</span>
                      </div>
                      <span className="text-[11px] font-bold text-gray-400">• Official Store</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Badge & Promo Note */}
                <div className="space-y-2 mt-3 relative z-10">
                  {/* {store.deliverySpeed && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 text-[11px] font-black text-[#6D28D9] border border-purple-100">
                      <Truck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>{store.deliverySpeed}</span>
                    </div>
                  )} */}

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {store.description}
                  </p>
                </div>
              </div>

              {/* Action Button: Throws DIRECTLY to Marketplace with Shimmer */}
              <div className="mt-6 pt-4 border-t border-purple-50 relative z-10">
                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl text-xs font-black text-white shadow-md transition-all hover:scale-[1.02] shimmer-effect cursor-pointer ${store.platform === "tiktok"
                    ? "bg-gradient-to-r from-gray-900 via-black to-gray-800 hover:from-black hover:to-gray-900 shadow-gray-900/25"
                    : "bg-gradient-to-r from-[#EE4D2D] to-[#FF6B4A] hover:from-[#d63f21] hover:to-[#EE4D2D] shadow-orange-500/25"
                    }`}
                >
                  <ShoppingBag className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  <span>Kunjungi Marketplace Resmi</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-purple-100 p-8 shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 text-[#6D28D9] flex items-center justify-center mb-3">
              <Store className="w-8 h-8" />
            </div>
            <p className="text-gray-600 text-sm font-semibold">
              Tidak ada cabang yang cocok dengan pencarian &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
              className="mt-4 px-5 py-2.5 rounded-2xl text-xs font-black text-[#6D28D9] bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
            >
              Reset Filter Pencarian
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
