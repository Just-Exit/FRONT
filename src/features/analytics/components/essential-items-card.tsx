import { colors } from '@/constants/colors';
import { essentialItems } from '@/mocks/closet-analysis';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AnalyticsCard } from './analytics-card';

export function EssentialItemsCard() {
  return (
    <AnalyticsCard>
      <Text style={styles.title}>필수 아이템 추천</Text>
      <Text style={styles.description}>
        핵심 옷장을 완성하기 위한 AI 추천입니다.
      </Text>
      <View style={styles.items}>
        {essentialItems.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.imagePlaceholder} />
            <View style={styles.copy}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <Pressable
              accessibilityLabel={`${item.name} 추가`}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.addButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.add}>＋</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </AnalyticsCard>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, color: colors.textPrimary },
  description: { marginTop: 8, fontSize: 14, color: colors.textSecondary },
  items: { marginTop: 25, gap: 16 },
  item: {
    minHeight: 96,
    padding: 16,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  imagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.analysisTrack,
  },
  copy: { flex: 1, marginLeft: 16 },
  itemName: { fontSize: 15, color: colors.textPrimary },
  itemDescription: { marginTop: 4, fontSize: 12, color: colors.textSecondary },
  addButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
  },
  add: { fontSize: 28, lineHeight: 30, color: colors.black },
  pressed: { opacity: 0.4, transform: [{ scale: 0.94 }] },
});
