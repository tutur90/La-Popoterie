import { Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import { RootStackScreenProps } from '../../types';
import Colors from '../../constants/Colors';

export default function WelcomeScreen({ navigation }: RootStackScreenProps<'Welcome'>) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.image} />
      <Text style={styles.title}>La Popoterie</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Bienvenue!</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Butler',
    color: Colors.intanceDarkGreen,
    marginTop: -30,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.darkGreen,
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
  },
  image: {
    width: 350,
    height: 350,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Butler',
    color: 'white',
  }
});