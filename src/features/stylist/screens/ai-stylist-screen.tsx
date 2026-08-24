import { AppHeader } from '@/components/layout/app-header';
import { Screen } from '@/components/layout/screen';
import { BottomNavigation } from '@/components/navigation/bottom-navigation';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { ConditionChip } from '@/features/stylist/components/condition-chip';
import { OutfitRecommendationCard } from '@/features/stylist/components/outfit-recommendation-card';
import { StylistTipCard } from '@/features/stylist/components/stylist-tip-card';
import {
  mockOutfits,
  stylistConditions,
  stylistSummary,
  stylistTip,
} from '@/mocks/stylist';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const CARD_GAP = 16;

export function AIStylistScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = Math.min(340, screenWidth - spacing.lg * 2 - 10);

  return (
    <Screen style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.padded}>
          <AppHeader />
          <Text style={styles.title}>{stylistSummary.title}</Text>
          <Text style={styles.description}>{stylistSummary.description}</Text>
          <View style={styles.conditions}>
            {stylistConditions.map((condition) => (
              <ConditionChip key={condition.id} {...condition} />
            ))}
          </View>
        </View>

        <FlatList
          horizontal
          data={mockOutfits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OutfitRecommendationCard outfit={item} width={cardWidth} />
          )}
          ItemSeparatorComponent={() => <View style={styles.cardGap} />}
          contentContainerStyle={styles.carousel}
          decelerationRate="fast"
          snapToInterval={cardWidth + CARD_GAP}
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.tipWrap}>
          <StylistTipCard {...stylistTip} />
        </View>
      </ScrollView>
      <BottomNavigation />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background },
  content: { paddingBottom: 126 },
  padded: { paddingHorizontal: spacing.lg },
  title: {
    marginTop: 25,
    fontSize: 27,
    lineHeight: 34,
    letterSpacing: -0.7,
    color: colors.textPrimary,
  },
  description: {
    marginTop: 5,
    maxWidth: 340,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textSecondary,
  },
  conditions: {
    marginTop: 31,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  carousel: {
    paddingHorizontal: spacing.lg,
    paddingTop: 31,
    paddingBottom: 24,
  },
  cardGap: { width: CARD_GAP },
  tipWrap: { marginTop: 30, paddingHorizontal: spacing.lg },
});
