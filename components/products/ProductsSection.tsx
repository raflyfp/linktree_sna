"use client";

import React from "react";
import Image from "next/image";
import { bestSellerProducts } from "@/data/products";
import { officialStores } from "@/data/stores";
import { ShoppingBag, ExternalLink, Info, Package, Sparkles } from "lucide-react";

export const ProductsSection: React.FC = () => {
  // Link to official shopee pusat pasuruan as the default flagship store
  const pusatStore = officialStores.find((s) => s.id === "pc-pusat-pasuruan-shopee") || officialStores[0];

  return (
    <section id="products-section" className="py-14 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Background Soft Aura */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Best Seller Crown Badge & Mascot Pointing Accent */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 sm:mb-16">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 max-w-2xl">
            <div className="relative w-36 h-12 animate-bounce-subtle">
              <Image
                src="/images/badge-bestseller.png"
                alt="Best Seller Collection PC Store"
                fill
                className="object-contain"
                priority
              />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4C1D95] tracking-tight">
              Produk Pilihan &amp; Unggulan
            </h2>

            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Koleksi produk fiksasi dan perban medis terpercaya yang paling banyak dicari oleh pelanggan setia PC Store.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-50 text-xs text-[#6D28D9] border border-purple-100">
              <Info className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
              <span>
                Akses katalog lengkap dan varian resmi langsung melalui marketplace kami.
              </span>
            </div>
          </div>

          {/* Pointing Mascot Companion */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-white p-4 rounded-3xl border-2 border-purple-200 shadow-sm self-center md:self-end hover:scale-105 transition-transform group">
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 shrink-0 animate-float">
              <Image
                src="/images/mascot-pointing.png"
                alt="Rekomendasi Produk PC Store"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-left max-w-[200px]">
              <span className="text-[10px] font-black uppercase text-[#6D28D9] bg-purple-100 px-2 py-0.5 rounded-full inline-block mb-1">
                ⭐ Rekomendasi
              </span>
              <p className="text-xs font-bold text-gray-900 leading-snug">
                Formula perekat ramah kulit &amp; elastisitas seimbang!
              </p>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellerProducts.map((product) => (
            <div
              key={product.id}
              className={`rounded-3xl border bg-white flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group ${
                product.isBestSeller
                  ? "border-purple-200 shadow-lg shadow-purple-500/10 ring-2 ring-purple-100 hover:border-purple-400"
                  : "border-gray-200/80 shadow-xs hover:border-purple-300"
              }`}
            >
              <div>
                {/* Product Image Area */}
                <div className="relative aspect-4/3 w-full bg-gradient-to-b from-[#F5F3FF] via-[#EDE9FE]/30 to-white flex items-center justify-center p-4 overflow-hidden border-b border-purple-50">
                  {product.imageUrl ? (
                    <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-purple-100 text-[#6D28D9] flex items-center justify-center">
                      <Package className="w-8 h-8" />
                    </div>
                  )}

                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.badge && (
                      <span
                        className={`text-[11px] font-black px-3 py-1 rounded-full shadow-xs ${
                          product.isBestSeller
                            ? "bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 block">
                    {product.category}
                  </span>

                  <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-[#6D28D9] transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {product.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions: Throws DIRECTLY to Marketplace */}
              <div className="p-5 pt-0">
                <a
                  href={pusatStore.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold transition-all ${
                    product.isBestSeller
                      ? "bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white hover:from-[#5B21B6] hover:to-[#7C3AED] shadow-md shadow-purple-500/25 hover:shadow-lg hover:scale-[1.02]"
                      : "bg-purple-50 text-[#6D28D9] hover:bg-purple-100 border border-purple-200 hover:scale-[1.02]"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Lihat di Official Marketplace</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Waving Mascot */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-[#EDE9FE] via-[#F5F3FF] to-[#EDE9FE] border-2 border-purple-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="relative w-18 h-18 sm:w-22 sm:h-22 shrink-0 animate-wave-hand">
              <Image
                src="/images/mascot-wave.png"
                alt="Maskot PC Store"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-[11px] font-extrabold text-[#6D28D9] mb-1">
                <Sparkles className="w-3 h-3 text-[#8B5CF6]" /> Pengiriman Cepat &amp; Aman
              </div>
              <h4 className="font-black text-xl text-[#4C1D95]">
                Butuh Varian atau Ukuran Khusus?
              </h4>
              <p className="text-sm text-gray-600 mt-1 max-w-xl">
                Seluruh produk kami dapat dicek ketersediaannya secara real-time pada toko Shopee &amp; TikTok Shop cabang resmi kami.
              </p>
            </div>
          </div>

          <a
            href="#stores-section"
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#5B21B6] hover:to-[#7C3AED] text-white font-bold text-xs shadow-md shadow-purple-600/25 transition-all hover:scale-105"
          >
            Pilih Cabang Marketplace
          </a>
        </div>
      </div>
    </section>
  );
};
