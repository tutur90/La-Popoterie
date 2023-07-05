
import { useState } from 'react';
import { StyleSheet, } from 'react-native';
import { useRecipesContext } from '../../context/RecipeContext';
import SearchList from '../../components/search/SearchList';
import { View, TextInput } from '../../components/Themed'
import { RootTabScreenProps } from '../../types';

const SearchScreen = ({ navigation }: RootTabScreenProps<'Recherche'>) => {
    const [searchText, setSearchText] = useState<string>('');
    const { recipes } = useRecipesContext();



    const results = recipes.filter(recipe =>
        recipe.name.toLowerCase().match(searchText.toLowerCase()) || recipe.ingredients.filter(ingredient => ingredient.name.toLowerCase().match(searchText.toLowerCase())).length > 0);
    // search in name of the recipe


    return (
        <View style={styles.container}>
            <SearchList list={results} />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Rechercher une recette ou un ingrédient"
                />
            </View>

        </View>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        alignItem: 'center',
        flex: 1,
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 25,
        borderWidth: 0.5,
    },
    text: {
        fontSize: 15,
    },
    inputView: {
        borderRadius: 15,
        borderWidth: 1,
        padding: 5,
        paddingLeft: 10,
        marginVertical: 10,
        // backgroundColor: 'transparent',
        position: 'absolute',
        width: '90%',
        alignSelf: 'center',

    },
    TextInput: {
        fontSize: 16,
        placeholderTextColor: 'grey'
    },
});