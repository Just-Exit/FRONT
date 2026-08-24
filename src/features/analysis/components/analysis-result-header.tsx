import { colors } from '@/constants/colors';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type AnalysisResultHeaderProps = {
  onClose: () => void;
};

export function AnalysisResultHeader({ onClose }: AnalysisResultHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityLabel="분석 결과 닫기"
        accessibilityRole="button"
        hitSlop={8}
        onPress={onClose}
        style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
      >
        <Text style={styles.close}>×</Text>
      </Pressable>
      <Text style={styles.brand}>Pikit</Text>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>A</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: { width: 38, height: 40, justifyContent: 'center' },
  close: {
    fontSize: 32,
    lineHeight: 34,
    fontWeight: '300',
    color: colors.textPrimary,
  },
  brand: { fontSize: 20, fontWeight: '600', color: colors.textPrimary },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D7D0C2',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.divider,
  },
  avatarText: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  pressed: { opacity: 0.55 },
});
