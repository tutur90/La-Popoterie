
import { useState } from 'react';
import { StyleSheet, } from 'react-native';
import { useRecipesContext } from '../../api/Context';
import SearchList from '../../components/search/SearchList';
import { View, TextInput } from '../../components/Themed'
import { RootTabScreenProps } from '../../types';

const SearchScreen = ({ navigation }: RootTabScreenProps<'Search'>) => {
    const [searchText, setSearchText] = useState<string>('');
    const { recipes } = useRecipesContext();

    const results = recipes.filter(recipe =>
        recipe.name.toLowerCase().match(searchText.toLowerCase()));
    // search in name of the recipe

    return (
        <View style={styles.container}>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Rechercher un élément"
                />
            </View>
            <SearchList list={results} />
        </View>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        alignItem: 'center',
        padding: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        height: '100%',
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
        borderRadius: 25,
        borderWidth: 1,
        padding: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    TextInput: {
        fontSize: 15,
        placeholderTextColor: 'grey'
    },
});