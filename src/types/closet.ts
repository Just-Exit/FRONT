import type { ImageSourcePropType } from 'react-native';

export type RecentItemStatus = 'queued' | 'processing' | 'complete' | 'failed';

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
