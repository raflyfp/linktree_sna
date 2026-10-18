"use client";

import React from "react";
import { MapCityGroup } from "@/types/store";
import { X, ExternalLink, MapPin, ShoppingBag, Store, Sparkles } from "lucide-react";

interface BranchModalProps {
  cityGroup: MapCityGroup | null;
  onClose: () => void;
}

export const BranchModal: React.FC<BranchModalProps> = ({ cityGroup, onClose }) => {
  if (!cityGroup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-purple-100 relative transform transition-all max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="branch-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-purple-50 transition-colors"
          aria-label="Tutup jendela cabang"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3.5 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#6D28D9] flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
                {cityGroup.province}
              </span>
              {cityGroup.stores.some((s) => s.isPusat) && (
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Kantor Pusat
                </span>
              )}
            </div>
            <h3 id="branch-modal-title" className="text-2xl font-black text-[#4C1D95] mt-1">
              {cityGroup.cityName}
            </h3>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-3 pb-3 border-b border-purple-100">
          Tersedia {cityGroup.stores.length} toko resmi untuk wilayah ini. Klik salah satu tautan marketplace di bawah untuk belanja:
        </p>

        {/* Store Cards */}
        <div className="space-y-3 mt-4">
          {cityGroup.stores.map((store) => (
            <div
              key={store.id}
              className="p-4 rounded-2xl bg-gradient-to-r from-purple-50/60 to-white border border-purple-100/80 hover:border-purple-300 transition-all shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900 text-base">{store.name}</h4>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {store.description}
                  </p>
                </div>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    store.platform === "tiktok"
                      ? "bg-black text-white"
                      : "bg-[#EE4D2D]/10 text-[#EE4D2D]"
                  }`}
                >
                  {store.platformLabel}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-100/50 flex items-center justify-between">
                <span className="text-xs text-purple-700 font-medium flex items-center gap-1">
                  <Store className="w-3.5 h-3.5" />
                  {store.badge || "Cabang Resmi"}
                </span>

                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs hover:shadow-sm transition-all hover:scale-[1.02] ${
                    store.platform === "tiktok"
                      ? "bg-gray-900 hover:bg-black"
                      : "bg-[#EE4D2D] hover:bg-[#d63f21]"
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Buka Toko Resmi</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-3 border-t border-purple-100 flex items-center justify-between text-xs text-gray-500">
          <span>Pengiriman aman &amp; bergaransi</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-purple-700 hover:bg-purple-50 font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
