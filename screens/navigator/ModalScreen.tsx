import { signOut } from 'firebase/auth';
import * as React from 'react';
import { Button, Image, StyleSheet } from 'react-native';
import { auth } from '../../api/Firebase';
import { AntDesign } from '@expo/vector-icons';
import { GoogleConnection } from '../../components/Connection';
import { Text, View } from '../../components/Themed';
import Sizes from '../../constants/Sizes'
import { useAuthContext } from '../../api/AuthContext';

export default function ModalScreen() {
  const { user, userIsLoaded, setUser } = useAuthContext();

  if (!user) {
    console.log('user is null')
    return null;
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user.isAnonymous ?
        <><AntDesign name="user" color={'black'} size={Sizes.ProfilePhoto} />
          <Text>Vous n'êtes pas connecté</Text>
          <GoogleConnection />
        </>
        :
        <>{user.photoURL ?
          <Image style={{ width: Sizes.ProfilePhoto, height: Sizes.ProfilePhoto, borderRadius: Sizes.ProfilePhoto / 2 }} source={{ uri: user.photoURL }} />
          : <AntDesign name="user" color={'black'} size={Sizes.ProfilePhoto} />}
          <Text>{user.displayName}</Text></>}
      <Text>Settings!</Text>
      <Button title="Deconexion" onPress={() => { signOut(auth); }} />
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
});
