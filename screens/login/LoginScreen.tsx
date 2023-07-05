import { Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

import * as React from 'react';

import { ButtonView, Text, TextInput, View } from '../../components/Themed';
import { RootStackScreenProps } from '../../types';

import { googleConnection, loginAnymously } from '../../api/Auth';
import Colors from '../../constants/Colors';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const signInWithGoogleAsync = googleConnection(setButtonDisabled);

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assets/images/pageLogin.png')} style={styles.image} />
        <View style={styles.position}>
          <Text style={styles.title}>Compte google:</Text>
          <ButtonView onPress={() => signInWithGoogleAsync()} disabled={buttonDisabled}>
            <Text style={styles.text2}>Se connecter</Text>
          </ButtonView>
        </View>
      </View>

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
    alignSelf: 'center',
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
  position: {
    position: 'absolute',
    marginTop: 310,
    marginLeft: 100,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  position2: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});

