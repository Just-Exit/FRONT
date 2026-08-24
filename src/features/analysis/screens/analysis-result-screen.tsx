import { Screen } from '@/components/layout/screen';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import {
  AnalysisInfoCard,
  ColorPalette,
  StyleTags,
} from '@/features/analysis/components/analysis-result-cards';
import { AnalysisResultHeader } from '@/features/analysis/components/analysis-result-header';
import type { ClothingAnalysisResult } from '@/types/closet';
import { useRouter } from 'expo-router';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export function AnalysisResultScreen({
  result,
}: {
  result: ClothingAnalysisResult;
}) {
  const router = useRouter();

  const handleEdit = () => {};
  const handleAddToCloset = () => {};

  return (
    <Screen style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AnalysisResultHeader onClose={() => router.back()} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✦ AI 인증 완료</Text>
          </View>

          <View style={styles.imageShell}>
            <Image
              resizeMode="contain"
              source={result.image}
              style={styles.image}
            />
          </View>
          <Text style={styles.name}>{result.name}</Text>
          <Text style={styles.description}>{result.description}</Text>

          <View style={styles.sections}>
            <AnalysisInfoCard
              category={result.category}
              material={result.material}
              season={result.season}
            />
            <ColorPalette colors={result.colors} />
            <StyleTags initialTags={result.tags} />
          </View>

          <View style={styles.buttonRow}>
            <Pressable
              accessibilityRole="button"
              onPress={handleEdit}
              style={({ pressed }) => [
                styles.button,
                styles.secondaryButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.secondaryButtonText}>편집</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={handleAddToCloset}
              style={({ pressed }) => [
                styles.button,
                styles.primaryButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>옷장에 추가</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.lg, paddingBottom: 48 },
  badge: {
    marginTop: 21,
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.divider,
  },
  badgeText: { fontSize: 11, fontWeight: '500', color: colors.textPrimary },
  imageShell: {
    height: 151,
    marginTop: 88,
    marginHorizontal: 32,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 12,
  },
  image: { width: '100%', height: '100%' },
  name: {
    marginTop: 96,
    textAlign: 'center',
    fontSize: 23,
    lineHeight: 30,
    fontWeight: '600',
    letterSpacing: -0.4,
    color: colors.textPrimary,
  },
  description: {
    marginTop: 7,
    textAlign: 'center',
    fontSize: 13,
    color: colors.textSecondary,
  },
  sections: { marginTop: 80, gap: 16 },
  buttonRow: { marginTop: 22, flexDirection: 'row', gap: 10 },
  button: {
    height: 56,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.black,
  },
  primaryButton: { flex: 2, backgroundColor: colors.black },
  secondaryButtonText: { fontSize: 14, fontWeight: '600', color: colors.black },
  primaryButtonText: { fontSize: 14, fontWeight: '600', color: colors.white },
  pressed: { opacity: 0.68 },
});
