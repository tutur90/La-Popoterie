/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Accueil: {
            screens: {
              AccueilScreen: 'accueil',
            },
          },
          Favoris: {
            screens: {
              FavorisScreen: 'favoris',
            },
          },
          Recherche: {
            screens: {
              RechercheScreen: 'recherche',
            },
          },
        }

      },
      Info: {
        screens: {
          InfoScreen: 'info',
        },
      },
      Compte: {
        screens: {
          CompteScreen: 'compte',
        },
      },

      NotFound: '*',
      Login: {
        screens: {
          LoginScreen: 'login',
        },
      },
      Welcome: {
        screens: {
          WelcomeScreen: 'welcome',
        },
      },
    },
  },
};

export default linking;
