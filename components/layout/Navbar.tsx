"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/config";
import { Menu, X, MessageCircle, MapPin } from "lucide-react";

interface NavbarProps {
  onOpenWhatsAppModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWhatsAppModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-purple-400 rounded-xl p-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6D28D9] via-[#8B5CF6] to-[#A78BFA] flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl tracking-tight">PC</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-[#4C1D95] tracking-tight leading-none">
                PC STORE
              </span>
              <span className="text-xs text-purple-600/80 font-medium mt-1">
                Official Healthcare &amp; Care
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-[#6D28D9] hover:bg-purple-50/80 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#map-section"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#6D28D9] bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all hover:shadow-xs"
            >
              <MapPin className="w-4 h-4 text-[#8B5CF6]" />
              <span>Cari Cabang</span>
            </a>

            <button
              onClick={onOpenWhatsAppModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#5B21B6] hover:to-[#7C3AED] shadow-sm shadow-purple-500/25 hover:shadow-md hover:shadow-purple-500/30 transition-all hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Admin</span>
              {!siteConfig.adminWhatsApp.isAvailable && (
                <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded-full font-medium">
                  Info
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-[#6D28D9] focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-purple-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-800 hover:bg-purple-50 hover:text-[#6D28D9]"
            >
              {item.label}
            </a>
          ))}

          <div className="pt-2 border-t border-purple-100 space-y-2">
            <a
              href="#map-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-[#6D28D9] bg-purple-50 border border-purple-200"
            >
              <MapPin className="w-4 h-4" />
              <span>Jelajahi Peta Cabang</span>
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenWhatsAppModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Admin Pusat</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
