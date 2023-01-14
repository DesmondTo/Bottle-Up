import { useContext, useState } from 'react';
import { View, Button, Alert } from 'react-native';
import UserContext from '../context/user-context';
import Input from '../component/input';

const SignInScreen = ({ navigation }) => {
  const userCtx = useContext(UserContext);
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  const createSignInAlert = alertMessage =>
    Alert.alert('Sign in failed', alertMessage, [
      {
        text: 'OK',
        style: 'cancel',
      },
    ]);

  const signInHandler = async () => {
    if (!username || !password) {
      createSignInAlert('Both username and password cannot be empty.');
      return;
    }

    const signInResponse = await userCtx.onSignIn(username.trim(), password);
    const signInSuccess = signInResponse.success;
    const signInMessage = signInResponse.message;

    if (signInSuccess) {
      navigation.replace('OceanScreen');
    } else {
      createSignInAlert(signInMessage);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Input
        onChangeText={onChangeUsername}
        value={username}
        placeholder="Username"
        autoCapitalize="none"
      />
      <Input
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
      />
      <Button title="Sign In" color="black" onPress={signInHandler} />
    </View>
  );
};

export default SignInScreen;
