import { useContext } from 'react';
import { Text, View, Button, Alert, StyleSheet } from 'react-native';
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
      <Text style={styles.titleText}>{username}</Text>
      <Button color="red" title="Sign Out" onPress={signOutHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    margin : 30
  }
});

export default ProfileScreen;
