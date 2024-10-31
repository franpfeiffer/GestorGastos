import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ExpenseProvider, useExpenses } from '../contexts/ExpenseContext';

function RootLayoutNav() {
  const { isFirstLaunch } = useExpenses();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isFirstLaunch !== 'undefined') {
      if (isFirstLaunch && segments[0] !== '(auth)') {
        router.replace('/(auth)/initial-setup');
      } else if (!isFirstLaunch && segments[0] !== '(tabs)') {
        router.replace('/(tabs)');
      }
    }
  }, [isFirstLaunch, segments]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <ExpenseProvider>
      <RootLayoutNav />
    </ExpenseProvider>
  );
}
