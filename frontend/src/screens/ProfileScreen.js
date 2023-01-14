import { useContext } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import UserContext from '../context/user-context';

const ProfileScreen = ({ navigation }) => {
  const userCtx = useContext(UserContext);
  const username = userCtx.username;

  const signOutHandler = async () => {
    const signOutResponse = await userCtx.onSignOut();
    const signOutSuccess = signOutResponse.success;
    const signOutMessage = signOutResponse.message;

    if (signOutSuccess) {
      navigation.replace('SignInScreen');
    } else {
      Alert.alert('Sign Out Error', signOutMessage, [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{username}</Text>
      <Button title="Sign Out" onPress={signOutHandler} />
    </View>
  );
};

export default ProfileScreen;
