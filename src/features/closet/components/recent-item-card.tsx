import { colors } from '@/constants/colors';
import { useItemProgress } from '@/features/closet/hooks/use-item-progress';
import type { RecentClosetItem } from '@/types/closet';
import { useEffect, useState } from 'react';
import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export const RECENT_CARD_WIDTH = 164;

type RecentItemCardProps = {
  item: RecentClosetItem;
  onPress?: (item: RecentClosetItem) => void;
};

export function RecentItemCard({ item, onPress }: RecentItemCardProps) {
  const progress = useItemProgress(item);
  const [animatedProgress] = useState(() => new Animated.Value(progress));

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: item.status === 'complete' ? 380 : 800,
      useNativeDriver: false,
    }).start();
  }, [animatedProgress, item.status, progress]);

  const isProcessing = item.status === 'processing' || item.status === 'queued';

  return (
    <Pressable
      accessibilityRole={item.status === 'complete' ? 'button' : undefined}
      disabled={item.status !== 'complete'}
      onPress={() => onPress?.(item)}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <ImageBackground
        source={item.image}
        imageStyle={styles.image}
        style={styles.card}
      >
        <View style={styles.shade} />
        {item.status === 'complete' && <Text style={styles.check}>✓</Text>}
        <View style={styles.footer}>
          {isProcessing ? (
            <>
              <View style={styles.progressTrack}>
                <Animated.View
                  style={[
                    styles.progressBar,
                    {
                      width: animatedProgress.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              </View>
              <Text style={styles.processing}>분류 중...</Text>
            </>
          ) : item.status === 'failed' ? (
            <>
              <Text style={styles.name}>분류 실패</Text>
              <Text style={styles.meta}>다시 시도해주세요</Text>
            </>
          ) : (
            <>
              <Text numberOfLines={1} style={styles.name}>
                {item.name ?? '분류 완료'}
              </Text>
              <Text style={styles.meta}>
                {[item.category, item.season].filter(Boolean).join(' · ')}
              </Text>
            </>
          )}
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.82 },
  card: {
    width: RECENT_CARD_WIDTH,
    height: 216,
    borderRadius: 22,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: colors.card,
  },
  image: { borderRadius: 22 },
  shade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.16)',
  },
  check: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 25,
    height: 25,
    borderRadius: 13,
    overflow: 'hidden',
    textAlign: 'center',
    lineHeight: 25,
    backgroundColor: colors.black,
    color: colors.white,
    fontSize: 13,
  },
  footer: { padding: 16, minHeight: 72, justifyContent: 'flex-end' },
  progressTrack: {
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: colors.white,
  },
  processing: {
    marginTop: 9,
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  name: { color: colors.white, fontSize: 14, fontWeight: '600' },
  meta: { marginTop: 5, color: 'rgba(255,255,255,0.7)', fontSize: 11 },
});
