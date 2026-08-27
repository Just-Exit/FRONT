import { colors } from '@/constants/colors';
import type { ClosetCategory } from '@/types/closet';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

export type ClosetCategoryFilterValue = ClosetCategory | 'all';

const categories: { label: string; value: ClosetCategoryFilterValue }[] = [
  { label: '전체', value: 'all' },
  { label: '상의', value: 'top' },
  { label: '하의', value: 'bottom' },
  { label: '아우터', value: 'outer' },
  { label: '신발', value: 'shoes' },
  { label: '액세서리', value: 'accessory' },
];

type Props = {
  value: ClosetCategoryFilterValue;
  onChange: (value: ClosetCategoryFilterValue) => void;
};

export function ClosetCategoryFilter({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => {
        const selected = category.value === value;
        return (
          <Pressable
            key={category.value}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(category.value)}
            style={({ pressed }) => [
              styles.chip,
              selected && styles.selectedChip,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.label, selected && styles.selectedLabel]}>
              {category.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { gap: 8, paddingRight: 24 },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  selectedChip: { backgroundColor: colors.navActive },
  label: { fontSize: 13, color: colors.textSecondary },
  selectedLabel: { color: colors.white },
  pressed: { opacity: 0.72 },
});
