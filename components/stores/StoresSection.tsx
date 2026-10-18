"use client";

import React, { useState } from "react";
import Image from "next/image";
import { officialStores } from "@/data/stores";
import { PlatformType } from "@/types/store";
import { ShoppingBag, ExternalLink, MapPin, Search, Sparkles, Store, Megaphone } from "lucide-react";

export const StoresSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<"all" | PlatformType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStores = officialStores.filter((store) => {
    const matchesFilter = selectedFilter === "all" || store.platform === selectedFilter;
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.province.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="stores-section" className="py-14 sm:py-20 lg:py-24 bg-[#F5F3FF]/80 relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-1/4 -right-24 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Mascot Megaphone Announcement */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-200 text-xs font-bold uppercase tracking-wider text-[#6D28D9] shadow-xs">
              <Store className="w-3.5 h-3.5" />
              <span>Official E-Commerce Hub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#4C1D95] tracking-tight">
              Daftar Marketplace Resmi Cabang
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Pilih marketplace official terdekat dari domisili Anda untuk kecepatan kirim optimal dan ongkir paling hemat.
            </p>
          </div>

          {/* Animated Mascot Megaphone Callout */}
          <div className="flex items-center gap-3.5 bg-white p-3.5 sm:p-4 rounded-3xl border-2 border-purple-200 shadow-md self-center md:self-start hover:border-purple-300 transition-all hover:scale-105 group">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 animate-bounce-subtle">
              <Image
                src="/images/mascot-hijab-megaphone.png"
                alt="Pengumuman Resmi PC Store"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-left max-w-[200px]">
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase text-[#6D28D9] bg-purple-50 px-2 py-0.5 rounded-full">
                <Megaphone className="w-3 h-3 text-[#8B5CF6]" /> Info Pengiriman
              </span>
              <p className="text-xs font-bold text-gray-900 mt-1 leading-snug">
                Pesan dari cabang terdekat agar ongkir lebih murah &amp; kilat sampai!
              </p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-8 bg-white p-3 sm:p-4 rounded-3xl border border-purple-100 shadow-xs">
          {/* Platform Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-[#6D28D9] text-white shadow-md shadow-purple-500/25"
                  : "bg-purple-50 text-gray-700 hover:bg-purple-100"
              }`}
            >
              Semua Cabang ({officialStores.length})
            </button>
            <button
              onClick={() => setSelectedFilter("shopee")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedFilter === "shopee"
                  ? "bg-[#EE4D2D] text-white shadow-md shadow-orange-500/25"
                  : "bg-orange-50 text-[#EE4D2D] hover:bg-orange-100"
              }`}
            >
              Shopee Official ({officialStores.filter((s) => s.platform === "shopee").length})
            </button>
            <button
              onClick={() => setSelectedFilter("tiktok")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedFilter === "tiktok"
                  ? "bg-black text-white shadow-md shadow-gray-900/25"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              TikTok Shop ({officialStores.filter((s) => s.platform === "tiktok").length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72 mt-2 sm:mt-0">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kota atau cabang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-purple-50/50 rounded-2xl border border-purple-100 focus:outline-hidden focus:ring-2 focus:ring-[#8B5CF6] focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Store Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className={`rounded-3xl p-6 bg-white border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl group ${
                store.isPusat
                  ? "border-amber-300 ring-2 ring-amber-200/60 shadow-md shadow-amber-500/10"
                  : "border-purple-100 shadow-xs hover:border-purple-300"
              }`}
            >
              <div>
                {/* Header: Platform & Pusat Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      store.platform === "tiktok"
                        ? "bg-black text-white"
                        : "bg-[#EE4D2D]/10 text-[#EE4D2D]"
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{store.platformLabel}</span>
                  </span>

                  {store.isPusat ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                      <Sparkles className="w-3 h-3 text-amber-600 animate-spin" style={{ animationDuration: "6s" }} />
                      Kantor Pusat
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                      {store.badge}
                    </span>
                  )}
                </div>

                {/* Store Name & Location */}
                <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-[#6D28D9] transition-colors leading-snug">
                  {store.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>
                    {store.city}, {store.province}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                  {store.description}
                </p>
              </div>

              {/* Action Button: Throws DIRECTLY to Marketplace */}
              <div className="mt-6 pt-4 border-t border-purple-50">
                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.02] ${
                    store.platform === "tiktok"
                      ? "bg-gray-900 hover:bg-black shadow-gray-900/20"
                      : "bg-[#EE4D2D] hover:bg-[#d63f21] shadow-orange-500/20"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Kunjungi Marketplace Resmi</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-purple-100 p-8">
            <p className="text-gray-500 text-sm">
              Tidak ada cabang yang cocok dengan pencarian &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-[#6D28D9] bg-purple-50 hover:bg-purple-100"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
