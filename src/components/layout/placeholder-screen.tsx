import { Screen } from '@/components/layout/screen';
import { BottomNavigation } from '@/components/navigation/bottom-navigation';
import { colors } from '@/constants/colors';
import { StyleSheet, Text } from 'react-native';

export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.copy}>이 화면은 다음 단계에서 구현됩니다.</Text>
      <BottomNavigation />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: { fontSize: 26, color: colors.textPrimary },
  copy: { marginTop: 10, fontSize: 14, color: colors.textSecondary },
});
