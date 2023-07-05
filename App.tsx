import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecipiesProvider } from './context/RecipeContext';
import { AuthProvider } from './context/AuthContext';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {

  return (
    <AuthProvider>
      <RecipiesProvider>
        <Loading />
      </RecipiesProvider>
    </AuthProvider>
  );
}

export function Loading() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) { return null; }
  else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style='auto' />
      </SafeAreaProvider>)
  }
}
