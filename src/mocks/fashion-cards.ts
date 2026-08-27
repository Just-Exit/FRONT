import type { FashionCard, FashionCardPage } from '@/types/fashion-card';

const cardImages = [
  require('../../assets/images/dashboard/recommendation.png'),
  require('../../assets/images/closet/ootd.png'),
  require('../../assets/images/closet/sage-linen-blazer.png'),
  require('../../assets/images/closet/scarf.png'),
  require('../../assets/images/closet/sneakers.png'),
];

const cardTitles = [
  '어반 미니멀 룩',
  '크림 톤 데일리',
  '주말의 클래식',
  '포인트 액세서리',
  '편안한 시티 룩',
  '소프트 테일러링',
];

export const mockFashionCards: FashionCard[] = Array.from(
  { length: 42 },
  (_, index) => {
    const day = String((index % 28) + 1).padStart(2, '0');
    const month = String(8 - (index % 4)).padStart(2, '0');

    return {
      id: `fashion-card-${index + 1}`,
      title: cardTitles[index % cardTitles.length],
      image: cardImages[index % cardImages.length],
      createdAt: `2026.${month}.${day}`,
      updatedAt: index % 3 === 0 ? `2026.08.${day}` : undefined,
    };
  },
);

type FetchFashionCardsParams = {
  cursor?: string;
  limit: number;
};

export async function fetchMockFashionCards({
  cursor,
  limit,
}: FetchFashionCardsParams): Promise<FashionCardPage> {
  const startIndex = cursor ? Number(cursor) : 0;
  const endIndex = Math.min(startIndex + limit, mockFashionCards.length);

  await new Promise((resolve) => setTimeout(resolve, 350));

  return {
    items: mockFashionCards.slice(startIndex, endIndex),
    nextCursor:
      endIndex < mockFashionCards.length ? String(endIndex) : undefined,
  };
}

export function findMockFashionCard(id: string) {
  return mockFashionCards.find((card) => card.id === id);
}
