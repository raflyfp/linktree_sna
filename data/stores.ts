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
    badge: "Kantor Pusat",
    description: "Toko resmi pusat melayani pengiriman ke seluruh Indonesia dengan ketersediaan produk terlengkap.",
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
    badge: "Official TikTok",
    description: "Live shopping interaktif, promo voucher harian, dan gratis ongkir di TikTok Shop Resmi kami.",
    mapCoordinates: {
      x: 44.2,
      y: 75.5,
    },
  },
  {
    id: "pc-malang-shopee",
    name: "Toko Shopee Malang",
    branchName: "Cabang Malang",
    city: "Malang",
    province: "Jawa Timur",
    platform: "shopee",
    platformLabel: "Shopee Cabang",
    url: "https://s.shopee.co.id/112jFpJv4s",
    isPusat: false,
    badge: "Cabang Jatim",
    description: "Melayani area Malang Raya dan sekitarnya dengan pengiriman cepat, aman, dan bergaransi resmi.",
    mapCoordinates: {
      x: 43.0,
      y: 78.5,
    },
  },
  {
    id: "pc-bandung-shopee",
    name: "Toko Shopee Bandung",
    branchName: "Cabang Bandung",
    city: "Bandung",
    province: "Jawa Barat",
    platform: "shopee",
    platformLabel: "Shopee Cabang",
    url: "https://s.shopee.co.id/5foYoXkyY2",
    isPusat: false,
    badge: "Cabang Jabar",
    description: "Pusat distribusi untuk wilayah Bandung & Jawa Barat dengan stok siap kirim setiap hari.",
    mapCoordinates: {
      x: 28.5,
      y: 72.0,
    },
  },
  {
    id: "pc-jakarta-shopee",
    name: "Toko Shopee Jakarta",
    branchName: "Cabang Jakarta",
    city: "Jakarta",
    province: "DKI Jakarta",
    platform: "shopee",
    platformLabel: "Shopee Cabang",
    url: "https://s.shopee.co.id/qjJ3HhjNZ",
    isPusat: false,
    badge: "Cabang Ibukota",
    description: "Distribusi kilat untuk wilayah Jabodetabek dengan jaminan 100% original dari official store.",
    mapCoordinates: {
      x: 26.5,
      y: 67.0,
    },
  },
  {
    id: "pc-surabaya-shopee",
    name: "Toko Shopee Surabaya",
    branchName: "Cabang Surabaya",
    city: "Surabaya",
    province: "Jawa Timur",
    platform: "shopee",
    platformLabel: "Shopee Cabang",
    url: "https://shopee.co.id/bigprioritycare",
    isPusat: false,
    badge: "Cabang Metropolis",
    description: "Layanan pengiriman instant dan reguler untuk kawasan Surabaya, Sidoarjo, dan Gerbangkertosusila.",
    mapCoordinates: {
      x: 42.4,
      y: 72.5,
    },
  },
  {
    id: "pc-tarakan-shopee",
    name: "Toko Shopee Tarakan Kalimantan Utara",
    branchName: "Cabang Tarakan",
    city: "Tarakan",
    province: "Kalimantan Utara",
    platform: "shopee",
    platformLabel: "Shopee Cabang",
    url: "https://id.shp.ee/YoNQpuyu",
    isPusat: false,
    badge: "Cabang Kaltara",
    description: "Pusat pemesanan langsung wilayah Kalimantan Utara dengan ongkir hemat dan proses cepat.",
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
    cityName: "Pasuruan (Pusat)",
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
