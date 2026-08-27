import { sideMenuItems, type SideMenuItem } from '@/constants/side-menu-items';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Animated,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SideMenuProps = {
  onClose: () => void;
};

const mockUser = {
  name: 'Alex Johnson',
  style: 'STYLE\nENTHUSIAST',
};

const ANIMATION_DURATION = 240;

export function SideMenu({ onClose }: SideMenuProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const menuWidth = Math.min(Math.max(screenWidth * 0.86, 300), 360);
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const closeThen = (callback?: () => void) => {
    Animated.timing(progress, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) return;
      onClose();
      callback?.();
    });
  };

  const handleItemPress = (item: SideMenuItem) => {
    const route = item.route;
    if (!route) return;
    closeThen(() => router.push(route));
  };

  const handleLogout = () => {
    // TODO: authentication API 연결 후 logout 처리
  };

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-menuWidth, 0],
  });

  return (
    <Modal
      animationType="none"
      navigationBarTranslucent
      onRequestClose={() => closeThen()}
      statusBarTranslucent
      transparent
      visible
    >
      <View style={styles.modalRoot}>
        <Animated.View style={[styles.overlay, { opacity: progress }]}>
          <Pressable
            accessibilityLabel="사이드 메뉴 닫기"
            onPress={() => closeThen()}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <Animated.View
          accessibilityViewIsModal
          style={[
            styles.panel,
            { width: menuWidth, transform: [{ translateX }] },
          ]}
        >
          <View
            style={[
              styles.safeAreaContent,
              {
                paddingTop: insets.top + 12,
                paddingBottom: insets.bottom + 28,
              },
            ]}
          >
            <View style={styles.userSection}>
              <View style={styles.profilePlaceholder}>
                <Text style={styles.profileInitial}>A</Text>
              </View>
              <View style={styles.userCopy}>
                <Text style={styles.userName}>{mockUser.name}</Text>
                <Text style={styles.styleBadge}>{mockUser.style}</Text>
              </View>
              <Pressable
                accessibilityLabel="사이드 메뉴 닫기"
                accessibilityRole="button"
                hitSlop={10}
                onPress={() => closeThen()}
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.closeIcon}>×</Text>
              </Pressable>
            </View>

            <View style={styles.divider} />

            <View style={styles.menuList}>
              {sideMenuItems.map((item, index) => (
                <View key={item.key}>
                  {index === 4 && <View style={styles.menuDivider} />}
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => handleItemPress(item)}
                    style={({ pressed }) => [
                      styles.menuItem,
                      pressed && styles.menuItemPressed,
                    ]}
                  >
                    <Image
                      resizeMode="contain"
                      source={item.icon}
                      style={styles.menuIcon}
                    />
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </Pressable>
                </View>
              ))}
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={handleLogout}
              style={({ pressed }) => [
                styles.logoutButton,
                pressed && styles.logoutPressed,
              ]}
            >
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/sidemenu/logout.png')}
                style={styles.logoutIcon}
              />
              <Text style={styles.logoutLabel}>로그아웃</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: { flex: 1 },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
  },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
    backgroundColor: '#FAF9F4',
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 0.24,
    shadowRadius: 24,
    elevation: 24,
  },
  safeAreaContent: { flex: 1 },
  userSection: {
    minHeight: 120,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePlaceholder: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D7D0C2',
  },
  profileInitial: { fontSize: 21, fontWeight: '600', color: '#343532' },
  userCopy: { flex: 1, marginLeft: 18 },
  userName: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '500',
    color: '#20211F',
  },
  styleBadge: {
    alignSelf: 'flex-start',
    marginTop: 7,
    minWidth: 148,
    paddingHorizontal: 13,
    paddingVertical: 5,
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: '#E8E7E2',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
    letterSpacing: 0.7,
    color: '#555652',
  },
  closeButton: {
    width: 36,
    height: 44,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 32,
    lineHeight: 34,
    fontWeight: '300',
    color: '#4B4D49',
  },
  pressed: { opacity: 0.5 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#D9D8D2' },
  menuList: { paddingTop: 28, paddingHorizontal: 24 },
  menuItem: {
    height: 66,
    paddingHorizontal: 15,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemPressed: { opacity: 0.58, backgroundColor: '#ECEBE5' },
  menuIcon: { width: 23, height: 23 },
  menuLabel: { marginLeft: 17, fontSize: 16, lineHeight: 22, color: '#292A28' },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 0,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#D9D8D2',
  },
  logoutButton: {
    height: 50,
    marginTop: 'auto',
    marginHorizontal: 30,
    marginBottom: 0,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9E8E3',
  },
  logoutPressed: { opacity: 0.65, transform: [{ scale: 0.99 }] },
  logoutIcon: { width: 15, height: 15, marginRight: 10 },
  logoutLabel: { fontSize: 13, color: '#3E403D' },
});
