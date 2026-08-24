import type { LoginOption } from '@/types/auth';

export const loginOptions: LoginOption[] = [
  {
    id: 'apple',
    label: 'Apple로 계속하기',
    accessibilityLabel: 'Apple로 계속하기',
  },
  {
    id: 'google',
    label: 'Google로 계속하기',
    accessibilityLabel: 'Google로 계속하기',
  },
  {
    id: 'kakao',
    label: '카카오로 계속하기',
    accessibilityLabel: '카카오로 계속하기',
  },
];
