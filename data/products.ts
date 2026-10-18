import { Product } from "@/types/product";

/**
 * Data Produk Best Seller & Unggulan
 * 
 * Sesuai panduan Tahap 1:
 * - Menampilkan "Polifix kemasan baru" dan "Policrepe" sebagai produk utama
 * - Produk lainnya diberi tanda placeholder yang jelas
 * - Menghindari klaim medis atau spesifikasi berlebihan yang belum resmi
 */

export const bestSellerProducts: Product[] = [
  {
    id: "prod-polifix-new",
    name: "Polifix (Kemasan Baru)",
    slug: "polifix-kemasan-baru",
    category: "Pembalut & Fiksasi Medis",
    shortDescription:
      "Plester fiksasi penutup luka dengan formula perekat ramah kulit dan daya rekat optimal untuk kenyamanan pemakaian sehari-hari.",
    isBestSeller: true,
    badge: "Kemasan Baru",
    imageUrl: "/images/products/polifix-kemasan-baru.svg",
    isPlaceholder: false,
    targetBranchId: "pc-pusat-pasuruan-shopee",
  },
  {
    id: "prod-policrepe",
    name: "Policrepe",
    slug: "policrepe",
    category: "Perban Elastis & Fiksasi",
    shortDescription:
      "Perban elastis berkualitas tinggi dengan elastisitas seimbang, memberikan tekanan merata serta fleksibilitas gerak yang optimal.",
    isBestSeller: true,
    badge: "Best Seller",
    imageUrl: "/images/products/policrepe.svg",
    isPlaceholder: false,
    targetBranchId: "pc-pusat-pasuruan-shopee",
  },
  {
    id: "prod-placeholder-1",
    name: "Plester Kasa Steril PC",
    slug: "plester-kasa-steril-pc",
    category: "Perawatan Luka",
    shortDescription:
      "Item katalog pendukung (Placeholder). Aset foto resmi dan deskripsi detail akan diperbarui pada rilis katalog berikutnya.",
    isBestSeller: false,
    badge: "Katalog Mendatang",
    imageUrl: "/images/products/placeholder-kasa.svg",
    isPlaceholder: true,
    targetBranchId: "pc-pusat-pasuruan-shopee",
  },
  {
    id: "prod-placeholder-2",
    name: "Elastic Bandage PC Care",
    slug: "elastic-bandage-pc-care",
    category: "Support & Proteksi",
    shortDescription:
      "Item katalog pendukung (Placeholder). Silakan hubungi marketplace resmi cabang kami untuk mengecek varian yang tersedia.",
    isBestSeller: false,
    badge: "Katalog Mendatang",
    imageUrl: "/images/products/placeholder-bandage.svg",
    isPlaceholder: true,
    targetBranchId: "pc-pusat-pasuruan-shopee",
  },
];
