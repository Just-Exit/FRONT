import { colors } from '@/constants/colors';
import type { FashionCard } from '@/types/fashion-card';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type FashionCardItemProps = {
  card: FashionCard;
  width: number;
  onPress: (card: FashionCard) => void;
};

export function FashionCardItem({
  card,
  width,
  onPress,
}: FashionCardItemProps) {
  const imageSource =
    typeof card.image === 'string' ? { uri: card.image } : card.image;
  const displayDate = card.updatedAt ?? card.createdAt;

  return (
    <Pressable
      accessibilityLabel={`${card.title}, ${displayDate}`}
      accessibilityRole="button"
      onPress={() => onPress(card)}
      style={({ pressed }) => [
        styles.card,
        { width },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.imageWrap}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderMark}>✦</Text>
            <Text style={styles.placeholderText}>Fashion Card</Text>
          </View>
        )}
      </View>
      <Text numberOfLines={1} style={styles.title}>
        {card.title}
      </Text>
      <Text style={styles.date}>
        {card.updatedAt ? '수정 ' : '생성 '}
        {displayDate}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 8,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E0DFD9',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  pressed: { opacity: 0.68, transform: [{ scale: 0.985 }] },
  imageWrap: {
    width: '100%',
    aspectRatio: 0.82,
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: colors.card,
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholderMark: { fontSize: 22, color: colors.textMuted },
  placeholderText: { marginTop: 6, fontSize: 11, color: colors.textMuted },
  title: {
    marginTop: 12,
    paddingHorizontal: 4,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  date: {
    marginTop: 4,
    marginBottom: 5,
    paddingHorizontal: 4,
    fontSize: 11,
    color: colors.textMuted,
  },
});
