import { FlatList, Alert } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user-context';
import Username from '../component/chat/username';
import UserInfoText from '../component/chat/userInfoText';
import Card from '../component/chat/card';
import TextSection from '../component/chat/textSection';
import MessageText from '../component/chat/messageText';
import Container from '../component/chat/container';
import { getBottlesAPI } from '../api/bottle-api';
import { getLatestChatAPI } from '../api/chat-api';

const ChatScreen = ({ navigation }) => {
  const userCtx = useContext(UserContext);
  const username = userCtx.username;

  const [bottleList, setBottleList] = useState([]);

  const createChatAlert = (alertTitle, alertMessage) =>
    Alert.alert(alertTitle, alertMessage, [
      {
        text: 'OK',
        style: 'cancel',
      },
    ]);

  const getLatestChat = bottleID => {
    const resp = getLatestChatAPI(bottleID);
    return 'latest';
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      const getBottleList = async username => {
        const resp = await getBottlesAPI(username);
        const getBottlesSuccess = resp.success;

        if (getBottlesSuccess) {
          console.log('Retrieved all bottles');
          setBottleList(resp.bottles);
        } else {
          createChatAlert('Get bottles failed', resp.message);
        }
      };

      getBottleList(username);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  return (
    <Container>
      <FlatList
        data={bottleList}
        keyExtractor={item => item['_id']}
        renderItem={({ item }) => (
          <Card
            onPress={() =>
              navigation.navigate('BottleScreen', {
                username: username,
                isSendingMessage: true,
              })
            }>
            <TextSection>
              <UserInfoText>
                <Username>{item.username}</Username>
              </UserInfoText>
              <MessageText>{getLatestChat(item.bottleID)}</MessageText>
            </TextSection>
          </Card>
        )}
      />
    </Container>
  );
};

export default ChatScreen;
