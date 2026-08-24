import { colors } from '@/constants/colors';
import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

export function AnalyticsCard({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 30,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.035,
    shadowRadius: 18,
    elevation: 2,
  },
});
