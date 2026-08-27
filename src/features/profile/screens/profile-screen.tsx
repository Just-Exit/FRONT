import { AppHeader } from '@/components/layout/app-header';
import { Screen } from '@/components/layout/screen';
import { BottomNavigation } from '@/components/navigation/bottom-navigation';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { ProfileMenuItem } from '@/features/profile/components/profile-menu-item';
import { useRouter } from 'expo-router';
import type { ImageSourcePropType } from 'react-native';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const profile: {
  name: string;
  description: string;
  imageSource?: ImageSourcePropType;
} = {
  name: 'Alex Johnson',
  description: '스타일 매니아 · 뉴욕, NY',
  imageSource: undefined,
};

export function ProfileScreen() {
  const router = useRouter();

  const handleViewPlans = () => {
    router.push('/subscription');
  };

  const handleLogout = () => {
    console.log('Logout pressed');
  };

  const handlePreferencePress = () => {
    console.log('Preference settings pressed');
  };

  const handleAISettingsPress = () => {
    console.log('AI settings pressed');
  };

  const handleClosetManagementPress = () => {
    console.log('Closet management pressed');
  };

  const handleSubscriptionPress = () => {
    console.log('Subscription management pressed');
  };

  const menuGroups = [
    [
      {
        key: 'preference',
        label: '옷장 취향 설정',
        icon: require('../../../../assets/images/mypageicons/palete.png'),
        onPress: handlePreferencePress,
      },
      {
        key: 'ai-settings',
        label: 'AI 설정',
        icon: require('../../../../assets/images/mypageicons/ai-icon.png'),
        onPress: handleAISettingsPress,
      },
    ],
    [
      {
        key: 'closet-management',
        label: '옷장 관리',
        icon: require('../../../../assets/images/mypageicons/box.png'),
        onPress: handleClosetManagementPress,
      },
      {
        key: 'subscription',
        label: '구독 관리',
        icon: require('../../../../assets/images/mypageicons/dollar.png'),
        onPress: handleSubscriptionPress,
      },
    ],
  ];

  return (
    <Screen style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader avatarSource={profile.imageSource} />

        <View style={styles.profileSection}>
          <View style={styles.profileImage}>
            {profile.imageSource ? (
              <Image source={profile.imageSource} style={styles.profilePhoto} />
            ) : (
              <Text style={styles.profileInitial}>
                {profile.name.charAt(0)}
              </Text>
            )}
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.description}>{profile.description}</Text>
        </View>

        <View style={styles.premiumCard}>
          <Text accessibilityElementsHidden style={styles.sparkle}>
            ✦
          </Text>
          <Text style={styles.premiumBadge}>프리미엄</Text>
          <Text style={styles.premiumTitle}>프로로 업그레이드</Text>
          <Text style={styles.premiumDescription}>
            무제한 옷장 공간과 맞춤형 일일 AI 스타일링 리포트를 만나보세요.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={handleViewPlans}
            style={({ pressed }) => [
              styles.planButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.planButtonLabel}>플랜 보기</Text>
          </Pressable>
        </View>

        {menuGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.menuGroup}>
            {group.map((item, itemIndex) => (
              <ProfileMenuItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                onPress={item.onPress}
                showDivider={itemIndex < group.length - 1}
              />
            ))}
          </View>
        ))}

        <Pressable
          accessibilityRole="button"
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.logoutText}>로그아웃</Text>
        </Pressable>
        <Text style={styles.version}>버전 2.4.0 (2024)</Text>
      </ScrollView>
      <BottomNavigation />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 126,
  },
  profileSection: {
    paddingTop: 25,
    paddingBottom: 30,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D7D0C2',
    borderWidth: 3,
    borderColor: colors.white,
    overflow: 'hidden',
  },
  profilePhoto: { width: '100%', height: '100%' },
  profileInitial: {
    fontSize: 35,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  name: {
    marginTop: 15,
    fontSize: 23,
    lineHeight: 29,
    fontWeight: '600',
    letterSpacing: -0.4,
    color: colors.textPrimary,
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: colors.textSecondary,
  },
  premiumCard: {
    padding: 24,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: colors.black,
  },
  sparkle: {
    position: 'absolute',
    top: 19,
    right: 23,
    fontSize: 33,
    color: colors.white,
  },
  premiumBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    overflow: 'hidden',
    fontSize: 11,
    color: colors.white,
    backgroundColor: '#30302F',
  },
  premiumTitle: {
    marginTop: 21,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
    color: colors.white,
  },
  premiumDescription: {
    maxWidth: 270,
    marginTop: 9,
    fontSize: 14,
    lineHeight: 21,
    color: '#B7B7B3',
  },
  planButton: {
    alignSelf: 'flex-start',
    marginTop: 22,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 22,
    backgroundColor: colors.white,
  },
  planButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  buttonPressed: { opacity: 0.65 },
  menuGroup: {
    marginTop: 16,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.card,
  },
  logoutButton: {
    alignSelf: 'center',
    marginTop: 30,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  logoutText: {
    fontSize: 14,
    textDecorationLine: 'underline',
    color: colors.textSecondary,
  },
  version: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 11,
    color: colors.textMuted,
  },
});
