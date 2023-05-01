import { AntDesign } from "@expo/vector-icons";
import { View, Text } from "../Themed";
import { StyleSheet, Image } from "react-native";
import Colors from "../../constants/Colors";


export const Ingredients = (props: { ingredients: any[], personsNumber: number }) => {
    const { ingredients, personsNumber } = props;
    var cost: number = 0;

    return (
        <View style={styles.ingrList}>
            {ingredients?.map((ingredient, index) => {
                const quantity = ingredient.quantity * personsNumber;
                cost += ingredient.cost * personsNumber;
                return (<View style={styles.ingrCell} key={index}>
                    <IngrImage image_path={ingredient.image_path} />
                    <View style={{ backgroundColor: 'transparent', flexShrink: 1 }}>
                        <Text style={styles.textCap}>{ingredient.name + ' :'}</Text>
                        <IngrQuantity quantity={quantity} unit={ingredient.unit} />
                    </View>
                </View>)
            })}
        </View>
    );
}


const IngrImage = (props: { image_path: string | undefined }) => {
    const size = 50;
    const { image_path } = props;
    if (image_path) {
        return <Image
            source={{ uri: image_path }}
            style={{ width: size, height: size, marginVertical: 5 }}
        />
    } else {
        return <AntDesign name="picture" color={'white'} size={size} />
    }
}

const IngrQuantity = (props: { quantity: number, unit: string | undefined }) => {
    const { quantity, unit } = props;
    if (unit !== 'p') {
        return <Text style={styles.text}>{quantity + ' ' + unit}</Text>
    } else {
        return <Text style={styles.text}>{quantity}</Text>
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
        fontSize: 15,
        marginLeft: 10,
    },
    textCap: {
        fontSize: 15,
        marginLeft: 10,
        textTransform: 'capitalize',

    },
    ingrCell: { // style des ingrédiants
        width: '45%',
        padding: 10,
        margin: 5,
        backgroundColor: 'transparent',
        borderRadius: 20,
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 2,
        borderColor: Colors.darkGreen,
    },
});
