import { colors } from '@/constants/colors';
import type { OutfitReaction, OutfitRecommendation } from '@/types/stylist';
import { useState } from 'react';
import {
  Animated,
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const reactionIcons = {
  dislike: {
    default: require('../../../../assets/images/icons/dont-like.png'),
    active: require('../../../../assets/images/icons/dislike-fill.png'),
  },
  like: {
    default: require('../../../../assets/images/icons/like.png'),
    active: require('../../../../assets/images/icons/like-fill.png'),
  },
};
const bookmarkIcon = require('../../../../assets/images/icons/bookmark.png');
const bookmarkActiveIcon = require('../../../../assets/images/icons/bookmark-white.png');

type OutfitRecommendationCardProps = {
  outfit: OutfitRecommendation;
  width: number;
};

export function OutfitRecommendationCard({
  outfit,
  width,
}: OutfitRecommendationCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(outfit.isBookmarked);
  const [reaction, setReaction] = useState<OutfitReaction>(outfit.reaction);

  const toggleReaction = (next: Exclude<OutfitReaction, null>) => {
    setReaction((current) => (current === next ? null : next));
  };

  return (
    <View style={[styles.card, { width }]}>
      <View style={styles.imageWrap}>
        <Image source={outfit.image} resizeMode="cover" style={styles.image} />
        <Text style={styles.badge}>{outfit.badge}</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.insightRow}>
          <View style={styles.insightCopy}>
            <Text style={styles.insightLabel}>AI 인사이트</Text>
            <Text style={styles.insight}>이유: {outfit.insight}</Text>
          </View>
          <Text style={styles.score}>★ {outfit.score.toFixed(1)}</Text>
        </View>

        <View style={styles.metricsRow}>
          <Metric label="편안함" value={outfit.comfortScore} />
          <Metric label="스타일" value={outfit.styleScore} />
        </View>

        <View style={styles.ctaRow}>
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.wearButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.wearLabel}>오늘 입기</Text>
          </Pressable>
          <Pressable
            accessibilityLabel="북마크"
            accessibilityRole="button"
            accessibilityState={{ selected: isBookmarked }}
            onPress={() => setIsBookmarked((current) => !current)}
            style={({ pressed }) => [
              styles.bookmarkButton,
              isBookmarked && styles.bookmarkButtonActive,
              pressed && styles.pressed,
            ]}
          >
            <Image
              source={isBookmarked ? bookmarkActiveIcon : bookmarkIcon}
              resizeMode="contain"
              style={[
                styles.bookmarkIcon,
                isBookmarked && styles.bookmarkIconActive,
              ]}
            />
          </Pressable>
        </View>

        <View style={styles.reactions}>
          <ReactionButton
            active={reaction === 'dislike'}
            defaultIcon={reactionIcons.dislike.default}
            activeIcon={reactionIcons.dislike.active}
            label="DISLIKE"
            onPress={() => toggleReaction('dislike')}
          />
          <ReactionButton
            active={reaction === 'like'}
            defaultIcon={reactionIcons.like.default}
            activeIcon={reactionIcons.like.active}
            label="LIKE"
            onPress={() => toggleReaction('like')}
          />
        </View>
      </View>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}/10</Text>
    </View>
  );
}

function ReactionButton({
  active,
  defaultIcon,
  activeIcon,
  label,
  onPress,
}: {
  active: boolean;
  defaultIcon: ImageSourcePropType;
  activeIcon: ImageSourcePropType;
  label: string;
  onPress: () => void;
}) {
  const [bounce] = useState(() => new Animated.Value(0));
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePress = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    bounce.setValue(0);
    Animated.timing(bounce, {
      toValue: 1,
      duration: 260,
      useNativeDriver: true,
    }).start(({ finished }) => {
      setIsAnimating(false);
      if (finished) onPress();
    });
  };

  const animatedStyle = {
    opacity: bounce.interpolate({
      inputRange: [0, 0.35, 0.7, 1],
      outputRange: [1, 0.72, 0.92, 1],
    }),
    transform: [
      {
        translateY: bounce.interpolate({
          inputRange: [0, 0.35, 0.7, 1],
          outputRange: [0, -4, 1, 0],
        }),
      },
      {
        scale: bounce.interpolate({
          inputRange: [0, 0.35, 0.7, 1],
          outputRange: [1, 0.96, 0.99, 1],
        }),
      },
    ],
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      disabled={isAnimating}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.reactionButton,
        active && styles.reactionActive,
        pressed && styles.pressed,
      ]}
    >
      <Animated.Image
        source={active ? activeIcon : defaultIcon}
        resizeMode="contain"
        style={[styles.reactionIcon, animatedStyle]}
      />
      <Text style={[styles.reactionLabel, active && styles.reactionActiveText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  imageWrap: { height: 442 },
  image: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    overflow: 'hidden',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.9)',
    color: colors.white,
    fontSize: 12,
  },
  body: { paddingHorizontal: 24, paddingTop: 23, paddingBottom: 21 },
  insightRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  insightCopy: { flex: 1 },
  insightLabel: { fontSize: 12, color: colors.textSecondary },
  insight: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 19,
    color: colors.textPrimary,
  },
  score: { fontSize: 19, color: colors.textPrimary },
  metricsRow: { marginTop: 19, flexDirection: 'row', gap: 16 },
  metric: {
    flex: 1,
    minHeight: 74,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  metricLabel: { fontSize: 12, color: colors.textSecondary },
  metricValue: { marginTop: 4, fontSize: 21, color: colors.textPrimary },
  ctaRow: { marginTop: 23, height: 58, flexDirection: 'row', gap: 12 },
  wearButton: {
    flex: 1,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  wearLabel: { fontSize: 18, color: colors.white },
  bookmarkButton: {
    width: 58,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E5',
  },
  bookmarkButtonActive: { backgroundColor: colors.black },
  bookmarkIcon: { width: 24, height: 24 },
  bookmarkIconActive: { tintColor: colors.white },
  reactions: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  reactionButton: {
    width: 52,
    minHeight: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactionActive: { backgroundColor: colors.card },
  reactionIcon: { width: 23, height: 23 },
  reactionLabel: { marginTop: 1, fontSize: 9, color: colors.textSecondary },
  reactionActiveText: { color: colors.black, fontWeight: '700' },
  pressed: { opacity: 0.65 },
});
