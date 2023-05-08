
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { tabOptionStyle } from '../components/Navigation';

import LoginScreen from '../screens/login/LoginScreen';
import WelcomeScreen from '../screens/login/WelcomeScreen';

import HomeScreen from '../screens/tabs/HomeScreen';
import LikeScreen from '../screens/tabs/LikeScreen';
import SearchScreen from '../screens/tabs/SearchScreen';

import AccountScreen from '../screens/navigator/AccountScreen';
import NotFoundScreen from '../screens/navigator/NotFoundScreen';
import RecipeScreen from '../screens/navigator/RecipeScreen';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { useAuthContext } from '../context/AuthContext';
import InfoScreen from '../screens/navigator/InfoScreen';

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

              <Stack.Screen name="Compte" component={AccountScreen} />

              <Stack.Screen name="Info" component={InfoScreen} />

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
      initialRouteName="Accueil"
      screenOptions={{
        tabBarActiveTintColor: Colors.green,
      }}>
      <BottomTab.Screen
        name="Accueil"
        component={HomeScreen}
        options={tabOptionStyle('Accueil', 'home')}
      />
      <BottomTab.Screen
        name="Favoris"
        component={LikeScreen}
        options={tabOptionStyle('Favoris', 'hearto')}
      />
      <BottomTab.Screen
        name="Recherche"
        component={SearchScreen}
        options={tabOptionStyle('Recherche', 'search1')}
      />
    </BottomTab.Navigator>
  );
}
