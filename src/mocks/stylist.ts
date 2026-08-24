import type { OutfitRecommendation } from '@/types/stylist';

export const stylistSummary = {
  title: '오늘의 추천 코디',
  description:
    '오전 10시 회의와 맑은 일기 예보를 바탕으로 큐레이션 되었습니다.',
};

export const stylistConditions = [
  { id: 'weather', icon: '☼', label: '18°C 맑음' },
  {
    id: 'meeting',
    icon: require('../../assets/images/icons/briefcase.png'),
    label: '회사 회의',
  },
  {
    id: 'date',
    icon: require('../../assets/images/icons/date.png'),
    label: '오늘',
  },
];

const recommendationImage = require('../../assets/images/dashboard/recommendation.png');

export const mockOutfits: OutfitRecommendation[] = [
  {
    id: 'power-casual',
    image: recommendationImage,
    badge: '최고의 매치',
    insight: '18°C 기온과 사무실 회의에 완벽한 룩입니다.',
    score: 9.5,
    comfortScore: 9,
    styleScore: 10,
    isBookmarked: false,
    reaction: null,
  },
  {
    id: 'minimal-office',
    image: recommendationImage,
    badge: '오피스 추천',
    insight: '차분한 색감과 편안한 실루엣이 오늘 일정에 잘 어울립니다.',
    score: 9.2,
    comfortScore: 10,
    styleScore: 9,
    isBookmarked: false,
    reaction: null,
  },
  {
    id: 'smart-layered',
    image: recommendationImage,
    badge: '스마트 레이어드',
    insight: '실내외 온도 차에 대응하기 좋은 단정한 레이어드 룩입니다.',
    score: 8.9,
    comfortScore: 9,
    styleScore: 9,
    isBookmarked: false,
    reaction: null,
  },
];

export const stylistTip = {
  title: '스타일리스트 팁',
  description:
    "차콜 블레이저 룩에 미니멀한 시계와 가죽 로퍼를 추가하여 미팅을 위한 '파워 캐주얼' 에스테틱을 완성해보세요.",
};
