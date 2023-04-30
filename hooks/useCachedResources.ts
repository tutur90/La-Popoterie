import { AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../api/Context';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { userIsLoaded } = useAuthContext();

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();


        // Load fonts
        await Font.loadAsync({
          ...AntDesign.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        await new Promise((resolve) => {
          if (userIsLoaded) {
            resolve(true)
          }
        })


      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        console.log('Font loaded');
        SplashScreen.hideAsync();

      }
    }

    loadResourcesAndDataAsync();
  }, [userIsLoaded]);


  return isLoadingComplete;
}
