
import { StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../Themed';
import { useNavigation } from '@react-navigation/native';
import { Recipe } from '../../types';
import Colors from '../../constants/Colors';

export const RecipeList = (prop: { recipiesList: Recipe[] }) => {
    const navigation = useNavigation();
    return (
        <FlatList
            data={prop.recipiesList}
            horizontal={true}
            renderItem={({ item, index }: { item: Recipe, index: number }) =>
                <View style={{ padding: 10 }}>
                    <TouchableOpacity
                        key={index}
                        style={styles.touchableOpacity}
                        onPress={() => { navigation.navigate('Recipe', { record: item }) }}>
                        <Image
                            style={styles.image}
                            source={{ uri: item.image_path }}
                        />
                        <Text style={styles.recipeTitle}> {item.name} </Text>
                        <Text style={styles.text}>{`Budget: ` + item.cost + '€'} </Text>
                        <Text style={styles.text}>{'Temps: ' + item.time + ' min   '} </Text>
                    </TouchableOpacity>
                </View>
            }
        />
    )
}

const styles = StyleSheet.create({

    recipeTitle: { // Titre de la recette
        fontSize: 20,
        textTransform: 'capitalize',
        fontFamily: 'Cabin',
        marginVertical: 3,
        color: 'white',
        marginLeft: 5,
        flex: 1,
        flexWrap: 'wrap',
    },
    text: { //texte du prix 
        fontSize: 15,
        color: 'white',
        fontFamily: 'Garet',
        marginLeft: 10,
        marginVertical: 1,
    },
    touchableOpacity:
    {
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        borderRadius: 25,
        backgroundColor: Colors.darkGreen,
        marginBottom: 20,
    },
    image: {
        height: 220,
        width: 200,
        borderRadius: 25,
    },
});