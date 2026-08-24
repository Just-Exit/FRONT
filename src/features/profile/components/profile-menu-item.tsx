import { colors } from '@/constants/colors';
import {
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ProfileMenuItemProps = {
  icon: ImageSourcePropType;
  label: string;
  onPress: () => void;
  showDivider?: boolean;
};

export function ProfileMenuItem({
  icon,
  label,
  onPress,
  showDivider = false,
}: ProfileMenuItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.iconWrapper}>
        <Image source={icon} resizeMode="contain" style={styles.icon} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text accessibilityElementsHidden style={styles.chevron}>
        ›
      </Text>
      {showDivider && <View style={styles.divider} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 76,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: { opacity: 0.55 },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  icon: { width: 23, height: 23 },
  label: {
    flex: 1,
    marginLeft: 14,
    fontSize: 15,
    color: colors.textPrimary,
  },
  chevron: {
    marginLeft: 12,
    fontSize: 28,
    lineHeight: 30,
    color: colors.textMuted,
  },
  divider: {
    position: 'absolute',
    left: 74,
    right: 18,
    bottom: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
    opacity: 0.5,
  },
});
