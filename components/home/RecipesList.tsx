
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
                <View style={styles.recipeContainer}>
                    <TouchableOpacity
                        key={index}
                        style={styles.touchableOpacity}
                        onPress={() => { navigation.navigate('Recipe', { record: item }) }}>
                        <Image
                            style={styles.image}
                            source={{ uri: item.imagePath }}
                        />
                        <View style={{ backgroundColor: 'transparent', padding: 10 }}>
                            <View style={{ backgroundColor: 'transparent', height: 50 }}>
                                <Text style={styles.recipeTitle}> {item.name} </Text>
                            </View>
                            <Text style={styles.text}>{`Budget💸: ` + item.cost.toFixed(2) + '€'} </Text>
                            <Text style={styles.text}>{'Temps⏳: ' + item.time + ' min   '} </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
        />
    )
}

const styles = StyleSheet.create({

    recipeTitle: { // Titre de la recette
        fontSize: 18,
        textTransform: 'capitalize',
        fontFamily: 'Cabin',
        color: 'white',
    },
    recipeContainer: {
        padding: 10,
        flex: 1,
        maxWidth: 220,
        Width: 400,
    },
    text: { //texte du prix 
        fontSize: 15,
        color: 'white',
        fontFamily: 'Garet',
    },
    touchableOpacity:
    {
        marginTop: 10,
        shadowColor: Colors.darkGreen,
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
        flex: 1,
    },
});