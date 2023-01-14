import { View, Button, Alert } from 'react-native';
import { findBottleAPI } from '../api/bottle-api';
import { useContext } from 'react';
import UserContext from '../context/user-context';

const OceanScreen = ({ navigation }) => {
  const userCtx = useContext(UserContext);
  const username = userCtx.username;

  const createChatAlert = (alertTitle, alertMessage) =>
    Alert.alert(alertTitle, alertMessage, [
      {
        text: 'OK',
        style: 'cancel',
      },
    ]);

  const findBottleHandler = username => async () => {
    const resp = await findBottleAPI(username);
    const findSuccess = resp.success;

    if (findSuccess) {
      const bottle = resp.bottle;
      const bottleID = bottle.bottleID;
      const bottleOwner = bottle.username;
      navigation.navigate('BottleScreen', {
        isSendingMessage: false,
        bottleID: bottleID,
        bottleOwner: bottleOwner,
      });
    } else {
      createChatAlert('find bottle failed', resp.message);
    }
  };

  const writeMessageHandler = () => {
    navigation.navigate('BottleScreen', {
      isSendingMessage: true,
      isCreateBottle: true,
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Find Bottle" onPress={findBottleHandler(username)} />
      <Button title="Write a Message" onPress={writeMessageHandler} />
    </View>
  );
};

export default OceanScreen;
