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

interface DataContextType {
  stores: StoreLocation[];
  products: Product[];
  config: SiteConfig;
  cityGroups: MapCityGroup[];
  isHydrated: boolean;
  isSupabaseConnected: boolean;
  saveStores: (newStores: StoreLocation[]) => void;
  deleteStore: (storeId: string) => void;
  saveProducts: (newProducts: Product[]) => void;
  deleteProduct: (productId: string) => void;
  saveConfig: (newConfig: SiteConfig) => void;
  resetToDefault: () => void;
}

const DataContext = createContext<DataContextType>({
  stores: defaultOfficialStores,
  products: defaultBestSellerProducts,
  config: defaultSiteConfig,
  cityGroups: groupStoresIntoCities(defaultOfficialStores),
  isHydrated: false,
  isSupabaseConnected: false,
  saveStores: () => {},
  deleteStore: () => {},
  saveProducts: () => {},
  deleteProduct: () => {},
  saveConfig: () => {},
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
        saveStoredStores(sbStores); // cache ke localStorage
      }
      if (sbProducts && sbProducts.length > 0) {
        setProducts(sbProducts);
        saveStoredProducts(sbProducts); // cache ke localStorage
      }
      if (sbConfig) {
        setConfig(sbConfig);
        saveStoredConfig(sbConfig); // cache ke localStorage
      }

      setIsSupabaseConnected(true);
    } catch (err) {
      console.warn("Supabase fetch fallback to local:", err);
    }
  };

  useEffect(() => {
    loadLocalData();
    setIsHydrated(true);
    loadSupabaseData();

    const handleUpdate = () => {
      loadLocalData();
    };

    window.addEventListener(DATA_UPDATE_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(DATA_UPDATE_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const handleSaveStores = (newStores: StoreLocation[]) => {
    setStores(newStores);
    saveStoredStores(newStores);
  };

  const handleDeleteStore = (storeId: string) => {
    const updated = stores.filter((s) => s.id !== storeId);
    setStores(updated);
    saveStoredStores(updated);
    deleteStoreFromSupabase(storeId);
  };

  const handleSaveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    saveStoredProducts(newProducts);
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    setProducts(updated);
    saveStoredProducts(updated);
    deleteProductFromSupabase(productId);
  };

  const handleSaveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    saveStoredConfig(newConfig);
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
