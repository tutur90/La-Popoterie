/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type Comment = {
  date: number
  text: string
  user: string
}

export type Ingredient = {
  name: string
  quantity: number
  unit: string
  imagePath: string
  cost: number
}


export type RecipeIngredient = {
  name: string,
  quantity: number,
}


export type Recipe = {
  id?: string,
  name: string,
  category: string,
  imagePath: string
  ingredients: RecipeIngredient[] | Ingredient[]
  instructions: string[]
  time: number
  cost: number
  date: number
  like: {
    number: number
    person: string[]
  },
  diet: diet[],
  season: season[]
}
export type diet = 'vegan' | 'sans gluten' | 'sans lactose'

export type season = 'printemps' | 'été' | 'automne' | 'hiver'


export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Compte: undefined;
  NotFound: undefined;
  Login: undefined;
  Recipe: { record: Recipe };
  Welcome: undefined;
  Info: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Accueil: undefined;
  Favoris: undefined;
  Recherche: undefined;

};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
