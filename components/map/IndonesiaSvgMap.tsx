"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { useSiteData } from "@/context/DataContext";
import { MapCityGroup } from "@/types/store";
import { Navigation, ExternalLink, ShoppingBag, X, MapPin } from "lucide-react";

export interface ComputedBadgeLayout {
  direction: "top" | "bottom" | "right" | "left" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
  dx: number;
  dy: number;
  pillWidth: number;
  pillHeight: number;
  stemStartX?: number;
  stemStartY?: number;
  stemEndX?: number;
  stemEndY?: number;
}

/**
 * Algoritma cerdas penghindaran tabrakan posisi badge pada peta (Anti-Collision Layout).
 * Menghitung arah optimal badge (atas, kanan, bawah, kiri) agar tidak saling menumpuk
 * dan tidak menutupi pin kota lain yang berdekatan (seperti Surabaya, Pasuruan, dan Malang).
 */
function computeCityLayouts(groups: MapCityGroup[]): Record<string, ComputedBadgeLayout> {
  const result: Record<string, ComputedBadgeLayout> = {};
  const placedBadges: Array<{ left: number; right: number; top: number; bottom: number }> = [];

  const pins = groups.map((g) => ({
    id: g.cityId,
    x: (g.coordinates.x / 100) * 1000,
    y: (g.coordinates.y / 100) * 400,
  }));

  groups.forEach((group) => {
    const px = (group.coordinates.x / 100) * 1000;
    const py = (group.coordinates.y / 100) * 400;
    const pillWidth = Math.max(52, group.cityName.length * 7 + 16);
    const pillHeight = 18;
    const halfW = pillWidth / 2;
    const halfH = pillHeight / 2;

    const candidates: Array<{
      direction: ComputedBadgeLayout["direction"];
      dx: number;
      dy: number;
      box: { left: number; right: number; top: number; bottom: number };
      stemStartX?: number;
      stemStartY?: number;
      stemEndX?: number;
      stemEndY?: number;
    }> = [
        // 1. TOP (standar langsung tepat di atas kepala pin)
        {
          direction: "top",
          dx: 0,
          dy: -42,
          box: { left: px - halfW, right: px + halfW, top: py - 42 - halfH, bottom: py - 42 + halfH },
        },
        // 2. RIGHT (ke arah kanan dengan garis penunjuk horizontal, cocok untuk Pasuruan)
        {
          direction: "right",
          dx: halfW + 16,
          dy: -14,
          box: { left: px + 16, right: px + 16 + pillWidth, top: py - 14 - halfH, bottom: py - 14 + halfH },
          stemStartX: 6,
          stemStartY: -14,
          stemEndX: 16,
          stemEndY: -14,
        },
        // 3. BOTTOM (ke arah bawah pin, cocok untuk kota di pesisir selatan seperti Malang & Bandung)
        {
          direction: "bottom",
          dx: 0,
          dy: 22,
          box: { left: px - halfW, right: px + halfW, top: py + 22 - halfH, bottom: py + 22 + halfH },
          stemStartX: 0,
          stemStartY: 2,
          stemEndX: 0,
          stemEndY: 13,
        },
        // 4. LEFT (ke arah kiri)
        {
          direction: "left",
          dx: -halfW - 16,
          dy: -14,
          box: { left: px - 16 - pillWidth, right: px - 16, top: py - 14 - halfH, bottom: py - 14 + halfH },
          stemStartX: -6,
          stemStartY: -14,
          stemEndX: -16,
          stemEndY: -14,
        },
        // 5. BOTTOM-RIGHT
        {
          direction: "bottom-right",
          dx: halfW + 10,
          dy: 18,
          box: { left: px + 10, right: px + 10 + pillWidth, top: py + 18 - halfH, bottom: py + 18 + halfH },
          stemStartX: 4,
          stemStartY: 2,
          stemEndX: 10,
          stemEndY: 12,
        },
        // 6. BOTTOM-LEFT
        {
          direction: "bottom-left",
          dx: -halfW - 10,
          dy: 18,
          box: { left: px - 10 - pillWidth, right: px - 10, top: py + 18 - halfH, bottom: py + 18 + halfH },
          stemStartX: -4,
          stemStartY: 2,
          stemEndX: -10,
          stemEndY: 12,
        },
        // 7. TOP-RIGHT
        {
          direction: "top-right",
          dx: halfW + 10,
          dy: -36,
          box: { left: px + 10, right: px + 10 + pillWidth, top: py - 36 - halfH, bottom: py - 36 + halfH },
          stemStartX: 4,
          stemStartY: -20,
          stemEndX: 10,
          stemEndY: -30,
        },
        // 8. TOP-LEFT
        {
          direction: "top-left",
          dx: -halfW - 10,
          dy: -36,
          box: { left: px - 10 - pillWidth, right: px - 10, top: py - 36 - halfH, bottom: py - 36 + halfH },
          stemStartX: -4,
          stemStartY: -20,
          stemEndX: -10,
          stemEndY: -30,
        },
      ];

    let bestCandidate = candidates[0];
    let minScore = Infinity;

    for (const cand of candidates) {
      let score = 0;

      // Cek batas kanvas peta
      if (cand.box.left < 5 || cand.box.right > 995 || cand.box.top < 5 || cand.box.bottom > 395) {
        score += 100;
      }

      // Cek konflik arah dengan pin kota tetangga yang berdekatan
      for (const other of pins) {
        if (other.id === group.cityId) continue;
        const diffX = other.x - px;
        const diffY = other.y - py;

        // Jika ada kota lain tepat di atas atau di bawahnya (< 35px horizontal)
        if (Math.abs(diffX) < 35) {
          // Ada kota tepat di utara/atas -> jangan taruh badge di atas
          if (diffY < 0 && diffY > -45 && cand.direction.includes("top")) {
            score += 50;
          }
          // Ada kota tepat di selatan/bawah -> jangan taruh badge di bawah
          if (diffY > 0 && diffY < 45 && cand.direction.includes("bottom")) {
            score += 50;
          }
        }

        // Jika ada kota lain di sampingnya (< 30px vertikal)
        if (Math.abs(diffY) < 30) {
          if (diffX > 0 && diffX < 60 && cand.direction.includes("right")) {
            score += 50;
          }
          if (diffX < 0 && diffX > -60 && cand.direction.includes("left")) {
            score += 50;
          }
        }

        // Jangan sampai badge menutupi kepala pin kota lain
        const pinHeadLeft = other.x - 16;
        const pinHeadRight = other.x + 16;
        const pinHeadTop = other.y - 38;
        const pinHeadBottom = other.y + 2;

        if (
          cand.box.left < pinHeadRight &&
          cand.box.right > pinHeadLeft &&
          cand.box.top < pinHeadBottom &&
          cand.box.bottom > pinHeadTop
        ) {
          score += 60;
        }
      }

      // Cek overlap dengan badge kota yang sudah ditempatkan sebelumnya
      for (const placed of placedBadges) {
        const pad = 6;
        if (
          cand.box.left < placed.right + pad &&
          cand.box.right > placed.left - pad &&
          cand.box.top < placed.bottom + pad &&
          cand.box.bottom > placed.top - pad
        ) {
          score += 70;
        }
      }

      if (score === 0) {
        bestCandidate = cand;
        break;
      } else if (score < minScore) {
        minScore = score;
        bestCandidate = cand;
      }
    }

    placedBadges.push(bestCandidate.box);
    result[group.cityId] = {
      direction: bestCandidate.direction,
      dx: bestCandidate.dx,
      dy: bestCandidate.dy,
      pillWidth,
      pillHeight,
      stemStartX: bestCandidate.stemStartX,
      stemStartY: bestCandidate.stemStartY,
      stemEndX: bestCandidate.stemEndX,
      stemEndY: bestCandidate.stemEndY,
    };
  });

  return result;
}

interface IndonesiaSvgMapProps {
  activeCityId?: string | null;
  onSelectCity?: (city: MapCityGroup) => void;
}

export const IndonesiaSvgMap: React.FC<IndonesiaSvgMapProps> = () => {
  const { cityGroups } = useSiteData();
  const [hoveredCity, setHoveredCity] = useState<MapCityGroup | null>(null);
  const [activeMultiCity, setActiveMultiCity] = useState<MapCityGroup | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasSwiped, setHasSwiped] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic collision-free badge layout calculation
  const dynamicLayouts = useMemo(() => computeCityLayouts(cityGroups), [cityGroups]);

  // Deteksi perangkat mobile/sentuh secara akurat agar petunjuk geser hanya muncul di HP
  useEffect(() => {
    const checkMobile = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isSmall = window.innerWidth < 640;
      setIsMobile(isSmall || (isTouch && window.innerWidth < 768));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-scroll on mobile to center Java & Kalimantan pins on initial load
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const clientWidth = scrollContainerRef.current.clientWidth;
      if (scrollWidth > clientWidth) {
        // Center around Java (approx 35% of total width)
        scrollContainerRef.current.scrollLeft = Math.max(0, scrollWidth * 0.22);
      }
    }
  }, []);

  const handleCityClick = (group: MapCityGroup) => {
    // If city has 1 store, throw DIRECTLY to marketplace without modal!
    if (group.stores.length === 1) {
      window.open(group.stores[0].url, "_blank", "noopener,noreferrer");
      return;
    }

    // If multi-store (Pasuruan), toggle quick launcher
    if (activeMultiCity?.cityId === group.cityId) {
      setActiveMultiCity(null);
    } else {
      setActiveMultiCity(group);
    }
  };

  return (
    <div className="relative w-full select-none">
      {/* Mobile-Friendly Quick City Chips (Clean city names, dynamic Pusat badge) */}
      <div className="md:hidden px-4 py-2 bg-transparent flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-black uppercase text-amber-300 shrink-0 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          Marketplace:
        </span>
        {cityGroups.map((city) => {
          const isPusat = city.stores.some((s) => s.isPusat);
          return (
            <button
              key={city.cityId}
              onClick={() => handleCityClick(city)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-transform active:scale-95 flex items-center gap-1 ${isPusat
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 shadow-sm shadow-amber-500/20"
                : "bg-white/15 text-white hover:bg-white/25 border border-white/15"
                }`}
            >
              <span>{isPusat ? `⭐ ${city.cityName}` : city.cityName}</span>
            </button>
          );
        })}
      </div>

      {/* Map Display Area with Screen-Fixed Overlay Hints */}
      <div className="relative w-full overflow-hidden">
        {/* Floating Guide Hints (Stays fixed to screen, NEVER cut off by horizontal scrolling) */}
        <div className="pointer-events-none absolute top-3 inset-x-3 sm:top-5 sm:inset-x-6 z-20 flex items-center justify-between gap-2">
          {/* Main instruction badge */}
          {/* <div className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md text-[11px] sm:text-xs font-bold text-[#4C1D95] border border-purple-200 pointer-events-auto shrink-0 max-w-[80%] sm:max-w-none">
            <Navigation className="w-3.5 h-3.5 text-[#8B5CF6] animate-pulse shrink-0" />
            <span className="truncate sm:whitespace-normal">
              <span className="hidden sm:inline">Klik pin di peta untuk membuka marketplace resmi</span>
              <span className="sm:hidden">Klik pin untuk Buka</span>
            </span>
          </div> */}

          {/* Swipe Hint strictly only for Mobile touch devices and before user scrolls */}
          {isMobile && !hasSwiped && (
            <div className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-purple-900/90 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-purple-600/50 shadow-md animate-pulse shrink-0 pointer-events-auto">
              <span>👉 Geser Peta</span>
            </div>
          )}
        </div>

        {/* Swipeable Map Container for Mobile & Full Scaled Map on Desktop */}
        <div
          ref={scrollContainerRef}
          onScroll={() => setHasSwiped(true)}
          className="w-full overflow-x-auto scrollbar-none touch-pan-x"
        >
          <div className="relative min-w-[760px] md:min-w-full aspect-[2.5/1] w-full">
            {/* 1. Underlying Crisp Cartoon Map of Indonesia (100% Clean, No Dark Overlay) */}
            <Image
              src="/images/indonesia-cartoon-map.png"
              alt="Peta Kartun Indonesia PC Store"
              fill
              priority
              sizes="(max-width: 768px) 760px, 100vw"
              className="w-full h-full object-fill pointer-events-none"
            />

            {/* 2. Scalable SVG Overlay (viewBox 0 0 1000 400 exactly matches 2.5:1 image aspect) */}
            <svg
              viewBox="0 0 1000 400"
              className="absolute inset-0 w-full h-full pointer-events-auto outline-none focus:outline-none select-none"
              style={{ outline: "none", WebkitTapHighlightColor: "transparent" }}
              preserveAspectRatio="none"
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

              {/* Interactive City Pins with Dynamic Anti-Collision Placement */}
              {cityGroups.map((group) => {
                const posX = (group.coordinates.x / 100) * 1000;
                const posY = (group.coordinates.y / 100) * 400;
                const isHovered = hoveredCity?.cityId === group.cityId;
                const isSelected = activeMultiCity?.cityId === group.cityId;
                const isPusat = group.stores.some((s) => s.isPusat);

                // Fetch dynamic layout config computed by collision detector
                const layout = dynamicLayouts[group.cityId] || {
                  direction: "top" as const,
                  dx: 0,
                  dy: -42,
                  pillWidth: Math.max(52, group.cityName.length * 7 + 16),
                  pillHeight: 18,
                };

                const pillHalfW = layout.pillWidth / 2;
                const pillHalfH = layout.pillHeight / 2;

                return (
                  <g
                    key={group.cityId}
                    transform={`translate(${posX}, ${posY})`}
                    className="cursor-pointer transition-transform duration-200 outline-none focus:outline-none focus-visible:outline-none select-none"
                    style={{ outline: "none", WebkitTapHighlightColor: "transparent" }}
                    onClick={() => handleCityClick(group)}
                    onMouseEnter={() => setHoveredCity(group)}
                    onMouseLeave={() => setHoveredCity(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Buka marketplace ${group.cityName}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCityClick(group);
                      }
                    }}
                  >
                    {/* Connecting Leader Line (Stem) when offset to prevent collision */}
                    {layout.stemStartX !== undefined && layout.stemEndX !== undefined && (
                      <line
                        x1={layout.stemStartX}
                        y1={layout.stemStartY ?? 0}
                        x2={layout.stemEndX}
                        y2={layout.stemEndY ?? 0}
                        stroke={isPusat ? "#F59E0B" : "#C4B5FD"}
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                        opacity={isHovered || isSelected ? 1 : 0.85}
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

                    {/* Anti-Collision Label Pill with Indicator Pointer */}
                    <g
                      transform={`translate(${layout.dx}, ${layout.dy}) scale(${isHovered || isSelected ? 1.08 : 1})`}
                      style={{ transition: "transform 0.2s ease-out" }}
                    >
                      {/* Speech bubble down arrow when placed on top */}
                      {layout.direction === "top" && (
                        <polygon
                          points="-3.5,8 3.5,8 0,12"
                          fill={isPusat ? "#451A03" : "#2E1065"}
                          stroke={isPusat ? "#F59E0B" : "#C4B5FD"}
                          strokeWidth="1"
                        />
                      )}

                      {/* Speech bubble up arrow when placed at bottom */}
                      {layout.direction === "bottom" && (
                        <polygon
                          points="-3.5,-8 3.5,-8 0,-12"
                          fill={isPusat ? "#451A03" : "#2E1065"}
                          stroke={isPusat ? "#F59E0B" : "#C4B5FD"}
                          strokeWidth="1"
                        />
                      )}

                      <rect
                        x={-pillHalfW}
                        y={-pillHalfH}
                        width={layout.pillWidth}
                        height={layout.pillHeight}
                        rx={pillHalfH}
                        fill={isPusat ? "#451A03" : "#2E1065"}
                        stroke={isPusat ? "#F59E0B" : "#C4B5FD"}
                        strokeWidth="1.5"
                        filter="url(#pinShadow)"
                      />
                      <text
                        x="0"
                        y="3"
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
          </div>
        </div>
      </div>

      {/* 4. Responsive Modal Launcher for Multi-Store Cities (Pasuruan) */}
      {activeMultiCity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-2 border-purple-300 relative text-gray-900 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-purple-100">
              <span className="text-base font-black text-[#4C1D95]">
                {activeMultiCity.cityName}
              </span>
              <button
                onClick={() => setActiveMultiCity(null)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-purple-50 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-4 font-medium">
              Pilih marketplace resmi pusat yang ingin Anda tuju:
            </p>

            <div className="space-y-2.5">
              {activeMultiCity.stores.map((store) => (
                <a
                  key={store.id}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setActiveMultiCity(null)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold text-white shadow-xs transition-transform hover:scale-[1.02] ${store.platform === "tiktok"
                    ? "bg-black hover:bg-gray-900"
                    : "bg-[#EE4D2D] hover:bg-[#d63f21]"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    {store.platformLabel} ({store.name})
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
