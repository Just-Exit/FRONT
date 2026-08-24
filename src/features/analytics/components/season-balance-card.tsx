import { colors } from '@/constants/colors';
import { seasonBalanceData } from '@/mocks/closet-analysis';
import { useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { AnalyticsCard } from './analytics-card';

const CHART_SIZE = 188;
const SEGMENT_COUNT = 100;

export function SeasonBalanceCard() {
  const [drawProgress] = useState(() => new Animated.Value(0));
  const segments = useMemo(
    () =>
      Array.from({ length: SEGMENT_COUNT }, (_, index) => {
        let boundary = 0;
        const data = seasonBalanceData.find((item) => {
          boundary += item.percentage;
          return index < boundary;
        });
        return { index, color: data?.color ?? colors.analysisTrack };
      }),
    [],
  );

  useEffect(() => {
    drawProgress.setValue(0);
    Animated.timing(drawProgress, {
      toValue: 1,
      duration: 1250,
      useNativeDriver: true,
    }).start();
  }, [drawProgress]);

  return (
    <AnalyticsCard>
      <Text style={styles.title}>계절별 밸런스</Text>
      <View style={styles.chart}>
        {segments.map((segment) => (
          <Animated.View
            key={segment.index}
            style={[
              styles.segment,
              {
                backgroundColor: segment.color,
                opacity: drawProgress.interpolate({
                  inputRange: [
                    Math.max(0, segment.index / SEGMENT_COUNT - 0.015),
                    (segment.index + 1) / SEGMENT_COUNT,
                  ],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                }),
                transform: [
                  { rotate: `${segment.index * 3.6}deg` },
                  { translateY: -(CHART_SIZE / 2 - 9) },
                ],
              },
            ]}
          />
        ))}
        <View style={styles.center}>
          <Text style={styles.centerTitle}>사계절</Text>
          <Text style={styles.centerCopy}>최적</Text>
        </View>
      </View>
      <View style={styles.legend}>
        {seasonBalanceData.map((item) => (
          <View key={item.season} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.season} {item.percentage}%
            </Text>
          </View>
        ))}
      </View>
    </AnalyticsCard>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, color: colors.textPrimary },
  chart: {
    width: CHART_SIZE,
    height: CHART_SIZE,
    marginTop: 22,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segment: {
    position: 'absolute',
    width: 7,
    height: 20,
    borderRadius: 4,
  },
  center: {
    width: 142,
    height: 142,
    borderRadius: 71,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  centerTitle: { fontSize: 20, color: colors.textPrimary },
  centerCopy: { marginTop: 2, fontSize: 12, color: colors.textSecondary },
  legend: { marginTop: 24, flexDirection: 'row', flexWrap: 'wrap', rowGap: 12 },
  legendItem: { width: '50%', flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, marginRight: 8, borderRadius: 4 },
  legendText: { fontSize: 13, color: colors.textPrimary },
});
