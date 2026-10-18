"use client";

import React from "react";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { BenefitTicker } from "@/components/ui/BenefitTicker";
import { StoresSection } from "@/components/stores/StoresSection";
import { ProductsSection } from "@/components/products/ProductsSection";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ScrollGreetingMascot } from "@/components/ui/ScrollGreetingMascot";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#F5F3FF]">
      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Edge-to-Edge Hero Opening with Animated Video Indonesia Map */}
        <HeroSection />

        {/* 2. Streaming Animated Benefit Ticker Bar */}
        <BenefitTicker />

        {/* 3. Official Marketplace Stores Grid with Filter & Search */}
        <StoresSection />

        {/* 4. Best Seller Products Showcase (Polifix Kemasan Baru, Policrepe, dll) */}
        <ProductsSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Always Visible Floating WhatsApp Button at Bottom Right */}
      <FloatingWhatsApp />

      {/* Interactive Mascot Greeting Animation on Scroll */}
      <ScrollGreetingMascot />
    </div>
  );
}
