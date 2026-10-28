"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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
  saveStores: (newStores: StoreLocation[]) => Promise<SaveResult>;
  deleteStore: (storeId: string) => Promise<void>;
  saveProducts: (newProducts: Product[]) => Promise<SaveResult>;
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
  saveStores: async () => ({ success: true, supabaseSynced: false }),
  deleteStore: async () => {},
  saveProducts: async () => ({ success: true, supabaseSynced: false }),
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

  // 1. Initial Load: Ambil dari localStorage agar instan tanpa flicker
  const loadLocalData = () => {
    setStores(getStoredStores());
    setProducts(getStoredProducts());
    setConfig(getStoredConfig());
  };

  // 2. Background Sync: Jika Supabase dikonfigurasi, tarik data terbaru dari cloud database
  const loadSupabaseData = async () => {
    if (!isSupabaseConfigured()) return;
    try {
      const [sbStores, sbProducts, sbConfig] = await Promise.all([
        fetchStoresFromSupabase(),
        fetchProductsFromSupabase(),
        fetchConfigFromSupabase(),
      ]);

      if (sbStores && sbStores.length > 0) {
        setStores(sbStores);
        cacheStoredStoresLocally(sbStores); // cache ke localStorage tanpa re-upsert
      }
      if (sbProducts && sbProducts.length > 0) {
        setProducts(sbProducts);
        cacheStoredProductsLocally(sbProducts); // cache ke localStorage tanpa re-upsert
      }
      if (sbConfig) {
        setConfig(sbConfig);
        cacheStoredConfigLocally(sbConfig); // cache ke localStorage tanpa re-upsert
      }

      setIsSupabaseConnected(true);
    } catch (err) {
      console.warn("Supabase fetch fallback to local:", err);
    }
  };

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
  }, []);

  const handleSaveStores = async (newStores: StoreLocation[]): Promise<SaveResult> => {
    setStores(newStores);
    return await saveStoredStores(newStores);
  };

  const handleDeleteStore = async (storeId: string): Promise<void> => {
    const updated = stores.filter((s) => s.id !== storeId);
    setStores(updated);
    await saveStoredStores(updated);
    await deleteStoreFromSupabase(storeId);
  };

  const handleSaveProducts = async (newProducts: Product[]): Promise<SaveResult> => {
    setProducts(newProducts);
    return await saveStoredProducts(newProducts);
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
        saveStores: handleSaveStores,
        deleteStore: handleDeleteStore,
        saveProducts: handleSaveProducts,
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
