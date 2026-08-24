import { AppHeader } from '@/components/layout/app-header';
import { Screen } from '@/components/layout/screen';
import { BottomNavigation } from '@/components/navigation/bottom-navigation';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { ColorUsageCard } from '@/features/analytics/components/color-usage-card';
import { EssentialItemsCard } from '@/features/analytics/components/essential-items-card';
import { SeasonBalanceCard } from '@/features/analytics/components/season-balance-card';
import { SustainabilityCard } from '@/features/analytics/components/sustainability-card';
import { UnwornItemsCard } from '@/features/analytics/components/unworn-items-card';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export function ClosetAnalysisScreen() {
  return (
    <Screen style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader avatarPlaceholderText="" />
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>맞춤 인사이트</Text>
          <Text style={styles.title}>옷장 분석</Text>
          <Text style={styles.description}>
            당신의 의류 습관과 개인 스타일 진화를 위해 설계된 필수 가이드입니다.
          </Text>
        </View>
        <View style={styles.sections}>
          <ColorUsageCard />
          <SeasonBalanceCard />
          <EssentialItemsCard />
          <UnwornItemsCard />
          <SustainabilityCard />
        </View>
      </ScrollView>
      <BottomNavigation />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.lg, paddingBottom: 126 },
  intro: { marginTop: 30 },
  eyebrow: { fontSize: 13, color: colors.textSecondary },
  title: {
    marginTop: 6,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -1.3,
    color: colors.textPrimary,
  },
  description: {
    maxWidth: 330,
    marginTop: 9,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textSecondary,
  },
  sections: { marginTop: 32, gap: 16 },
});
