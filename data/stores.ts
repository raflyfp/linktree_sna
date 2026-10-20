import { StoreLocation, MapCityGroup } from "@/types/store";

/**
 * Data Toko & Marketplace Resmi PC Store
 * 
 * 7 Official Marketplace Store links:
 * - 1. Toko Shopee PC Pusat Pasuruan
 * - 2. TikTok Shop Pusat Pasuruan
 * - 3. Toko Shopee Malang
 * - 4. Toko Shopee Bandung
 * - 5. Toko Shopee Jakarta
 * - 6. Toko Shopee Surabaya
 * - 7. Toko Shopee Tarakan Kalimantan Utara
 * 
 * Koordinat peta disesuaikan secara presisi terhadap pulau-pulau peta kartun Indonesia (viewBox 0 0 1000 400)
 */

export const officialStores: StoreLocation[] = [
  {
    id: "pc-pusat-pasuruan-shopee",
    name: "Toko Shopee PC Pusat Pasuruan",
    branchName: "Pusat Pasuruan (Shopee)",
    city: "Pasuruan",
    province: "Jawa Timur",
    platform: "shopee",
    platformLabel: "Shopee Official",
    url: "https://s.shopee.co.id/7VGCzchHR7",
    isPusat: true,
    badge: "Kantor Pusat Utama",
    description: "Toko resmi pusat melayani pengiriman ke seluruh Indonesia dengan ketersediaan produk terlengkap dan garansi original.",
    chibiImage: "/images/products/polifix-chibi-thumbsup.png",
    deliverySpeed: "Siap Kirim Kilat Hari Ini",
    promoText: "Katalog Terlengkap & Official Guarantee",
    rating: "4.9",
    mapCoordinates: {
      x: 44.2,
      y: 75.5,
    },
  },
  {
    id: "pc-pusat-pasuruan-tiktok",
    name: "TikTok Shop Pusat Pasuruan",
    branchName: "Pusat Pasuruan (TikTok)",
    city: "Pasuruan",
    province: "Jawa Timur",
    platform: "tiktok",
    platformLabel: "TikTok Shop",
    url: "https://tk.tokopedia.com/ZSq6yuf9J/",
    isPusat: true,
    badge: "Official TikTok Shop",
    description: "Live shopping interaktif setiap hari, promo voucher potongan harga, dan gratis ongkir di TikTok Shop Resmi kami.",
    chibiImage: "/images/products/polifix-chibi-running.png",
    deliverySpeed: "Live Stream Promo Harian",
    promoText: "Kupon Diskon & Gratis Ongkir Ekstra",
    rating: "4.9",
    mapCoordinates: {
      x: 44.2,
      y: 75.5,
    },
  },
  {
    id: "pc-malang-shopee",
    name: "Toko Shopee Malang",
    branchName: "Malang",
    city: "Malang",
    province: "Jawa Timur",
    platform: "shopee",
    platformLabel: "Shopee Cabang",
    url: "https://s.shopee.co.id/112jFpJv4s",
    isPusat: false,
    badge: "Cabang Malang Raya",
    description: "Melayani area Malang Raya dan sekitarnya dengan pengiriman cepat, hemat ongkir, dan bergaransi resmi.",
    chibiImage: "/images/products/poligyp-chibi-cheer.png",
    deliverySpeed: "Hemat Ongkir Malang Raya",
    promoText: "Layanan Cepat Area Malang & Sekitarnya",
    rating: "4.9",
    mapCoordinates: {
      x: 43.0,
      y: 78.5,
    },
  },
  {
    id: "pc-bandung-shopee",
    name: "Toko Shopee Bandung",
    branchName: "Bandung",
    city: "Bandung",
    province: "Jawa Barat",
    platform: "shopee",
    platformLabel: "Shopee Cabang",
    url: "https://s.shopee.co.id/5foYoXkyY2",
    isPusat: false,
    badge: "Cabang Jawa Barat",
    description: "Pusat distribusi untuk wilayah Bandung & Jawa Barat dengan stok terlindungi dan siap kirim setiap hari.",
    chibiImage: "/images/products/caressa-cotton-balls.png",
    deliverySpeed: "1 Hari Sampai Jawa Barat",
    promoText: "Stok Terjamin & Pengiriman Rapi",
    rating: "4.9",
    mapCoordinates: {
      x: 28.5,
      y: 72.0,
    },
  },
  {
    id: "pc-jakarta-shopee",
    name: "Toko Shopee Jakarta",
    branchName: "Jakarta",
    city: "Jakarta",
    province: "DKI Jakarta",
    platform: "shopee",
    platformLabel: "Shopee Cabang",
    url: "https://s.shopee.co.id/qjJ3HhjNZ",
    isPusat: false,
    badge: "Cabang Ibukota",
    description: "Distribusi kilat untuk wilayah Jabodetabek dengan jaminan 100% original langsung dari official branch.",
    chibiImage: "/images/products/poligyp-chibi-strong.png",
    deliverySpeed: "Express Kirim Jabodetabek",
    promoText: "Hub Distribusi Utama Wilayah Barat",
    rating: "4.9",
    mapCoordinates: {
      x: 26.5,
      y: 67.0,
    },
  },
  {
    id: "pc-surabaya-shopee",
    name: "Toko Shopee Surabaya",
    branchName: "Surabaya",
    city: "Surabaya",
    province: "Jawa Timur",
    platform: "shopee",
    platformLabel: "Shopee Cabang",
    url: "https://shopee.co.id/bigprioritycare",
    isPusat: false,
    badge: "Cabang Metropolis",
    description: "Layanan pengiriman instant dan reguler untuk kawasan Surabaya, Sidoarjo, Gresik, dan sekitarnya.",
    chibiImage: "/images/products/polidine-chibi-shield.png",
    deliverySpeed: "Same-Day / Instant Jatim",
    promoText: "Gudang Penyangga Jawa Timur",
    rating: "4.9",
    mapCoordinates: {
      x: 42.4,
      y: 72.5,
    },
  },
  {
    id: "pc-tarakan-shopee",
    name: "Toko Shopee Tarakan Kalimantan Utara",
    branchName: "Tarakan",
    city: "Tarakan",
    province: "Kalimantan Utara",
    platform: "shopee",
    platformLabel: "Shopee Cabang",
    url: "https://id.shp.ee/YoNQpuyu",
    isPusat: false,
    badge: "Cabang Kalimantan",
    description: "Solusi hemat ongkir bagi pelanggan di Pulau Kalimantan hingga kawasan IKN dengan jaminan sampai cepat.",
    chibiImage: "/images/products/polifix-chibi-hug.png",
    deliverySpeed: "Solusi Cepat Kalimantan & IKN",
    promoText: "Ongkir Murah untuk Area Kalimantan",
    rating: "4.9",
    mapCoordinates: {
      x: 50.5,
      y: 19.5,
    },
  },
];

/**
 * Data kota terkelompok untuk marker pada peta Indonesia
 */
export const cityGroups: MapCityGroup[] = [
  {
    cityId: "pasuruan",
    cityName: "Pasuruan",
    province: "Jawa Timur",
    coordinates: { x: 44.2, y: 75.5 },
    stores: officialStores.filter((s) => s.city === "Pasuruan"),
  },
  {
    cityId: "surabaya",
    cityName: "Surabaya",
    province: "Jawa Timur",
    coordinates: { x: 42.4, y: 72.5 },
    stores: officialStores.filter((s) => s.city === "Surabaya"),
  },
  {
    cityId: "malang",
    cityName: "Malang",
    province: "Jawa Timur",
    coordinates: { x: 43.0, y: 78.5 },
    stores: officialStores.filter((s) => s.city === "Malang"),
  },
  {
    cityId: "bandung",
    cityName: "Bandung",
    province: "Jawa Barat",
    coordinates: { x: 28.5, y: 72.0 },
    stores: officialStores.filter((s) => s.city === "Bandung"),
  },
  {
    cityId: "jakarta",
    cityName: "Jakarta",
    province: "DKI Jakarta",
    coordinates: { x: 26.5, y: 67.0 },
    stores: officialStores.filter((s) => s.city === "Jakarta"),
  },
  {
    cityId: "tarakan",
    cityName: "Tarakan",
    province: "Kalimantan Utara",
    coordinates: { x: 50.5, y: 19.5 },
    stores: officialStores.filter((s) => s.city === "Tarakan"),
  },
];
