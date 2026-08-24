import type { ClothingAnalysisResult } from '@/types/closet';

export const mockAnalysisResults: Record<string, ClothingAnalysisResult> = {
  'item-2': {
    id: 'item-2',
    status: 'complete',
    name: '화이트 미니멀 스니커즈',
    description: '오프화이트 · 데일리 컬렉션',
    category: '신발',
    material: '가죽',
    season: '사계절',
    colors: ['#EAEAE0', '#D6D6CC', '#B58A58', '#4A514D'],
    tags: ['미니멀리스트', '캐주얼', '가벼움'],
    image: require('../../assets/images/closet/sneakers.png'),
  },
  'item-3': {
    id: 'item-3',
    status: 'complete',
    name: '리넨 테일러드 블레이저',
    description: '세이지 그린 · SS24 컬렉션',
    category: '아우터',
    material: '리넨 100%',
    season: '봄 / 여름',
    colors: ['#8B948E', '#D6D6CC', '#EAEAE0', '#4A514D'],
    tags: ['프로페셔널', '가벼움', '미니멀리스트'],
    image: require('../../assets/images/closet/sage-linen-blazer.png'),
  },
};

export function getMockAnalysisResult(id: string) {
  return mockAnalysisResults[id];
}
