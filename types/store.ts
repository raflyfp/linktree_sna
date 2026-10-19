export type PlatformType = 'shopee' | 'tiktok' | 'tokopedia' | 'other';

export interface StoreLocation {
  id: string;
  name: string;
  branchName: string;
  city: string;
  province: string;
  platform: PlatformType;
  platformLabel: string;
  url: string;
  isPusat?: boolean;
  badge?: string;
  description?: string;
  chibiImage?: string;
  deliverySpeed?: string;
  promoText?: string;
  rating?: string;
  // Relative position in percentage on the map (0 - 100)
  mapCoordinates: {
    x: number; // percentage from left
    y: number; // percentage from top
  };
}

export interface MapCityGroup {
  cityId: string;
  cityName: string;
  province: string;
  coordinates: {
    x: number;
    y: number;
  };
  stores: StoreLocation[];
}
