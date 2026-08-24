import { colors } from '@/constants/colors';
import type { ImageSourcePropType } from 'react-native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type AppHeaderProps = {
  avatarSource?: ImageSourcePropType;
  avatarPlaceholderText?: string;
  onMenuPress?: () => void;
};

export function AppHeader({
  avatarSource,
  avatarPlaceholderText = 'A',
  onMenuPress,
}: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityLabel="메뉴 열기"
        accessibilityRole="button"
        hitSlop={8}
        onPress={onMenuPress}
        style={({ pressed }) => [styles.menuButton, pressed && styles.pressed]}
      >
        <Text style={styles.menu}>☰</Text>
      </Pressable>
      <Text style={styles.brand}>Pikit</Text>
      <View style={styles.avatar}>
        {avatarSource ? (
          <Image source={avatarSource} style={styles.avatarImage} />
        ) : avatarPlaceholderText ? (
          <Text style={styles.avatarText}>{avatarPlaceholderText}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    width: 34,
    height: 40,
    justifyContent: 'center',
  },
  menu: { fontSize: 22, color: colors.textPrimary },
  pressed: { opacity: 0.55 },
  brand: { fontSize: 20, fontWeight: '600', color: colors.textPrimary },
  avatar: {
    marginLeft: 'auto',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D7D0C2',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.divider,
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%' },
  avatarText: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
});
