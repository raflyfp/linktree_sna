"use client";

import React from "react";
import { siteConfig } from "@/data/config";
import { officialStores } from "@/data/stores";
import { X, MessageCircle, AlertCircle, ShoppingBag, ExternalLink } from "lucide-react";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const isConfigured = siteConfig.adminWhatsApp.isAvailable;
  const waUrl = isConfigured
    ? `https://wa.me/${siteConfig.adminWhatsApp.phoneNumber}?text=${encodeURIComponent(
        siteConfig.adminWhatsApp.defaultMessage
      )}`
    : null;

  const pusatShopee = officialStores.find((s) => s.id === "pc-pusat-pasuruan-shopee");
  const pusatTikTok = officialStores.find((s) => s.id === "pc-pusat-pasuruan-tiktok");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wa-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-purple-50 transition-colors"
          aria-label="Tutup dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isConfigured && waUrl ? (
          /* State saat nomor WA sudah diatur */
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 id="wa-modal-title" className="text-xl font-bold text-gray-900">
              Hubungi Admin Pusat via WhatsApp
            </h3>
            <p className="text-sm text-gray-600">
              Konsultasikan produk, ketersediaan stok, dan informasi cabang langsung dengan Customer Service resmi PC Store.
            </p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Mulai Chat Sekarang</span>
              </a>
            </div>
          </div>
        ) : (
          /* State saat nomor WA belum dikonfigurasi (Sesuai Aturan Tahap 1) */
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-[#6D28D9] flex items-center justify-center shrink-0">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
                  Status Kontak
                </span>
                <h3 id="wa-modal-title" className="text-lg font-bold text-gray-900 mt-1">
                  WhatsApp Admin Segera Hadir
                </h3>
              </div>
            </div>

            <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 text-sm text-purple-900/80 leading-relaxed">
              <p>
                Nomor WhatsApp Admin Pusat saat ini sedang dalam proses integrasi resmi. Kami tidak menyediakan tautan simulasi tanpa nomor asli untuk menjaga keamanan dan kenyamanan transaksi Anda.
              </p>
            </div>

            <p className="text-xs text-gray-500 font-medium">
              Untuk pemesanan langsung dengan pengiriman cepat, Anda dapat mengunjungi Marketplace Resmi Pusat kami:
            </p>

            <div className="space-y-2.5">
              {pusatShopee && (
                <a
                  href={pusatShopee.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#EE4D2D]/10 hover:bg-[#EE4D2D]/15 border border-[#EE4D2D]/20 text-[#EE4D2D] font-semibold text-sm transition-all"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Shopee PC Pusat Pasuruan
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {pusatTikTok && (
                <a
                  href={pusatTikTok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-black/5 hover:bg-black/10 border border-gray-200 text-gray-900 font-semibold text-sm transition-all"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    TikTok Shop Pusat Pasuruan
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm transition-colors mt-2"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
