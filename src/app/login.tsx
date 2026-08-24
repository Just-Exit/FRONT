import { LoginScreen } from '@/features/auth/screens/login-screen';
import { loginOptions } from '@/mocks/login-options';
import type { LoginOption } from '@/types/auth';
import { useRouter } from 'expo-router';

export default function LoginRoute() {
  const router = useRouter();

  const handleMockLogin = (_provider: LoginOption['id'] | 'email') => {
    router.replace('/home');
  };

  return <LoginScreen options={loginOptions} onLogin={handleMockLogin} />;
}
