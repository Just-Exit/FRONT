import { colors } from '@/constants/colors';
import {
  Image,
  type ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ConditionChipProps = {
  icon: string | ImageSourcePropType;
  label: string;
};

export function ConditionChip({ icon, label }: ConditionChipProps) {
  return (
    <View style={styles.chip}>
      {typeof icon === 'string' ? (
        <Text style={styles.textIcon}>{icon}</Text>
      ) : (
        <Image source={icon} resizeMode="contain" style={styles.imageIcon} />
      )}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#E9E9E5',
  },
  textIcon: { fontSize: 15, color: colors.textPrimary },
  imageIcon: { width: 15, height: 15 },
  label: { fontSize: 13, color: colors.textPrimary },
});
