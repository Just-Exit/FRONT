import { colors } from '@/constants/colors';
import { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

type FloatingClosetButtonProps = {
  visible: boolean;
  onPress: () => void;
};

export function FloatingClosetButton({
  visible,
  onPress,
}: FloatingClosetButtonProps) {
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.spring(progress, {
      toValue: visible ? 1 : 0,
      damping: 16,
      stiffness: 180,
      mass: 0.8,
      useNativeDriver: true,
    }).start();
  }, [progress, visible]);

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        styles.wrapper,
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
            {
              scale: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              }),
            },
          ],
        },
      ]}
    >
      <Pressable
        accessibilityLabel="옷장 채우기"
        onPress={onPress}
        style={styles.button}
      >
        <Text style={styles.plus}>＋</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: 'absolute', right: 24, bottom: 94, zIndex: 30 },
  button: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  plus: {
    color: colors.white,
    fontSize: 35,
    lineHeight: 38,
    fontWeight: '200',
  },
});
