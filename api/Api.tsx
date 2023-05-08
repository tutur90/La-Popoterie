
import {
    collection, getDocs, getDoc, query, where, doc,
    setDoc, updateDoc, arrayUnion, arrayRemove, increment,
    onSnapshot, QueryDocumentSnapshot
} from "firebase/firestore";
import { auth, db } from './Firebase';



export const likeRecipe = async (id: string, isLiked: boolean) => {
    const user = auth.currentUser
    const ref = doc(db, 'recipes', id);
    if (isLiked == false) {
        await updateDoc(ref, {
            'like.number': increment(1),
            'like.person': arrayUnion(user?.uid),
        });
    } else {
        await updateDoc(ref, {
            'like.number': increment(-1),
            'like.person': arrayRemove(user?.uid),
        });
    }
};

