"use client";

import React from "react";
import Image from "next/image";

interface ParadeMascot {
  id: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  walkDelay: string;
}

export const BenefitTicker: React.FC = () => {
  // Only 100% clean, pristine, perfectly cropped product mascots (no stray cuts or defects)
  const baseMascots: ParadeMascot[] = [
    {
      id: "polifix-run",
      image: "/images/products/polifix-chibi-running.webp",
      alt: "Polifix Berlari",
      width: 76,
      height: 76,
      walkDelay: "0s",
    },
    {
      id: "poligyp-cheer",
      image: "/images/products/poligyp-chibi-cheer.webp",
      alt: "Poligyp Ceria",
      width: 68,
      height: 72,
      walkDelay: "-0.2s",
    },
    {
      id: "polidine-shield",
      image: "/images/products/polidine-chibi-shield.webp",
      alt: "Polidine Perisai",
      width: 80,
      height: 74,
      walkDelay: "-0.4s",
    },
    {
      id: "caressa-cotton",
      image: "/images/products/caressa-cotton-balls.webp",
      alt: "Caressa Cotton Balls",
      width: 72,
      height: 78,
      walkDelay: "-0.15s",
    },
    {
      id: "polifix-hug",
      image: "/images/products/polifix-chibi-hug.webp",
      alt: "Polifix Peluk Plester",
      width: 78,
      height: 74,
      walkDelay: "-0.35s",
    },
    {
      id: "wound-pad",
      image: "/images/products/wound-dressing-pad.webp",
      alt: "HOS-PAK Dressing Pad",
      width: 74,
      height: 68,
      walkDelay: "-0.5s",
    },
    {
      id: "poligyp-strong",
      image: "/images/products/poligyp-chibi-strong.webp",
      alt: "Poligyp Si Kuat",
      width: 68,
      height: 70,
      walkDelay: "-0.25s",
    },
    {
      id: "polifix-thumbsup",
      image: "/images/products/polifix-chibi-thumbsup.webp",
      alt: "Polifix Jempol",
      width: 82,
      height: 74,
      walkDelay: "-0.45s",
    },
    {
      id: "poligyp-thumbsup",
      image: "/images/products/poligyp-chibi-thumbsup.webp",
      alt: "Poligyp Jempol",
      width: 68,
      height: 72,
      walkDelay: "-0.3s",
    },
  ];

  // Tripled list for Set A and Set B to ensure dense width > 2200px (zero empty gaps on any screen)
  const fullTrack = [...baseMascots, ...baseMascots, ...baseMascots];

  return (
    <div
      aria-label="Parade Karakter Produk PC Store di Atas Awan"
      className="relative w-full overflow-hidden select-none -mt-4 sm:-mt-8 pt-3 pb-0 z-20 pointer-events-auto"
    >
      {/* 1. Seamless Gradient Connector Continuing the Map's Ocean Gradient into Fluffy Clouds */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#5537EA] via-[#3B147D] to-[#2A084E] pointer-events-none" />

      {/* 3. Mascots Walking Closely Together (Dempetan & Zero Blank Gaps) */}
      <div className="relative z-10 pt-2 pb-0 overflow-hidden">
        <div className="animate-marquee flex items-end">
          {/* Track Half A (Continuous, snug, perfectly aligned) */}
          <div className="flex items-end gap-2.5 sm:gap-3.5 pr-2.5 sm:pr-3.5 shrink-0">
            {fullTrack.map((m, idx) => (
              <div
                key={`track-a-${m.id}-${idx}`}
                className="inline-flex flex-col items-center justify-end group transition-transform duration-200 hover:scale-125 hover:z-30 cursor-pointer shrink-0"
              >
                {/* Walking Mascot with Animated Rhythmic Steps */}
                <div
                  className="relative animate-walk transition-transform duration-200 group-hover:animate-wiggle drop-shadow-xl"
                  style={{
                    width: `${m.width}px`,
                    height: `${m.height}px`,
                    animationDelay: m.walkDelay,
                  }}
                >
                  <Image
                    src={m.image}
                    alt={m.alt}
                    fill
                    className="object-contain"
                    priority={idx < 5}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Track Half B (Exact duplicate for 100% seamless infinite looping) */}
          <div className="flex items-end gap-2.5 sm:gap-3.5 pr-2.5 sm:pr-3.5 shrink-0" aria-hidden="true">
            {fullTrack.map((m, idx) => (
              <div
                key={`track-b-${m.id}-${idx}`}
                className="inline-flex flex-col items-center justify-end group transition-transform duration-200 hover:scale-125 hover:z-30 cursor-pointer shrink-0"
              >
                {/* Walking Mascot with Animated Rhythmic Steps */}
                <div
                  className="relative animate-walk transition-transform duration-200 group-hover:animate-wiggle drop-shadow-xl"
                  style={{
                    width: `${m.width}px`,
                    height: `${m.height}px`,
                    animationDelay: m.walkDelay,
                  }}
                >
                  <Image
                    src={m.image}
                    alt={m.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. ALWAYS-VISIBLE, PROMINENT FLUFFY CLOUD BOTTOM BOUNDARY ON ANY SCREEN */}
      <div className="relative w-full z-20 pointer-events-none -mt-4 sm:-mt-6">
        {/* Layered White Cloud Scallop Boundary with Symmetrical Waves & Contour */}
        <div className="relative w-full h-16 sm:h-20 flex flex-col justify-end">
          <svg
            className="w-full h-16 sm:h-20 drop-shadow-md overflow-visible"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Soft cloud gradient melting seamlessly into page background */}
              <linearGradient id="cloudFloorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F5F3FF" />
              </linearGradient>

              {/* Shadow Cushion Gradient */}
              <linearGradient id="cloudShadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Back Cloud Shadow Cushion (Offset Puffs) */}
            <path
              d="M0,38 C90,12 180,12 270,38 C360,12 450,12 540,38 C630,12 720,12 810,38 C900,12 990,12 1080,38 C1170,12 1260,12 1350,38 C1395,20 1420,30 1440,38 L1440,80 L0,80 Z"
              fill="url(#cloudShadowGrad)"
            />

            {/* Mid Cloud Fluff */}
            <path
              d="M0,45 C50,22 130,22 180,42 C230,22 310,22 360,42 C410,22 490,22 540,42 C590,22 670,22 720,42 C770,22 850,22 900,42 C950,22 1030,22 1080,42 C1130,22 1210,22 1260,42 C1310,22 1390,22 1440,42 L1440,80 L0,80 Z"
              fill="#EDE9FE"
              opacity="0.85"
            />

            {/* Main Front Crisp Fluffy Cloud Floor (Seamlessly Fades into Section Background) */}
            <path
              d="M0,48 C45,26 135,26 180,46 C225,26 315,26 360,46 C405,26 495,26 540,46 C585,26 675,26 720,46 C765,26 855,26 900,46 C945,26 1035,26 1080,46 C1125,26 1215,26 1260,46 C1305,26 1395,26 1440,46 L1440,80 L0,80 Z"
              fill="url(#cloudFloorGrad)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

