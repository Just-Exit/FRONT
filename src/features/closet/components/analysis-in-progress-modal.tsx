import { colors } from '@/constants/colors';
import { useEffect } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type AnalysisInProgressModalProps = {
  autoCloseDelay?: number;
  message?: string;
  visible: boolean;
  onClose: () => void;
};

export function AnalysisInProgressModal({
  autoCloseDelay,
  message = `옷을 등록하기 위해\nAI가 분석 중이에요`,
  visible,
  onClose,
}: AnalysisInProgressModalProps) {
  useEffect(() => {
    if (!visible || autoCloseDelay === undefined) {
      return;
    }

    const timer = setTimeout(onClose, autoCloseDelay);

    return () => clearTimeout(timer);
  }, [autoCloseDelay, onClose, visible]);

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
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
          <View style={styles.iconCircle}>
            <Text accessibilityElementsHidden style={styles.sparkle}>
              ✦
            </Text>
          </View>
          <Text style={styles.message}>{message}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            style={({ pressed }) => [
              styles.confirmButton,
              pressed && styles.confirmButtonPressed,
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
    backgroundColor: 'rgba(245, 245, 242, 0.78)',
  },
  card: {
    width: '100%',
    maxWidth: 340,
    paddingTop: 34,
    paddingHorizontal: 24,
    paddingBottom: 22,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.17,
    shadowRadius: 28,
    elevation: 12,
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  sparkle: { fontSize: 27, lineHeight: 31, color: colors.white },
  message: {
    marginTop: 24,
    fontSize: 19,
    lineHeight: 28,
    fontWeight: '500',
    letterSpacing: -0.35,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  confirmButton: {
    alignSelf: 'stretch',
    height: 50,
    marginTop: 29,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  confirmButtonPressed: { opacity: 0.68, transform: [{ scale: 0.99 }] },
  confirmLabel: { fontSize: 15, fontWeight: '500', color: colors.white },
});
