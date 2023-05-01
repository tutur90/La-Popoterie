import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";

const Instructions = (props: { instructions: any[] }) => {

    const { instructions } = props;
    return (
        <View style={{ backgroundColor: 'transparent' }}>
            {
                instructions?.map((step: any, index: number) => {
                    return <View style={styles.step} key={index}>
                        <View style={{ marginVertical: 3 }} />
                        <Text style={styles.text}>{(index + 1) + '.  ' + step}</Text>
                    </View>
                })
            }
        </View>
    );
}

export default Instructions;

const styles = StyleSheet.create({

    ingrList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
    },
    step: { //pour le style des étapes 
        backgroundColor: 'transparent',
        borderRadius: 30,
        borderColor: 'black',
    },
    viewinstructions: {
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        fontSize: 90,
        marginLeft: 20,
        borderRadius: 1,
        backgroundColor: '#2D6A4F',
    },
    comment: { // comment container
        fontSize: 15,
        marginLeft: 0.1,
        backgroundColor: '#2D6A4F',
        borderRadius: 30,
        fontFamily: 'Cabin',

    },
    text: { // text for instructions
        fontSize: 20,
        marginLeft: 10,
        fontFamily: 'Cabin',
        marginVertical: 10,

    },
    text1: { // text for quantity
        fontSize: 17,
        marginLeft: 10,
        fontFamily: 'Cabin',
    },
    textCap: { // text for name of ingredient
        fontSize: 16,
        marginLeft: 10,
        textTransform: 'capitalize',
        fontFamily: 'Cabin',

    },

});
