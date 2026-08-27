import { AppHeader } from '@/components/layout/app-header';
import { Screen } from '@/components/layout/screen';
import { BottomNavigation } from '@/components/navigation/bottom-navigation';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import {
  ClosetCategoryFilter,
  type ClosetCategoryFilterValue,
} from '@/features/closet/components/closet-category-filter';
import { ClosetItemCard } from '@/features/closet/components/closet-item-card';
import { getClosetItems } from '@/features/closet/data/closet-items';
import type { ClosetItem } from '@/types/closet';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const PAGE_SIZE = 8;

type MasonryPage = { key: string; left: ClosetItem[]; right: ClosetItem[] };

function toMasonryPage(items: ClosetItem[], key: string): MasonryPage {
  const left: ClosetItem[] = [];
  const right: ClosetItem[] = [];
  let leftHeight = 0;
  let rightHeight = 0;

  items.forEach((item) => {
    const estimatedHeight = 1 / item.aspectRatio + 0.35;
    if (leftHeight <= rightHeight) {
      left.push(item);
      leftHeight += estimatedHeight;
    } else {
      right.push(item);
      rightHeight += estimatedHeight;
    }
  });

  return { key, left, right };
}

export function DigitalClosetScreen() {
  const router = useRouter();
  const listRef = useRef<FlatList<MasonryPage>>(null);
  const requestId = useRef(0);
  const loadingRef = useRef(false);
  const [category, setCategory] = useState<ClosetCategoryFilterValue>('all');
  const [pages, setPages] = useState<MasonryPage[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadPage = useCallback(
    async (
      nextPage: number,
      selectedCategory: ClosetCategoryFilterValue,
      replace = false,
    ) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      setIsLoadingMore(true);
      const currentRequest = ++requestId.current;

      try {
        const result = await getClosetItems({
          page: nextPage,
          pageSize: PAGE_SIZE,
          category: selectedCategory,
        });
        if (currentRequest !== requestId.current) return;
        const masonryPage = toMasonryPage(
          result.items,
          `${selectedCategory}-${result.page}`,
        );
        setPages((current) =>
          replace ? [masonryPage] : [...current, masonryPage],
        );
        setPage(result.page);
        setHasNextPage(result.hasNextPage);
      } finally {
        if (currentRequest === requestId.current) {
          loadingRef.current = false;
          setIsLoadingMore(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    void loadPage(1, category, true);
  }, [category, loadPage]);

  const handleCategoryChange = (nextCategory: ClosetCategoryFilterValue) => {
    if (nextCategory === category) return;
    requestId.current += 1;
    loadingRef.current = false;
    setPages([]);
    setPage(0);
    setHasNextPage(true);
    setCategory(nextCategory);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  };

  const handleEndReached = () => {
    if (!hasNextPage || loadingRef.current || page === 0) return;
    void loadPage(page + 1, category);
  };

  const itemCount = pages.reduce(
    (count, masonryPage) =>
      count + masonryPage.left.length + masonryPage.right.length,
    0,
  );
  const handleItemPress = useCallback((item: ClosetItem) => {
    console.log('closet item pressed', item.id);
  }, []);

  return (
    <Screen style={styles.screen}>
      <View style={styles.root}>
        <FlatList
          ref={listRef}
          data={pages}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.columns}>
              {[item.left, item.right].map((column, index) => (
                <View key={index} style={styles.column}>
                  {column.map((closetItem) => (
                    <ClosetItemCard
                      key={closetItem.id}
                      item={closetItem}
                      onPress={handleItemPress}
                    />
                  ))}
                </View>
              ))}
            </View>
          )}
          ListHeaderComponent={
            <>
              <AppHeader leading="back" onBackPress={() => router.back()} />
              <View style={styles.titleRow}>
                <View>
                  <Text style={styles.title}>디지털 옷장</Text>
                  <Text style={styles.count}>{itemCount}개의 아이템</Text>
                </View>
                <Pressable
                  accessibilityLabel="정렬"
                  accessibilityRole="button"
                  onPress={() => console.log('정렬 기능은 추후 구현 예정')}
                  style={({ pressed }) => [
                    styles.sortButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Image
                    source={require('../../../../assets/images/closet/array.png')}
                    resizeMode="contain"
                    style={styles.sortIcon}
                  />
                  <Text style={styles.sortLabel}>정렬</Text>
                </Pressable>
              </View>
              <View style={styles.filters}>
                <ClosetCategoryFilter
                  value={category}
                  onChange={handleCategoryChange}
                />
              </View>
            </>
          }
          ListEmptyComponent={
            !isLoadingMore ? (
              <Text style={styles.empty}>아직 등록된 옷이 없어요.</Text>
            ) : null
          }
          ListFooterComponent={
            isLoadingMore && pages.length > 0 ? (
              <ActivityIndicator
                color={colors.textSecondary}
                style={styles.loader}
              />
            ) : null
          }
          contentContainerStyle={styles.content}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.45}
          showsVerticalScrollIndicator={false}
        />
        <BottomNavigation activeKey="closet" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background },
  root: { flex: 1 },
  content: { paddingHorizontal: spacing.lg, paddingBottom: 118 },
  titleRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 26, lineHeight: 32, color: colors.textPrimary },
  count: { marginTop: 4, fontSize: 13, color: colors.textSecondary },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  sortIcon: { width: 12, height: 15 },
  sortLabel: { fontSize: 12, color: colors.textSecondary },
  pressed: { opacity: 0.7 },
  filters: { marginTop: 24, marginBottom: 24 },
  columns: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  column: { flex: 1, gap: 12 },
  loader: { paddingVertical: 24 },
  empty: {
    paddingVertical: 80,
    textAlign: 'center',
    fontSize: 14,
    color: colors.textSecondary,
  },
});
