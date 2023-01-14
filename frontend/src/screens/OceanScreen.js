import { Text, View, Button } from 'react-native';

const OceanScreen = ({ navigation }) => {
  const findBottleHandler = () => {
    navigation.navigate('BottleScreen', { isSendingMessage: false });
  };

  const writeMessageHandler = () => {
    navigation.navigate('BottleScreen', { isSendingMessage: true });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Ocean Screen</Text>
      <Button title="Find Bottle" onPress={findBottleHandler} />
      <Button title="Write a Message" onPress={writeMessageHandler} />
    </View>
  );
};

export default OceanScreen;
