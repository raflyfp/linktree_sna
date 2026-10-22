"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSiteData } from "@/context/DataContext";
import { Product } from "@/types/product";
import {
  ShoppingBag,
  ExternalLink,
  Sparkles,
  Star,
  CheckCircle2,
  ShieldCheck,
  Heart,
  ArrowRight,
  PackageCheck
} from "lucide-react";

export const ProductsSection: React.FC = () => {
  const { products: bestSellerProducts, stores } = useSiteData();
  const pusatStore = stores.find((s) => s.id === "pc-pusat-pasuruan-shopee") || stores[0];
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <section id="products-section" className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#FAF8FF] to-white relative overflow-hidden">
      {/* Dynamic Animated Background Aura */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-purple-200/35 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-16 right-1/4 w-[500px] h-[500px] bg-violet-200/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: "-1.5s" }} />

      {/* Floating Animated Chibi Product Characters in Empty Background Space */}
      <div className="absolute top-28 -left-4 xl:left-6 opacity-40 hover:opacity-100 transition-opacity pointer-events-none hidden lg:block animate-float" style={{ animationDuration: "6s" }}>
        <div className="relative w-28 h-28">
          <Image
            src="/images/products/polifix-chibi-hug.webp"
            alt="Polifix Chibi Background"
            fill
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>

      <div className="absolute top-1/3 -right-2 xl:right-8 opacity-35 hover:opacity-100 transition-opacity pointer-events-none hidden lg:block animate-float" style={{ animationDuration: "7s", animationDelay: "-2.5s" }}>
        <div className="relative w-28 h-28">
          <Image
            src="/images/products/caressa-cotton-balls.webp"
            alt="Caressa Chibi Background"
            fill
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>

      <div className="absolute bottom-36 left-4 xl:left-8 opacity-35 hover:opacity-100 transition-opacity pointer-events-none hidden lg:block animate-float" style={{ animationDuration: "5.5s", animationDelay: "-3.5s" }}>
        <div className="relative w-24 h-24">
          <Image
            src="/images/products/poligyp-chibi-cheer.webp"
            alt="Poligyp Chibi Background"
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>

      <div className="absolute bottom-20 -right-4 xl:right-8 opacity-35 hover:opacity-100 transition-opacity pointer-events-none hidden lg:block animate-float" style={{ animationDuration: "6.5s", animationDelay: "-1s" }}>
        <div className="relative w-26 h-26">
          <Image
            src="/images/products/polidine-chibi-thumbsup.webp"
            alt="Polidine Chibi Background"
            fill
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Best Seller Crown Badge & Chibi Mascot Callout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-14 sm:mb-18">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3.5 max-w-2xl">


            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4C1D95] tracking-tight leading-[1.15]">
              Produk Pilihan &amp; Unggulan
            </h2>

            <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
              Koleksi produk penutup luka dan perban medis terpercaya dari PriorityCare Store. Menghadirkan foto kemasan resmi dengan kualitas standar medis yang siap kirim ke seluruh Indonesia.
            </p>
          </div>

          {/* Interactive Mascot Banner Top Right: Cute Polifix Chibi Companion */}
          <div className="flex items-center gap-4 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border-2 border-purple-200 shadow-xl shadow-purple-500/10 hover:border-purple-400 transition-all hover:scale-105 group relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-100 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 animate-float">
              <Image
                src="/images/products/polifix-chibi-thumbsup.webp"
                alt="Maskot Polifix"
                fill
                className="object-contain drop-shadow-md group-hover:rotate-6 transition-transform"
              />
            </div>
            <div className="text-left max-w-[210px] relative z-10">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-[#6D28D9] bg-purple-100 px-2.5 py-0.5 rounded-full mb-1">
                <Heart className="w-3 h-3 fill-pink-500 text-pink-500 animate-pulse" /> 100% Original
              </span>
              <p className="text-xs font-black text-gray-900 leading-snug">
                Formula perekat ramah kulit &amp; daya rekat optimal sepanjang hari!
              </p>
              <span className="text-[11px] text-purple-600 font-bold block mt-1">
                ★ 4.9/5 dari 20.000+ pelanggan
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid: Product packaging as main photo + cute Chibi Mascot companion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {bestSellerProducts.map((product: Product, idx) => {
            const isHovered = hoveredCardId === product.id;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredCardId(product.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`rounded-3xl border bg-white flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20 group relative ${product.isBestSeller
                  ? "border-purple-200 shadow-lg shadow-purple-500/10 ring-2 ring-purple-100 hover:border-purple-400"
                  : "border-gray-200/90 shadow-sm hover:border-purple-300"
                  }`}
              >
                {/* Top Glowing Gradient Bar */}
                <div
                  className={`h-1.5 w-full bg-gradient-to-r ${idx % 3 === 0
                    ? "from-orange-400 via-amber-400 to-purple-600"
                    : idx % 3 === 1
                      ? "from-purple-600 via-violet-500 to-emerald-400"
                      : "from-blue-500 via-purple-500 to-pink-500"
                    }`}
                />

                <div>
                  {/* Product Stage Area: REAL PRODUCT PACKAGING as Main Image */}
                  <div className="relative aspect-4/3 w-full bg-gradient-to-b from-[#F5F3FF] via-[#EDE9FE]/40 to-white flex items-center justify-center p-6 overflow-hidden border-b border-purple-50 select-none">
                    {/* Radial Glow Ring behind product */}
                    <div
                      className={`absolute w-44 h-44 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${isHovered
                        ? "bg-purple-300/50 scale-125"
                        : "bg-purple-200/35 scale-100"
                        }`}
                    />

                    {/* Main Real Product Image */}
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        unoptimized={product.imageUrl.startsWith("data:")}
                        className="object-contain drop-shadow-lg"
                      />
                    </div>

                    {/* Cute Animated 3D Chibi Mascot Companion in Corner */}
                    {product.chibiMascot && (
                      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-16 h-16 sm:w-20 sm:h-20 z-20 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 animate-bounce-subtle">
                        <Image
                          src={product.chibiMascot}
                          alt={`${product.name} Mascot Companion`}
                          fill
                          unoptimized={product.chibiMascot.startsWith("data:")}
                          className="object-contain drop-shadow-md group-hover:animate-wiggle"
                        />
                      </div>
                    )}

                    {/* Top Left Badge */}
                    <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-20">
                      {product.badge && (
                        <span
                          className={`text-[11px] font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-xs ${product.isBestSeller
                            ? "bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white ring-1 ring-white/30"
                            : "bg-white/90 text-purple-900 border border-purple-200"
                            }`}
                        >
                          <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: "6s" }} />
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Top Right Rating & Sold Pill */}
                    <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-purple-100 shadow-xs z-20 text-[11px] font-bold text-gray-800">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{product.rating || "4.9"}</span>
                      {product.soldCount && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="text-purple-700 text-[10px]">{product.soldCount}</span>
                        </>
                      )}
                    </div>

                    {/* Mascot Speech Bubble Callout on Hover */}
                    {product.chibiQuote && (
                      <div
                        className={`absolute bottom-2 inset-x-3 bg-white/95 backdrop-blur-md border border-purple-200/90 rounded-2xl p-2.5 shadow-lg text-center transition-all duration-300 z-30 ${isHovered
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2 pointer-events-none"
                          }`}
                      >
                        <p className="text-[11px] font-bold text-[#4C1D95] leading-snug">
                          &ldquo;{product.chibiQuote}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-6 space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                        {product.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" /> Ready Stock
                      </span>
                    </div>

                    <h3 className="font-black text-xl text-gray-900 group-hover:text-[#6D28D9] transition-colors leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed min-h-[48px]">
                      {product.shortDescription}
                    </p>

                    {/* Feature Chips */}
                    {product.features && product.features.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {product.features.map((feat, fIdx) => (
                          <span
                            key={fIdx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-50/70 text-gray-700 text-[11px] font-semibold border border-purple-100 group-hover:border-purple-200 transition-colors"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#8B5CF6] shrink-0" />
                            {feat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions: Directly Throws to Official Marketplace */}
                <div className="p-6 pt-0">
                  <a
                    href={pusatStore.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl text-xs font-black transition-all shimmer-effect cursor-pointer ${product.isBestSeller
                      ? "bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white hover:from-[#5B21B6] hover:to-[#7C3AED] shadow-md shadow-purple-500/25 hover:shadow-xl hover:scale-[1.02]"
                      : "bg-purple-50 text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white border border-purple-200 hover:border-transparent hover:scale-[1.02]"
                      }`}
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0 transition-transform group-hover:rotate-12" />
                    <span>Beli di Official Marketplace</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5 shrink-0 opacity-80" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Cute Polifix Chibi Hugging Giant Tape */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#EDE9FE] via-[#F5F3FF] to-[#EDE9FE] border-2 border-purple-200/90 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-purple-500/10 hover:shadow-2xl transition-all relative overflow-hidden group">
          <div className="flex items-center gap-5 text-center sm:text-left relative z-10">
            <div className="relative w-22 h-22 sm:w-28 sm:h-28 shrink-0 animate-bounce-subtle group-hover:scale-115 group-hover:rotate-3 transition-transform">
              <Image
                src="/images/products/polifix-chibi-hug.webp"
                alt="Maskot Polifix Memeluk Plester"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[11px] font-black text-[#6D28D9] shadow-xs mb-1.5">
                <PackageCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                Pengiriman Cepat &amp; Dijamin Asli
              </div>
              <h4 className="font-black text-xl sm:text-2xl text-[#4C1D95]">
                Ingin Belanja dari Cabang Terdekat Anda?
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl font-medium">
                Pilih marketplace resmi cabang PC Store terdekat (Pasuruan, Malang, Surabaya, Jakarta, Bandung, atau Tarakan) untuk ongkir paling hemat!
              </p>
            </div>
          </div>

          <a
            href="#stores-section"
            className="shrink-0 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#5B21B6] hover:to-[#7C3AED] text-white font-black text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-all hover:scale-105 inline-flex items-center gap-2 relative z-10"
          >
            <span>Pilih Cabang Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
