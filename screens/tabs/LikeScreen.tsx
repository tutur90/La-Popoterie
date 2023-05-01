import { useContext, useEffect } from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthContext, useRecipesContext } from '../../api/Context';

import LikeList from '../../components/like/LikeList';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';

const LikeScreen = ({ navigation }: RootTabScreenProps<'Like'>) => {

  const { recipes } = useRecipesContext();
  const { user } = useAuthContext();

  if (!user) return (<View><Text>Not logged in</Text></View>);

  const likedRecipes = recipes.filter((item) =>
    item.like.person.includes(user.uid));

  if (likedRecipes.length === 0) return (
    <View style={styles.container}>
      <Text style={styles.title}>Vous n'avez pas encore aimé de recette</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <LikeList recipesList={likedRecipes} />
    </View>
  );
}

export default LikeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
