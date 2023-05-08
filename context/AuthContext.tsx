import { onAuthStateChanged, User } from "firebase/auth"
import { arrayUnion, collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { createContext, useContext, useEffect, useReducer, useState, } from "react"
import { Comment, Recipe } from "../types"
import { auth, db } from "../api/Firebase"


type UserContext = {
    user: User | null
    userIsLoaded: boolean
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
        <AuthContext.Provider value={{ user, userIsLoaded }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuthContext = () => useContext(AuthContext)
