"use client";

import React, { useState } from "react";
import { IndonesiaSvgMap } from "./IndonesiaSvgMap";
import { BranchModal } from "./BranchModal";
import { cityGroups, officialStores } from "@/data/stores";
import { MapCityGroup } from "@/types/store";
import { MapPin, ExternalLink, Info } from "lucide-react";

export const MapSection: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<MapCityGroup | null>(null);

  return (
    <section id="map-section" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold uppercase tracking-wider text-[#6D28D9]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Jaringan Toko &amp; Distribusi Resmi</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4C1D95] tracking-tight">
            Jelajahi Layanan Kami
          </h2>

          <p className="text-base sm:text-lg text-gray-600 font-medium">
            Klik pada lokasi di peta untuk mengakses link terkait.
          </p>
        </div>

        {/* Interactive Map Component Container */}
        <div className="relative">
          <IndonesiaSvgMap
            activeCityId={selectedCity?.cityId || null}
            onSelectCity={(city) => setSelectedCity(city)}
          />

          {/* Architecture Note for Future Extension */}
          <div className="mt-4 flex items-center justify-between text-xs text-purple-700/70 bg-purple-50/60 rounded-xl px-4 py-2.5 border border-purple-100">
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#8B5CF6] shrink-0" />
              <span>
                <strong>Info Arsitektur:</strong> Data lokasi terpisah di <code>data/stores.ts</code> dengan koordinat SVG responsif. Siap untuk integrasi admin picker lokasi di Tahap 2.
              </span>
            </span>
            <span className="hidden sm:inline-block text-[11px] font-semibold text-purple-600">
              {officialStores.length} Toko Terdaftar
            </span>
          </div>
        </div>

        {/* Alternative Branch List (For Mobile Users & Accessibility) */}
        <div className="mt-14 pt-10 border-t border-purple-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#4C1D95]">
                Daftar Cabang &amp; Kota Terlayani
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Akses cepat semua cabang tanpa harus menavigasi peta:
              </p>
            </div>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full self-start sm:self-auto">
              Total {cityGroups.length} Wilayah Utama
            </span>
          </div>

          {/* City Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cityGroups.map((group) => {
              const isPusat = group.stores.some((s) => s.isPusat);
              return (
                <div
                  key={group.cityId}
                  className="p-5 rounded-2xl bg-purple-50/40 hover:bg-purple-50 border border-purple-100/90 hover:border-purple-300 transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                            isPusat
                              ? "bg-amber-100 text-amber-800"
                              : "bg-purple-100 text-[#6D28D9]"
                          }`}
                        >
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-base">{group.cityName}</h4>
                          <span className="text-xs text-gray-500">{group.province}</span>
                        </div>
                      </div>

                      {isPusat && (
                        <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          Pusat
                        </span>
                      )}
                    </div>

                    <div className="mt-4 space-y-2">
                      {group.stores.map((store) => (
                        <a
                          key={store.id}
                          href={store.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-purple-100/50 border border-purple-100 text-xs font-medium text-gray-800 transition-colors group"
                        >
                          <span className="flex items-center gap-2 truncate pr-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                store.platform === "tiktok" ? "bg-black" : "bg-[#EE4D2D]"
                              }`}
                            />
                            <span className="truncate">{store.name}</span>
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#6D28D9] shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCity(group)}
                    className="mt-4 w-full py-2 rounded-xl text-xs font-bold text-[#6D28D9] bg-white border border-purple-200 hover:bg-purple-100/80 transition-colors"
                  >
                    Buka Detail Cabang ({group.stores.length} Toko)
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal Popup for Selected Branch */}
      <BranchModal
        cityGroup={selectedCity}
        onClose={() => setSelectedCity(null)}
      />
    </section>
  );
};
