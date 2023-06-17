import { ButtonView, Text, View } from '../../components/Themed';
import { RootTabScreenProps, diet } from '../../types';
import { StyleSheet, ScrollView } from 'react-native';

import { RecipeList } from '../../components/home/RecipesList';
import { useRecipesContext } from '../../context/RecipeContext';
import Colors from '../../constants/Colors';
import { useState } from 'react';

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
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <ButtonView onPress={() => setNewDiet('vegan', diet, setDiet)}
            style={{ backgroundColor: diet.includes('vegan') ? Colors.intanceDarkGreen : '#95D5B2', marginVertical: 10, paddingHorizontal: 5 }}>
            <Text style={{ color: diet.includes('vegan') ? 'white' : 'black', ...styles.buttonTitle }}>{'vegan 🌱'}</Text>
          </ButtonView>
          <ButtonView onPress={() => setNewDiet('sans gluten', diet, setDiet)}
            style={{ backgroundColor: diet.includes('sans gluten') ? Colors.intanceDarkGreen : '#B7E4C7', marginVertical: 10, paddingHorizontal: 5 }}>
            <Text style={{ color: diet.includes('sans gluten') ? 'white' : 'black', ...styles.buttonTitle }}>{'sans gluten 🌾'}</Text>
          </ButtonView>
          <ButtonView onPress={() => setNewDiet('sans lactose', diet, setDiet)}
            style={{ backgroundColor: diet.includes('sans lactose') ? Colors.intanceDarkGreen : '#D8F3DC', marginVertical: 10, paddingHorizontal: 5 }}>
            <Text style={{ color: diet.includes('sans lactose') ? 'white' : 'black', ...styles.buttonTitle }}>{'sans lactose 🥛'}</Text>
          </ButtonView>

        </View>
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

const buttonPops = (diet: diet[]) => {
  if (diet.includes('vegan')) { return Colors.intanceDarkGreen }
  else if (diet.includes('sans gluten')) { return '#B7E4C7' }
  else if (diet.includes('sans lactose')) { return '#D8F3DC' }
  else { return 'white' }
}

const setNewDiet = (type: diet, diet: diet[], setDiet: (diet: diet[]) => void) => {
  if (diet.includes(type)) { setDiet(diet.filter(i => i !== type)) }
  else { setDiet([...diet, type]) }
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
  buttonTitle: { //pour les boutons de filtre
    fontSize: 15,
    fontFamily: 'Garet',
  },
  separator: {
    marginVertical: 10,
    height: 2,
    alignSelf: 'center',
  },
});
