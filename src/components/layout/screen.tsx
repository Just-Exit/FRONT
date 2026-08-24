import type { ComponentProps, PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = PropsWithChildren<ComponentProps<typeof SafeAreaView>>;

export function Screen({ children, style, ...props }: ScreenProps) {
  return (
    <SafeAreaView style={[styles.root, style]} {...props}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
