import { colors } from '@/constants/colors';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type FashionCardEmptyStateProps = {
  onCreatePress: () => void;
};

export function FashionCardEmptyState({
  onCreatePress,
}: FashionCardEmptyStateProps) {
  return (
    <View style={styles.root}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>✦</Text>
      </View>
      <Text style={styles.title}>아직 만든 패션 카드가 없어요.</Text>
      <Text style={styles.description}>나만의 패션 카드를 만들어보세요.</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onCreatePress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonLabel}>패션 카드 만들기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: 440,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  icon: { fontSize: 26, color: colors.textSecondary },
  title: { marginTop: 22, fontSize: 18, color: colors.textPrimary },
  description: { marginTop: 7, fontSize: 14, color: colors.textSecondary },
  button: {
    marginTop: 24,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 24,
    backgroundColor: colors.black,
  },
  buttonPressed: { opacity: 0.65 },
  buttonLabel: { fontSize: 14, color: colors.white },
});
