import type { ImageSourcePropType } from 'react-native';

export type FashionCard = {
  id: string;
  title: string;
  image?: ImageSourcePropType | string;
  createdAt: string;
  updatedAt?: string;
};

export type FashionCardPage = {
  items: FashionCard[];
  nextCursor?: string;
};
