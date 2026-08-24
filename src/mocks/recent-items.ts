import type { RecentClosetItem } from '@/types/closet';

export const recentClosetItems: RecentClosetItem[] = [
  {
    id: 'item-1',
    image: require('../../assets/images/closet/scarf.png'),
    status: 'processing',
  },
  {
    id: 'item-2',
    image: require('../../assets/images/closet/sneakers.png'),
    status: 'complete',
    progress: 100,
    name: '화이트 미니멀 스니커즈',
    category: '신발',
    season: '여름',
  },
  {
    id: 'item-3',
    image: require('../../assets/images/closet/camera.png'),
    status: 'complete',
    progress: 100,
    name: '차콜 싱글 블레이저',
    category: '아우터',
    season: '간절기',
  },
];
