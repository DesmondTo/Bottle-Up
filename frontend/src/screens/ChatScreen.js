import { Text, View, Button } from 'react-native';

const ChatScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Chat Screen</Text>
      <Button
        title="Go to Bottle Screen"
        onPress={() =>
          navigation.navigate('BottleScreen', { isSendingMessage: true })
        }
      />
    </View>
  );
};

export default ChatScreen;
