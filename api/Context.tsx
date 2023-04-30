import { onAuthStateChanged, User } from "firebase/auth"
import { arrayUnion, collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { createContext, useContext, useEffect, useReducer, useState, } from "react"
import { Comment, Recipe } from "../types"
import { auth, db } from "./Firebase"


type UserContext = {
    user: User | null
    userIsLoaded: boolean
    setUser: (u: User | null) => void
    setUserIsLoaded: (uil: boolean) => void
}

const initialAuthContext = {
    user: null,
    userIsLoaded: false,
    setUser: () => { },
    setUserIsLoaded: () => { }
}

const AuthContext = createContext<UserContext>(initialAuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null)
    const [userIsLoaded, setUserIsLoaded] = useState<boolean>(false)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setUserIsLoaded(true);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user, userIsLoaded, setUser, setUserIsLoaded }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuthContext = () => useContext(AuthContext)


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


    useEffect(() => {
        const ref = collection(db, 'Recipes');
        onSnapshot(ref, (querySnapshot) => {
            var data: Recipe[] = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    name: doc.get('name'),
                    image_path: doc.get('image_path'),
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

        const ref = doc(db, 'Recipes', id);
        const docu = await getDoc(ref);
        const data = {
            id: docu.id,
            ingredients: docu.get('ingredients'),
            step: docu.get('step'),
            comments: docu.get('comments'),
            cost: 0,
        };

        data.ingredients = await Promise.all(data.ingredients.map(async (i: { name: string; cost: number; image_path: any, quantity: number }) => {
            const q = doc(db, 'Ingredients', i.name);
            const querySnapshot = await getDoc(q);
            if (querySnapshot.exists()) {
                i.cost = querySnapshot.get('cost') * i.quantity;
                i.image_path = querySnapshot.get('image_path');
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
