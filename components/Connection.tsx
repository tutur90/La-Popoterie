import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential, signInAnonymously } from 'firebase/auth';
import { Button } from "react-native";
import { auth } from '../api/Firebase';

WebBrowser.maybeCompleteAuthSession();

export const GoogleConnection = () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: '553403004879-9isrhi9v54ll1lnbap863idamamv82hf.apps.googleusercontent.com',
        },
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
        }
    }, [response]);

    return (<Button
        disabled={!request || response?.type === 'success'}
        title="Login Google"
        onPress={() => {
            promptAsync();
        }}
    />)
}


export const LoginAnymously = () => {

    const [disabled, setDisabled] = React.useState(false);

    return (<Button
        disabled={disabled}
        title="Skip the login"
        onPress={() => {
            setDisabled(true);
            signInAnonymously(auth)
                .then(() => {
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setDisabled(false);
                });
        }}
    />)
}


