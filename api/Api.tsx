import { useState, useEffect, useReducer } from 'react';
import {
    collection, getDocs, getDoc, query, where, doc,
    setDoc, updateDoc, arrayUnion, arrayRemove, increment,
    onSnapshot, QueryDocumentSnapshot
} from "firebase/firestore";
import { auth, db } from './Firebase';
import { useRecipesContext } from './RecipeContext';
import { useAuthContext } from './AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { Recipe } from '../types';



export const likeRecipe = async (id: string, isLiked: boolean) => {
    const user = auth.currentUser
    const ref = doc(db, 'Recipes', id);
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

