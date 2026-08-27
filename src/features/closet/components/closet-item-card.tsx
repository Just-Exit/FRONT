import { colors } from '@/constants/colors';
import type { ClosetItem } from '@/types/closet';
import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const categoryLabels = {
  top: '상의',
  bottom: '하의',
  outer: '아우터',
  shoes: '신발',
  accessory: '액세서리',
} as const;

type Props = { item: ClosetItem; onPress: (item: ClosetItem) => void };

export const ClosetItemCard = memo(function ClosetItemCard({
  item,
  onPress,
}: Props) {
  return (
    <Pressable
      accessibilityLabel={`${item.name}, ${categoryLabels[item.category]}`}
      accessibilityRole="button"
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={[styles.imageFrame, { aspectRatio: item.aspectRatio }]}>
        <Image source={item.image} resizeMode="contain" style={styles.image} />
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{categoryLabels[item.category]}</Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 24,
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderSubtle,
  },
  pressed: { opacity: 0.72 },
  imageFrame: {
    width: '100%',
    minHeight: 112,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '88%', height: '88%' },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  badgeText: { fontSize: 10, color: colors.textSecondary },
});
