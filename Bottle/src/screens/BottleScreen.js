import { Text, View, Button } from 'react-native';

const BottleScreen = ({ route, navigation }) => {
  const isSendingMessage = route.params.isSendingMessage;
  const collectBottleHandler = () => {
    navigation.navigate('OceanScreen');
  };

  const throwBottleHandler = () => {
    navigation.navigate('OceanScreen');
  };

  const sendMessageHandler = () => {};

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bottle Screen</Text>
      {/* Render these two buttons only in Ocean screen */}
      {!isSendingMessage && (
        <>
          <Button title="Collect Bottle Found" onPress={collectBottleHandler} />
          <Button title="Throw Bottle Away" onPress={throwBottleHandler} />
        </>
      )}
      {/* Render this button only in Chat screen */}
      {isSendingMessage && (
        <Button title="Send Message" onPress={sendMessageHandler} />
      )}
    </View>
  );
};

export default BottleScreen;
