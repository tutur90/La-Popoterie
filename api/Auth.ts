import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential, signInAnonymously } from 'firebase/auth';
import { auth } from './Firebase';
import clientId from '../.env/GoogleAuth';

WebBrowser.maybeCompleteAuthSession();

export const googleConnection = (setDisabled: (disable: boolean) => void) => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(clientId);

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
        }
        setDisabled(!request || response?.type === 'success');
    }, [response, request]);

    const signInWithGoogleAsync = async () => {
        try {
            const result = await promptAsync();
            if (result.type === 'success') {
                return result.params.id_token;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            alert(e)
            return { error: true };
        }
    };

    return (signInWithGoogleAsync)
}

export const loginAnymously = (setDisabled: (disabled: boolean) => void) => {
    setDisabled(true);
    signInAnonymously(auth)
        .then(() => {
        })
        .catch((error) => {
            alert(error.message);
            setDisabled(false);
        });
}

