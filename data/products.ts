import { Product } from "@/types/product";

/**
 * Data Produk Pilihan Resmi PC Store
 * 
 * Gambar produk utama (imageUrl) menampilkan kemasan/desain produk asli & resmi,
 * sedangkan karakter maskot chibi (chibiMascot) menjadi teman interaktif dan elemen latar animasi yang hidup.
 */

export const bestSellerProducts: Product[] = [
  {
    id: "prod-polifix-new",
    name: "Polifix (Kemasan Baru)",
    slug: "polifix-kemasan-baru",
    category: "Plester Fiksasi Medis",
    shortDescription:
      "Plester fiksasi penutup luka dengan formula perekat ramah kulit dan daya rekat optimal untuk kenyamanan pemakaian sehari-hari.",
    isBestSeller: true,
    badge: "Best Seller • Kemasan Baru",
    imageUrl: "/images/products/polifix-kemasan-baru.svg",
    chibiMascot: "/images/products/polifix-chibi-thumbsup.webp",
    isPlaceholder: false,
    targetBranchId: "pc-pusat-pasuruan-shopee",
    features: ["Daya Rekat Optimal", "Ramah Kulit & Lembut", "Elastisitas Nyaman"],
    chibiQuote: "Halo! Aku Polifix, siap jaga luka tetap aman & nempel nyaman!",
    rating: "4.9/5.0",
    soldCount: "12rb+ Terjual",
  },
  {
    id: "prod-policrepe",
    name: "Policrepe & Poligyp Care",
    slug: "policrepe-poligyp",
    category: "Perban Elastis & Fiksasi",
    shortDescription:
      "Perban elastis berkualitas tinggi dengan elastisitas seimbang, memberikan tekanan merata serta fleksibilitas gerak tubuh.",
    isBestSeller: true,
    badge: "Favorit Medis • Top Choice",
    imageUrl: "/images/products/policrepe.svg",
    chibiMascot: "/images/products/poligyp-chibi-cheer.webp",
    isPlaceholder: false,
    targetBranchId: "pc-pusat-pasuruan-shopee",
    features: ["Kompresi Merata", "Bisa Dicuci & Dipakai Ulang", "Support Sendi Optimal"],
    chibiQuote: "Semangat! Bersamaku gerakan tubuh tetap lincah & terlindungi!",
    rating: "4.9/5.0",
    soldCount: "9.8rb+ Terjual",
  },
  {
    id: "prod-polidine",
    name: "Polidine Antiseptic Formula",
    slug: "polidine-antiseptic",
    category: "Antiseptik & Pembersih Luka",
    shortDescription:
      "Cairan antiseptik higienis formula lembut untuk perlindungan maksimal dari bakteri, kuman, dan pencegahan infeksi pada luka.",
    isBestSeller: true,
    badge: "Proteksi Maksimal • Higienis",
    imageUrl: "/images/products/polidine.svg",
    chibiMascot: "/images/products/polidine-chibi-shield.webp",
    isPlaceholder: false,
    targetBranchId: "pc-pusat-pasuruan-shopee",
    features: ["Perisai Anti Kuman", "Formula Lembut", "Aman untuk Keluarga"],
    chibiQuote: "Bebas kuman! Bersama perisai Polidine, luka cepat bersih & sembuh!",
    rating: "4.9/5.0",
    soldCount: "6.4rb+ Terjual",
  },
  {
    id: "prod-caressa-cotton",
    name: "Caressa Cotton Balls",
    slug: "caressa-cotton-balls",
    category: "Kapas Higienis & Perawatan",
    shortDescription:
      "Kapas bola steril ekstra lembut dari serat kapas alami murni pilihan, higienis tanpa klorin untuk perawatan luka, bayi, dan kulit sensitif.",
    isBestSeller: false,
    badge: "100% Pure Natural Cotton",
    imageUrl: "/images/products/caressa-cotton-balls.svg",
    chibiMascot: "/images/products/caressa-cotton-balls.webp",
    isPlaceholder: false,
    targetBranchId: "pc-pusat-pasuruan-shopee",
    features: ["100% Kapas Murni", "Bebas Klorin & Pemutih", "Daya Serap Ekstra Tinggi"],
    chibiQuote: "Super lembut seperti awan! Pas banget buat si kecil & kulit sensitif!",
    rating: "5.0/5.0",
    soldCount: "8.1rb+ Terjual",
  },
  {
    id: "prod-wound-dressing",
    name: "Wound Dressing HOS-PAK",
    slug: "wound-dressing-hospak",
    category: "Pembalut Luka Steril",
    shortDescription:
      "Pembalut bantalan luka steril dengan lapisan anti-lengket dan daya serap tinggi, menjaga luka tetap kering serta steril dari bakteri luar.",
    isBestSeller: false,
    badge: "Standar Rumah Sakit",
    imageUrl: "/images/products/wound-dressing.svg",
    chibiMascot: "/images/products/wound-dressing-pad.webp",
    isPlaceholder: false,
    targetBranchId: "pc-pusat-pasuruan-shopee",
    features: ["Bantalan Anti-Lengket", "Kemasan Steril Individual", "Sirkulasi Udara Lancar"],
    chibiQuote: "Tenang, ganti perban jadi bebas cemas karena bantalanku anti-lengket!",
    rating: "4.9/5.0",
    soldCount: "5.3rb+ Terjual",
  },
];
