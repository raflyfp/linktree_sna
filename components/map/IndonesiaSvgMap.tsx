"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cityGroups } from "@/data/stores";
import { MapCityGroup } from "@/types/store";
import { Navigation, ExternalLink, ShoppingBag, X } from "lucide-react";

interface CityLayoutConfig {
  labelOffsetX: number;
  labelOffsetY: number;
  pillWidth: number;
  pillHeight: number;
  hasStem?: boolean;
  stemStartX?: number;
  stemStartY?: number;
  stemEndX?: number;
  stemEndY?: number;
}

const cityLayouts: Record<string, CityLayoutConfig> = {
  jakarta: {
    labelOffsetX: -14,
    labelOffsetY: -35,
    pillWidth: 62,
    pillHeight: 20,
    hasStem: true,
    stemStartX: 0,
    stemStartY: -18,
    stemEndX: -14,
    stemEndY: -25,
  },
  bandung: {
    labelOffsetX: 16,
    labelOffsetY: 24,
    pillWidth: 68,
    pillHeight: 20,
    hasStem: true,
    stemStartX: 0,
    stemStartY: 0,
    stemEndX: 12,
    stemEndY: 14,
  },
  surabaya: {
    labelOffsetX: -12,
    labelOffsetY: -35,
    pillWidth: 70,
    pillHeight: 20,
    hasStem: true,
    stemStartX: 0,
    stemStartY: -18,
    stemEndX: -10,
    stemEndY: -25,
  },
  pasuruan: {
    labelOffsetX: 56,
    labelOffsetY: -6,
    pillWidth: 94,
    pillHeight: 21,
    hasStem: true,
    stemStartX: 0,
    stemStartY: -8,
    stemEndX: 16,
    stemEndY: -6,
  },
  malang: {
    labelOffsetX: 0,
    labelOffsetY: 24,
    pillWidth: 62,
    pillHeight: 20,
    hasStem: true,
    stemStartX: 0,
    stemStartY: 0,
    stemEndX: 0,
    stemEndY: 14,
  },
  tarakan: {
    labelOffsetX: 0,
    labelOffsetY: -35,
    pillWidth: 64,
    pillHeight: 20,
    hasStem: true,
    stemStartX: 0,
    stemStartY: -18,
    stemEndX: 0,
    stemEndY: -25,
  },
};

interface IndonesiaSvgMapProps {
  activeCityId?: string | null;
  onSelectCity?: (city: MapCityGroup) => void;
}

export const IndonesiaSvgMap: React.FC<IndonesiaSvgMapProps> = () => {
  const [hoveredCity, setHoveredCity] = useState<MapCityGroup | null>(null);
  const [activeMultiCity, setActiveMultiCity] = useState<MapCityGroup | null>(null);

  const handleCityClick = (group: MapCityGroup) => {
    // If city has 1 store, throw DIRECTLY to marketplace without modal!
    if (group.stores.length === 1) {
      window.open(group.stores[0].url, "_blank", "noopener,noreferrer");
      return;
    }

    // If multi-store (Pasuruan), toggle quick 2-button launcher
    if (activeMultiCity?.cityId === group.cityId) {
      setActiveMultiCity(null);
    } else {
      setActiveMultiCity(group);
    }
  };

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* 1. Underlying Crisp Cartoon Map of Indonesia */}
      <div className="relative w-full aspect-[2.5/1] min-h-[300px] sm:min-h-[440px] lg:min-h-[580px]">
        <Image
          src="/images/indonesia-cartoon-map.png"
          alt="Peta Kartun Indonesia PC Store"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Soft edge-blending gradients */}
        <div className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-[#3B0764] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-36 bg-gradient-to-t from-[#EDE9FE] via-[#EDE9FE]/40 to-transparent pointer-events-none" />

        {/* 2. Scalable SVG Overlay (viewBox 0 0 1000 400 matches 2.5:1 image aspect) */}
        <svg
          viewBox="0 0 1000 400"
          className="absolute inset-0 w-full h-full pointer-events-auto"
          preserveAspectRatio="xMidYMid meet"
          role="region"
          aria-label="Peta Interaktif Cabang PC Store Indonesia"
        >
          <defs>
            <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#3B0764" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* Floating Subtle Clouds */}
          <g className="animate-cloud-drift opacity-80 pointer-events-none" transform="translate(100, 25)">
            <path
              d="M 10 22 Q 10 8 24 8 Q 32 0 46 8 Q 58 0 68 8 Q 80 8 80 22 Q 80 30 68 30 L 18 30 Q 10 30 10 22 Z"
              fill="white"
            />
          </g>

          <g className="animate-cloud-drift opacity-70 pointer-events-none" transform="translate(760, 30)" style={{ animationDelay: "-7s" }}>
            <path
              d="M 10 22 Q 10 8 24 8 Q 32 0 46 8 Q 58 0 68 8 Q 80 8 80 22 Q 80 30 68 30 L 18 30 Q 10 30 10 22 Z"
              fill="white"
            />
          </g>

          {/* Interactive City Pins with Anti-Collision Staggering */}
          {cityGroups.map((group) => {
            const posX = (group.coordinates.x / 100) * 1000;
            const posY = (group.coordinates.y / 100) * 400;
            const isHovered = hoveredCity?.cityId === group.cityId;
            const isSelected = activeMultiCity?.cityId === group.cityId;
            const isPusat = group.stores.some((s) => s.isPusat);
            const layout = cityLayouts[group.cityId] || {
              labelOffsetX: 0,
              labelOffsetY: -35,
              pillWidth: 70,
              pillHeight: 20,
            };

            const pillHalfW = layout.pillWidth / 2;
            const pillHalfH = layout.pillHeight / 2;

            return (
              <g
                key={group.cityId}
                transform={`translate(${posX}, ${posY})`}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => handleCityClick(group)}
                onMouseEnter={() => setHoveredCity(group)}
                onMouseLeave={() => setHoveredCity(null)}
                role="button"
                tabIndex={0}
                aria-label={`Buka marketplace cabang ${group.cityName}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCityClick(group);
                  }
                }}
              >
                {/* Connecting Leader Line (Stem) to prevent clutter */}
                {layout.hasStem && (
                  <line
                    x1={layout.stemStartX || 0}
                    y1={layout.stemStartY || 0}
                    x2={layout.stemEndX || layout.labelOffsetX}
                    y2={layout.stemEndY || layout.labelOffsetY}
                    stroke={isPusat ? "#F59E0B" : "#DDD6FE"}
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    opacity={isHovered || isSelected ? 1 : 0.75}
                  />
                )}

                {/* Pulsing Beacon Ring */}
                <circle
                  cx="0"
                  cy="0"
                  r={isHovered || isSelected ? "18" : "12"}
                  fill="none"
                  stroke={isPusat ? "#F59E0B" : "#DDD6FE"}
                  strokeWidth="2"
                  opacity="0.85"
                  className="animate-ping"
                  style={{ transformOrigin: "0px 0px", animationDuration: "2.4s" }}
                />

                {/* Ground Ellipse */}
                <ellipse
                  cx="0"
                  cy="2"
                  rx={isHovered || isSelected ? "9" : "7"}
                  ry={isHovered || isSelected ? "4" : "3"}
                  fill={isPusat ? "#FEF3C7" : "#EDE9FE"}
                  opacity="0.9"
                />

                {/* Pin Head Graphic */}
                <g
                  transform={`translate(0, -16) scale(${isHovered || isSelected ? 1.2 : 1})`}
                  filter="url(#pinShadow)"
                  style={{ transformOrigin: "0px 16px", transition: "transform 0.2s ease-out" }}
                >
                  <path
                    d="M 0 -20 C -9 -20 -14 -12 -14 -5 C -14 4 0 16 0 16 C 0 16 14 4 14 -5 C 14 -12 9 -20 0 -20 Z"
                    fill={isPusat ? "#B45309" : "#6D28D9"}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="-7" r="4.5" fill="white" />
                  {isPusat && <circle cx="0" cy="-7" r="2.2" fill="#F59E0B" />}
                </g>

                {/* Anti-Collision Staggered Label Pill */}
                <g
                  transform={`translate(${layout.labelOffsetX}, ${layout.labelOffsetY}) scale(${
                    isHovered || isSelected ? 1.08 : 1
                  })`}
                  style={{ transition: "transform 0.2s ease-out" }}
                >
                  <rect
                    x={-pillHalfW}
                    y={-pillHalfH}
                    width={layout.pillWidth}
                    height={layout.pillHeight}
                    rx={layout.pillHeight / 2}
                    fill={isPusat ? "#451A03" : "#2E1065"}
                    stroke={isPusat ? "#F59E0B" : "#C4B5FD"}
                    strokeWidth="1.5"
                    filter="url(#pinShadow)"
                  />
                  <text
                    x="0"
                    y="3.5"
                    fill="white"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="system-ui, sans-serif"
                    letterSpacing="0.2"
                  >
                    {group.cityName}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* 3. Direct Fast Launcher Popover for Multi-Store (Pasuruan) */}
        {activeMultiCity && (
          <div
            className="absolute z-30 p-3 sm:p-4 rounded-3xl bg-white shadow-2xl border-2 border-purple-300 max-w-[280px] sm:max-w-xs animate-in zoom-in-95 duration-150"
            style={{
              left: `${Math.min(75, Math.max(20, activeMultiCity.coordinates.x))}%`,
              top: `${Math.min(70, Math.max(30, activeMultiCity.coordinates.y - 12))}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-purple-100">
              <span className="text-xs font-black text-[#4C1D95]">
                {activeMultiCity.cityName}
              </span>
              <button
                onClick={() => setActiveMultiCity(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-purple-50"
                aria-label="Tutup"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-gray-500 mb-2.5 font-medium">
              Pilih marketplace resmi untuk langsung membuka toko:
            </p>

            <div className="space-y-2">
              {activeMultiCity.stores.map((store) => (
                <a
                  key={store.id}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-transform hover:scale-[1.02] ${
                    store.platform === "tiktok"
                      ? "bg-black hover:bg-gray-900"
                      : "bg-[#EE4D2D] hover:bg-[#d63f21]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {store.platformLabel}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 4. Top Guide Hint */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md text-xs font-bold text-[#4C1D95] border border-purple-200">
          <Navigation className="w-3.5 h-3.5 text-[#8B5CF6] animate-pulse" />
          <span>Klik pin di peta untuk langsung menuju marketplace resmi</span>
        </div>
      </div>
    </div>
  );
};
