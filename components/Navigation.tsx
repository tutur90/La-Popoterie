import {

    View,
    Image,
    Pressable,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useAuthContext } from '../api/AuthContext';
import Sizes from '../constants/Sizes';

export const tabOptionStyle = (label: string, name: React.ComponentProps<typeof AntDesign>['name']) => {
    return ({
        tabBarLabel: label,
        tabBarIcon: ({ color, size }: { color: string, size: number }) => <TabBarIcon name={name} color={color} size={size} />,

        headerRight: () => (
            <HeaderRight />
        ),
    })
};
export const HeaderRight = () => {
    const navigation = useNavigation();
    const { user } = useAuthContext();

    if (!user) {
        return null;
    }
    return (
        <Pressable
            onPress={() => navigation.navigate('Modal')}
            style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
            })}>
            <View style={{ marginRight: 10 }}>
                {!user.photoURL ?
                    <AntDesign name="user" color={'white'} size={Sizes.headerProfil} />
                    :
                    <Image style={{ width: Sizes.headerProfil, height: Sizes.headerProfil, borderRadius: Sizes.headerProfil / 2 }} source={{ uri: user.photoURL }} />
                }
            </View>
        </Pressable>)

}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof AntDesign>['name'];
    color: string;
    size: number;
}) {
    return <AntDesign style={{ marginBottom: -3 }} {...props} />;
}