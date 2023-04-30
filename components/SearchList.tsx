import { useNavigation } from "@react-navigation/native";
import { FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Recipe } from "../types";
import { View, Text } from "./Themed";


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
                        <Image style={styles.image} source={{ uri: item.image_path }} />
                        <View style={styles.textView} >
                            <Text style={styles.subTitle}>{item.name} </Text>
                            <View style={styles.text1View} >
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
        borderRadius: 25,
        borderWidth: 0.5,
    },
    subTitle: {
        fontSize: 20,
    },
    text: {
        fontSize: 15,
    },
    itemView: {
        marginTop: 10,
        backgroundColor: 'rgba(120, 120, 120, 0.3)',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    textView: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        marginLeft: 10
    },
    text1View: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginTop: 5,

    }
});