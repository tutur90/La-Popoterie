
import { useState } from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { useRecipesContext } from '../../api/Context';
import { LikeButton, ReturnButton } from '../../components/Display';
import { Comments, Steps } from '../../components/recipe/Recipe';
import { Ingredients } from '../../components/recipe/Ingredients';

import { Text, View } from '../../components/Themed';
import Layout from '../../constants/Layout';
import { RootStackScreenProps } from '../../types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import PersonsNumber from '../../components/recipe/PersonNumber';

export default function RecipeScreen({ route, navigation }: RootStackScreenProps<'Recipe'>) {

  const id = route.params.record.id
  const { recipes, recipesDetails, loadRecipe } = useRecipesContext()
  const [personsNnumber, setPersonsNumber] = useState(2);
  loadRecipe(id)
  const recipe = { ...recipesDetails.find((x: { id: string; }) => x.id == id), ...recipes.find((x) => x.id == id) }

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

        <View style={{ marginVertical: 20 }} >
          <Text style={styles.title}>{recipe.name}</Text>
        </View>

        <View style={styles.indicatorView}>
          <MaterialCommunityIcons name="purse-outline" size={24} color="#40916C" />
          <Text style={styles.textGreen}>{'Budget: ' + (recipe.cost * personsNnumber).toFixed(2) + '€'}</Text>
        </View>

        <View style={styles.indicatorView}>
          <Ionicons name="ios-time-outline" size={24} color="black" />
          <Text style={styles.text}>{'Temps: ' + recipe.time + ' min'} </Text>
        </View>

        <View style={styles.viewIngredients}>
          <View style={{ flexDirection: 'row', marginVertical: 20 }}>
            <Text style={styles.subTitle}>Ingrédients</Text>
            <PersonsNumber personsNumber={personsNnumber} setPersonsNumber={setPersonsNumber} />
          </View>
          <Ingredients ingredients={recipe.ingredients} personsNumber={personsNnumber} />
        </View>

        <View style={styles.viewSteps}>
          <Text style={styles.subTitle}>Etapes de Préparation</Text>
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
  },
  ingredient: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    fontFamily: 'Garet',

  },
  viewSteps: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 30,
    marginBottom: 10,
    borderColor: '#40916C',
  },
  image: {
    flex: 1,
    width: Layout.window.width,
    height: Layout.window.height / 2
  },
  title: {  // titre de la recette
    fontSize: 40,
    fontFamily: 'Cabin',
    textTransform: 'capitalize',
    marginLeft: 20,
  },
  subTitle: {  // sous-titre ingrédients et étapes
    fontSize: 31,
    marginLeft: 3,
    textTransform: 'capitalize',
    fontFamily: 'Cabin',
  },
  textGreen: {  //texte du prix
    fontSize: 20,
    color: Colors.green,
    fontFamily: 'Cabin',
  },
  text: {  //texte du temps
    fontSize: 20,
    fontFamily: 'Cabin',
  },
  textCap: {
    fontSize: 90,
    marginLeft: 10,
    textTransform: 'capitalize'
  },
  indicatorView: {
    flexDirection: 'row',
    marginLeft: 10
  }

});

