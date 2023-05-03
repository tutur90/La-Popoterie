import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecipiesProvider } from './api/RecipeContext';
import { AuthProvider } from './api/AuthContext';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {

  return (
    <AuthProvider>
      <RecipiesProvider>
        <Start />
      </RecipiesProvider>
    </AuthProvider>
  );
}

export function Start() {
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
