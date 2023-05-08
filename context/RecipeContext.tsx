import { onAuthStateChanged, User } from "firebase/auth"
import { arrayUnion, collection, doc, getDoc, getDocs, limit, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { createContext, useContext, useEffect, useReducer, useState, } from "react"
import { Comment, Ingredient, Recipe, RecipeIngredient } from "../types"
import { auth, db } from "../api/Firebase"


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
                    ingredients: doc.get('ingredients'),
                    diet: doc.get('diet'),
                    season: doc.get('season'),
                    instructions: doc.get('instructions'),
                })
            });
            setRecipes(data);
        });

    }, []);

    const loadRecipe = async (id: string) => {

        var recipe = recipes.find((item) => item.id === id);

        if (!recipe) { alert('Erreur lors du chargement de la recette'); return (null) };

        if (!recipe.ingredients.map((i: RecipeIngredient) => Object.keys(i).includes('imagePath')).includes(false)) {
            return null;
        }

        recipe.ingredients = await Promise.all(recipe.ingredients.map(async (i: RecipeIngredient) => {

            if (!i) { return (i) };

            const q = query(ingredientsRef, where("name", "==", i.name), limit(1));

            const querySnapshot = await getDocs(q);
            const doc = querySnapshot.docs[0];

            if (doc) {
                return ({ ...i, unit: doc.data().unit, imagePath: doc.data().imagePath, cost: doc.data().cost });
            } else {
                return (i);
            }

        }
        ));
        setRecipes([...recipes.filter((item) => item.id !== id), recipe]);
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
