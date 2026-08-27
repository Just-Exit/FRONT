import { colors } from '@/constants/colors';
import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

type ClosetScoreProgressProps = {
  score: number;
};

const SIZE = 126;
const STROKE_WIDTH = 9;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const SEGMENT_COUNT = 100;
const ANIMATION_DURATION = 1100;

const segments = Array.from({ length: SEGMENT_COUNT }, (_, index) => {
  const angle = (index / SEGMENT_COUNT) * Math.PI * 2;

  return {
    left: SIZE / 2 + RADIUS * Math.sin(angle) - STROKE_WIDTH / 2,
    top: SIZE / 2 - RADIUS * Math.cos(angle) - STROKE_WIDTH / 2,
  };
});

export function ClosetScoreProgress({ score }: ClosetScoreProgressProps) {
  const targetScore = Math.min(Math.max(score, 0), 100);
  const [animation] = useState(() => new Animated.Value(0));
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const listenerId = animation.addListener(({ value }) => {
      setDisplayScore(Math.round(value));
    });

    Animated.timing(animation, {
      toValue: targetScore,
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    return () => {
      animation.stopAnimation();
      animation.removeListener(listenerId);
    };
  }, [animation, targetScore]);

  const visibleSegmentCount = Math.round((displayScore / 100) * SEGMENT_COUNT);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max: 100,
        now: displayScore,
        text: `${displayScore}%`,
      }}
      style={styles.root}
    >
      <View style={styles.track} />
      {segments.slice(0, visibleSegmentCount).map((position, index) => (
        <View key={index} style={[styles.progressSegment, position]} />
      ))}
      <Text style={styles.value}>{displayScore}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: SIZE / 2,
    borderWidth: STROKE_WIDTH,
    borderColor: colors.analysisTrack,
  },
  progressSegment: {
    position: 'absolute',
    width: STROKE_WIDTH,
    height: STROKE_WIDTH,
    borderRadius: STROKE_WIDTH / 2,
    backgroundColor: colors.black,
  },
  value: {
    fontSize: 31,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
