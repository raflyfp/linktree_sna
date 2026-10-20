"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteData } from "@/context/DataContext";
import { StoreLocation, PlatformType } from "@/types/store";
import { Product } from "@/types/product";
import {
  Store,
  Package,
  Phone,
  Code2,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Save,
  Check,
  Search,
  CheckCircle2,
  X,
  Copy,
  Layers,
  ArrowUpRight,
  Lock,
  LogOut,
  MapPin,
  Eye,
  EyeOff,
  Crosshair,
  ShieldCheck,
  KeyRound,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Upload,
  Image as ImageIcon
} from "lucide-react";

// Preset Kota Populer di Indonesia dengan koordinat peta terkalibrasi (viewBox 0 0 1000 400)
interface CityPreset {
  label: string;
  city: string;
  province: string;
  x: number;
  y: number;
}

const CITY_PRESETS: CityPreset[] = [
  { label: "⭐ Pasuruan (Pusat) - Jawa Timur", city: "Pasuruan", province: "Jawa Timur", x: 44.2, y: 75.5 },
  { label: "Surabaya - Jawa Timur", city: "Surabaya", province: "Jawa Timur", x: 43.5, y: 71.0 },
  { label: "Malang - Jawa Timur", city: "Malang", province: "Jawa Timur", x: 42.4, y: 72.5 },
  { label: "Jakarta - DKI Jakarta", city: "Jakarta", province: "DKI Jakarta", x: 20.8, y: 64.5 },
  { label: "Bandung - Jawa Barat", city: "Bandung", province: "Jawa Barat", x: 23.5, y: 71.5 },
  { label: "Semarang - Jawa Tengah", city: "Semarang", province: "Jawa Tengah", x: 31.0, y: 69.0 },
  { label: "Yogyakarta - DI Yogyakarta", city: "Yogyakarta", province: "DI Yogyakarta", x: 31.5, y: 76.0 },
  { label: "Solo / Surakarta - Jawa Tengah", city: "Solo", province: "Jawa Tengah", x: 34.0, y: 74.0 },
  { label: "Tarakan - Kalimantan Utara", city: "Tarakan", province: "Kalimantan Utara", x: 50.5, y: 19.5 },
  { label: "Balikpapan / IKN - Kalimantan Timur", city: "Balikpapan", province: "Kalimantan Timur", x: 48.0, y: 46.0 },
  { label: "Samarinda - Kalimantan Timur", city: "Samarinda", province: "Kalimantan Timur", x: 49.0, y: 42.0 },
  { label: "Pontianak - Kalimantan Barat", city: "Pontianak", province: "Kalimantan Barat", x: 32.5, y: 35.0 },
  { label: "Banjarmasin - Kalimantan Selatan", city: "Banjarmasin", province: "Kalimantan Selatan", x: 44.5, y: 56.0 },
  { label: "Medan - Sumatera Utara", city: "Medan", province: "Sumatera Utara", x: 7.5, y: 18.0 },
  { label: "Padang - Sumatera Barat", city: "Padang", province: "Sumatera Barat", x: 11.5, y: 35.0 },
  { label: "Palembang - Sumatera Selatan", city: "Palembang", province: "Sumatera Selatan", x: 18.5, y: 52.0 },
  { label: "Bandar Lampung - Lampung", city: "Bandar Lampung", province: "Lampung", x: 19.5, y: 60.0 },
  { label: "Makassar - Sulawesi Selatan", city: "Makassar", province: "Sulawesi Selatan", x: 56.0, y: 60.0 },
  { label: "Manado - Sulawesi Utara", city: "Manado", province: "Sulawesi Utara", x: 68.0, y: 15.0 },
  { label: "Denpasar - Bali", city: "Denpasar", province: "Bali", x: 49.0, y: 80.0 },
  { label: "Mataram - Lombok (NTB)", city: "Mataram", province: "Nusa Tenggara Barat", x: 52.0, y: 81.0 },
  { label: "Kupang - NTT", city: "Kupang", province: "Nusa Tenggara Timur", x: 66.0, y: 87.0 },
  { label: "Ambon - Maluku", city: "Ambon", province: "Maluku", x: 77.0, y: 50.0 },
  { label: "Jayapura - Papua", city: "Jayapura", province: "Papua", x: 94.0, y: 45.0 },
];

const DEFAULT_PRODUCT_IMAGES = [
  { label: "Polifix (Kemasan Baru)", url: "/images/products/polifix-kemasan-baru.svg" },
  { label: "Policrepe Perban Elastis", url: "/images/products/policrepe.svg" },
  { label: "Polidine Antiseptik Formula", url: "/images/products/polidine.svg" },
  { label: "Caressa Cotton Balls", url: "/images/products/caressa-cotton-balls.png" },
];

const DEFAULT_CHIBI_MASCOTS = [
  { label: "Polifix Jempol", url: "/images/products/polifix-chibi-thumbsup.png" },
  { label: "Polifix Peluk", url: "/images/products/polifix-chibi-hug.png" },
  { label: "Polifix Lari", url: "/images/products/polifix-chibi-running.png" },
  { label: "Poligyp Sorak", url: "/images/products/poligyp-chibi-cheer.png" },
  { label: "Poligyp Kuat", url: "/images/products/poligyp-chibi-strong.png" },
  { label: "Polidine Perisai", url: "/images/products/polidine-chibi-shield.png" },
  { label: "Polidine Jempol", url: "/images/products/polidine-chibi-thumbsup.png" },
  { label: "Tanpa Maskot", url: "" },
];

export default function AdminPage() {
  const {
    stores,
    products,
    config,
    isSupabaseConnected,
    saveStores,
    deleteStore,
    saveProducts,
    deleteProduct,
    saveConfig,
  } = useSiteData();

  // ================= AUTHENTICATION STATE =================
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Kredensial Admin default (tersimpan di localStorage)
  const [adminCreds, setAdminCreds] = useState({
    username: "admin",
    password: "adminpcstore",
  });

  useEffect(() => {
    // Cek sesi login di sessionStorage
    const authStatus = sessionStorage.getItem("pc_store_admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }

    // Ambil kredensial kustom jika pernah diubah
    const storedCreds = localStorage.getItem("pc_store_admin_creds");
    if (storedCreds) {
      try {
        setAdminCreds(JSON.parse(storedCreds));
      } catch (err) {
        console.error("Gagal membaca kredensial:", err);
      }
    }
    setAuthChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const inputUser = loginUsername.trim();
    const inputPass = loginPassword.trim();

    if (inputUser === adminCreds.username && inputPass === adminCreds.password) {
      sessionStorage.setItem("pc_store_admin_auth", "true");
      setIsAuthenticated(true);
      showToast("Selamat datang di Admin Panel!");
    } else {
      setLoginError("Username atau password salah. Silakan coba lagi.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("pc_store_admin_auth");
    setIsAuthenticated(false);
    setLoginUsername("");
    setLoginPassword("");
  };

  // ================= ADMIN DASHBOARD STATE =================
  const [activeTab, setActiveTab] = useState<"stores" | "products" | "contact" | "backup">("stores");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // ================= STORES LOGIC & PIN PICKER WITH ZOOM =================
  const [storeSearch, setStoreSearch] = useState("");
  const [storeFilterPlatform, setStoreFilterPlatform] = useState<string>("all");
  const [editingStore, setEditingStore] = useState<StoreLocation | null>(null);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  // Map Zoom State (1x to 3x)
  const [mapZoom, setMapZoom] = useState<number>(1);
  const miniMapContainerRef = useRef<HTMLDivElement>(null);
  const miniMapInnerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setMapZoom((prev) => Math.min(3, Math.round((prev + 0.5) * 10) / 10));
  const handleZoomOut = () => setMapZoom((prev) => Math.max(1, Math.round((prev - 0.5) * 10) / 10));
  const handleResetZoom = () => setMapZoom(1);

  const handleFocusRegion = (region: "jawa" | "sumatera" | "kalimantan" | "sulawesi" | "bali" | "papua") => {
    setMapZoom(2.2);
    setTimeout(() => {
      if (!miniMapContainerRef.current) return;
      const container = miniMapContainerRef.current;
      const scrollW = container.scrollWidth;
      const scrollH = container.scrollHeight;

      switch (region) {
        case "jawa":
          container.scrollLeft = scrollW * 0.28;
          container.scrollTop = scrollH * 0.55;
          break;
        case "sumatera":
          container.scrollLeft = 0;
          container.scrollTop = scrollH * 0.15;
          break;
        case "kalimantan":
          container.scrollLeft = scrollW * 0.35;
          container.scrollTop = scrollH * 0.15;
          break;
        case "sulawesi":
          container.scrollLeft = scrollW * 0.52;
          container.scrollTop = scrollH * 0.35;
          break;
        case "bali":
          container.scrollLeft = scrollW * 0.44;
          container.scrollTop = scrollH * 0.65;
          break;
        case "papua":
          container.scrollLeft = scrollW * 0.82;
          container.scrollTop = scrollH * 0.35;
          break;
      }
    }, 60);
  };

  // Form store state
  const defaultStoreForm: StoreLocation = {
    id: "",
    name: "",
    branchName: "",
    city: "Pasuruan",
    province: "Jawa Timur",
    platform: "shopee",
    platformLabel: "Shopee Official",
    url: "",
    isPusat: false,
    badge: "Official Branch",
    description: "",
    chibiImage: "/images/products/polifix-chibi-thumbsup.png",
    deliverySpeed: "Siap Kirim Kilat Hari Ini",
    promoText: "Katalog Lengkap & Garansi Resmi",
    rating: "4.9",
    mapCoordinates: { x: 44.2, y: 75.5 },
  };

  const [storeFormData, setStoreFormData] = useState<StoreLocation>(defaultStoreForm);

  const openAddStoreModal = () => {
    setEditingStore(null);
    setStoreFormData({
      ...defaultStoreForm,
      id: `pc-store-${Date.now()}`,
    });
    setMapZoom(1);
    setIsStoreModalOpen(true);
  };

  const openEditStoreModal = (store: StoreLocation) => {
    setEditingStore(store);
    setStoreFormData({
      ...store,
      mapCoordinates: store.mapCoordinates || { x: 50, y: 50 },
    });
    setMapZoom(1);
    setIsStoreModalOpen(true);
  };

  // Handler klik langsung pada Peta Mini (mendukung tingkat Zoom apapun!)
  const handleMiniMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!miniMapInnerRef.current) return;
    const rect = miniMapInnerRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const roundedX = Math.round(Math.min(100, Math.max(0, clickX)) * 10) / 10;
    const roundedY = Math.round(Math.min(100, Math.max(0, clickY)) * 10) / 10;

    setStoreFormData((prev) => ({
      ...prev,
      mapCoordinates: { x: roundedX, y: roundedY },
    }));
  };

  // Handler memilih preset kota cepat
  const handleSelectCityPreset = (presetLabel: string) => {
    const found = CITY_PRESETS.find((p) => p.label === presetLabel);
    if (!found) return;

    setStoreFormData((prev) => ({
      ...prev,
      city: found.city,
      province: found.province,
      branchName: prev.branchName ? prev.branchName : `Cabang ${found.city}`,
      name: prev.name ? prev.name : `Toko Shopee ${found.city}`,
      isPusat: found.city === "Pasuruan",
      mapCoordinates: { x: found.x, y: found.y },
    }));
  };

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeFormData.name.trim() || !storeFormData.url.trim()) {
      alert("Nama toko dan URL wajib diisi!");
      return;
    }

    let updatedStores: StoreLocation[];
    if (editingStore) {
      updatedStores = stores.map((s) => (s.id === editingStore.id ? storeFormData : s));
      showToast(`Toko "${storeFormData.name}" berhasil diperbarui!`);
    } else {
      updatedStores = [...stores, storeFormData];
      showToast(`Toko baru "${storeFormData.name}" berhasil ditambahkan!`);
    }

    saveStores(updatedStores);
    setIsStoreModalOpen(false);
  };

  const handleDeleteStore = (storeId: string, storeName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus toko "${storeName}"?`)) {
      deleteStore(storeId);
      showToast(`Toko "${storeName}" berhasil dihapus.`);
    }
  };

  const filteredStores = stores.filter((store) => {
    const matchesPlatform = storeFilterPlatform === "all" || store.platform === storeFilterPlatform;
    const matchesSearch =
      store.name.toLowerCase().includes(storeSearch.toLowerCase()) ||
      store.city.toLowerCase().includes(storeSearch.toLowerCase()) ||
      store.province.toLowerCase().includes(storeSearch.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  // ================= PRODUCTS STATE, UPLOAD & LOGIC =================
  const [productSearch, setProductSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const defaultProductForm: Product = {
    id: "",
    name: "",
    slug: "",
    category: "Plester Fiksasi Medis",
    shortDescription: "",
    isBestSeller: true,
    badge: "Best Seller",
    imageUrl: "/images/products/polifix-kemasan-baru.svg",
    chibiMascot: "/images/products/polifix-chibi-thumbsup.png",
    isPlaceholder: false,
    targetBranchId: "pc-pusat-pasuruan-shopee",
    features: ["Kualitas Terjamin", "Standar Medis"],
    chibiQuote: "Produk andalan untuk perawatan medis optimal!",
    rating: "4.9/5.0",
    soldCount: "1rb+ Terjual",
  };

  const [productFormData, setProductFormData] = useState<Product>(defaultProductForm);
  const [productFeaturesInput, setProductFeaturesInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mascotFileInputRef = useRef<HTMLInputElement>(null);

  // Handler Upload Gambar Kemasan Produk
  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2.5 * 1024 * 1024) {
      alert("Ukuran gambar terlalu besar! Maksimal 2.5MB agar penyimpanan browser tetap cepat.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Str = reader.result as string;
      setProductFormData((prev) => ({
        ...prev,
        imageUrl: base64Str,
      }));
      showToast("Foto produk berhasil di-upload!");
    };
    reader.readAsDataURL(file);
  };

  // Handler Upload Gambar Maskot Chibi
  const handleMascotImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran maskot maksimal 2MB!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Str = reader.result as string;
      setProductFormData((prev) => ({
        ...prev,
        chibiMascot: base64Str,
      }));
      showToast("Gambar maskot berhasil di-upload!");
    };
    reader.readAsDataURL(file);
  };

  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductFormData({
      ...defaultProductForm,
      id: `prod-${Date.now()}`,
      slug: `produk-${Date.now()}`,
    });
    setProductFeaturesInput("Kualitas Terjamin, Standar Medis");
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductFormData({ ...product });
    setProductFeaturesInput((product.features || []).join(", "));
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.name.trim()) {
      alert("Nama produk wajib diisi!");
      return;
    }

    if (!productFormData.imageUrl.trim()) {
      alert("Foto produk wajib di-upload atau dipilih!");
      return;
    }

    const featuresArray = productFeaturesInput
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const payload: Product = {
      ...productFormData,
      slug: productFormData.slug || productFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      features: featuresArray,
    };

    let updatedProducts: Product[];
    if (editingProduct) {
      updatedProducts = products.map((p) => (p.id === editingProduct.id ? payload : p));
      showToast(`Produk "${payload.name}" berhasil diperbarui!`);
    } else {
      updatedProducts = [...products, payload];
      showToast(`Produk baru "${payload.name}" berhasil ditambahkan!`);
    }

    saveProducts(updatedProducts);
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${productName}"?`)) {
      deleteProduct(productId);
      showToast(`Produk "${productName}" berhasil dihapus.`);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  // ================= CONTACT & PASSWORD CONFIG =================
  const [configFormData, setConfigFormData] = useState({
    brandName: config.brandName || "PC Store",
    tagline: config.tagline || "",
    description: config.description || "",
    waPhoneNumber: config.adminWhatsApp?.phoneNumber || "",
    waDefaultMessage: config.adminWhatsApp?.defaultMessage || "",
    tiktok: config.socials?.tiktok || "",
    shopeePusat: config.socials?.shopeePusat || "",
    instagram: config.socials?.instagram || "",
  });

  const [passwordChangeData, setPasswordChangeData] = useState({
    newUsername: adminCreds.username,
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveContactConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedConfig = {
      ...config,
      brandName: configFormData.brandName,
      tagline: configFormData.tagline,
      description: configFormData.description,
      adminWhatsApp: {
        phoneNumber: configFormData.waPhoneNumber.replace(/[^0-9]/g, ""),
        defaultMessage: configFormData.waDefaultMessage,
        isAvailable: configFormData.waPhoneNumber.trim().length > 0,
      },
      socials: {
        tiktok: configFormData.tiktok,
        shopeePusat: configFormData.shopeePusat,
        instagram: configFormData.instagram,
      },
    };
    saveConfig(updatedConfig);

    // Update password jika diisi
    if (passwordChangeData.newPassword.trim()) {
      if (passwordChangeData.newPassword !== passwordChangeData.confirmPassword) {
        alert("Konfirmasi password baru tidak cocok!");
        return;
      }
      const newCreds = {
        username: passwordChangeData.newUsername.trim() || adminCreds.username,
        password: passwordChangeData.newPassword.trim(),
      };
      setAdminCreds(newCreds);
      localStorage.setItem("pc_store_admin_creds", JSON.stringify(newCreds));
      setPasswordChangeData({ newUsername: newCreds.username, newPassword: "", confirmPassword: "" });
      showToast("Pengaturan kontak & password admin berhasil diperbarui!");
      return;
    }

    showToast("Pengaturan kontak & brand berhasil disimpan!");
  };

  // ================= BACKUP & EXPORT LOGIC =================
  const [rawJsonCopied, setRawJsonCopied] = useState(false);
  const rawDataJson = JSON.stringify(
    {
      stores,
      products,
      config,
    },
    null,
    2
  );

  const handleCopyRawJson = () => {
    navigator.clipboard.writeText(rawDataJson);
    setRawJsonCopied(true);
    showToast("JSON data berhasil disalin ke clipboard!");
    setTimeout(() => setRawJsonCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([rawDataJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pc-store-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("File cadangan JSON berhasil diunduh!");
  };

  // ================= TAMPILAN LOADING / AUTH CHECK =================
  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="text-slate-500 text-sm font-medium">Memeriksa hak akses admin...</div>
      </div>
    );
  }

  // ================= TAMPILAN LOGIN (JIKA BELUM LOGIN) =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-300 rounded shadow-sm p-6 sm:p-8 space-y-6">
          {/* Header Login */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-slate-900 text-white rounded flex items-center justify-center mx-auto text-xl font-bold">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-xs text-slate-500">
              Silakan masukkan kredensial untuk mengakses panel admin PC Store
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Masukkan username admin"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Masukkan password admin"
                  className="w-full pl-3 pr-10 py-2 text-sm bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-sm transition-colors"
            >
              Masuk ke Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= TAMPILAN DASHBOARD ADMIN (SETELAH LOGIN) =================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-700 text-white px-4 py-3 rounded shadow-md flex items-center gap-2 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar / Header: Flat Solid Charcoal Slate */}
      <header className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-blue-600 flex items-center justify-center font-bold text-lg text-white">
              PC
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight">Admin Panel</h1>
                <span className="text-[10px] bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Terautentikasi</span>
                </span>
                {isSupabaseConnected ? (
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Supabase Terhubung</span>
                  </span>
                ) : (
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Mode Lokal (.env.local)</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Akses khusus kelola marketplace, posisi pin peta, produk &amp; WhatsApp
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded flex items-center gap-1.5"
            >
              <span>Lihat Halaman Utama</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900 border border-rose-800 rounded flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Quick Stats Cards: Flat & Clean */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded p-4">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Toko Marketplace</span>
              <Store className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{stores.length}</div>
            <p className="text-xs text-slate-500 mt-1">
              {stores.filter((s) => s.platform === "shopee").length} Shopee •{" "}
              {stores.filter((s) => s.platform === "tiktok").length} TikTok
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded p-4">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Toko Pusat Utama</span>
              <Layers className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {stores.filter((s) => s.isPusat).length}
            </div>
            <p className="text-xs text-slate-500 mt-1">Pasuruan, Jawa Timur</p>
          </div>

          <div className="bg-white border border-slate-200 rounded p-4">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Produk Unggulan</span>
              <Package className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{products.length}</div>
            <p className="text-xs text-slate-500 mt-1">
              {products.filter((p) => p.isBestSeller).length} Berstatus Best Seller
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded p-4">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Kontak WhatsApp</span>
              <Phone className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-sm font-bold text-slate-900 truncate mt-1">
              {config.adminWhatsApp?.phoneNumber?.trim()
                ? `+${config.adminWhatsApp.phoneNumber}`
                : "Belum Dikonfigurasi"}
            </div>
            <span
              className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded mt-1.5 ${config.adminWhatsApp?.phoneNumber?.trim()
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
                }`}
            >
              {config.adminWhatsApp?.phoneNumber?.trim() ? "Aktif (wa.me)" : "Fallback ke Toko Pusat"}
            </span>
          </div>
        </section>

        {/* Tab Navigation: Flat Solid Buttons */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("stores")}
            className={`px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 transition-colors ${activeTab === "stores"
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
          >
            <Store className="w-4 h-4" />
            <span>Cabang &amp; Toko Marketplace ({stores.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 transition-colors ${activeTab === "products"
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
          >
            <Package className="w-4 h-4" />
            <span>Produk Unggulan ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("contact")}
            className={`px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 transition-colors ${activeTab === "contact"
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
          >
            <Phone className="w-4 h-4" />
            <span>Pengaturan WhatsApp, Brand &amp; Password</span>
          </button>

          <button
            onClick={() => setActiveTab("backup")}
            className={`px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 transition-colors ${activeTab === "backup"
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Cadangan Data &amp; JSON</span>
          </button>
        </div>

        {/* ================= TAB 1: STORES ================= */}
        {activeTab === "stores" && (
          <section className="space-y-4">
            {/* Action Bar */}
            <div className="bg-white border border-slate-200 rounded p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1 max-w-xl">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={storeSearch}
                    onChange={(e) => setStoreSearch(e.target.value)}
                    placeholder="Cari nama toko, kota, provinsi..."
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <select
                  value={storeFilterPlatform}
                  onChange={(e) => setStoreFilterPlatform(e.target.value)}
                  className="px-3 py-2 text-sm bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-blue-600"
                >
                  <option value="all">Semua Platform</option>
                  <option value="shopee">Shopee</option>
                  <option value="tiktok">TikTok</option>
                  <option value="tokopedia">Tokopedia</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>

              <button
                onClick={openAddStoreModal}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded flex items-center justify-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Toko &amp; Atur Pin Peta</span>
              </button>
            </div>

            {/* Stores Table: Flat Style */}
            <div className="bg-white border border-slate-200 rounded overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Platform</th>
                      <th className="py-3 px-4">Nama Toko &amp; Cabang</th>
                      <th className="py-3 px-4">Kota / Provinsi</th>
                      <th className="py-3 px-4">Posisi Pin Peta</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Tautan Link</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredStores.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-500">
                          Tidak ada toko marketplace yang sesuai pencarian.
                        </td>
                      </tr>
                    ) : (
                      filteredStores.map((store) => (
                        <tr key={store.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span
                              className={`inline-block px-2 py-0.5 text-xs font-bold rounded ${store.platform === "shopee"
                                ? "bg-orange-100 text-orange-800"
                                : store.platform === "tiktok"
                                  ? "bg-slate-900 text-white"
                                  : store.platform === "tokopedia"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-slate-200 text-slate-800"
                                }`}
                            >
                              {store.platform.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-900">{store.name}</div>
                            <div className="text-xs text-slate-500">{store.branchName}</div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="font-medium text-slate-800">{store.city}</div>
                            <div className="text-xs text-slate-500">{store.province}</div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700 border border-slate-200">
                              <MapPin className="w-3 h-3 text-red-500" />
                              <span>X: {store.mapCoordinates?.x ?? 50}% | Y: {store.mapCoordinates?.y ?? 50}%</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            {store.isPusat ? (
                              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded">
                                Toko Pusat
                              </span>
                            ) : (
                              <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2 py-0.5 rounded border border-slate-200">
                                Cabang
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 max-w-xs truncate">
                            <a
                              href={store.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 truncate"
                              title={store.url}
                            >
                              <span className="truncate">{store.url}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => openEditStoreModal(store)}
                                className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded"
                                title="Edit Toko &amp; Pin"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteStore(store.id, store.name)}
                                className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded"
                                title="Hapus Toko"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ================= TAB 2: PRODUCTS ================= */}
        {activeTab === "products" && (
          <section className="space-y-4">
            <div className="bg-white border border-slate-200 rounded p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Cari nama produk atau kategori..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                onClick={openAddProductModal}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded flex items-center justify-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Produk &amp; Upload Gambar</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-slate-200 rounded p-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Thumbnail Image Box */}
                    <div className="relative aspect-4/3 w-full bg-slate-50 border border-slate-200 rounded flex items-center justify-center overflow-hidden p-2">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 text-xs">
                          <ImageIcon className="w-8 h-8 mb-1" />
                          <span>Belum ada foto</span>
                        </div>
                      )}

                      {/* Floating Chibi Companion Preview */}
                      {product.chibiMascot && (
                        <div className="absolute bottom-1 right-1 w-10 h-10">
                          <img
                            src={product.chibiMascot}
                            alt="Maskot"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {product.category}
                      </span>
                      {product.isBestSeller && (
                        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded">
                          Best Seller
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">{product.name}</h3>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {product.shortDescription || "Tidak ada deskripsi"}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                      <span>⭐ {product.rating || "5.0"}</span>
                      <span>•</span>
                      <span>{product.soldCount || "0 Terjual"}</span>
                    </div>

                    {product.features && product.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {product.features.map((f, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200 text-xs">
                    <span className="text-slate-400 text-[11px] font-mono">ID: {product.id}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditProductModal(product)}
                        className="px-2.5 py-1 text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 rounded font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        className="px-2.5 py-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= TAB 3: CONTACT & BRAND & PASSWORD CONFIG ================= */}
        {activeTab === "contact" && (
          <section className="bg-white border border-slate-200 rounded p-6 max-w-3xl mx-auto">
            <h2 className="text-base font-bold text-slate-900 mb-1">
              Pengaturan Kontak WhatsApp, Brand &amp; Keamanan Admin
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Pengaturan nomor WhatsApp ini otomatis tersambung ke tombol mengambang (Floating WhatsApp) di halaman utama.
            </p>

            <form onSubmit={handleSaveContactConfig} className="space-y-6">
              {/* WhatsApp Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Kontak WhatsApp Resmi Admin</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nomor WhatsApp (Gunakan awalan kode negara tanpa +, contoh: 6281234567890)
                  </label>
                  <input
                    type="text"
                    value={configFormData.waPhoneNumber}
                    onChange={(e) =>
                      setConfigFormData({ ...configFormData, waPhoneNumber: e.target.value })
                    }
                    placeholder="Contoh: 6281234567890 (kosongkan jika ingin diarahkan ke chat toko)"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Catatan: Jika nomor dikosongkan, tombol WhatsApp akan otomatis mengarahkan pengunjung ke chat toko Shopee PC Pusat Pasuruan.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pesan Otomatis WhatsApp Saat Pengunjung Klik
                  </label>
                  <textarea
                    rows={2}
                    value={configFormData.waDefaultMessage}
                    onChange={(e) =>
                      setConfigFormData({ ...configFormData, waDefaultMessage: e.target.value })
                    }
                    placeholder="Contoh: Halo Admin PC Store, saya ingin bertanya seputar ketersediaan produk..."
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                {configFormData.waPhoneNumber.trim() && (
                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href={`https://wa.me/${configFormData.waPhoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        configFormData.waDefaultMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Uji Coba Tautan WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Social Media Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Tautan Media Sosial &amp; Toko Utama</h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    URL TikTok Shop Resmi
                  </label>
                  <input
                    type="url"
                    value={configFormData.tiktok}
                    onChange={(e) => setConfigFormData({ ...configFormData, tiktok: e.target.value })}
                    placeholder="https://tk.tokopedia.com/..."
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    URL Toko Shopee PC Pusat Pasuruan
                  </label>
                  <input
                    type="url"
                    value={configFormData.shopeePusat}
                    onChange={(e) =>
                      setConfigFormData({ ...configFormData, shopeePusat: e.target.value })
                    }
                    placeholder="https://s.shopee.co.id/..."
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    URL Akun Instagram (Opsional)
                  </label>
                  <input
                    type="url"
                    value={configFormData.instagram}
                    onChange={(e) =>
                      setConfigFormData({ ...configFormData, instagram: e.target.value })
                    }
                    placeholder="https://instagram.com/..."
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Password Admin Change */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <KeyRound className="w-4 h-4 text-blue-600" />
                  <span>Keamanan Akun Admin (Ubah Password)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Username Admin
                    </label>
                    <input
                      type="text"
                      value={passwordChangeData.newUsername}
                      onChange={(e) =>
                        setPasswordChangeData({ ...passwordChangeData, newUsername: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password Baru (Kosongkan jika tidak diubah)
                    </label>
                    <input
                      type="password"
                      value={passwordChangeData.newPassword}
                      onChange={(e) =>
                        setPasswordChangeData({ ...passwordChangeData, newPassword: e.target.value })
                      }
                      placeholder="Minimal 6 karakter"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                {passwordChangeData.newPassword.trim() && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ulangi Password Baru
                    </label>
                    <input
                      type="password"
                      value={passwordChangeData.confirmPassword}
                      onChange={(e) =>
                        setPasswordChangeData({ ...passwordChangeData, confirmPassword: e.target.value })
                      }
                      placeholder="Ketik ulang password baru"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Pengaturan</span>
                </button>
              </div>
            </form>
          </section>
        )}

        {/* ================= TAB 4: BACKUP, SUPABASE & RAW JSON ================= */}
        {activeTab === "backup" && (
          <section className="bg-white border border-slate-200 rounded p-6 max-w-4xl mx-auto space-y-6">
            {/* Supabase Cloud Connection Card */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    SB
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Database Cloud Supabase</h3>
                    <p className="text-xs text-slate-500">
                      Sinkronkan data toko, pin peta, dan produk langsung ke cloud PostgreSQL Supabase.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isSupabaseConnected ? (
                    <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      <span>Terhubung ke Supabase</span>
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      <span>Belum Terhubung (Mode Lokal)</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Instructions steps */}
              <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                <p className="font-semibold text-slate-800">Cara Menghubungkan ke Supabase:</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-600">
                  <li>Buat proyek baru di <strong>supabase.com</strong>.</li>
                  <li>Buka menu <strong>SQL Editor</strong> di dashboard Supabase.</li>
                  <li>Salin dan jalankan skrip dari file <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">supabase-schema.sql</code>.</li>
                  <li>Buka file <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">.env.local</code> di folder project ini, lalu masukkan URL dan Anon Key Anda.</li>
                  <li>Restart dev server (<code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">npm run dev</code>). Data akan otomatis tersimpan di cloud!</li>
                </ol>
              </div>
            </div>

            {/* JSON Backup Card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Data Cadangan (JSON Backup &amp; Sinkronisasi)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Salin atau unduh data saat ini untuk disimpan sebagai arsip atau di-commit ke file repositori.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyRawJson}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold flex items-center gap-1.5"
                >
                  {rawJsonCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{rawJsonCopied ? "Tersalin!" : "Salin JSON"}</span>
                </button>

                <button
                  onClick={handleDownloadJson}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>Unduh File .json</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <textarea
                readOnly
                value={rawDataJson}
                rows={14}
                className="w-full p-4 font-mono text-xs bg-slate-900 text-slate-200 rounded border border-slate-800 focus:outline-none"
              />
            </div>
          </section>
        )}
      </main>

      {/* ================= MODAL TAMBAH / EDIT TOKO & PIN PETA DENGAN ZOOM ================= */}
      {isStoreModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-300 rounded max-w-3xl w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  {editingStore ? "Edit Toko & Posisi Pin Peta" : "Tambah Toko Baru & Tentukan Pin Peta"}
                </h3>
                <p className="text-xs text-slate-500">
                  Gunakan tombol perbesar/zoom untuk menaruh pin di pulau secara akurat, atau pilih preset kota.
                </p>
              </div>
              <button
                onClick={() => setIsStoreModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStore} className="space-y-4 text-sm">
              {/* === VISUAL PIN MAP PICKER SECTION WITH ZOOM === */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Crosshair className="w-4 h-4 text-red-600" />
                    <span>Pilih Posisi Pin pada Peta Indonesia</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Zoom Controls */}
                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded p-0.5 shadow-2xs">
                      <button
                        type="button"
                        onClick={handleZoomOut}
                        disabled={mapZoom <= 1}
                        title="Perkecil Peta"
                        className="p-1 text-slate-600 hover:text-blue-600 hover:bg-slate-100 disabled:opacity-40 rounded"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] font-mono px-1 text-slate-700 font-bold min-w-8 text-center">
                        {mapZoom}x
                      </span>
                      <button
                        type="button"
                        onClick={handleZoomIn}
                        disabled={mapZoom >= 3}
                        title="Perbesar Peta (Zoom In)"
                        className="p-1 text-slate-600 hover:text-blue-600 hover:bg-slate-100 disabled:opacity-40 rounded"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleResetZoom}
                        title="Reset Ukuran Normal (1x)"
                        className="p-1 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded border-l border-slate-200 ml-0.5"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">
                      Pin: <strong className="text-blue-600">X: {storeFormData.mapCoordinates.x}%</strong> | <strong className="text-blue-600">Y: {storeFormData.mapCoordinates.y}%</strong>
                    </div>
                  </div>
                </div>

                {/* Quick Region Focus Shortcuts */}


                {/* Preset Dropdown */}
                {/* <div>
                  <select
                    onChange={(e) => handleSelectCityPreset(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    defaultValue=""
                  >
                    <option value="" disabled>-- Atau Pilih Cepat dari 24 Kota Populer --</option>
                    {CITY_PRESETS.map((preset) => (
                      <option key={preset.label} value={preset.label}>
                        {preset.label}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* Scrollable / Draggable Zoomable Mini Map Container */}
                <div
                  ref={miniMapContainerRef}
                  className="relative w-full max-h-[290px] overflow-auto bg-slate-200 border-2 border-slate-300 rounded scrollbar-thin select-none"
                >
                  <div
                    ref={miniMapInnerRef}
                    onClick={handleMiniMapClick}
                    style={{
                      width: `${mapZoom * 100}%`,
                      aspectRatio: "2.5 / 1",
                    }}
                    className="relative cursor-crosshair min-w-full origin-top-left"
                    title="Klik di mana saja pada peta untuk meletakkan pin lokasi"
                  >
                    {/* Underlying Map Image */}
                    <img
                      src="/images/indonesia-cartoon-map.png"
                      alt="Peta Indonesia"
                      className="w-full h-full object-fill pointer-events-none"
                    />

                    {/* Pin Marker on Clicked Position */}
                    <div
                      className="absolute -translate-x-1/2 -translate-y-full pointer-events-none transition-all duration-150 z-20"
                      style={{
                        left: `${storeFormData.mapCoordinates.x}%`,
                        top: `${storeFormData.mapCoordinates.y}%`,
                      }}
                    >
                      <div className="relative flex flex-col items-center">
                        {/* Pin label badge */}
                        <span className="text-[9px] font-bold bg-slate-900 text-white px-1.5 py-0.2 rounded shadow-md whitespace-nowrap mb-0.5">
                          {storeFormData.city || "Pin Lokasi"}
                        </span>
                        {/* Red Map Pin SVG */}
                        <div className="w-6 h-6 text-red-600 drop-shadow-md">
                          <MapPin className="w-full h-full fill-red-600 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help tip & Fine Tuning Sliders */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-600 gap-2">
                  <span className="text-slate-500">
                    💡 <em>Gunakan tombol zoom (+) jika ingin mengeklik lokasi pulau yang lebih detail dan presisi.</em>
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">X:</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.5"
                        value={storeFormData.mapCoordinates.x}
                        onChange={(e) =>
                          setStoreFormData({
                            ...storeFormData,
                            mapCoordinates: {
                              ...storeFormData.mapCoordinates,
                              x: parseFloat(e.target.value),
                            },
                          })
                        }
                        className="w-20 cursor-pointer"
                      />
                      <span className="font-mono">{storeFormData.mapCoordinates.x}%</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Y:</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.5"
                        value={storeFormData.mapCoordinates.y}
                        onChange={(e) =>
                          setStoreFormData({
                            ...storeFormData,
                            mapCoordinates: {
                              ...storeFormData.mapCoordinates,
                              y: parseFloat(e.target.value),
                            },
                          })
                        }
                        className="w-20 cursor-pointer"
                      />
                      <span className="font-mono">{storeFormData.mapCoordinates.y}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Input Toko */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Platform</label>
                  <select
                    value={storeFormData.platform}
                    onChange={(e) => {
                      const plat = e.target.value as PlatformType;
                      setStoreFormData({
                        ...storeFormData,
                        platform: plat,
                        platformLabel:
                          plat === "shopee"
                            ? "Shopee Official"
                            : plat === "tiktok"
                              ? "TikTok Shop"
                              : plat === "tokopedia"
                                ? "Tokopedia Official"
                                : "Official Store",
                      });
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                  >
                    <option value="shopee">Shopee</option>
                    <option value="tiktok">TikTok</option>
                    <option value="tokopedia">Tokopedia</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Label Platform
                  </label>
                  <input
                    type="text"
                    value={storeFormData.platformLabel}
                    onChange={(e) =>
                      setStoreFormData({ ...storeFormData, platformLabel: e.target.value })
                    }
                    placeholder="Shopee Official / TikTok Shop"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Toko Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={storeFormData.name}
                  onChange={(e) => setStoreFormData({ ...storeFormData, name: e.target.value })}
                  placeholder="Contoh: Toko Shopee Surabaya"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Cabang Singkat
                  </label>
                  <input
                    type="text"
                    required
                    value={storeFormData.branchName}
                    onChange={(e) =>
                      setStoreFormData({ ...storeFormData, branchName: e.target.value })
                    }
                    placeholder="Contoh: Cabang Surabaya"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kota</label>
                  <input
                    type="text"
                    required
                    value={storeFormData.city}
                    onChange={(e) => setStoreFormData({ ...storeFormData, city: e.target.value })}
                    placeholder="Contoh: Surabaya"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Provinsi</label>
                  <input
                    type="text"
                    required
                    value={storeFormData.province}
                    onChange={(e) =>
                      setStoreFormData({ ...storeFormData, province: e.target.value })
                    }
                    placeholder="Contoh: Jawa Timur"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Badge</label>
                  <input
                    type="text"
                    value={storeFormData.badge || ""}
                    onChange={(e) => setStoreFormData({ ...storeFormData, badge: e.target.value })}
                    placeholder="Contoh: Cabang Jawa Timur"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL Toko Marketplace
                </label>
                <input
                  type="url"
                  required
                  value={storeFormData.url}
                  onChange={(e) => setStoreFormData({ ...storeFormData, url: e.target.value })}
                  placeholder="https://shopee.co.id/... atau https://tk.tokopedia.com/..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={2}
                  value={storeFormData.description || ""}
                  onChange={(e) =>
                    setStoreFormData({ ...storeFormData, description: e.target.value })
                  }
                  placeholder="Keterangan jangkauan pengiriman atau keunggulan cabang..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPusatCheck"
                  checked={Boolean(storeFormData.isPusat)}
                  onChange={(e) =>
                    setStoreFormData({ ...storeFormData, isPusat: e.target.checked })
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isPusatCheck" className="text-xs font-semibold text-slate-800 cursor-pointer">
                  Tandai sebagai Kantor Pusat Utama (Pasuruan)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsStoreModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Simpan Toko &amp; Pin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL TAMBAH / EDIT PRODUK DENGAN FITUR UPLOAD GAMBAR ================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-300 rounded max-w-xl w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingProduct ? "Edit Produk Medis" : "Tambah Produk Medis Baru"}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-sm">
              {/* === SECTION UPLOAD FOTO PRODUK === */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-3">
                <label className="block text-xs font-bold text-slate-800">
                  Foto Kemasan Produk Utama
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Image Preview Box */}
                  <div className="relative w-28 h-28 bg-white border-2 border-dashed border-slate-300 rounded flex items-center justify-center overflow-hidden shrink-0">
                    {productFormData.imageUrl ? (
                      <img
                        src={productFormData.imageUrl}
                        alt="Preview Produk"
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <div className="text-center p-2 text-slate-400">
                        <ImageIcon className="w-6 h-6 mx-auto mb-1" />
                        <span className="text-[10px] block">Belum ada foto</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-2 w-full">
                    {/* Hidden Native File Input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleProductImageUpload}
                      accept="image/png, image/jpeg, image/webp, image/svg+xml"
                      className="hidden"
                    />

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Foto dari Komputer</span>
                      </button>

                      {productFormData.imageUrl && (
                        <button
                          type="button"
                          onClick={() => setProductFormData({ ...productFormData, imageUrl: "" })}
                          className="px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 rounded font-medium"
                        >
                          Hapus Foto
                        </button>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500">
                      Mendukung format PNG, JPG, WEBP, atau SVG (Maks. 2.5MB).
                    </p>

                    {/* Quick Preset Selector */}
                    <div>
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            setProductFormData({ ...productFormData, imageUrl: e.target.value });
                          }
                        }}
                        className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded text-slate-700 focus:outline-none focus:border-blue-600"
                        defaultValue=""
                      >
                        <option value="" disabled>-- Atau pilih foto kemasan bawaan PC Store --</option>
                        {DEFAULT_PRODUCT_IMAGES.map((img) => (
                          <option key={img.url} value={img.url}>
                            {img.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={productFormData.name}
                  onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  placeholder="Contoh: Polifix (Kemasan Baru)"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                  <input
                    type="text"
                    required
                    value={productFormData.category}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, category: e.target.value })
                    }
                    placeholder="Plester Fiksasi Medis"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Badge</label>
                  <input
                    type="text"
                    value={productFormData.badge || ""}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, badge: e.target.value })
                    }
                    placeholder="Best Seller • Kemasan Baru"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={2}
                  required
                  value={productFormData.shortDescription}
                  onChange={(e) =>
                    setProductFormData({ ...productFormData, shortDescription: e.target.value })
                  }
                  placeholder="Keterangan fungsi dan keunggulan pemakaian produk..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rating (Teks)
                  </label>
                  <input
                    type="text"
                    value={productFormData.rating || "4.9/5.0"}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, rating: e.target.value })
                    }
                    placeholder="4.9/5.0"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jumlah Terjual (Teks)
                  </label>
                  <input
                    type="text"
                    value={productFormData.soldCount || "10rb+ Terjual"}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, soldCount: e.target.value })
                    }
                    placeholder="10rb+ Terjual"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fitur Keunggulan (Pisahkan dengan tanda koma)
                </label>
                <input
                  type="text"
                  value={productFeaturesInput}
                  onChange={(e) => setProductFeaturesInput(e.target.value)}
                  placeholder="Daya Rekat Optimal, Ramah Kulit, Elastisitas Nyaman"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Karakter Maskot Pendamping (Opsional) */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2">
                <label className="block text-xs font-semibold text-slate-800">
                  Maskot Chibi Pendamping (Opsional)
                </label>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white border border-slate-300 rounded flex items-center justify-center shrink-0 overflow-hidden">
                    {productFormData.chibiMascot ? (
                      <img
                        src={productFormData.chibiMascot}
                        alt="Maskot"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-[10px] text-slate-400">Kosong</span>
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <input
                      type="file"
                      ref={mascotFileInputRef}
                      onChange={handleMascotImageUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => mascotFileInputRef.current?.click()}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-medium flex items-center gap-1"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload Maskot</span>
                      </button>

                      <select
                        onChange={(e) =>
                          setProductFormData({ ...productFormData, chibiMascot: e.target.value })
                        }
                        className="px-2 py-1 text-xs bg-white border border-slate-300 rounded text-slate-700"
                        value={productFormData.chibiMascot || ""}
                      >
                        <option value="">Pilih Preset Maskot...</option>
                        {DEFAULT_CHIBI_MASCOTS.map((m) => (
                          <option key={m.label} value={m.url}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isBestSellerCheck"
                  checked={Boolean(productFormData.isBestSeller)}
                  onChange={(e) =>
                    setProductFormData({ ...productFormData, isBestSeller: e.target.checked })
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="isBestSellerCheck"
                  className="text-xs font-semibold text-slate-800 cursor-pointer"
                >
                  Tampilkan sebagai Produk Best Seller
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
