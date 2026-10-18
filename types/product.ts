export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  isBestSeller: boolean;
  badge?: string;
  imageUrl?: string;
  isPlaceholder?: boolean;
  targetBranchId?: string; // Links to preferred store if any
}
