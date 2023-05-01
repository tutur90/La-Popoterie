import { TouchableOpacity, StyleSheet } from "react-native";
import { View, Text } from "../Themed";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";



const PersonsNumber = (props: { personsNumber: number, setPersonsNumber: (personNumber: number) => void }) => {
    const { personsNumber, setPersonsNumber } = props;
    const minPersonsNumber = 1;
    const maxPersonsNumber = 9;

    return (
        <View style={styles.view}>
            <TouchableOpacity onPress={() => { setPersonsNumber(personsNumber - 1) }}
                disabled={personsNumber <= minPersonsNumber}>
                <Entypo name="squared-minus" size={30}
                    color={personsNumber <= minPersonsNumber ? 'grey' : Colors.green} />
            </TouchableOpacity>
            <Text style={{ fontSize: 28 }}>{personsNumber}</Text>
            <TouchableOpacity onPress={() => setPersonsNumber(personsNumber + 1)}
                disabled={personsNumber >= maxPersonsNumber}>
                <Entypo name="squared-plus" size={30}
                    color={personsNumber >= maxPersonsNumber ? 'grey' : Colors.green} />
            </TouchableOpacity>
        </View>
    )
}

export default PersonsNumber;

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginLeft: 10,
        alignItems: 'center'
    }

})
