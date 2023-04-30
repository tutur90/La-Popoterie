/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { tabOptionStyle } from '../components/Navigation';



import LoginScreen from '../screens/login/LoginScreen';
import WelcomeScreen from '../screens/login/WelcomeScreen';


import { auth } from '../api/Firebase';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/navigator/ModalScreen';
import NotFoundScreen from '../screens/navigator/NotFoundScreen';
import RecipeScreen from '../screens/navigator/RecipeScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import HomeScreen from '../screens/tabs/HomeScreen';
import { useAuthContext } from '../api/Context';
import LikeScreen from '../screens/tabs/LikeScreen';
import SearchScreen from '../screens/tabs/SearchScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { user } = useAuthContext();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      {
        !user ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>)
          :
          (
            <>
              <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
              <Stack.Screen name="Recipe" component={RecipeScreen} />

              <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
              </Stack.Group>
            </>)}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={tabOptionStyle('Acueuil', 'home')}
      />
      <BottomTab.Screen
        name="Like"
        component={LikeScreen}
        options={tabOptionStyle('Favorite', 'hearto')}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={tabOptionStyle('Recherche', 'search1')}
      />
    </BottomTab.Navigator>
  );
}
