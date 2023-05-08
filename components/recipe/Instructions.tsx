import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";

const Instructions = (props: { instructions: any[] }) => {

    const { instructions } = props;

    return (
        <View style={{ backgroundColor: 'transparent' }}>
            {
                instructions?.map((instruction: any, index: number) => {
                    return <View style={styles.instruction} key={index}>
                        <View style={{ marginVertical: 3 }} />
                        <Text style={styles.text}>{(index + 1) + '.  ' + instruction}</Text>
                    </View>
                })
            }
        </View>
    );
}

export default Instructions;

const styles = StyleSheet.create({
    instruction: { //pour le style des étapes 
        backgroundColor: 'transparent',
        borderRadius: 30,
        borderColor: 'black',
    },
    text: { // text for instructions
        fontSize: 20,
        marginLeft: 10,
        fontFamily: 'Garet',
        marginVertical: 10,

    },

});
