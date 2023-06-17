import { Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

import * as React from 'react';

import { ButtonView, Text, TextInput, View } from '../../components/Themed';
import { RootStackScreenProps } from '../../types';

import { googleConnection, loginAnymously } from '../../api/Auth';
import Colors from '../../constants/Colors';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const signInWithGoogleAsync = googleConnection(setButtonDisabled);

  const [loginRegistered, setLoginRegistered] = React.useState(false);

  return (
    <View style={styles.container}>
      <View>
        <View >
          <Text style={styles.title}>Login</Text>
          <ButtonView onPress={() => (setLoginRegistered(true))} disabled={buttonDisabled}
            style={{ backgroundColor: !loginRegistered ? 'green' : 'white' }}>
            <Text style={styles.text2}>Login</Text>
          </ButtonView>
          <ButtonView onPress={() => (setLoginRegistered(false))} disabled={buttonDisabled}
            style={{ backgroundColor: loginRegistered ? 'green' : 'white' }}>
            <Text style={styles.text2}>Register</Text>
          </ButtonView>

          <TextInput style={{ backgroundColor: 'white', }} placeholder="Email" />
          <TextInput style={{ backgroundColor: 'white', }} placeholder="Password" />

          <ButtonView onPress={() => (setLoginRegistered(false))} disabled={buttonDisabled}
            style={{ backgroundColor: loginRegistered ? 'green' : 'white' }}>
            <Text style={styles.text2}>C'est partie</Text>
          </ButtonView>
        </View>

        <Image source={require('../../assets/images/pageLogin.png')} style={styles.image} />
        <View style={styles.position}>
          <Text style={styles.title}>Compte google:</Text>
          <ButtonView onPress={() => signInWithGoogleAsync()} disabled={buttonDisabled}>
            <Text style={styles.text2}>Se connecter</Text>
          </ButtonView>
        </View>
      </View>

      <Text style={{ marginVertical: 20, fontWeight: 'bold', fontSize: 20, }}>Ou</Text>

      <View style={styles.position2}>
        <Text style={styles.text}>Utiliser sans compte:</Text>
        <ButtonView style={{ backgroundColor: 'white', }} onPress={() => loginAnymously(setButtonDisabled)} disabled={buttonDisabled}>
          <Text style={styles.text3}>Continuer sans compte</Text>
        </ButtonView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGreen,
  },
  image: {
    width: 500,
    height: 500,
  },
  title: {
    fontSize: 20,
    color: 'white',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginVertical: -10,
    fontWeight: 'bold',

  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    marginLeft: 30,
    marginVertical: -10,
  },
  text2: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text3: {
    color: Colors.darkGreen,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#2D6A4F',
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
  },
  position: {
    position: 'absolute',
    marginTop: 310,
    marginLeft: 100,
    backgroundColor: 'transparent',
  },
  position2: {

    backgroundColor: 'transparent',
  },
});