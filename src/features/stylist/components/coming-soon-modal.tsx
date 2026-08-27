import { colors } from '@/constants/colors';
import { Modal, Pressable, StyleSheet, Text } from 'react-native';

type ComingSoonModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function ComingSoonModal({ visible, onClose }: ComingSoonModalProps) {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <Pressable
        accessibilityLabel="안내 닫기"
        onPress={onClose}
        style={styles.backdrop}
      >
        <Pressable
          accessibilityViewIsModal
          onPress={(event) => event.stopPropagation()}
          style={styles.card}
        >
          <Text style={styles.title}>준비 중이에요</Text>
          <Text style={styles.description}>
            다음 업데이트에 추가 될 예정이에요
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            style={({ pressed }) => [
              styles.confirmButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.confirmLabel}>확인</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    width: '100%',
    maxWidth: 340,
    padding: 24,
    borderRadius: 28,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 12,
  },
  title: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.textPrimary,
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  confirmButton: {
    height: 52,
    marginTop: 26,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  pressed: { opacity: 0.68 },
  confirmLabel: { fontSize: 15, fontWeight: '500', color: colors.white },
});
