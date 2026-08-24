import { colors } from '@/constants/colors';
import type { Href } from 'expo-router';
import { usePathname, useRouter } from 'expo-router';
import {
  Image,
  type ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type NavItem = {
  key: 'home' | 'closet' | 'stylist' | 'analytics' | 'profile';
  label: string;
  icon: ImageSourcePropType;
  route: Href;
};

export const navItems: NavItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: require('../../../assets/images/navicons/home.png'),
    route: '/home',
  },
  {
    key: 'closet',
    label: 'Closet',
    icon: require('../../../assets/images/navicons/hanger.png'),
    route: '/closet-fill',
  },
  {
    key: 'stylist',
    label: 'AI\nStylist',
    icon: require('../../../assets/images/navicons/star.png'),
    route: '/stylist',
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: require('../../../assets/images/navicons/profile.png'),
    route: '/profile',
  },
  {
    key: 'analytics',
    label: '옷장 분석',
    icon: require('../../../assets/images/navicons/graph.png'),
    route: '/analytics',
  },
];

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={styles.shell}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.items}
      >
        {navItems.map((item) => {
          const active = pathname === item.route;

          return (
            <Pressable
              key={item.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              onPress={() => router.replace(item.route)}
              style={({ pressed }) => [
                styles.item,
                pressed && styles.pressedItem,
              ]}
            >
              <View style={[styles.itemContent, active && styles.activeItem]}>
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={[
                    styles.navIcon,
                    { tintColor: active ? colors.white : colors.textSecondary },
                  ]}
                />
                {!active && <Text style={styles.label}>{item.label}</Text>}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 8,
    height: 74,
    paddingHorizontal: 8,
    borderRadius: 37,
    backgroundColor: colors.navBackground,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.09,
    shadowRadius: 18,
    elevation: 7,
    zIndex: 20,
  },
  items: { alignItems: 'center', paddingHorizontal: 1 },
  item: {
    width: 70,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedItem: { opacity: 0.7 },
  itemContent: {
    alignSelf: 'stretch',
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeItem: {
    height: 42,
    marginHorizontal: 5,
    borderRadius: 22,
    backgroundColor: colors.navActive,
  },
  navIcon: { width: 24, height: 24 },
  label: {
    marginTop: 2,
    fontSize: 11,
    lineHeight: 12,
    textAlign: 'center',
    color: colors.textSecondary,
  },
});
