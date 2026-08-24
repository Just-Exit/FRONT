import { Screen } from '@/components/layout/screen';
import { colors } from '@/constants/colors';
import { BrandLockup } from '@/features/auth/components/brand-lockup';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

const SPLASH_DURATION_MS = 1800;

export function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(
      () => router.replace('/login'),
      SPLASH_DURATION_MS,
    );
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Screen edges={[]} style={styles.screen} testID="splash-screen">
      <BrandLockup />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
