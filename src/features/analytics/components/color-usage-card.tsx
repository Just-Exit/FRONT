import { colors } from '@/constants/colors';
import { colorUsageData } from '@/mocks/closet-analysis';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { AnalyticsCard } from './analytics-card';

function ColorBar({
  percentage,
  color,
}: {
  percentage: number;
  color: string;
}) {
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, [percentage, progress]);

  return (
    <View style={styles.track}>
      <Animated.View
        style={[
          styles.fill,
          {
            width: `${percentage}%`,
            backgroundColor: color,
            transform: [{ scaleX: progress }],
            transformOrigin: 'left center',
          },
        ]}
      />
    </View>
  );
}

export function ColorUsageCard() {
  return (
    <AnalyticsCard>
      <View style={styles.titleRow}>
        <Text style={styles.title}>가장 많이 입은 컬러</Text>
        <Text style={styles.palette}>◉</Text>
      </View>
      <View style={styles.rows}>
        {colorUsageData.map((item) => (
          <View key={item.name}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>{item.name}</Text>
              <Text style={styles.percentage}>{item.percentage}%</Text>
            </View>
            <ColorBar percentage={item.percentage} color={item.color} />
          </View>
        ))}
      </View>
    </AnalyticsCard>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  title: { flex: 1, fontSize: 20, color: colors.textPrimary },
  palette: { fontSize: 20, color: colors.textSecondary },
  rows: { marginTop: 30, gap: 21 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 13, color: colors.textPrimary },
  percentage: { fontSize: 13, color: colors.textPrimary },
  track: {
    height: 12,
    marginTop: 9,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.analysisTrack,
  },
  fill: { height: '100%', borderRadius: 6 },
});
