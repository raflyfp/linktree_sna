"use client";

import React from "react";

interface PriorityCareLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  withShadow?: boolean;
}

export const PriorityCareLogo: React.FC<PriorityCareLogoProps> = ({
  className = "",
  size = "md",
  withShadow = true,
}) => {
  const sizeConfig = {
    sm: {
      card: "px-3 py-1.5 rounded-xl sm:rounded-2xl",
      navyPill: "px-3 py-1 text-xs",
      redPill: "-bottom-1.5 -right-2 px-2 py-0.5 text-[9px] border-[1.5px]",
    },
    md: {
      card: "px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl sm:rounded-[22px]",
      navyPill: "px-4 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base",
      redPill: "-bottom-2 -right-2.5 sm:-bottom-2.5 sm:-right-3 px-2.5 py-0.5 sm:px-3.5 sm:py-0.5 text-[10px] sm:text-xs border-2",
    },
    lg: {
      card: "px-6 py-3 sm:px-7 sm:py-3.5 rounded-3xl sm:rounded-[26px]",
      navyPill: "px-5 py-2 sm:px-6 sm:py-2.5 text-base sm:text-lg",
      redPill: "-bottom-2.5 -right-3.5 sm:-bottom-3 sm:-right-4 px-3.5 py-1 sm:px-4 sm:py-1 text-xs sm:text-sm border-2",
    },
    xl: {
      card: "px-8 py-4 sm:px-10 sm:py-5 rounded-[28px] sm:rounded-[36px]",
      navyPill: "px-7 py-3 sm:px-8 sm:py-3.5 text-xl sm:text-2xl",
      redPill: "-bottom-3.5 -right-4 sm:-bottom-4 sm:-right-5 px-4.5 py-1.5 sm:px-5 sm:py-1.5 text-sm sm:text-base border-[2.5px]",
    },
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center bg-white ${sizeConfig.card} ${
        withShadow ? "shadow-lg shadow-purple-950/20" : ""
      } border border-purple-100 hover:scale-105 transition-all duration-300 select-none ${className}`}
    >
      <div className="relative inline-flex items-center">
        {/* Navy Capsule Pill: PRIORITY */}
        <div
          className={`bg-[#1E2548] text-white rounded-full ${sizeConfig.navyPill} shadow-inner flex items-center justify-center`}
          style={{ letterSpacing: "0.07em" }}
        >
          <span className="font-black italic tracking-wider leading-none">
            PRIORITY
          </span>
        </div>

        {/* Red Accent Pill: CARE (Overlapping bottom-right exactly like user reference) */}
        <div
          className={`absolute ${sizeConfig.redPill} bg-[#E11D48] text-white rounded-full border-white shadow-md flex items-center justify-center`}
          style={{ letterSpacing: "0.05em" }}
        >
          <span className="font-black italic tracking-wide leading-none">
            CARE
          </span>
        </div>
      </div>
    </div>
  );
};

