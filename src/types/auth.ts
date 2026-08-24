export type LoginProvider = 'apple' | 'google' | 'kakao';

export type LoginOption = {
  id: LoginProvider;
  label: string;
  accessibilityLabel: string;
};
