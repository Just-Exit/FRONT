import { colors } from '@/constants/colors';
import { unwornItems } from '@/mocks/closet-analysis';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AnalyticsCard } from './analytics-card';

export function UnwornItemsCard() {
  return (
    <AnalyticsCard>
      <View style={styles.header}>
        <View style={styles.headingCopy}>
          <Text style={styles.title}>잘 입지 않는 옷</Text>
          <Text style={styles.description}>
            최근 6개월간 입지 않은 아이템입니다.
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.donateButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.donateLabel}>기부하기</Text>
        </Pressable>
      </View>
      <FlatList
        horizontal
        data={unwornItems}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={item.image}
              resizeMode="cover"
              style={styles.itemImage}
            />
            <Text numberOfLines={1} style={styles.itemName}>
              {item.name}
            </Text>
            <Text style={styles.wearCount}>{item.wearCount}회 착용</Text>
          </View>
        )}
      />
    </AnalyticsCard>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'flex-start' },
  headingCopy: { flex: 1, paddingRight: 12 },
  title: { fontSize: 20, color: colors.textPrimary },
  description: {
    marginTop: 5,
    maxWidth: 190,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  donateButton: {
    minWidth: 94,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  donateLabel: { fontSize: 14, color: colors.white },
  list: { paddingTop: 24, paddingRight: 8 },
  separator: { width: 14 },
  item: { width: 128 },
  itemImage: {
    width: 128,
    height: 166,
    borderRadius: 16,
  },
  itemName: { marginTop: 9, fontSize: 12, color: colors.textPrimary },
  wearCount: { marginTop: 5, fontSize: 11, color: colors.danger },
  pressed: { opacity: 0.65, transform: [{ scale: 0.98 }] },
});
