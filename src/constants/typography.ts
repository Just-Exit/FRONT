import type { TextStyle } from 'react-native';

export const typography = {
  loginTitle: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '400',
    letterSpacing: -0.6,
  },
  loginDescription: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  buttonLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;
