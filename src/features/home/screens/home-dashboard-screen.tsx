import { AppHeader } from '@/components/layout/app-header';
import { Screen } from '@/components/layout/screen';
import { BottomNavigation } from '@/components/navigation/bottom-navigation';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { AnalysisInProgressModal } from '@/features/closet/components/analysis-in-progress-modal';
import { ClosetScoreProgress } from '@/features/home/components/closet-score-progress';
import { FloatingClosetButton } from '@/features/home/components/floating-closet-button';
import type { RecentItemStatus } from '@/types/closet';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const recentItems = [
  {
    id: 'item-1',
    name: 'Analyzing...',
    meta: 'Now',
    image: require('../../../../assets/images/closet/scarf.png'),
    status: 'processing',
  },
  {
    id: 'item-2',
    name: '화이트 미니멀 스니커즈',
    meta: 'Leather · 3d ago',
    image: require('../../../../assets/images/closet/sneakers.png'),
    status: 'complete',
  },
  {
    id: 'item-3',
    name: '차콜 싱글 블레이저',
    meta: 'Wool · 5d ago',
    image: require('../../../../assets/images/closet/camera.png'),
    status: 'complete',
  },
] satisfies {
  id: string;
  name: string;
  meta: string;
  image: number;
  status: RecentItemStatus;
}[];

export function HomeDashboardScreen() {
  const router = useRouter();
  const [fabVisible, setFabVisible] = useState(false);
  const [isAnalysisModalVisible, setIsAnalysisModalVisible] = useState(false);
  const lastOffset = useRef(0);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollPauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      if (scrollPauseTimer.current) clearTimeout(scrollPauseTimer.current);
    };
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.y;
    const movingDown = offset > lastOffset.current + 1;
    lastOffset.current = offset;

    if (fabVisible) return;
    if (movingDown) {
      if (!scrollTimer.current) {
        scrollTimer.current = setTimeout(() => {
          setFabVisible(true);
          scrollTimer.current = null;
        }, 750);
      }
      if (scrollPauseTimer.current) clearTimeout(scrollPauseTimer.current);
      scrollPauseTimer.current = setTimeout(() => {
        if (scrollTimer.current) clearTimeout(scrollTimer.current);
        scrollTimer.current = null;
      }, 140);
    } else {
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      if (scrollPauseTimer.current) clearTimeout(scrollPauseTimer.current);
      scrollTimer.current = null;
      scrollPauseTimer.current = null;
    }
  };
  const handleRecentItemPress = (item: (typeof recentItems)[number]) => {
    if (item.status === 'complete') {
      router.push({ pathname: '/analysis/[id]', params: { id: item.id } });
      return;
    }

    setIsAnalysisModalVisible(true);
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.contentRoot}>
        <ScrollView
          contentContainerStyle={styles.content}
          onScroll={handleScroll}
          scrollEventThrottle={50}
          showsVerticalScrollIndicator={false}
        >
          <AppHeader />
          <Text style={styles.eyebrow}>My Closet</Text>
          <View style={styles.greetingRow}>
            <Text style={styles.greeting}>좋은 아침입니다, Alex 님.</Text>
            <View style={styles.weather}>
              <Text style={styles.weatherText}>☼ 18°C</Text>
            </View>
          </View>

          <ImageBackground
            source={require('../../../../assets/images/dashboard/recommendation.png')}
            imageStyle={styles.heroImage}
            style={styles.hero}
          >
            <View style={styles.heroShade} />
            <Text style={styles.badge}>오늘의 추천</Text>
            <View style={styles.heroCopy}>
              <Text style={styles.heroTitle}>어반 미니멀리스트</Text>
              <Text style={styles.heroDescription}>
                회의가 가득한 18°C 흐린 날에 최적화된 룩입니다.
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.scoreCard}>
            <ClosetScoreProgress score={64} />
            <Text style={styles.scoreTitle}>옷장 점수</Text>
            <Text style={styles.scoreCopy}>
              이번 달에 28개의 아이템을 착용했습니다.
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipLabel}>✦ AI 스타일리스트 팁</Text>
            <Text style={styles.tipCopy}>
              “Alex님, 차콜 오버코트와 크림 터틀넥을 매치하면 오늘 발표에 완벽한
              높은 대비의 ‘파워 실루엣’이 완성됩니다.”
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/stylist-tip')}
              style={({ pressed }) => [
                styles.tipButton,
                pressed && styles.tipButtonPressed,
              ]}
            >
              <Text style={styles.tipButtonLabel}>더 알아보기</Text>
            </Pressable>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>최근 추가됨</Text>
            <Text
              accessibilityRole="button"
              onPress={() => router.push('/digital-closet')}
              style={styles.viewAll}
            >
              전체 보기
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentRow}
          >
            {recentItems.map((item) => (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                onPress={() => handleRecentItemPress(item)}
                style={({ pressed }) => [
                  styles.recentItem,
                  pressed && styles.recentPressed,
                ]}
              >
                <Image source={item.image} style={styles.recentImage} />
                <Text numberOfLines={1} style={styles.recentName}>
                  {item.name}
                </Text>
                <Text style={styles.recentMeta}>{item.meta}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </ScrollView>

        <FloatingClosetButton
          visible={fabVisible}
          onPress={() => router.push('/closet-fill')}
        />
        <BottomNavigation />
      </View>
      <AnalysisInProgressModal
        visible={isAnalysisModalVisible}
        onClose={() => setIsAnalysisModalVisible(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background },
  contentRoot: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.lg, paddingBottom: 126 },
  eyebrow: { marginTop: 22, fontSize: 13, color: colors.textSecondary },
  greetingRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  greeting: {
    flex: 1,
    fontSize: 25,
    lineHeight: 31,
    letterSpacing: -0.5,
    color: colors.textPrimary,
  },
  weather: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: '#EFEFEB',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.divider,
  },
  weatherText: { fontSize: 13, color: colors.textSecondary },
  hero: {
    height: 430,
    marginTop: 48,
    borderRadius: 32,
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: 24,
  },
  heroImage: { borderRadius: 32 },
  heroShade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  badge: {
    alignSelf: 'flex-start',
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.82)',
    color: colors.white,
    fontSize: 11,
  },
  heroCopy: { gap: 8 },
  heroTitle: { color: colors.white, fontSize: 16, fontWeight: '500' },
  heroDescription: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    lineHeight: 23,
  },
  scoreCard: {
    marginTop: 46,
    paddingVertical: 26,
    paddingHorizontal: 28,
    borderRadius: 28,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E1E0DB',
  },
  scoreTitle: { marginTop: 18, fontSize: 20, color: colors.textPrimary },
  scoreCopy: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  tipCard: {
    marginTop: 16,
    padding: 26,
    borderRadius: 26,
    backgroundColor: colors.darkCard,
  },
  tipLabel: { fontSize: 13, color: '#879089' },
  tipCopy: { marginTop: 20, fontSize: 15, lineHeight: 25, color: '#AEB5AF' },
  tipButton: {
    alignSelf: 'flex-start',
    marginTop: 22,
    paddingHorizontal: 17,
    paddingVertical: 12,
    overflow: 'hidden',
    borderRadius: 22,
    backgroundColor: '#1D2A23',
  },
  tipButtonPressed: { opacity: 0.7 },
  tipButtonLabel: { fontSize: 14, color: '#AEB5AF' },
  sectionHeader: {
    marginTop: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 21, color: colors.textPrimary },
  viewAll: { fontSize: 15, color: colors.textPrimary },
  recentRow: { paddingTop: 18, paddingRight: 24, gap: 16 },
  recentItem: { width: 144 },
  recentPressed: { opacity: 0.75 },
  recentImage: {
    width: 144,
    height: 144,
    borderRadius: 16,
    backgroundColor: colors.card,
  },
  recentName: { marginTop: 12, fontSize: 14, color: colors.textPrimary },
  recentMeta: { marginTop: 3, fontSize: 11, color: colors.textSecondary },
});
