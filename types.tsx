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

export type ingredient = {
  name: string
  quantity: number
  unit?: string
  image_path?: string
}

export type Recipe = {
  id: string
  category: string,
  comments?: Comment[]
  date: number
  image_path: string
  ingredients?: ingredient
  like: {
    number: number
    person: string[]
  },
  name: string,
  quantiy?: number
  step?: string[]
  time?: number
  cost?: number
  view?: number
}



export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Login: undefined;
  Recipe: { record: Recipe };
  Welcome: undefined;
  Coucou: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Like: undefined;
  Search: undefined;

};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
