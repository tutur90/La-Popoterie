import { useNavigation } from "@react-navigation/native";
import { FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { Recipe } from "../../types";
import Layout from "../../constants/Layout";

const numColumns = 2;

const LikeList = (prop: { recipesList: Recipe[] }) => {
    const { recipesList } = prop;
    const navigation = useNavigation();
    return (
        <FlatList
            data={recipesList}
            numColumns={numColumns}
            renderItem={({ item, index }: { item: Recipe, index: number }) =>
                <View style={{ padding: 10 }}>
                    <TouchableOpacity
                        key={index}
                        style={styles.touchableOpacity}
                        onPress={() => { navigation.navigate('Recipe', { record: item }) }}>
                        <Image
                            style={styles.image}
                            source={{ uri: item.imagePath }}
                        />
                        <View style={{ flexWrap: 'wrap', backgroundColor: 'transparent' }}>
                            <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                                <Text style={styles.recipeTitle}> {item.name} </Text>
                            </View>

                            <Text style={styles.text}>{'Budget: ' + item.cost + '€'} </Text>
                            <Text style={styles.text}>{'Temps: ' + item.time + ' min   '} </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
        />
    )
}
export default LikeList;

const styles = StyleSheet.create({

    recipeTitle: { // Titre de la recette
        fontSize: 20,
        textTransform: 'capitalize',
        fontFamily: 'Cabin',
        color: 'white',
        marginVertical: 2,
        flex: 1,
        flexWrap: 'wrap',
    },
    image: {
        height: Layout.window.width / (numColumns * 1.1),
        width: Layout.window.width / (numColumns * 1.2),
        borderRadius: 25,
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
        backgroundColor: '#2D6A4F',
        marginBottom: 20,
    }
});