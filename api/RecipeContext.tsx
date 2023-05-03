import { onAuthStateChanged, User } from "firebase/auth"
import { arrayUnion, collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { createContext, useContext, useEffect, useReducer, useState, } from "react"
import { Comment, Recipe } from "../types"
import { auth, db } from "./Firebase"


type RecipesContextType = {
    recipes: Recipe[]
    recipesDetails: any[]
    loadRecipe: (id: string) => void
    setComment: (id: string, newComment: Comment) => void
}


const RecipesContext = createContext<RecipesContextType>({ recipes: [], recipesDetails: [], loadRecipe: (id) => { }, setComment: (id, newComment) => { } })

export const RecipiesProvider = ({ children }: { children: React.ReactNode }) => {

    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [recipesDetails, setRecipesDtails] = useState<any[]>([])


    const recipesRef = collection(db, 'recipes');

    const ingredientsRef = collection(db, 'ingredients');


    useEffect(() => {
        onSnapshot(recipesRef, (querySnapshot) => {
            var data: Recipe[] = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    name: doc.get('name'),
                    imagePath: doc.get('imagePath'),
                    time: doc.get('time'),
                    category: doc.get('category'),
                    like: doc.get('like'),
                    date: doc.get('date'),
                    cost: doc.get('cost'),
                })
            });
            setRecipes(data);
        });

    }, []);

    const loadRecipe = async (id: string) => {

        if (recipesDetails.find((item) => item.id === id)) return (null);

        const ref = doc(recipesRef, id);
        const docu = await getDoc(ref);
        const data = {
            id: docu.id,
            ingredients: docu.get('ingredients'),
            instructios: docu.get('instructions'),
            comments: docu.get('comments'),
            cost: 0,
        };

        data.ingredients = await Promise.all(data.ingredients.map(async (i: { name: string; cost: number; imagePath: any, quantity: number }) => {
            const q = doc(ingredientsRef, i.name);
            const querySnapshot = await getDoc(q);
            if (querySnapshot.exists()) {
                i.cost = querySnapshot.get('cost') * i.quantity;
                i.imagePath = querySnapshot.get('imagePath');
                data.cost += i.cost;
            }
            return (i);
        }));
        if (!auth.currentUser?.isAnonymous) {
            await updateDoc(ref, {
                'cost': data.cost,
            });
        }
        setRecipesDtails([...recipesDetails, data]);
    }

    const setComment = async (id: string, newComment: Comment) => {

        const ref = doc(db, 'Recipes', id);
        await updateDoc(ref, {
            'comments': arrayUnion(newComment),
        }).then(() => {
            setRecipesDtails(recipesDetails.map((item) => {
                if (item.id === id) {
                    if (!item.comments) { item.comments = []; }
                    item.comments.push(newComment);
                }
                return (item);
            }))
        }).catch((error) => {
            console.error('Error adding comment: ', error);
            alert(error);
        });
    }


    return (
        <RecipesContext.Provider value={{ recipes, recipesDetails, loadRecipe, setComment }}>
            {children}
        </RecipesContext.Provider>
    )
}
export const useRecipesContext = () => useContext(RecipesContext)
