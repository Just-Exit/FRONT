import { AppHeader } from '@/components/layout/app-header';
import { Screen } from '@/components/layout/screen';
import { BottomNavigation } from '@/components/navigation/bottom-navigation';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { AnalysisInProgressModal } from '@/features/closet/components/analysis-in-progress-modal';
import { ClosetImportCard } from '@/features/closet/components/closet-import-card';
import {
  RECENT_CARD_WIDTH,
  RecentItemCard,
} from '@/features/closet/components/recent-item-card';
import { recentClosetItems } from '@/mocks/recent-items';
import type { RecentClosetItem } from '@/types/closet';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

const ANALYSIS_MODAL_AUTO_CLOSE_DELAY = 2_000;

type AnalysisModal = {
  autoCloseDelay?: number;
  message?: string;
};

export function ClosetFillScreen() {
  const router = useRouter();
  const [analysisModal, setAnalysisModal] = useState<AnalysisModal | null>(
    null,
  );

  const closeAnalysisModal = useCallback(() => setAnalysisModal(null), []);
  const openAnalysisModal = useCallback(
    (options: AnalysisModal = {}) => setAnalysisModal(options),
    [],
  );

  const handleImageUpload = async (_image: ImagePicker.ImagePickerAsset) => {
    // TODO: 백엔드 연결 시 이 Mock 성공 처리를 실제 업로드 요청으로 교체한다.
    return Promise.resolve();
  };

  const handlePickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        console.warn('사진 갤러리 접근 권한이 거부되었습니다.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: false,
        mediaTypes: ['images'],
        quality: 1,
      });

      if (result.canceled || !result.assets[0]) {
        return;
      }

      await handleImageUpload(result.assets[0]);
      openAnalysisModal({
        autoCloseDelay: ANALYSIS_MODAL_AUTO_CLOSE_DELAY,
        message: '분석이 완료되면 알려드려요',
      });
    } catch (error) {
      console.error('갤러리 이미지 선택 중 오류가 발생했습니다.', error);
    }
  };

  const handleCameraPress = () => {
    void handlePickImage();
  };
  const handleScreenshotUploadPress = () => {};
  const handleOOTDImportPress = () => {};
  const handleViewAllRecentItems = () => router.push('/digital-closet');
  const handleRecentItemPress = (item: RecentClosetItem) => {
    if (item.status === 'complete') {
      router.push({ pathname: '/analysis/[id]', params: { id: item.id } });
      return;
    }

    openAnalysisModal();
  };

  const isAIScanning = recentClosetItems.some(
    (item) => item.status === 'queued' || item.status === 'processing',
  );

  return (
    <Screen style={styles.screen}>
      <View style={styles.contentRoot}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <AppHeader />
          </View>
          <Text style={styles.title}>옷장 채우기</Text>
          <Text style={styles.subtitle}>
            AI의 정밀함으로 당신의 옷장을 디지털화하세요. 아래 방법 중 하나를
            선택해 시작해보세요.
          </Text>

          <View style={styles.importCards}>
            <ClosetImportCard
              title="사진으로 등록하기"
              description="갤러리 또는 카메라로 촬영하세요"
              icon="◉"
              image={require('../../../../assets/images/closet/camera.png')}
              onPress={handleCameraPress}
            />
            <ClosetImportCard
              title="쇼핑 스크린샷 업로드"
              description="즐겨 찾는 쇼핑몰에서 가져오세요"
              icon="▣"
              image={require('../../../../assets/images/closet/screenshot.png')}
              onPress={handleScreenshotUploadPress}
            />
            <ClosetImportCard
              title="OOTD 사진 가져오기"
              description="전체 룩에서 아이템을 추출합니다"
              icon="▦"
              image={require('../../../../assets/images/closet/ootd.png')}
              onPress={handleOOTDImportPress}
            />
          </View>

          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>최근 추가됨</Text>
            <View style={styles.headerActions}>
              {isAIScanning && (
                <Text style={styles.scanning}>● AI 스캔 중...</Text>
              )}
              <Text
                accessibilityRole="button"
                onPress={handleViewAllRecentItems}
                style={styles.viewAll}
              >
                전체 보기
              </Text>
            </View>
          </View>
          <FlatList
            horizontal
            data={recentClosetItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RecentItemCard item={item} onPress={handleRecentItemPress} />
            )}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            showsHorizontalScrollIndicator={false}
            snapToInterval={RECENT_CARD_WIDTH + 16}
            decelerationRate="fast"
            contentContainerStyle={styles.recentList}
            scrollEnabled
          />
        </ScrollView>
        <BottomNavigation />
      </View>
      <AnalysisInProgressModal
        autoCloseDelay={analysisModal?.autoCloseDelay}
        message={analysisModal?.message}
        visible={analysisModal !== null}
        onClose={closeAnalysisModal}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background },
  contentRoot: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 126 },
  header: { marginHorizontal: spacing.lg },
  title: {
    marginTop: 24,
    marginHorizontal: spacing.lg,
    fontSize: 26,
    lineHeight: 32,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: 9,
    marginHorizontal: spacing.lg,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  importCards: { marginTop: 32, marginHorizontal: spacing.lg, gap: 20 },
  recentHeader: {
    marginTop: 48,
    marginHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  recentTitle: { fontSize: 20, color: colors.textPrimary },
  headerActions: { alignItems: 'flex-end', gap: 6 },
  scanning: { fontSize: 11, color: colors.textPrimary },
  viewAll: { fontSize: 12, color: colors.textSecondary },
  recentList: {
    paddingTop: 18,
    paddingHorizontal: spacing.lg,
    paddingRight: 64,
  },
});
