import { colors } from '@/constants/colors';

export const colorUsageData = [
  { name: '차콜 블랙', percentage: 42, color: colors.charcoal },
  { name: '웜 베이지', percentage: 28, color: colors.warmBeige },
  { name: '세이지 그린', percentage: 18, color: colors.sage },
  { name: '소프트 네이비', percentage: 12, color: colors.softNavy },
];

export const seasonBalanceData = [
  { season: '겨울', percentage: 35, color: colors.black },
  { season: '여름', percentage: 25, color: colors.seasonSummer },
  { season: '봄', percentage: 20, color: colors.seasonSpring },
  { season: '가을', percentage: 20, color: colors.seasonAutumn },
];

export const essentialItems = [
  {
    id: 'shirt',
    name: '화이트 포플린 셔츠',
    description: '12개 코디 완성 가능',
  },
  { id: 'coat', name: '울 오버코트', description: '겨울 필수 아이템 부족' },
];

export const unwornItems = [
  { id: '1', name: '네온 그래픽 티셔츠', wearCount: 0 },
  { id: '2', name: '스키니 진', wearCount: 1 },
  { id: '3', name: '레오파드 스커트', wearCount: 0 },
  { id: '4', name: '벨벳 재킷', wearCount: 1 },
  { id: '5', name: '메탈릭 니트', wearCount: 0 },
];

export const sustainabilityInsight = {
  improvementPercentage: 14,
};
