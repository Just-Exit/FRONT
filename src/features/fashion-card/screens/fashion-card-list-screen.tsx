import { AppHeader } from '@/components/layout/app-header';
import { Screen } from '@/components/layout/screen';
import { BottomNavigation } from '@/components/navigation/bottom-navigation';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { FashionCardEmptyState } from '@/features/fashion-card/components/fashion-card-empty-state';
import { FashionCardItem } from '@/features/fashion-card/components/fashion-card-item';
import { fetchMockFashionCards } from '@/mocks/fashion-cards';
import type { FashionCard } from '@/types/fashion-card';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const PAGE_SIZE = 10;
const GRID_GAP = 14;

export function FashionCardListScreen() {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const itemWidth = (screenWidth - spacing.lg * 2 - GRID_GAP) / 2;
  const [items, setItems] = useState<FashionCard[]>([]);
  const [cursor, setCursor] = useState<string | undefined>();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const loadingMoreRef = useRef(false);

  useEffect(() => {
    let isActive = true;

    fetchMockFashionCards({ limit: PAGE_SIZE }).then((page) => {
      if (!isActive) return;
      setItems(page.items);
      setCursor(page.nextCursor);
      setHasNextPage(Boolean(page.nextCursor));
      setIsInitialLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (loadingMoreRef.current || !hasNextPage || !cursor) return;

    loadingMoreRef.current = true;
    setIsLoadingMore(true);

    try {
      const page = await fetchMockFashionCards({
        cursor,
        limit: PAGE_SIZE,
      });
      setItems((currentItems) => [...currentItems, ...page.items]);
      setCursor(page.nextCursor);
      setHasNextPage(Boolean(page.nextCursor));
    } finally {
      loadingMoreRef.current = false;
      setIsLoadingMore(false);
    }
  }, [cursor, hasNextPage]);

  const handleCreatePress = useCallback(() => {
    router.push('/fashion-card/new');
  }, [router]);

  const handleCardPress = useCallback(
    (card: FashionCard) => {
      router.push({
        pathname: '/fashion-card/[id]',
        params: { id: card.id },
      });
    },
    [router],
  );

  const renderItem = useCallback(
    ({ item }: { item: FashionCard }) => (
      <FashionCardItem
        card={item}
        onPress={handleCardPress}
        width={itemWidth}
      />
    ),
    [handleCardPress, itemWidth],
  );

  return (
    <Screen style={styles.screen}>
      <View style={styles.headerWrap}>
        <AppHeader />
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.eyebrow}>패션 카드</Text>
            <Text style={styles.title}>나의 컬렉션</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={handleCreatePress}
            style={({ pressed }) => [
              styles.createButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.createButtonLabel}>＋ 카드 만들기</Text>
          </Pressable>
        </View>
      </View>

      {isInitialLoading ? (
        <View style={styles.initialLoading}>
          <ActivityIndicator color={colors.textPrimary} />
        </View>
      ) : (
        <FlatList
          columnWrapperStyle={items.length > 0 ? styles.row : undefined}
          contentContainerStyle={[
            styles.listContent,
            items.length === 0 && styles.emptyContent,
          ]}
          data={items}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <FashionCardEmptyState onCreatePress={handleCreatePress} />
          }
          ListFooterComponent={
            isLoadingMore ? (
              <ActivityIndicator
                color={colors.textSecondary}
                style={styles.footerLoader}
              />
            ) : null
          }
          numColumns={2}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.45}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
      <BottomNavigation />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background },
  headerWrap: { paddingHorizontal: spacing.lg },
  titleRow: {
    marginTop: 18,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  eyebrow: { fontSize: 13, color: colors.textSecondary },
  title: {
    marginTop: 5,
    fontSize: 30,
    lineHeight: 37,
    letterSpacing: -0.8,
    color: colors.textPrimary,
  },
  createButton: {
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 22,
    backgroundColor: colors.black,
  },
  buttonPressed: { opacity: 0.65 },
  createButtonLabel: { fontSize: 13, color: colors.white },
  initialLoading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 126,
  },
  emptyContent: { flexGrow: 1 },
  row: { gap: GRID_GAP, marginBottom: GRID_GAP },
  footerLoader: { marginVertical: 24 },
});
