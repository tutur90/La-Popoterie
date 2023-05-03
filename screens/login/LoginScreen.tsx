import { Button, StyleSheet, TouchableOpacity } from 'react-native';

import * as React from 'react';

import { Text, View } from '../../components/Themed';
import { RootStackScreenProps } from '../../types';

import { googleConnection, loginAnymously } from '../../api/Auth';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const signInWithGoogleAsync = googleConnection(setButtonDisabled);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compte google</Text>
      <Button title="Login Google" onPress={() => {
        signInWithGoogleAsync();
      }}
        disabled={buttonDisabled} />
      <Text>Ou</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Bienvenue!</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Utiliser sans compte:</Text>
      <Button title="Ann" onPress={() => {
        loginAnymously(setButtonDisabled);
      }}
        disabled={buttonDisabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: 'red',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'relative',
    color: 'red',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#2D6A4F',
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
  },
});