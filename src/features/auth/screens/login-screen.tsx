import { Screen } from '@/components/layout/screen';
import { SocialLoginButton } from '@/components/ui/social-login-button';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import type { LoginOption } from '@/types/auth';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type LoginScreenProps = {
  options: LoginOption[];
  onLogin: (provider: LoginOption['id'] | 'email') => void;
};

export function LoginScreen({ options, onLogin }: LoginScreenProps) {
  return (
    <Screen style={styles.screen} testID="login-screen">
      <View style={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>
            당신의 디지털 옷장에 오신 것을{`\n`}환영합니다.
          </Text>
          <Text style={styles.description}>
            AI 기반의 스타일링, 당신의 삶을 위해 정리됩니다.
          </Text>
        </View>

        <View style={styles.actions}>
          {options.map((option) => (
            <SocialLoginButton
              key={option.id}
              provider={option.id}
              label={option.label}
              accessibilityLabel={option.accessibilityLabel}
              onPress={() => onLogin(option.id)}
            />
          ))}
          <Pressable
            accessibilityRole="button"
            onPress={() => onLogin('email')}
            style={styles.emailButton}
          >
            <Text style={styles.emailLabel}>이메일 로그인</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.terms}>
        계속 진행하면 <Text style={styles.underlined}>서비스 이용약관</Text> 및{' '}
        <Text style={styles.underlined}>개인정보 처리방침</Text>에{`\n`}동의하는
        것으로 간주됩니다.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 420,
    marginTop: '18%',
  },
  hero: { alignItems: 'center' },
  title: {
    ...typography.loginTitle,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  description: {
    ...typography.loginDescription,
    marginTop: 9,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actions: { marginTop: 48, gap: 16 },
  emailButton: {
    minHeight: 32,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  terms: {
    ...typography.caption,
    position: 'absolute',
    bottom: 25,
    left: spacing.lg,
    right: spacing.lg,
    color: colors.textMuted,
    textAlign: 'center',
  },
  underlined: { textDecorationLine: 'underline' },
});
