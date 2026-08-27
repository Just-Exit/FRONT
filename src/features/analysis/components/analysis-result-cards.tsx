import { colors } from '@/constants/colors';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const FALLBACK_COLOR = '#D6D6CC';

export const isValidHexColor = (value: string) =>
  /^#([0-9A-F]{3}){1,2}$/i.test(value);

type AnalysisInfoCardProps = {
  category: string;
  material: string;
  season: string;
};

export function AnalysisInfoCard({
  category,
  material,
  season,
}: AnalysisInfoCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.primaryInfoRow, styles.divider]}>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>카테고리</Text>
          <Text style={styles.infoValue}>{category}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>소재</Text>
          <Text style={styles.infoValue}>{material}</Text>
        </View>
      </View>
      <View style={styles.seasonRow}>
        <Text style={styles.infoLabel}>계절</Text>
        <View style={styles.infoValueRow}>
          <Text style={styles.seasonIcon}>☼</Text>
          <Text style={styles.infoValue}>{season}</Text>
        </View>
      </View>
    </View>
  );
}

export function ColorPalette({ colors: palette }: { colors: string[] }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>AI 컬러 팔레트</Text>
      <View style={styles.paletteRow}>
        {palette.map((color, index) => {
          const renderedColor = isValidHexColor(color) ? color : FALLBACK_COLOR;
          return (
            <View key={`${color}-${index}`} style={styles.swatch}>
              <View
                accessibilityLabel={`컬러 ${color}`}
                style={[styles.colorCircle, { backgroundColor: renderedColor }]}
              />
              <Text style={styles.hexText}>{color}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export function StyleTags({ initialTags }: { initialTags: string[] }) {
  const [tags, setTags] = useState(initialTags);
  const [tagInput, setTagInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    setTags((currentTags) => [...currentTags, trimmed]);
    setTagInput('');
    setIsAdding(false);
  };

  return (
    <View style={styles.tagsSection}>
      <Text style={styles.cardTitle}>스타일 태그</Text>
      <View style={styles.tagsRow}>
        {tags.map((tag, index) => (
          <View key={`${tag}-${index}`} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {/* <Pressable
          accessibilityLabel="스타일 태그 추가"
          accessibilityRole="button"
          onPress={() => setIsAdding(true)}
          style={({ pressed }) => [styles.addTag, pressed && styles.pressed]}
        >
          <Text style={styles.addTagText}>+</Text>
        </Pressable> */}
      </View>
      {isAdding && (
        <View style={styles.inputRow}>
          <TextInput
            autoFocus
            maxLength={24}
            onChangeText={setTagInput}
            onSubmitEditing={handleAddTag}
            placeholder="새 태그"
            placeholderTextColor={colors.textMuted}
            returnKeyType="done"
            style={styles.input}
            value={tagInput}
          />
          <Pressable
            accessibilityRole="button"
            onPress={handleAddTag}
            style={({ pressed }) => [
              styles.inputButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.inputButtonText}>추가</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 25,
    paddingVertical: 23,
    borderRadius: 24,
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E1E0DB',
  },
  cardTitle: { fontSize: 13, fontWeight: '400', color: colors.textSecondary },
  primaryInfoRow: {
    paddingBottom: 21,
    flexDirection: 'row',
  },
  infoColumn: { flex: 1, gap: 11 },
  seasonRow: { paddingTop: 17, gap: 10 },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  infoLabel: { fontSize: 13, color: colors.textSecondary },
  infoValueRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  infoValue: { fontSize: 18, fontWeight: '500', color: colors.textPrimary },
  seasonIcon: { fontSize: 15, color: colors.textSecondary },
  paletteRow: {
    marginTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  swatch: { flex: 1, alignItems: 'center' },
  colorCircle: {
    width: 49,
    height: 49,
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  hexText: { marginTop: 8, fontSize: 10, color: colors.textSecondary },
  tagsSection: { paddingHorizontal: 8 },
  tagsRow: { marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tag: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E2E1DD',
  },
  tagText: { fontSize: 12, color: colors.textPrimary },
  addTag: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.divider,
  },
  addTagText: { fontSize: 22, lineHeight: 24, color: colors.textPrimary },
  inputRow: { marginTop: 14, flexDirection: 'row', gap: 8 },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.divider,
    color: colors.textPrimary,
  },
  inputButton: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  inputButtonText: { fontSize: 13, fontWeight: '500', color: colors.white },
  pressed: { opacity: 0.65 },
});
