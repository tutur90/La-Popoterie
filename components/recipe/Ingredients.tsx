import { AntDesign } from "@expo/vector-icons";
import { View, Text } from "../Themed";
import { StyleSheet, Image } from "react-native";
import Colors from "../../constants/Colors";
import { Ingredient, RecipeIngredient } from "../../types";


const Ingredients = (props: { ingredients: Ingredient[] | RecipeIngredient[], personsNumber: number }) => {
    const { ingredients, personsNumber } = props;
    var cost: number = 0;

    return (
        <View style={styles.ingrList}>
            {ingredients.map((ingredient, index) => {
                if (!ingredient) return null;

                const ingr = ingredient as Ingredient;

                const quantity = ingr.quantity * personsNumber / 2;
                cost += ingr.cost * quantity;
                return (
                    <View style={{ width: '50%' }} key={index}>
                        <View style={styles.ingrCell}>
                            <IngrImage imagePath={ingr.imagePath} />
                            <View style={{ backgroundColor: 'transparent', flexShrink: 1 }}>
                                <Text style={styles.textCap}>{ingr.name + ' :'}</Text>
                                <IngrQuantity quantity={quantity} unit={ingr.unit} />
                            </View>
                        </View>
                    </View>)
            })}
        </View>
    );
}

export default Ingredients;

const IngrImage = (props: { imagePath: string | undefined }) => {
    const size = 50;
    const { imagePath } = props;
    if (imagePath) {
        return <Image
            source={{ uri: imagePath }}
            style={{ width: size, height: size, marginVertical: 5 }}
        />
    } else {
        return <AntDesign name="picture" color={'white'} size={size} />
    }
}

const IngrQuantity = (props: { quantity: number, unit: string | undefined }) => {
    const { quantity, unit } = props;

    if (unit === undefined) return <Text style={styles.text}>{quantity.toFixed(2)}</Text>

    if (unit !== 'p') {
        return <Text style={styles.text}>{quantity.toFixed(2) + ' ' + unit}</Text>
    } else {
        return <Text style={styles.text}>{quantity.toFixed(2)}</Text>
    }
}

const styles = StyleSheet.create({

    ingrList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 13,
        marginLeft: 10,
        fontFamily: 'Cabin',
    },
    textCap: {
        fontSize: 15,
        marginLeft: 10,
        textTransform: 'capitalize',
        fontFamily: 'Cabin',

    },

    ingrCell: { // style des ingrédiants
        padding: 5,
        margin: 5,
        backgroundColor: 'transparent',
        borderRadius: 20,
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 2,
        borderColor: Colors.darkGreen,
        height: 70,
    },
});
