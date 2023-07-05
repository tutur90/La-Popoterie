import { signOut } from 'firebase/auth';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../../api/Firebase';
import { AntDesign } from '@expo/vector-icons';
import { Text, View, ButtonView } from '../../components/Themed';
import Sizes from '../../constants/Sizes'
import { useAuthContext } from '../../context/AuthContext';
import Colors from '../../constants/Colors';
import { googleConnection } from '../../api/Auth';
import { ReturnButton } from '../../components/Display';
import { RootStackScreenProps } from '../../types';


export default function AccountScreen({ route, navigation }: RootStackScreenProps<'Compte'>) {
  const { user } = useAuthContext();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const signInWithGoogleAsync = googleConnection(setButtonDisabled);

  if (!user) {
    alert('user is null')
    return null;
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user.photoURL ?
        <Image style={{ width: Sizes.ProfilePhoto, height: Sizes.ProfilePhoto, borderRadius: Sizes.ProfilePhoto / 2 }} source={{ uri: user.photoURL }} />
        : <AntDesign name="user" color={Colors.darkGreen} size={Sizes.ProfilePhoto} />}
      {user.isAnonymous ?
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>Vous n'êtes pas connecté</Text>
          <ButtonView onPress={() => signInWithGoogleAsync()} disabled={buttonDisabled}>
            <Text style={styles.buttonText}>Connexion avec google</Text>
          </ButtonView>
          <ButtonView onPress={() => signOut(auth)}>
            <Text style={styles.buttonText}>Deconnexion</Text>
          </ButtonView>
        </View>
        :
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>{user.displayName}</Text>
          <ButtonView onPress={() => signOut(auth)}>
            <Text style={styles.buttonText}>Deconnexion</Text>
          </ButtonView>
        </View>}
      <ReturnButton navigation={navigation} />
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
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
