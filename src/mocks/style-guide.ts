import type { ImageSourcePropType } from 'react-native';

export type RecommendedStyleItem = {
  id: string;
  name: string;
  image: ImageSourcePropType;
};

export type StyleGuide = {
  image: ImageSourcePropType;
  title: string;
  description: string;
  recommendedItems: RecommendedStyleItem[];
};

export const urbanMinimalistStyleGuide: StyleGuide = {
  image: require('../../assets/images/stylist/ai-style-guide-hero.png'),
  title: '어반 미니멀리스트 코디 가이드',
  description:
    '오늘의 날씨(18°C, 흐림)와 전문적인 미팅 일정을 고려하여 제안된 룩입니다. 차콜 오버코트의 묵직한 질감이 신뢰감을 주며, 크림색 터틀넥은 얼굴을 밝게 화사하게 연출해 줍니다. 전체적으로 톤온톤 배색을 통해 지적이고 차분한 인상을 완성했습니다.',
  recommendedItems: [
    {
      id: 'watch',
      name: '미니멀 워치',
      image: require('../../assets/images/closet/camera.png'),
    },
    {
      id: 'loafers',
      name: '레더 로퍼',
      image: require('../../assets/images/closet/sneakers.png'),
    },
    {
      id: 'muffler',
      name: '캐시미어 머플러',
      image: require('../../assets/images/closet/scarf.png'),
    },
  ],
};
