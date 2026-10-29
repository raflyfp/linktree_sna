"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { StoreLocation, MapCityGroup } from "@/types/store";
import { Product } from "@/types/product";
import { SiteConfig, siteConfig as defaultSiteConfig } from "@/data/config";
import { officialStores as defaultOfficialStores } from "@/data/stores";
import { bestSellerProducts as defaultBestSellerProducts } from "@/data/products";
import {
  getStoredStores,
  getStoredProducts,
  getStoredConfig,
  saveStoredStores,
  saveStoredProducts,
  saveStoredConfig,
  saveSingleStoreToSupabase,
  saveSingleProductToSupabase,
  cacheStoredStoresLocally,
  cacheStoredProductsLocally,
  cacheStoredConfigLocally,
  deleteStoreFromSupabase,
  deleteProductFromSupabase,
  resetAllDataToDefault,
  groupStoresIntoCities,
  fetchStoresFromSupabase,
  fetchProductsFromSupabase,
  fetchConfigFromSupabase,
  isSupabaseConfigured,
  DATA_UPDATE_EVENT,
} from "@/lib/dataService";
import { supabase } from "@/lib/supabase";

export interface SaveResult {
  success: boolean;
  supabaseSynced: boolean;
  error?: string;
}

interface DataContextType {
  stores: StoreLocation[];
  products: Product[];
  config: SiteConfig;
  cityGroups: MapCityGroup[];
  isHydrated: boolean;
  isSupabaseConnected: boolean;
  isCloudLoading: boolean;
  refreshFromCloud: () => Promise<boolean>;
  saveStores: (newStores: StoreLocation[]) => Promise<SaveResult>;
  saveSingleStore: (store: StoreLocation) => Promise<SaveResult>;
  deleteStore: (storeId: string) => Promise<void>;
  saveProducts: (newProducts: Product[]) => Promise<SaveResult>;
  saveSingleProduct: (product: Product) => Promise<SaveResult>;
  deleteProduct: (productId: string) => Promise<void>;
  saveConfig: (newConfig: SiteConfig) => Promise<SaveResult>;
  resetToDefault: () => void;
}

const DataContext = createContext<DataContextType>({
  stores: defaultOfficialStores,
  products: defaultBestSellerProducts,
  config: defaultSiteConfig,
  cityGroups: groupStoresIntoCities(defaultOfficialStores),
  isHydrated: false,
  isSupabaseConnected: false,
  isCloudLoading: false,
  refreshFromCloud: async () => false,
  saveStores: async () => ({ success: true, supabaseSynced: false }),
  saveSingleStore: async () => ({ success: true, supabaseSynced: false }),
  deleteStore: async () => {},
  saveProducts: async () => ({ success: true, supabaseSynced: false }),
  saveSingleProduct: async () => ({ success: true, supabaseSynced: false }),
  deleteProduct: async () => {},
  saveConfig: async () => ({ success: true, supabaseSynced: false }),
  resetToDefault: () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stores, setStores] = useState<StoreLocation[]>(defaultOfficialStores);
  const [products, setProducts] = useState<Product[]>(defaultBestSellerProducts);
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [isCloudLoading, setIsCloudLoading] = useState(true);

  // 1. Initial Load: Ambil dari localStorage agar instan tanpa flicker tampilan
  const loadLocalData = useCallback(() => {
    setStores(getStoredStores());
    setProducts(getStoredProducts());
    setConfig(getStoredConfig());
  }, []);

  // 2. Fetch data dari Supabase (Single Source of Truth)
  const loadSupabaseData = useCallback(async (): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      setIsCloudLoading(false);
      return false;
    }

    setIsCloudLoading(true);
    try {
      const [sbStores, sbProducts, sbConfig] = await Promise.all([
        fetchStoresFromSupabase(),
        fetchProductsFromSupabase(),
        fetchConfigFromSupabase(),
      ]);

      let hasValidData = false;

      if (sbStores && sbStores.length > 0) {
        setStores(sbStores);
        cacheStoredStoresLocally(sbStores);
        hasValidData = true;
      }
      if (sbProducts && sbProducts.length > 0) {
        setProducts(sbProducts);
        cacheStoredProductsLocally(sbProducts);
        hasValidData = true;
      }
      if (sbConfig) {
        setConfig(sbConfig);
        cacheStoredConfigLocally(sbConfig);
        hasValidData = true;
      }

      setIsSupabaseConnected(hasValidData);
      return hasValidData;
    } catch (err) {
      console.warn("Supabase fetch fallback to local:", err);
      return false;
    } finally {
      setIsCloudLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    queueMicrotask(() => {
      if (!isMounted) return;
      loadLocalData();
      setIsHydrated(true);
      loadSupabaseData();
    });

    const handleUpdate = () => {
      loadLocalData();
    };

    window.addEventListener(DATA_UPDATE_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener(DATA_UPDATE_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [loadLocalData, loadSupabaseData]);

  // 3. Supabase Realtime Listener (Jika ada perubahan dari tab/device lain)
  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) return;

    try {
      const channel = supabase
        .channel("pc_store_realtime_changes")
        .on("postgres_changes", { event: "*", schema: "public", table: "stores" }, () => {
          fetchStoresFromSupabase().then((data) => {
            if (data && data.length > 0) {
              setStores(data);
              cacheStoredStoresLocally(data);
            }
          });
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => {
          fetchProductsFromSupabase().then((data) => {
            if (data && data.length > 0) {
              setProducts(data);
              cacheStoredProductsLocally(data);
            }
          });
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "site_config" }, () => {
          fetchConfigFromSupabase().then((data) => {
            if (data) {
              setConfig(data);
              cacheStoredConfigLocally(data);
            }
          });
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err) {
      console.warn("Realtime subscription error (ignorable):", err);
    }
  }, []);

  // Simpan massal toko (misal saat ubah urutan / drag & drop)
  const handleSaveStores = async (newStores: StoreLocation[]): Promise<SaveResult> => {
    setStores(newStores);
    return await saveStoredStores(newStores);
  };

  // Simpan HANYA SATU toko (Mencegah toko lain tertimpa)
  const handleSaveSingleStore = async (store: StoreLocation): Promise<SaveResult> => {
    const exists = stores.some((s) => s.id === store.id);
    const updated = exists
      ? stores.map((s) => (s.id === store.id ? store : s))
      : [...stores, store];

    setStores(updated);
    const orderIndex = updated.findIndex((s) => s.id === store.id) + 1;
    return await saveSingleStoreToSupabase(store, orderIndex);
  };

  const handleDeleteStore = async (storeId: string): Promise<void> => {
    const updated = stores.filter((s) => s.id !== storeId);
    setStores(updated);
    await saveStoredStores(updated);
    await deleteStoreFromSupabase(storeId);
  };

  // Simpan massal produk (misal saat ubah urutan)
  const handleSaveProducts = async (newProducts: Product[]): Promise<SaveResult> => {
    setProducts(newProducts);
    return await saveStoredProducts(newProducts);
  };

  // Simpan HANYA SATU produk (Mencegah produk lain tertimpa)
  const handleSaveSingleProduct = async (product: Product): Promise<SaveResult> => {
    const exists = products.some((p) => p.id === product.id);
    const updated = exists
      ? products.map((p) => (p.id === product.id ? product : p))
      : [...products, product];

    setProducts(updated);
    const orderIndex = updated.findIndex((p) => p.id === product.id) + 1;
    return await saveSingleProductToSupabase(product, orderIndex);
  };

  const handleDeleteProduct = async (productId: string): Promise<void> => {
    const updated = products.filter((p) => p.id !== productId);
    setProducts(updated);
    await saveStoredProducts(updated);
    await deleteProductFromSupabase(productId);
  };

  const handleSaveConfig = async (newConfig: SiteConfig): Promise<SaveResult> => {
    setConfig(newConfig);
    return await saveStoredConfig(newConfig);
  };

  const handleResetToDefault = () => {
    resetAllDataToDefault();
    setStores(defaultOfficialStores);
    setProducts(defaultBestSellerProducts);
    setConfig(defaultSiteConfig);
  };

  const dynamicCityGroups = groupStoresIntoCities(stores);

  return (
    <DataContext.Provider
      value={{
        stores,
        products,
        config,
        cityGroups: dynamicCityGroups,
        isHydrated,
        isSupabaseConnected,
        isCloudLoading,
        refreshFromCloud: loadSupabaseData,
        saveStores: handleSaveStores,
        saveSingleStore: handleSaveSingleStore,
        deleteStore: handleDeleteStore,
        saveProducts: handleSaveProducts,
        saveSingleProduct: handleSaveSingleProduct,
        deleteProduct: handleDeleteProduct,
        saveConfig: handleSaveConfig,
        resetToDefault: handleResetToDefault,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useSiteData = () => useContext(DataContext);
