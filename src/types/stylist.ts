import type { ImageSourcePropType } from 'react-native';

export type OutfitReaction = 'like' | 'dislike' | null;

export type OutfitRecommendation = {
  id: string;
  image: ImageSourcePropType;
  badge: string;
  insight: string;
  score: number;
  comfortScore: number;
  styleScore: number;
  isBookmarked: boolean;
  reaction: OutfitReaction;
};
