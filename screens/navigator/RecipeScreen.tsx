
import { Key, useEffect, useReducer, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { useRecipesContext } from '../../api/Context';
import { LikeButton, ReturnButton } from '../../components/Display';
import { Comments, Ingredients, Steps } from '../../components/Recipe';

import { Text, View } from '../../components/Themed';
import Layout from '../../constants/Layout';
import { RootStackScreenProps } from '../../types';

const PersonsNumber = (props: { personsNumber: number, setPersonsNumber: (personNumber: number) => void }) => {

  const { personsNumber, setPersonsNumber } = props;
  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'transparent', marginLeft: 10 }}>
      <TouchableOpacity onPress={() => setPersonsNumber(personsNumber - 1)}>
        <Text style={{ fontSize: 30 }}>-</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 30 }}>{personsNumber}</Text>
      <TouchableOpacity onPress={() => setPersonsNumber(personsNumber + 1)}>
        <Text style={{ fontSize: 30 }}>+</Text>
      </TouchableOpacity>

    </View>
  )
}


export default function RecipeScreen({ route, navigation }: RootStackScreenProps<'Recipe'>) {

  const id = route.params.record.id
  const { recipes, recipesDetails, loadRecipe } = useRecipesContext()
  const [personsNnumber, setPersonsNumber] = useState(1);
  loadRecipe(id)
  const recipe = { ...recipesDetails.find((x) => x.id == id), ...recipes.find((x) => x.id == id) }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View >
          <Image
            source={{ uri: recipe.image_path }}
            style={styles.image}
          />
          <LikeButton id={id} like={recipe.like} />
        </View>
        <View >
          <Text style={styles.title}>{recipe.name}</Text>
        </View>
        <View>
          <Text style={styles.text}>{'prix: ' + (recipe.cost * personsNnumber).toFixed(2) + '$   temps: ' + recipe.time + ' min'}</Text>
        </View>
        <View style={styles.viewIngredients}>
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
            <Text style={styles.subTitle}>Ingrediants</Text>
            <PersonsNumber personsNumber={personsNnumber} setPersonsNumber={setPersonsNumber} />
          </View>
          <Ingredients ingredients={recipe.ingredients} personsNumber={personsNnumber} />
        </View>
        <View style={styles.viewSteps}>
          <Text style={styles.subTitle}>Préparation</Text>
          <Steps steps={recipe?.step} />
        </View>
        <View style={styles.viewSteps}>
          <Text style={styles.subTitle}>Commentaires</Text>
          <Comments id={id} comments={recipe.comments} />
        </View>
      </ScrollView>
      <ReturnButton navigation={navigation} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewIngredients: {
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(100, 223, 191, 0.3)',
    borderRadius: 30,

  },
  ingredient: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  viewSteps: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: 'rgba(50, 123, 191, 0.3)',
    borderRadius: 30,
    marginBottom: 10
  },
  image: {
    flex: 1,
    width: Layout.window.width,
    height: Layout.window.height / 2
  },
  title: {
    fontSize: 50,
    bold: false,
    textTransform: 'capitalize'
  },
  subTitle: {
    fontSize: 30,
    marginLeft: 20,
    textTransform: 'capitalize'
  },
  text: {
    fontSize: 15,
    marginLeft: 10,
  },
  textCap: {
    fontSize: 15,
    marginLeft: 10,
    textTransform: 'capitalize'
  },
});

