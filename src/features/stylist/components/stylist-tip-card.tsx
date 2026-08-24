import { colors } from '@/constants/colors';
import { Image, StyleSheet, Text, View } from 'react-native';

const ideaIcon = require('../../../../assets/images/icons/idea.png');

type StylistTipCardProps = { title: string; description: string };

export function StylistTipCard({ title, description }: StylistTipCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Image source={ideaIcon} resizeMode="contain" style={styles.icon} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    backgroundColor: '#E2E2DE',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  icon: { width: 25, height: 25, tintColor: colors.white },
  copy: { flex: 1 },
  title: { fontSize: 18, lineHeight: 24, color: colors.textPrimary },
  description: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 23,
    color: colors.textSecondary,
  },
});
