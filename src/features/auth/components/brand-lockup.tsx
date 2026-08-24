import { colors } from '@/constants/colors';
import { StyleSheet, Text, View } from 'react-native';

export function BrandLockup() {
  return (
    <View accessibilityLabel="Closet AI" style={styles.root}>
      <View style={styles.monogramCircle}>
        <Text style={styles.monogramLight}>C</Text>
        <Text style={styles.monogramBold}>A</Text>
      </View>
      <Text style={styles.tagline}>DESIGNED FOR YOUR WARDROBE</Text>
      <Text style={styles.brand}>CLOSET AI</Text>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center' },
  monogramCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.divider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monogramLight: {
    color: colors.textPrimary,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '300',
    marginRight: -7,
  },
  monogramBold: {
    color: colors.textPrimary,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '500',
  },
  tagline: {
    marginTop: 12,
    color: '#555753',
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 2.1,
  },
  brand: {
    marginTop: 13,
    color: colors.black,
    fontSize: 38,
    lineHeight: 45,
    fontWeight: '600',
    letterSpacing: 9,
    marginLeft: 9,
  },
  divider: {
    width: 48,
    height: StyleSheet.hairlineWidth,
    marginTop: 20,
    backgroundColor: colors.divider,
  },
});
