import { useNavigation } from "@react-navigation/native";
import { FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Recipe } from "../../types";
import { View, Text } from "../Themed";
import Colors from "../../constants/Colors";


const SearchList = (props: { list: Recipe[] }) => {
    const { list } = props;
    const navigation = useNavigation();
    return (
        <FlatList
            data={list}
            renderItem={({ item, index }) =>
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        navigation.navigate('Recipe', { record: item })
                    }}
                >
                    <View style={styles.itemView}>
                        <Image style={styles.image} source={{ uri: item.imagePath }} />
                        <View style={styles.titleView} >
                            <Text style={styles.subTitle}>{item.name} </Text>
                            <View style={styles.textView} >
                                <Text style={styles.text}>{'Temps: ' + item.time + ' min   '} </Text>
                                <Text style={styles.text}>{'Prix: ' + item.cost} </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            }
        />
    )
}

export default SearchList;

const styles = StyleSheet.create({
    image: {
        height: 60,
        width: 60,
        borderRadius: 20,
        borderWidth: 0.5,
    },
    subTitle: { // recipeTitle
        fontSize: 20,
        textTransform: 'capitalize',
        fontFamily: 'Cabin',
        color: 'black',
        marginLeft: 0.5,
        marginVertical: 3,
    },
    text: {
        fontSize: 15,
        color: Colors.green,
        fontFamily: 'Garet',
        marginLeft: 5,
    },
    itemView: {
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: Colors.lightGray,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: 'black',
        shadowOffset: { height: 5, width: 5 },
    },
    titleView: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        marginLeft: 10,
    },
    textView: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginTop: 5,
    }
});