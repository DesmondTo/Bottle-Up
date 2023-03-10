import { View, Alert } from 'react-native';
import { findBottleAPI } from '../api/bottle-api';
import { useContext } from 'react';
import UserContext from '../context/user-context';
import CustomButton from '../component/button';

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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
      }}>
      <CustomButton
        title="Find Bottle"
        color="black"
        onPress={findBottleHandler(username)}
        buttonStyle={{ width: 250 }}
      />
      <CustomButton
        title="Write a Message"
        color="black"
        onPress={writeMessageHandler}
        buttonStyle={{ width: 250 }}
      />
    </View>
  );
};

export default OceanScreen;
