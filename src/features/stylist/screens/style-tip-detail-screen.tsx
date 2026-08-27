import { Screen } from '@/components/layout/screen';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { ComingSoonModal } from '@/features/stylist/components/coming-soon-modal';
import {
  urbanMinimalistStyleGuide,
  type RecommendedStyleItem,
} from '@/mocks/style-guide';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const ITEM_WIDTH = 136;
const HERO_ASPECT_RATIO = 1.185;
const DETAIL_BACKGROUND = colors.background;

function RecommendedItemCard({ item }: { item: RecommendedStyleItem }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.name}
      style={({ pressed }) => [styles.itemCard, pressed && styles.pressed]}
    >
      <Image source={item.image} resizeMode="cover" style={styles.itemImage} />
      <Text numberOfLines={2} style={styles.itemName}>
        {item.name}
      </Text>
    </Pressable>
  );
}

export function StyleTipDetailScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const guide = urbanMinimalistStyleGuide;
  const heroWidth = screenWidth - spacing.lg * 2;
  const heroHeight = heroWidth / HERO_ASPECT_RATIO;

  return (
    <Screen edges={['top', 'right', 'bottom', 'left']} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { height: heroHeight }]}>
          <Image
            source={guide.image}
            resizeMode="cover"
            style={styles.heroImage}
          />
          <View pointerEvents="none" style={styles.heroFade} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✦ AI 스타일 분석</Text>
          </View>
        </View>

        <View style={styles.copy}>
          <Text style={styles.title}>{guide.title}</Text>
          <Text style={styles.description}>{guide.description}</Text>
        </View>

        <View style={styles.recommendations}>
          <Text style={styles.sectionTitle}>함께 추천하는 아이템</Text>
          <FlatList
            horizontal
            data={guide.recommendedItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RecommendedItemCard item={item} />}
            ItemSeparatorComponent={() => <View style={styles.itemGap} />}
            contentContainerStyle={styles.itemList}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => setIsModalVisible(true)}
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
        >
          <Text style={styles.ctaLabel}>추천 아이템 보러가기</Text>
        </Pressable>
      </ScrollView>

      <ComingSoonModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: DETAIL_BACKGROUND },
  content: { paddingBottom: spacing.lg },
  hero: {
    marginHorizontal: spacing.lg,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: DETAIL_BACKGROUND,
  },
  heroImage: { width: '100%', height: '100%' },
  heroFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '42%',
    backgroundImage:
      'linear-gradient(to bottom, rgba(247,247,242,0) 0%, rgba(247,247,242,0.12) 22%, rgba(247,247,242,0.42) 48%, rgba(247,247,242,0.82) 76%, #F7F7F2 100%)',
    zIndex: 1,
  },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.black,
    zIndex: 2,
  },
  badgeText: { fontSize: 12, color: colors.white },
  pressed: { opacity: 0.7 },
  copy: { paddingHorizontal: spacing.lg },
  title: {
    marginTop: 12,
    fontSize: 27,
    lineHeight: 35,
    letterSpacing: -0.7,
    color: colors.textPrimary,
  },
  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 25,
    letterSpacing: -0.15,
    color: colors.textSecondary,
  },
  recommendations: { marginTop: 35 },
  sectionTitle: {
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    lineHeight: 23,
    color: colors.textPrimary,
  },
  itemList: {
    paddingTop: 16,
    paddingHorizontal: spacing.lg,
    paddingRight: spacing.xxl,
  },
  itemGap: { width: 16 },
  itemCard: { width: ITEM_WIDTH },
  itemImage: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  itemName: {
    marginTop: 11,
    paddingHorizontal: 3,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  cta: {
    height: 56,
    marginTop: 36,
    marginHorizontal: spacing.lg,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  ctaLabel: { fontSize: 15, fontWeight: '500', color: colors.white },
});
