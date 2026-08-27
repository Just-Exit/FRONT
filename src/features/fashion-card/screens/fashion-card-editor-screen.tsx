import { Screen } from '@/components/layout/screen';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { findMockFashionCard } from '@/mocks/fashion-cards';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type FashionCardEditorScreenProps = {
  cardId?: string;
};

const editorItems = [
  require('../../../../assets/images/closet/sage-linen-blazer.png'),
  require('../../../../assets/images/closet/scarf.png'),
  require('../../../../assets/images/closet/sneakers.png'),
  require('../../../../assets/images/closet/camera.png'),
  require('../../../../assets/images/closet/ootd.png'),
];

const categories = ['전체', '상의', '하의', '아우터'];

export function FashionCardEditorScreen({
  cardId,
}: FashionCardEditorScreenProps) {
  const router = useRouter();
  const isEditMode = Boolean(cardId);
  const card = cardId ? findMockFashionCard(cardId) : undefined;
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedItem, setSelectedItem] = useState(0);

  const handleSave = () => {
    // TODO: 저장 API 연결 후 해당 card cache만 갱신하고 router.back() 처리
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="뒤로 가기"
          accessibilityRole="button"
          hitSlop={10}
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.headerButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>
          {isEditMode ? '패션 카드 수정' : '패션 카드 만들기'}
        </Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.previewCard}>
          <Image
            source={
              typeof card?.image === 'number'
                ? card.image
                : require('../../../../assets/images/closet/ootd.png')
            }
            style={styles.previewImage}
          />
          <View style={styles.previewCaption}>
            <Text style={styles.previewEyebrow}>Pikit fashion card</Text>
            <Text style={styles.previewTitle}>
              {card?.title ?? '나만의 스타일 카드'}
            </Text>
          </View>
        </View>

        <View style={styles.categoryRow}>
          {categories.map((category) => {
            const selected = category === selectedCategory;
            return (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={({ pressed }) => [
                  styles.category,
                  selected && styles.categorySelected,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.categoryLabel,
                    selected && styles.categoryLabelSelected,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.itemGrid}>
          {editorItems.map((image, index) => {
            const selected = selectedItem === index;
            return (
              <Pressable
                key={index}
                accessibilityRole="button"
                onPress={() => setSelectedItem(index)}
                style={({ pressed }) => [
                  styles.itemButton,
                  selected && styles.itemSelected,
                  pressed && styles.pressed,
                ]}
              >
                <Image source={image} style={styles.itemImage} />
                {selected && <Text style={styles.check}>✓</Text>}
              </Pressable>
            );
          })}
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.uploadButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.uploadPlus}>＋</Text>
            <Text style={styles.uploadLabel}>업로드</Text>
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={handleSave}
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.savePressed,
          ]}
        >
          <Text style={styles.saveLabel}>
            ✦ {isEditMode ? '변경사항 저장하기' : '패션 카드 생성하기'}
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background },
  header: {
    height: 58,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 38,
    lineHeight: 40,
    fontWeight: '300',
    color: colors.textPrimary,
  },
  headerTitle: { fontSize: 18, fontWeight: '500', color: colors.textPrimary },
  pressed: { opacity: 0.58 },
  content: { paddingHorizontal: spacing.lg, paddingBottom: 42 },
  previewCard: {
    height: 420,
    marginTop: 18,
    overflow: 'hidden',
    borderRadius: 24,
    backgroundColor: colors.card,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  previewCaption: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    left: 14,
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(250, 249, 244, 0.9)',
  },
  previewEyebrow: { fontSize: 11, color: colors.textSecondary },
  previewTitle: { marginTop: 3, fontSize: 17, color: colors.textPrimary },
  categoryRow: {
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  category: {
    flex: 1,
    height: 38,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E2E1DC',
  },
  categorySelected: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  categoryLabel: { fontSize: 13, color: colors.textSecondary },
  categoryLabelSelected: { color: colors.white },
  itemGrid: {
    marginTop: 26,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  itemButton: {
    width: '30.5%',
    aspectRatio: 1,
    padding: 7,
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  itemSelected: { borderColor: colors.black },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    resizeMode: 'cover',
  },
  check: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 20,
    height: 20,
    overflow: 'hidden',
    borderRadius: 10,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 12,
    color: colors.white,
    backgroundColor: colors.black,
  },
  uploadButton: {
    width: '30.5%',
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#C9CAC5',
  },
  uploadPlus: { fontSize: 27, color: colors.textSecondary },
  uploadLabel: { marginTop: 3, fontSize: 12, color: colors.textSecondary },
  saveButton: {
    height: 56,
    marginTop: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  savePressed: { opacity: 0.68, transform: [{ scale: 0.99 }] },
  saveLabel: { fontSize: 16, fontWeight: '500', color: colors.white },
});
