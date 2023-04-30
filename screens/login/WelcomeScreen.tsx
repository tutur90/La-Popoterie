

import { Button, StyleSheet, Image } from 'react-native';
import { Text, View } from '../../components/Themed';
import { RootStackScreenProps } from '../../types';

export default function WelcomeScreen({ navigation }: RootStackScreenProps<'Welcome'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>La popoterie</Text>
      <Image source={require('../../assets/images/logo.png')} style={styles.image} />
      <Button title="Bienvenue" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    width: 200,
    height: 200,
  }
});
