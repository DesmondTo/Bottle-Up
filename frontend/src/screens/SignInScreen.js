import { useContext, useState } from 'react';
import { View, Alert, Text } from 'react-native';
import UserContext from '../context/user-context';
import Input from '../component/input';
import { Button } from '@rneui/themed';

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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
      }}>
      <Text style={{ fontSize: 50, fontWeight: 'bold' }}>Bottle💦</Text>
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
      <Button
        title="Sign In"
        onPress={signInHandler}
        buttonStyle={{ backgroundColor: '#002233' }}
        containerStyle={{
          width: 100,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export default SignInScreen;
