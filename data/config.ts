/**
 * Site Configuration
 * 
 * Pengaturan terpusat untuk PC Store website.
 * Nomor WhatsApp sengaja dikosongkan (placeholder) hingga kontak resmi disediakan.
 */

export interface SiteConfig {
  brandName: string;
  tagline: string;
  description: string;
  adminWhatsApp: {
    phoneNumber: string; // Kosongkan string jika belum tersedia (contoh: "6281234567890")
    defaultMessage: string;
    isAvailable: boolean;
  };
  navigation: {
    label: string;
    href: string;
  }[];
  socials: {
    instagram?: string;
    tiktok?: string;
    shopeePusat?: string;
  };
}

export const siteConfig: SiteConfig = {
  brandName: "PC Store",
  tagline: "Pusat Solusi Perawatan & Produk Medis Terpercaya",
  description:
    "Official store jaringan cabang PC Store di seluruh Indonesia. Temukan produk perawatan berkualitas dan akses langsung ke toko marketplace resmi kami.",
  adminWhatsApp: {
    // Biarkan string kosong "" jika belum ada nomor resmi.
    // Jika nanti nomor resmi sudah ada, isi dengan format internasional tanpa tanda + (contoh: "628xxxxxxxxxx")
    phoneNumber: "",
    defaultMessage: "Halo Admin PC Store, saya ingin bertanya seputar ketersediaan produk dan cabang.",
    get isAvailable(): boolean {
      return this.phoneNumber.trim().length > 0;
    },
  },
  navigation: [
    { label: "Beranda", href: "#hero" },
    { label: "Peta & Cabang", href: "#map-section" },
    { label: "Daftar Toko", href: "#stores-section" },
    { label: "Produk Best Seller", href: "#products-section" },
  ],
  socials: {
    instagram: "",
    tiktok: "https://tk.tokopedia.com/ZSq6yuf9J/",
    shopeePusat: "https://s.shopee.co.id/7VGCzchHR7",
  },
};
