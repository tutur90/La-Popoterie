import { getReactNativePersistence, initializeAuth, onAuthStateChanged } from 'firebase/auth/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from '../.env/config';


const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });


export const db = getFirestore(app);

export async function userLoading(): Promise<any> {
    return await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}



