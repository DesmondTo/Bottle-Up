import { useContext, useState } from 'react';
import { View, Alert, Text } from 'react-native';
import { Button } from '@rneui/themed';
import UserContext from '../context/user-context';
import Input from '../component/input';

const SignUpScreen = ({ navigation }) => {
  const userCtx = useContext(UserContext);
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  const createSignUpAlert = alertMessage =>
    Alert.alert('Sign up failed', alertMessage, [
      {
        text: 'OK',
        style: 'cancel',
      },
    ]);

  const signUpHandler = async () => {
    if (username.length > 8 || /\s/.test(username)) {
      return createSignUpAlert(
        'Username can have at most 8 characters without any whitespace.',
      );
    }

    if (password.length < 8) {
      return createSignUpAlert('Password must be at least 8 characters.');
    }

    if (!username || !password) {
      return createSignUpAlert('Both username and password cannot be empty.');
    }

    const signUpResponse = await userCtx.onSignUp(username, password);
    const signUpSuccess = signUpResponse.success;
    const signUpMessage = signUpResponse.message;

    if (signUpSuccess) {
      navigation.replace('OceanScreen');
    } else {
      createSignUpAlert(signUpMessage);
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
        title="Sign Up"
        onPress={signUpHandler}
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

export default SignUpScreen;
