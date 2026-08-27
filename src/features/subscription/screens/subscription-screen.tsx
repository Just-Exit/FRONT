import { Screen } from '@/components/layout/screen';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type BillingCycle = 'monthly' | 'yearly';

const subscription = {
  plan: 'Free',
  status: 'inactive',
  yearlyPrice: 99000,
} as const;

const planBenefits = [
  '무제한 옷장 공간 제공',
  '매일 제공되는 AI 스타일링 리포트',
  '프리미엄 커뮤니티 독점 접근 권한',
] as const;

function getNextBillingDate(today = new Date()) {
  const nextBillingDate = new Date(today);
  nextBillingDate.setFullYear(today.getFullYear() + 1);

  return `${nextBillingDate.getFullYear()}년 ${
    nextBillingDate.getMonth() + 1
  }월 ${nextBillingDate.getDate()}일`;
}

function getMonthlyPrice(yearlyPrice: number) {
  return Math.floor((yearlyPrice * 1.2) / 12 / 10) * 10;
}

export function SubscriptionScreen() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const nextBillingDate = useMemo(() => getNextBillingDate(), []);
  const monthlyPrice = getMonthlyPrice(subscription.yearlyPrice);
  const isYearly = billingCycle === 'yearly';
  const selectedPrice = isYearly ? subscription.yearlyPrice : monthlyPrice;

  const handleCancelSubscription = () => {
    // TODO: subscription cancellation API
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="뒤로가기"
          accessibilityRole="button"
          hitSlop={12}
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>구독 관리</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.currentPlanCard}>
          <View style={styles.planRow}>
            <View>
              <Text style={styles.eyebrow}>현재 플랜</Text>
              <Text style={styles.planName}>{subscription.plan}</Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>
                {subscription.status === 'active' ? '활성 상태' : '비활성'}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.billingDateRow}>
            <Text style={styles.secondaryText}>다음 결제일</Text>
            <Text style={styles.billingDate}>{nextBillingDate}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pro 플랜 혜택</Text>
          <View style={styles.benefitList}>
            {planBenefits.map((benefit) => (
              <View key={benefit} style={styles.benefitRow}>
                <View style={styles.checkCircle}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.optionsSection}>
          <Text style={styles.sectionTitle}>플랜 옵션</Text>
          <View style={styles.segmentedControl}>
            <BillingOption
              label="월간"
              selected={billingCycle === 'monthly'}
              onPress={() => setBillingCycle('monthly')}
            />
            <BillingOption
              label="연간 (20% 할인)"
              selected={billingCycle === 'yearly'}
              onPress={() => setBillingCycle('yearly')}
            />
          </View>
        </View>

        <View style={styles.priceCard}>
          <Text style={styles.paymentLabel}>
            {isYearly ? '연간 결제' : '월간 결제'}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ₩{selectedPrice.toLocaleString('ko-KR')}
            </Text>
            <Text style={styles.pricePeriod}>{isYearly ? '/ 년' : '/ 월'}</Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={handleCancelSubscription}
          style={({ pressed }) => [
            styles.cancelButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.cancelText}>구독 취소</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

type BillingOptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function BillingOption({ label, selected, onPress }: BillingOptionProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.segment,
        selected && styles.selectedSegment,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[styles.segmentText, selected && styles.selectedSegmentText]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background },
  header: {
    height: 56,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    marginTop: -4,
    fontSize: 40,
    lineHeight: 40,
    fontWeight: '300',
    color: colors.textPrimary,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '500',
    letterSpacing: -0.4,
    color: colors.textPrimary,
  },
  headerSpacer: { width: 40 },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  currentPlanCard: {
    padding: spacing.lg,
    borderRadius: 24,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 2,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: { fontSize: 12, color: colors.textSecondary },
  planName: {
    marginTop: 8,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  statusPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#E3E3DF',
  },
  statusText: { fontSize: 12, color: colors.textPrimary },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginTop: 24,
    backgroundColor: colors.divider,
  },
  billingDateRow: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secondaryText: { fontSize: 14, color: colors.textSecondary },
  billingDate: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  section: { marginTop: 34 },
  sectionTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
    letterSpacing: -0.4,
    color: colors.textPrimary,
  },
  benefitList: { marginTop: 14, gap: 10 },
  benefitRow: { flexDirection: 'row', alignItems: 'center' },
  checkCircle: {
    width: 20,
    height: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    marginTop: -1,
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  benefitText: { fontSize: 15, color: colors.textPrimary },
  optionsSection: { marginTop: 34 },
  segmentedControl: {
    height: 44,
    marginTop: 14,
    padding: 4,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: '#F0F0EC',
  },
  segment: {
    flex: 1,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSegment: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  segmentText: { fontSize: 13, color: colors.textSecondary },
  selectedSegmentText: { fontWeight: '600', color: colors.textPrimary },
  priceCard: {
    minHeight: 116,
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.textPrimary,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  paymentLabel: { fontSize: 17, color: colors.textPrimary },
  priceRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  price: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '700',
    letterSpacing: -1.2,
    color: colors.black,
  },
  pricePeriod: {
    marginLeft: 5,
    fontSize: 13,
    color: colors.textSecondary,
  },
  cancelButton: {
    alignSelf: 'center',
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 12,
  },
  cancelText: { fontSize: 13, color: colors.textSecondary },
  pressed: { opacity: 0.6 },
});
