import { SideMenuProvider } from '@/components/navigation/side-menu-context';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <SideMenuProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SideMenuProvider>
  );
}
