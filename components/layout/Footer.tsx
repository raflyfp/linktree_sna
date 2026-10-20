"use client";

import React from "react";
import { useSiteData } from "@/context/DataContext";
import { ShoppingCart, ExternalLink, ShieldCheck, Truck, Clock } from "lucide-react";

export const Footer: React.FC = () => {
  const { config: siteConfig, stores: officialStores } = useSiteData();
  return (
    <footer className="bg-gradient-to-b from-[#2E1065] to-[#1E0745] text-white pt-16 pb-12 border-t border-purple-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-purple-800/40">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-purple-600/30 flex items-center justify-center text-purple-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Produk Original</h4>
              <p className="text-xs text-purple-200/70 mt-0.5">Produk resmi dan terjamin kualitasnya langsung dari PC Store</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-purple-600/30 flex items-center justify-center text-purple-300">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Pengiriman Seluruh Indonesia</h4>
              <p className="text-xs text-purple-200/70 mt-0.5">Jaringan cabang terdekat untuk ongkir lebih hemat dan cepat</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-purple-600/30 flex items-center justify-center text-purple-300">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Pelayanan Ramah &amp; Responsif</h4>
              <p className="text-xs text-purple-200/70 mt-0.5">Siap membantu pertanyaan dan konsultasi ketersediaan produk</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#A78BFA] flex items-center justify-center text-white font-black text-xl shadow-lg">
                PC
              </div>
              <span className="font-black text-2xl tracking-tight text-white">PC STORE</span>
            </div>
            <p className="text-sm text-purple-200/80 leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>
            <div className="pt-2 text-xs text-purple-300/70">
              <p>Kantor Pusat: Pasuruan, Jawa Timur - Indonesia</p>
            </div>
          </div>

          {/* All 7 Official Store Branches */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-bold tracking-wider uppercase text-purple-300 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-purple-400" />
              <span>Official Marketplace</span>
            </h3>
            <ul className="space-y-2 text-sm">
              {officialStores.map((store) => (
                <li key={store.id}>
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-purple-200 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400 group-hover:text-white transition-colors" />
                    <span>{store.name}</span>
                    {store.isPusat && (
                      <span className="text-[10px] bg-purple-500/30 text-purple-200 px-1.5 py-0.2 rounded font-semibold ml-1">
                        Pusat
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-bold tracking-wider uppercase text-purple-300">
              Menu Cepat
            </h3>
            <ul className="space-y-2 text-sm text-purple-200/80">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-purple-800/40 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-300/60 gap-4">
          <p>© 2026 PC Store. Seluruh hak cipta dilindungi undang-undang.</p>
          <p className="text-center sm:text-right">
            Dibuat untuk kemudahan belanja resmi &amp; aman di seluruh Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
};
