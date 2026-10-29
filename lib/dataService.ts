import { StoreLocation, MapCityGroup } from "@/types/store";
import { Product } from "@/types/product";
import { SiteConfig, siteConfig as defaultSiteConfig } from "@/data/config";
import { officialStores as defaultOfficialStores } from "@/data/stores";
import { bestSellerProducts as defaultBestSellerProducts } from "@/data/products";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const STORAGE_KEY_STORES = "pc_store_custom_stores_v1";
const STORAGE_KEY_PRODUCTS = "pc_store_custom_products_v1";
const STORAGE_KEY_CONFIG = "pc_store_custom_config_v1";
export const DATA_UPDATE_EVENT = "pc_store_data_updated";

export { isSupabaseConfigured };

// ================= MAPPER FUNCTIONS (Database snake_case <-> App camelCase) =================

interface DbStoreRow {
  id: string;
  name: string;
  branch_name: string;
  city: string;
  province: string;
  platform: 'shopee' | 'tiktok' | 'tokopedia' | 'other';
  platform_label: string;
  url: string;
  is_pusat?: boolean;
  badge?: string;
  description?: string;
  chibi_image?: string;
  delivery_speed?: string;
  promo_text?: string;
  rating?: string;
  map_coordinates?: { x: number; y: number };
  order_index?: number;
}

interface DbProductRow {
  id: string;
  name: string;
  slug: string;
  category: string;
  short_description: string;
  is_best_seller?: boolean;
  badge?: string;
  image_url: string;
  chibi_mascot?: string;
  target_branch_id?: string;
  features?: string[];
  chibi_quote?: string;
  rating?: string;
  sold_count?: string;
  order_index?: number;
}

function mapDbRowToStore(row: DbStoreRow): StoreLocation {
  return {
    id: row.id,
    name: row.name,
    branchName: row.branch_name,
    city: row.city,
    province: row.province,
    platform: row.platform,
    platformLabel: row.platform_label,
    url: row.url,
    isPusat: Boolean(row.is_pusat),
    badge: row.badge,
    description: row.description,
    chibiImage: row.chibi_image,
    deliverySpeed: row.delivery_speed,
    promoText: row.promo_text,
    rating: row.rating,
    mapCoordinates: row.map_coordinates || { x: 50, y: 50 },
    orderIndex: row.order_index ?? 0,
  };
}

function mapStoreToDbRow(store: StoreLocation, index: number = 0) {
  return {
    id: store.id,
    name: store.name,
    branch_name: store.branchName,
    city: store.city,
    province: store.province,
    platform: store.platform,
    platform_label: store.platformLabel,
    url: store.url,
    is_pusat: Boolean(store.isPusat),
    badge: store.badge || null,
    description: store.description || null,
    chibi_image: store.chibiImage || null,
    delivery_speed: store.deliverySpeed || null,
    promo_text: store.promoText || null,
    rating: store.rating || "4.9",
    map_coordinates: store.mapCoordinates || { x: 50, y: 50 },
    order_index: index,
  };
}

function mapDbRowToProduct(row: DbProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category,
    shortDescription: row.short_description,
    isBestSeller: Boolean(row.is_best_seller),
    badge: row.badge,
    imageUrl: row.image_url,
    chibiMascot: row.chibi_mascot,
    targetBranchId: row.target_branch_id,
    features: row.features || [],
    chibiQuote: row.chibi_quote,
    rating: row.rating,
    soldCount: row.sold_count,
    orderIndex: row.order_index ?? 0,
  };
}

function mapProductToDbRow(product: Product, index: number = 0) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category,
    short_description: product.shortDescription,
    is_best_seller: Boolean(product.isBestSeller),
    badge: product.badge || null,
    image_url: product.imageUrl,
    chibi_mascot: product.chibiMascot || null,
    target_branch_id: product.targetBranchId || null,
    features: product.features || [],
    chibi_quote: product.chibiQuote || null,
    rating: product.rating || "4.9/5.0",
    sold_count: product.soldCount || "1rb+ Terjual",
    order_index: index,
  };
}

// ================= SUPABASE FETCH FUNCTIONS =================

export async function fetchStoresFromSupabase(): Promise<StoreLocation[] | null> {
  if (!isSupabaseConfigured() || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      console.warn("Supabase fetch stores error:", error.message);
      return null;
    }
    if (data && Array.isArray(data)) {
      return data.map(mapDbRowToStore);
    }
    return null;
  } catch (err) {
    console.error("Gagal membaca stores dari Supabase:", err);
    return null;
  }
}

export async function fetchProductsFromSupabase(): Promise<Product[] | null> {
  if (!isSupabaseConfigured() || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      console.warn("Supabase fetch products error:", error.message);
      return null;
    }
    if (data && Array.isArray(data)) {
      return data.map(mapDbRowToProduct);
    }
    return null;
  } catch (err) {
    console.error("Gagal membaca products dari Supabase:", err);
    return null;
  }
}

export async function fetchConfigFromSupabase(): Promise<SiteConfig | null> {
  if (!isSupabaseConfigured() || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from("site_config")
      .select("*")
      .eq("id", "main")
      .maybeSingle();

    if (error) {
      console.warn("Supabase fetch config error:", error.message);
      return null;
    }
    if (data) {
      return {
        ...defaultSiteConfig,
        brandName: data.brand_name || defaultSiteConfig.brandName,
        tagline: data.tagline || defaultSiteConfig.tagline,
        description: data.description || defaultSiteConfig.description,
        adminWhatsApp: {
          phoneNumber: data.wa_phone_number || "",
          defaultMessage: data.wa_default_message || defaultSiteConfig.adminWhatsApp.defaultMessage,
          isAvailable: Boolean(data.wa_phone_number && data.wa_phone_number.trim().length > 0),
        },
        socials: {
          tiktok: data.tiktok_url || defaultSiteConfig.socials.tiktok,
          shopeePusat: data.shopee_pusat_url || defaultSiteConfig.socials.shopeePusat,
          instagram: data.instagram_url || defaultSiteConfig.socials.instagram,
        },
      };
    }
    return null;
  } catch (err) {
    console.error("Gagal membaca config dari Supabase:", err);
    return null;
  }
}

// ================= LOCAL STORAGE READ/WRITE (WITH BACKGROUND SUPABASE SYNC) =================

/**
 * Membaca data Toko dari localStorage (jika ada) atau fallback ke data bawaan.
 */
export function getStoredStores(): StoreLocation[] {
  if (typeof window === "undefined") return defaultOfficialStores;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STORES);
    if (!raw) return defaultOfficialStores;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultOfficialStores;
  } catch (err) {
    console.error("Gagal membaca stores dari localStorage:", err);
    return defaultOfficialStores;
  }
}

/**
 * Cache data Toko langsung ke localStorage (tanpa trigger sync balik ke Supabase).
 */
export function cacheStoredStoresLocally(stores: StoreLocation[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_STORES, JSON.stringify(stores));
  } catch (err) {
    console.error("Gagal cache stores ke localStorage:", err);
  }
}

/**
 * Menyimpan data Toko ke localStorage & sinkronisasi massal ke Supabase jika terhubung.
 */
export async function saveStoredStores(
  stores: StoreLocation[],
  syncToSupabase: boolean = true
): Promise<{ success: boolean; supabaseSynced: boolean; error?: string }> {
  if (typeof window === "undefined") return { success: false, supabaseSynced: false };
  let localSaved = false;
  try {
    localStorage.setItem(STORAGE_KEY_STORES, JSON.stringify(stores));
    localSaved = true;
    window.dispatchEvent(new CustomEvent(DATA_UPDATE_EVENT, { detail: { type: "stores" } }));
  } catch (err: unknown) {
    console.error("Gagal menyimpan stores ke localStorage:", err);
    if ((err as Error)?.name === "QuotaExceededError") {
      return { success: false, supabaseSynced: false, error: "Memori browser (LocalStorage) penuh!" };
    }
  }

  // Sinkronisasi ke Supabase
  if (syncToSupabase && isSupabaseConfigured() && supabase) {
    try {
      const rows = stores.map((s, idx) => mapStoreToDbRow(s, idx + 1));
      const { error } = await supabase.from("stores").upsert(rows);
      if (error) {
        console.error("Gagal sinkronisasi stores ke Supabase:", error.message);
        return { success: localSaved, supabaseSynced: false, error: error.message };
      }
      return { success: true, supabaseSynced: true };
    } catch (err: unknown) {
      console.error("Exception saat sync stores ke Supabase:", err);
      const errorMsg = err instanceof Error ? err.message : "Koneksi Supabase terputus";
      return { success: localSaved, supabaseSynced: false, error: errorMsg };
    }
  }

  return { success: localSaved, supabaseSynced: false };
}

/**
 * Menyimpan / update HANYA SATU toko ke Supabase dan memperbarui cache lokal.
 * Mencegah penimpaan massal (bulk overwrite) data toko lain yang sudah ada di Supabase.
 */
export async function saveSingleStoreToSupabase(
  store: StoreLocation,
  orderIndex: number = 1
): Promise<{ success: boolean; supabaseSynced: boolean; error?: string }> {
  let localSaved = false;
  if (typeof window !== "undefined") {
    try {
      const current = getStoredStores();
      const exists = current.some((s) => s.id === store.id);
      const updated = exists
        ? current.map((s) => (s.id === store.id ? store : s))
        : [...current, store];
      localStorage.setItem(STORAGE_KEY_STORES, JSON.stringify(updated));
      localSaved = true;
      window.dispatchEvent(new CustomEvent(DATA_UPDATE_EVENT, { detail: { type: "stores" } }));
    } catch (err) {
      console.error("Gagal update single store ke localStorage:", err);
    }
  }

  if (isSupabaseConfigured() && supabase) {
    try {
      const row = mapStoreToDbRow(store, orderIndex);
      const { error } = await supabase.from("stores").upsert(row);
      if (error) {
        console.error("Gagal sinkronisasi single store ke Supabase:", error.message);
        return { success: localSaved, supabaseSynced: false, error: error.message };
      }
      return { success: true, supabaseSynced: true };
    } catch (err: unknown) {
      console.error("Exception saat sync single store ke Supabase:", err);
      const errorMsg = err instanceof Error ? err.message : "Koneksi Supabase terputus";
      return { success: localSaved, supabaseSynced: false, error: errorMsg };
    }
  }

  return { success: localSaved, supabaseSynced: false };
}

/**
 * Menghapus toko dari Supabase jika terhubung
 */
export async function deleteStoreFromSupabase(storeId: string): Promise<void> {
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("stores").delete().eq("id", storeId);
    } catch (err) {
      console.error("Gagal menghapus toko dari Supabase:", err);
    }
  }
}

/**
 * Membaca data Produk dari localStorage (jika ada) atau fallback ke data bawaan.
 */
export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return defaultBestSellerProducts;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (!raw) return defaultBestSellerProducts;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultBestSellerProducts;
  } catch (err) {
    console.error("Gagal membaca products dari localStorage:", err);
    return defaultBestSellerProducts;
  }
}

/**
 * Cache data Produk langsung ke localStorage (tanpa trigger sync balik ke Supabase).
 */
export function cacheStoredProductsLocally(products: Product[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  } catch (err) {
    console.error("Gagal cache products ke localStorage:", err);
  }
}

/**
 * Menyimpan data Produk ke localStorage & sinkronisasi massal ke Supabase jika terhubung.
 */
export async function saveStoredProducts(
  products: Product[],
  syncToSupabase: boolean = true
): Promise<{ success: boolean; supabaseSynced: boolean; error?: string }> {
  if (typeof window === "undefined") return { success: false, supabaseSynced: false };
  let localSaved = false;
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    localSaved = true;
    window.dispatchEvent(new CustomEvent(DATA_UPDATE_EVENT, { detail: { type: "products" } }));
  } catch (err: unknown) {
    console.error("Gagal menyimpan products ke localStorage:", err);
    if ((err as Error)?.name === "QuotaExceededError") {
      return { success: false, supabaseSynced: false, error: "Ukuran gambar terlalu besar untuk memori browser (QuotaExceeded)!" };
    }
  }

  // Sinkronisasi ke Supabase
  if (syncToSupabase && isSupabaseConfigured() && supabase) {
    try {
      const rows = products.map((p, idx) => mapProductToDbRow(p, idx + 1));
      const { error } = await supabase.from("products").upsert(rows);
      if (error) {
        console.error("Gagal sinkronisasi products ke Supabase:", error.message);
        return { success: localSaved, supabaseSynced: false, error: error.message };
      }
      return { success: true, supabaseSynced: true };
    } catch (err: unknown) {
      console.error("Exception saat sync products ke Supabase:", err);
      const errorMsg = err instanceof Error ? err.message : "Koneksi Supabase terputus";
      return { success: localSaved, supabaseSynced: false, error: errorMsg };
    }
  }

  return { success: localSaved, supabaseSynced: false };
}

/**
 * Menyimpan / update HANYA SATU produk ke Supabase dan memperbarui cache lokal.
 * Mencegah penimpaan massal (bulk overwrite) data produk lain yang sudah ada di Supabase.
 */
export async function saveSingleProductToSupabase(
  product: Product,
  orderIndex: number = 1
): Promise<{ success: boolean; supabaseSynced: boolean; error?: string }> {
  let localSaved = false;
  if (typeof window !== "undefined") {
    try {
      const current = getStoredProducts();
      const exists = current.some((p) => p.id === product.id);
      const updated = exists
        ? current.map((p) => (p.id === product.id ? product : p))
        : [...current, product];
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updated));
      localSaved = true;
      window.dispatchEvent(new CustomEvent(DATA_UPDATE_EVENT, { detail: { type: "products" } }));
    } catch (err) {
      console.error("Gagal update single product ke localStorage:", err);
    }
  }

  if (isSupabaseConfigured() && supabase) {
    try {
      const row = mapProductToDbRow(product, orderIndex);
      const { error } = await supabase.from("products").upsert(row);
      if (error) {
        console.error("Gagal sinkronisasi single product ke Supabase:", error.message);
        return { success: localSaved, supabaseSynced: false, error: error.message };
      }
      return { success: true, supabaseSynced: true };
    } catch (err: unknown) {
      console.error("Exception saat sync single product ke Supabase:", err);
      const errorMsg = err instanceof Error ? err.message : "Koneksi Supabase terputus";
      return { success: localSaved, supabaseSynced: false, error: errorMsg };
    }
  }

  return { success: localSaved, supabaseSynced: false };
}

/**
 * Menghapus produk dari Supabase jika terhubung
 */
export async function deleteProductFromSupabase(productId: string): Promise<void> {
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("products").delete().eq("id", productId);
    } catch (err) {
      console.error("Gagal menghapus produk dari Supabase:", err);
    }
  }
}

/**
 * Membaca konfigurasi website & kontak dari localStorage (jika ada) atau fallback ke data bawaan.
 */
export function getStoredConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultSiteConfig;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!raw) return defaultSiteConfig;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? { ...defaultSiteConfig, ...parsed } : defaultSiteConfig;
  } catch (err) {
    console.error("Gagal membaca config dari localStorage:", err);
    return defaultSiteConfig;
  }
}

/**
 * Cache data Config langsung ke localStorage (tanpa trigger sync balik ke Supabase).
 */
export function cacheStoredConfigLocally(config: SiteConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error("Gagal cache config ke localStorage:", err);
  }
}

/**
 * Menyimpan konfigurasi website & kontak ke localStorage & sinkronisasi ke Supabase jika terhubung.
 */
export async function saveStoredConfig(
  config: SiteConfig,
  syncToSupabase: boolean = true
): Promise<{ success: boolean; supabaseSynced: boolean; error?: string }> {
  if (typeof window === "undefined") return { success: false, supabaseSynced: false };
  let localSaved = false;
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
    localSaved = true;
    window.dispatchEvent(new CustomEvent(DATA_UPDATE_EVENT, { detail: { type: "config" } }));
  } catch (err: unknown) {
    console.error("Gagal menyimpan config ke localStorage:", err);
  }

  // Sinkronisasi ke Supabase
  if (syncToSupabase && isSupabaseConfigured() && supabase) {
    try {
      const dbRow = {
        id: "main",
        brand_name: config.brandName,
        tagline: config.tagline,
        description: config.description,
        wa_phone_number: config.adminWhatsApp?.phoneNumber || "",
        wa_default_message: config.adminWhatsApp?.defaultMessage || "",
        tiktok_url: config.socials?.tiktok || "",
        shopee_pusat_url: config.socials?.shopeePusat || "",
        instagram_url: config.socials?.instagram || "",
        updated_at: new Date().toISOString(),
      };
      const { error } = await supabase.from("site_config").upsert(dbRow);
      if (error) {
        console.error("Gagal sinkronisasi config ke Supabase:", error.message);
        return { success: localSaved, supabaseSynced: false, error: error.message };
      }
      return { success: true, supabaseSynced: true };
    } catch (err: unknown) {
      console.error("Exception saat sync config ke Supabase:", err);
      const errorMsg = err instanceof Error ? err.message : "Koneksi Supabase terputus";
      return { success: localSaved, supabaseSynced: false, error: errorMsg };
    }
  }

  return { success: localSaved, supabaseSynced: false };
}

/**
 * Reset seluruh data kembali ke default dari file data asli.
 */
export function resetAllDataToDefault(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY_STORES);
  localStorage.removeItem(STORAGE_KEY_PRODUCTS);
  localStorage.removeItem(STORAGE_KEY_CONFIG);
  window.dispatchEvent(new CustomEvent(DATA_UPDATE_EVENT, { detail: { type: "all" } }));
}

/**
 * Helper untuk mengelompokkan toko berdasarkan kota untuk marker pada peta Indonesia
 */
export function groupStoresIntoCities(stores: StoreLocation[]): MapCityGroup[] {
  const map: Record<string, { cityName: string; province: string; coordinates: { x: number; y: number }; stores: StoreLocation[] }> = {};

  stores.forEach((store) => {
    const key = store.city.toLowerCase().trim();
    if (!map[key]) {
      map[key] = {
        cityName: store.city.trim(),
        province: store.province,
        coordinates: store.mapCoordinates || { x: 50, y: 50 },
        stores: [],
      };
    }
    map[key].stores.push(store);
  });

  return Object.keys(map).map((cityId) => ({
    cityId,
    cityName: map[cityId].cityName,
    province: map[cityId].province,
    coordinates: map[cityId].coordinates,
    stores: map[cityId].stores,
  }));
}
