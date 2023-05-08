
import { StyleSheet, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Text, View } from './Themed';
import { useNavigation } from '@react-navigation/native';
import { Recipe, RootStackParamList } from '../types';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { likeRecipe } from '../api/Api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Colors from '../constants/Colors';


export const ReturnButton = (props: { navigation: NativeStackNavigationProp<RootStackParamList> }) => {
    return (
        <View style={styles.returnButton}>
            <TouchableOpacity
                onPress={() => props.navigation.goBack()}>
                <AntDesign name="arrowleft" color={'white'} size={40} />
            </TouchableOpacity>
        </View>
    )
}


export const LikeButton = (props: { like: { person: string[] | any[]; }; id: any; }) => {
    const { user } = useAuthContext();
    const { like, id } = props;

    if (user === null) {
        return null;
    }

    const [isLiked, setIsLiked] = useState(like.person.includes(user.uid));

    return (
        <View style={styles.likeButton}>
            <TouchableOpacity
                onPress={() => { likeRecipe(id, isLiked); setIsLiked(!isLiked); }}>
                {isLiked ?
                    <AntDesign name="heart" color={'red'} size={40} />
                    :
                    <AntDesign name="hearto" color={'white'} size={40} />}
            </TouchableOpacity>
        </View>
    )
}



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
        height: 220,
        width: 200,
        borderRadius: 25,
    },
    returnButton: {
        position: 'absolute',
        left: 10,
        top: 40,
        backgroundColor: Colors.darkGreen,
        borderRadius: 15
    },
    likeButton: {
        position: 'absolute',
        right: 5,
        bottom: 15,
        backgroundColor: 'transparent',
    },
});