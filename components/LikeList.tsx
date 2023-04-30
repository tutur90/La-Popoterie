import { useNavigation } from "@react-navigation/native";
import { FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Text } from "./Themed";
import { Recipe } from "../types";
import Layout from "../constants/Layout";

const numColumns = 2;

const LikeList = (prop: { recipesList: Recipe[] }) => {
    const { recipesList } = prop;
    const navigation = useNavigation();
    return (
        <FlatList
            style={{ padding: 5 }}
            data={recipesList}
            numColumns={numColumns}
            renderItem={({ item, index }: { item: Recipe, index: number }) =>
                <TouchableOpacity
                    key={index}
                    style={styles.touchableOpacity}
                    onPress={() => { navigation.navigate('Recipe', { record: item }) }}>
                    <Image
                        style={styles.image}
                        source={{ uri: item.image_path }}
                    />
                    <Text style={styles.recipeTitle}>{item.name} </Text>
                    <Text style={styles.text}>{`Temps: ` + item.time} </Text>
                </TouchableOpacity>
            }
        />
    )
}
export default LikeList;

const styles = StyleSheet.create({

    recipeTitle: {
        fontSize: 20,
        textTransform: 'capitalize'
    },
    text: {
        fontSize: 15,
    },
    touchableOpacity:
    {
        marginTop: 10,
        alignItems: "center",
        padding: 5
    },
    image: {
        height: Layout.window.width / (numColumns * 1.1),
        width: Layout.window.width / (numColumns * 1.2),
        borderRadius: 25,
    },
});