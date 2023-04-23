import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { RootStackScreenProps, RootTabScreenProps } from '../../types';

import { GoogleConnection, LoginAnymously, } from '../../components/Connection';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Compte google</Text>
      <GoogleConnection />
      <Text>Ou</Text>
      <Text style={styles.text}>Utiliser sans compte:</Text>
      <LoginAnymously />
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
});