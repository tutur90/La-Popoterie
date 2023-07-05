import { ButtonView, Text, View } from '../../components/Themed';
import { RootTabScreenProps, diet } from '../../types';
import { StyleSheet, ScrollView } from 'react-native';

import { RecipeList } from '../../components/home/RecipesList';
import { useRecipesContext } from '../../context/RecipeContext';
import Colors from '../../constants/Colors';
import { useState } from 'react';
import DietFilter from '../../components/home/DietFilter';

const nbRecipes = 6


const HomeScreen = ({ navigation }: RootTabScreenProps<'Accueil'>) => {

  const { recipes } = useRecipesContext()


  const [diet, setDiet] = useState<diet[]>([])

  const recipesFiltered = recipes.filter((recipe) => { return diet.every((dietElement) => recipe?.diet?.includes(dietElement)) })

  const tandancy = recipesFiltered.sort((a, b) => b.like.number - a.like.number).slice(0, nbRecipes)
  const novelty = recipesFiltered.sort((a, b) => b.date - a.date).slice(0, nbRecipes)



  return (
    <View style={styles.container} >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }} />
        <Text style={styles.title}>La Popoterie</Text>
        <Text style={styles.subTitle}>vous propose...</Text>
        <View />
        <View style={styles.separator} />
        <View>
          <Text style={styles.categoryTitle2}>Filtrer par:</Text>
        </View>

        <DietFilter diet={diet} setDiet={setDiet} />

        <View style={styles.separator} />
        <View >
          <Text style={styles.categoryTitle}>Tendances</Text>
          <RecipeList recipiesList={tandancy} />
        </View>
        <View style={styles.separator} />
        <View >
          <Text style={styles.categoryTitle}>Nouveautés</Text>
          <RecipeList recipiesList={novelty} />
        </View>
        <View >
          <Text style={styles.categoryTitle}>Toutes les recettes</Text>
          <RecipeList recipiesList={recipesFiltered} />
        </View>
      </ScrollView>
    </View>
  );
}


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { //pour le titre
    fontFamily: 'Butler',
    fontSize: 50,
    color: Colors.darkGreen,
    marginTop: 40,
    textAlign: 'center',
  },

  buttonView: {
    borderRadius: 10,

  },
  subTitle: { //pour le "vous propose"
    fontFamily: 'Garet',
    fontSize: 27,
    textAlign: 'center',
  },
  categoryTitle: { //pour le titre des catégories
    fontSize: 30,
    marginLeft: 20,
    fontFamily: 'Loves',
  },
  categoryTitle2: { //pour les filtres
    fontSize: 18,
    marginLeft: 20,
    fontFamily: 'Loves',
  },

  separator: {
    marginVertical: 10,
    height: 2,
    alignSelf: 'center',
  },
});
