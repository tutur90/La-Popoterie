

import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { StyleSheet, ScrollView } from 'react-native';

import { RecipeList } from '../../components/Display';
import { useRecipesContext } from '../../api/Context';


const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {

  const { recipes } = useRecipesContext()

  const tandancy = recipes.sort((a, b) => b.like.number - a.like.number).slice(0, 5)
  const novelty = recipes.sort((a, b) => b.date - a.date).slice(0, 5)

  return (
    <View >
      <ScrollView>
        <Text style={styles.headerText}>La Popoterie</Text>
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
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'

  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  headerText: {
    fontFamily: 'space-mono',
    fontSize: 50,
    //marginTop: StatusBar.currentHeight,
  },
  categoryTitle: {
    fontSize: 40,
    marginLeft: 20,
    textTransform: 'capitalize'
  },
  separator: {
    marginVertical: 30,
    height: 2,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
