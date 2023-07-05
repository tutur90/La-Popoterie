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
            contentContainerStyle={{
                paddingBottom: 30,
                paddingTop: 60,
            }}

            renderItem={({ item, index }) =>
                <View style={styles.shadow}>
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
                                    <Text style={styles.text}>{'Temps⏳: ' + item.time + ' min   '} </Text>
                                    <Text style={styles.text}>{'Budget💸: ' + item.cost.toFixed(2) + ' €'} </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            }
        />
    )
}

export default SearchList;

const styles = StyleSheet.create({
    image: {
        height: 80,
        width: 80,
        borderRadius: 20,
        borderWidth: 0.5,
    },
    subTitle: { // recipeTitle
        fontSize: 20,
        textTransform: 'capitalize',
        fontFamily: 'Cabin',
        color: 'white',
        marginLeft: 0.5,
        marginVertical: 3,
    },
    text: {
        fontSize: 13,
        color: 'white',
        fontFamily: 'Garet',

    },
    itemView: {
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: Colors.darkGreen,
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
    ,
    shadow: {
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 20,

        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: 'black',
        shadowOffset: { height: 5, width: 5 },
        elevation: 5,
    }
});