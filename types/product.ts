export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  isBestSeller: boolean;
  badge?: string;
  imageUrl: string;
  chibiMascot?: string;
  isPlaceholder?: boolean;
  targetBranchId?: string;
  features?: string[];
  chibiQuote?: string;
  rating?: string;
  soldCount?: string;
}

