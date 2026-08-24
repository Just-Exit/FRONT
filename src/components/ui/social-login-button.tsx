import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import type { LoginProvider } from '@/types/auth';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type SocialLoginButtonProps = {
  provider: LoginProvider;
  label: string;
  accessibilityLabel: string;
  onPress?: () => void;
};

function ProviderMark({ provider }: { provider: LoginProvider }) {
  if (provider === 'apple') {
    return <Text style={styles.appleWordmark}>APPLE</Text>;
  }

  if (provider === 'google') {
    return <Text style={styles.googleMark}>G</Text>;
  }

  return (
    <View style={styles.kakaoMark}>
      <View style={styles.kakaoTail} />
    </View>
  );
}

export function SocialLoginButton({
  provider,
  label,
  accessibilityLabel,
  onPress,
}: SocialLoginButtonProps) {
  const isApple = provider === 'apple';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[provider],
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        <ProviderMark provider={provider} />
        <Text style={[styles.label, isApple && styles.appleLabel]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  apple: { backgroundColor: colors.black },
  google: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderSubtle,
  },
  kakao: { backgroundColor: colors.kakaoYellow },
  pressed: { opacity: 0.78 },
  content: {
    minWidth: 208,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
  },
  label: { ...typography.buttonLabel, color: colors.textPrimary },
  appleLabel: { color: colors.white },
  appleWordmark: {
    width: 101,
    color: colors.white,
    fontSize: 23,
    lineHeight: 26,
    fontWeight: '300',
    letterSpacing: -0.5,
  },
  googleMark: {
    width: 20,
    color: colors.googleBlue,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  kakaoMark: {
    width: 17,
    height: 14,
    borderRadius: 2,
    backgroundColor: colors.textPrimary,
  },
  kakaoTail: {
    position: 'absolute',
    left: 3,
    bottom: -3,
    width: 5,
    height: 5,
    backgroundColor: colors.textPrimary,
    transform: [{ rotate: '32deg' }],
  },
});
