import { digitalClosetItems } from '@/mocks/digital-closet-items';
import type { ClosetCategory, ClosetItemsPage } from '@/types/closet';

export type ClosetItemsQuery = {
  page: number;
  pageSize: number;
  category: ClosetCategory | 'all';
};

export async function getClosetItems({
  page,
  pageSize,
  category,
}: ClosetItemsQuery): Promise<ClosetItemsPage> {
  const matchingItems =
    category === 'all'
      ? digitalClosetItems
      : digitalClosetItems.filter((item) => item.category === category);
  const start = (page - 1) * pageSize;

  await new Promise((resolve) => setTimeout(resolve, 250));

  return {
    items: matchingItems.slice(start, start + pageSize),
    page,
    hasNextPage: start + pageSize < matchingItems.length,
  };
}
