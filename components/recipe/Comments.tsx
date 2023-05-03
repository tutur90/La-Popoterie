import { TouchableOpacity, StyleSheet } from "react-native";
import { TextInput, View, Text } from "../Themed";
import { AntDesign } from "@expo/vector-icons";
import { useRecipesContext } from "../../api/RecipeContext";
import { useAuthContext } from "../../api/AuthContext";
import { useState } from "react";
import { Comment } from "../../types";
import Colors from "../../constants/Colors";


const DispComments = (props: { comment: Comment }) => {
    const { date, text, user } = props.comment;
    const dateFr = new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) + ' ' +
        new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    return (
        <>
            <View style={styles.textView}>
                <Text>{text}</Text>
            </View>
            <Text style={{ textAlign: 'right' }}>{dateFr}</Text>
            <Text style={{ textAlign: 'right' }}>{user}</Text>
        </>
    );
}


const Comments = (props: { comments: Comment[], id: string }) => {

    const { comments, id } = props;
    const [inputComment, setInputComment] = useState<string>('');
    const { user } = useAuthContext()
    const { setComment } = useRecipesContext()

    const publishComment = () => {
        if (inputComment.length > 0 && user?.displayName) {
            const newComment = { text: inputComment, user: user.displayName, date: new Date().getTime() }
            setComment(id, newComment);
            setInputComment('')
        }
    }
    return (
        <>
            {true ? //!user?.isAnonymous 
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: 'transparent'
                }}>

                    <TextInput
                        style={styles.input}
                        value={inputComment}
                        onChangeText={setInputComment}
                        onSubmitEditing={publishComment}
                        placeholder='Ajouter un commentaire'
                    />
                    <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10 }} onPress={publishComment}>
                        <AntDesign name="pluscircleo" color={'white'} size={30} />
                    </TouchableOpacity>
                </View> :
                null}
            <View style={styles.comment}>
                {comments?.sort((a, b) => b.date - a.date).map((comment, index) => {
                    return <DispComments comment={comment} key={index} />
                })}
            </View>
        </>
    )
}

export default Comments;

const styles = StyleSheet.create({

    input: {
        fontSize: 90,
        marginLeft: 20,
        borderRadius: 1,
        backgroundColor: Colors.darkGreen,
    },
    comment: { // comment container
        fontSize: 15,
        marginLeft: 0.1,
        backgroundColor: Colors.darkGreen,
        borderRadius: 30,
        fontFamily: 'Cabin',

    },
    text: {
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
    ingr: { // style des ingrédiants
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
    textView:
    {
        padding: 10,
        borderRadius: 20,
        marginTop: 10
    }

});
