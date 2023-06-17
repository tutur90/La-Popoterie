
import { useState } from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { useRecipesContext } from '../../context/RecipeContext';
import { LikeButton, ReturnButton } from '../../components/Display';

import Instructions from '../../components/recipe/Instructions';
import Comments from '../../components/recipe/Comments';
import Ingredients from '../../components/recipe/Ingredients';

import { Text, View } from '../../components/Themed';
import Layout from '../../constants/Layout';
import { RootStackScreenProps, diet, season } from '../../types';
import Colors from '../../constants/Colors';
import PersonsNumber from '../../components/recipe/PersonNumber';

const RowView = ({ children }: any) => <View style={styles.indicatorView}><View style={styles.contView}>{children}</View></View>

export default function RecipeScreen({ route, navigation }: RootStackScreenProps<'Recipe'>) {

  const id = route.params.record.id
  const { recipes, recipesDetails, loadRecipe } = useRecipesContext()
  const [personsNnumber, setPersonsNumber] = useState(2);

  if (id) {
    loadRecipe(id)
  } else {
    alert('Erreur lors du chargement de la recette')
  }

  const recipe = recipes.find((x) => x.id == id)
  if (!recipe) {
    return null
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View >
          <Image
            source={{ uri: recipe.imagePath }}
            style={styles.image}
          />
          <LikeButton id={id} like={recipe.like} />
        </View>

        <View style={{ marginVertical: 20 }} >
          <Text style={styles.title}>{recipe.name}</Text>
        </View>

        <View style={styles.multipleRow}>
          <RowView>
            <Text style={styles.textBlack}>{'💸 Budget: ' + ((recipe.cost / 2) * personsNnumber).toFixed(2) + '€'}</Text>
          </RowView>

          <RowView>
            <Text style={styles.textBlack}>{'⏳ Temps: ' + recipe.time + ' min'} </Text>
          </RowView>

          <RowView>
            <Text style={styles.textBlack}>{'Saison: '}</Text>
            {recipe.season && recipe.season.length > 0 ?
              recipe.season.map((s: season, index: number) => <Text style={styles.textBlack} key={index}>{seasonIcon(s)}</Text>) :
              <Text style={styles.textBlack}>{'Toutes'}</Text>
            }
          </RowView>
          <RowView>
            <Text style={styles.textBlack}>{'Régime: '}</Text>

            {recipe.diet && recipe.diet.length > 0 ?
              recipe.diet.map((d: diet, index: number) => <Text style={styles.textBlack} key={index}>{dietIcon(d)}</Text>) :
              <Text style={styles.textBlack}>{'végétarien'}</Text>
            }
          </RowView>
        </View>
        <View style={styles.separator} />
        <View style={styles.viewIngredients}>
          <View style={{ flexDirection: 'row', marginVertical: 20, alignSelf: 'center' }}>
            <Text style={styles.subTitle}>Ingrédients</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 10, alignSelf: 'center' }}>
            <Text style={styles.subTitle2}>Nombre de popotes</Text>
            <PersonsNumber personsNumber={personsNnumber} setPersonsNumber={setPersonsNumber} />
          </View>
          <Ingredients ingredients={recipe.ingredients} personsNumber={personsNnumber} />
        </View>
        <View style={styles.separator} />
        <View style={styles.viewSteps}>
          <Text style={styles.subTitle}>Etapes de Préparation</Text>
          <Instructions instructions={recipe?.instructions} />
        </View>
        {/* 
        <View style={styles.viewSteps}>
          <Text style={styles.subTitle}>Commentaires</Text>
          <Comments id={id} comments={recipe.comments} />
        </View> */}
      </ScrollView>
      <ReturnButton navigation={navigation} />
    </View>
  );
}

const dietIcon = (diet: diet) => {
  switch (diet) {
    case 'vegan':
      return '🌱'
    case 'sans lactose':
      return '🥛'
    case 'sans gluten':
      return '🌾'
  }
}

const seasonIcon = (s: season) => {
  switch (s) {
    case 'été':
      return '☀️'
    case 'hiver':
      return '❄️'
    case 'automne':
      return '🍂'
    case 'printemps':
      return '🌷'
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewIngredients: {
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
  separator: {
    marginVertical: 10,
  },
  viewSteps: {
    marginHorizontal: 10,

    marginBottom: 10,
  },
  image: {
    flex: 1,
    width: Layout.window.width,
    height: Layout.window.height / 2
  },
  title: {  // titre de la recette
    fontSize: 32,
    fontFamily: 'Garet',
    textTransform: 'capitalize',
    marginLeft: 20,
    color: Colors.darkGreen,
  },
  multipleRow:
  {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  subTitle: {  // sous-titre ingrédients et étapes
    fontSize: 28,
    fontFamily: 'Loves',
    alignSelf: 'center',
  },
  subTitle2: {  // sous-titre ingrédients et étapes
    fontSize: 24,
    fontFamily: 'Loves',
    alignSelf: 'center',
  },
  textBlack: {  //texte du prix
    fontSize: 18,
    color: 'black',
    fontFamily: 'Cabin',
    margin: 5,
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
  contView: {
    backgroundColor: Colors.lightGreen,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    margin: 10,

  },
  indicatorView: {
    width: '50%',
  },

});

