import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { StyleSheet, ScrollView } from 'react-native';

import { RecipeList } from '../../components/home/RecipesList';
import { useRecipesContext } from '../../api/Context';
import Colors from '../../constants/Colors';


const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {

  const { recipes } = useRecipesContext()

  const tandancy = recipes.sort((a, b) => b.like.number - a.like.number).slice(0, 5)
  const novelty = recipes.sort((a, b) => b.date - a.date).slice(0, 5)

  return (
    <View style={styles.container} >
      <ScrollView>
        <Text style={styles.title}>La Popoterie</Text>
        <Text style={styles.subTitle}>vous propose...</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View >
          <Text style={styles.categoryTitle}>Tendance</Text>
          <RecipeList recipiesList={tandancy} />
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View >
          <Text style={styles.categoryTitle}>Nouveauté</Text>
          <RecipeList recipiesList={novelty} />
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
    marginLeft: 50,
    color: Colors.darkGreen,
    alignItems: 'center',
    marginTop: 40,
  },
  subTitle: { //pour le "vous propose"
    fontFamily: 'Garet',
    fontSize: 27,
    marginLeft: 90,
  },
  categoryTitle: { //pour le titre des catégories
    fontSize: 30,
    marginLeft: 20,
    fontFamily: 'Cabin',
  },
  separator: {
    marginVertical: 30,
    height: 2,
    width: '80%',
    alignSelf: 'center',
  },
});
