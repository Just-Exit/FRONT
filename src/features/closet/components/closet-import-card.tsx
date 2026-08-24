import { colors } from '@/constants/colors';
import { useState } from 'react';
import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';

type ClosetImportCardProps = {
  title: string;
  description: string;
  icon: string;
  image: ImageSourcePropType;
  onPress: () => void;
};

const RIPPLE_SIZE = 460;

export function ClosetImportCard({
  title,
  description,
  icon,
  image,
  onPress,
}: ClosetImportCardProps) {
  const [overlayOpacity] = useState(() => new Animated.Value(0.36));
  const [rippleScale] = useState(() => new Animated.Value(0.05));
  const [rippleOpacity] = useState(() => new Animated.Value(0));
  const [cardScale] = useState(() => new Animated.Value(1));
  const [touch, setTouch] = useState({ x: 170, y: 95 });

  const runReveal = () => {
    rippleScale.setValue(0.05);
    rippleOpacity.setValue(0.42);
    Animated.parallel([
      Animated.sequence([
        Animated.timing(cardScale, {
          toValue: 1.012,
          duration: 210,
          useNativeDriver: true,
        }),
        Animated.spring(cardScale, {
          toValue: 1,
          damping: 14,
          stiffness: 180,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(rippleScale, {
        toValue: 1.25,
        duration: 620,
        useNativeDriver: true,
      }),
      Animated.timing(rippleOpacity, {
        toValue: 0,
        duration: 620,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(overlayOpacity, {
          toValue: 0.04,
          duration: 420,
          useNativeDriver: true,
        }),
        Animated.delay(280),
        Animated.timing(overlayOpacity, {
          toValue: 0.32,
          duration: 520,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: cardScale }] }}>
      <Pressable
        accessibilityRole="button"
        onPressIn={(event) => {
          setTouch({
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
          });
          runReveal();
        }}
        onPress={onPress}
      >
        <ImageBackground
          source={image}
          imageStyle={styles.image}
          style={styles.card}
        >
          <Animated.View
            pointerEvents="none"
            style={[styles.film, { opacity: overlayOpacity }]}
          />
          <Animated.View
            pointerEvents="none"
            style={[
              styles.ripple,
              {
                left: touch.x - RIPPLE_SIZE / 2,
                top: touch.y - RIPPLE_SIZE / 2,
                opacity: rippleOpacity,
                transform: [{ scale: rippleScale }],
              },
            ]}
          />
          <View style={styles.copyRow}>
            <View style={styles.iconBox}>
              <Text style={styles.icon}>{icon}</Text>
            </View>
            <View style={styles.copy}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 192,
    borderRadius: 31,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  image: { borderRadius: 31 },
  film: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#F7F3EA',
  },
  ripple: {
    position: 'absolute',
    width: RIPPLE_SIZE,
    height: RIPPLE_SIZE,
    borderRadius: RIPPLE_SIZE / 2,
    borderWidth: 18,
    borderColor: 'rgba(255,255,255,0.72)',
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  copyRow: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.7)',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 22, color: colors.white },
  copy: { flex: 1, marginLeft: 16 },
  title: {
    color: colors.white,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '500',
  },
  description: {
    marginTop: 3,
    color: 'rgba(255,255,255,0.83)',
    fontSize: 12,
    lineHeight: 17,
  },
});
