import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, StyleSheet, Image, SafeAreaView } from "react-native";
import { Text, View, TextInput } from "./Themed";
import { Comment, ingredient } from "../types";
import { useAuthContext, useRecipesContext } from "../api/Context";



export const Ingredients = (props: { ingredients: any[], personsNumber: number }) => {
    const { ingredients, personsNumber } = props;
    var cost: number = 0;

    return (
        <View style={styles.ingrList}>
            {ingredients?.map((ingredient, index) => {
                const quantity = ingredient.quantity * personsNumber;
                cost += ingredient.cost * personsNumber;
                return (<View style={styles.ingr} key={index}>
                    <IngrImage image_path={ingredient.image_path} />
                    <View style={{ backgroundColor: 'transparent', flexShrink: 1 }}>
                        <Text style={styles.textCap}>{ingredient.name + ':'}</Text>
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
    if (unit) {
        return <Text style={styles.text}>{quantity + ' ' + unit}</Text>
    } else {
        return <Text style={styles.text}>{quantity}</Text>
    }
}

export const Steps = (props: { steps: any[] }) => {

    const { steps } = props;
    return (
        <View style={{ backgroundColor: 'transparent' }}>
            {
                steps?.map((step: any, index: number) => {
                    return <View style={styles.step} key={index}>
                        <Text style={styles.text}>{'Etape ' + (index + 1) + ':  ' + step}</Text>
                    </View>
                })
            }
        </View>


    );
}

const DispComments = (props: { comment: Comment }) => {
    const { date, text, user } = props.comment;

    const dateFr = new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) + ' ' +
        new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <>
            <View style={{ padding: 10, borderRadius: 20, marginTop: 10 }}>
                <Text>{text}</Text>

            </View>
            <Text style={{ textAlign: 'right' }}>{dateFr}</Text>
            <Text style={{ textAlign: 'right' }}>{user}</Text>
        </>
    );
}


export const Comments = (props: { comments: Comment[], id: string }) => {

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
            {!user?.isAnonymous ?
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
                        placeholder='Ajouter un commentaitaire'
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

const styles = StyleSheet.create({

    ingrList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
    },
    step: {
        backgroundColor: 'transparent',
    },
    viewSteps: {
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: 'rgba(50, 123, 191, 0.3)',
        borderRadius: 30,
        marginBottom: 10
    },
    input: {
        fontSize: 15,
        marginLeft: 20,
    },
    comment: {
        fontSize: 15,
        marginLeft: 10,
        backgroundColor: 'transparent'
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
    ingr: {
        width: '45%',
        padding: 10,
        margin: 5,
        backgroundColor: 'rgba(2, 2, 2, 0.3)',
        borderRadius: 30,
        alignItems: "center",
        flexDirection: "row",
    },
});
