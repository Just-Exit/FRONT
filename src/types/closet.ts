import type { ImageSourcePropType } from 'react-native';

export type RecentItemStatus = 'queued' | 'processing' | 'complete' | 'failed';

export type ClosetCategory = 'top' | 'bottom' | 'outer' | 'shoes' | 'accessory';

export type ClosetItem = {
  id: string;
  name: string;
  category: ClosetCategory;
  image: ImageSourcePropType;
  aspectRatio: number;
};

export type ClosetItemsPage = {
  items: ClosetItem[];
  page: number;
  hasNextPage: boolean;
};

export type RecentClosetItem = {
  id: string;
  image: ImageSourcePropType;
  status: RecentItemStatus;
  progress?: number;
  name?: string;
  category?: string;
  season?: string;
};

export type ClothingAnalysisResult = {
  id: string;
  status: RecentItemStatus;
  name: string;
  description: string;
  category: string;
  material: string;
  season: string;
  colors: string[];
  tags: string[];
  image: ImageSourcePropType;
};
