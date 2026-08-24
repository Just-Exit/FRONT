import { colors } from '@/constants/colors';
import { sustainabilityInsight } from '@/mocks/closet-analysis';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function SustainabilityCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>지속 가능한 선택</Text>
      <Text style={styles.copy}>
        이번 달 &apos;착용당 비용&apos;이{' '}
        {sustainabilityInsight.improvementPercentage}% 개선되었습니다.{`\n`}더
        의도적이고 높은 품질의 컬렉션을 구축하고 계시네요.
      </Text>
      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.reportButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.reportLabel}>전체 리포트 보기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 28, borderRadius: 30, backgroundColor: colors.navActive },
  title: { fontSize: 25, color: colors.white },
  copy: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 25,
    color: '#C8CAC6',
  },
  reportButton: {
    alignSelf: 'center',
    marginTop: 34,
    paddingHorizontal: 34,
    paddingVertical: 17,
    borderRadius: 16,
    backgroundColor: colors.white,
  },
  reportLabel: { fontSize: 15, color: colors.black },
  pressed: { opacity: 0.65, transform: [{ scale: 0.98 }] },
});
