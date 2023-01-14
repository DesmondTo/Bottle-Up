import { useEffect, useState, useContext } from 'react';
import {
  Text,
  View,
  ScrollView,
  Button,
  Alert,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import io from 'socket.io-client';

import { URL_CHAT_SVC_SOCKET, PATH_CHAT_SVC_SOCKET } from '../api/constants';
import {
  collectBottleAPI,
  throwBottleAPI,
  createBottleAPI,
} from '../api/bottle-api';
import { readChatAPI } from '../api/chat-api';
import UserContext from '../context/user-context';
import Input from '../component/input';

const chat_socket = io(URL_CHAT_SVC_SOCKET, {
  path: PATH_CHAT_SVC_SOCKET,
  withCredentials: true,
});

const BottleScreen = ({ route, navigation }) => {
  const userCtx = useContext(UserContext);
  const username = userCtx.username;

  const [chatList, onChangeChatList] = useState([]);
  const [newMessage, onChangeNewMessage] = useState('');

  const isSendingMessage = route.params.isSendingMessage;
  const bottleID = route.params.bottleID;
  const isCreateBottle = route.params.isCreateBottle;
  const bottleOwner = route.params.bottleOwner;

  const image = require('../asset/background.png');

  const createChatAlert = (alertTitle, alertMessage) =>
    Alert.alert(alertTitle, alertMessage, [
      {
        text: 'OK',
        style: 'cancel',
      },
    ]);

  const processMyChat = chat => {
    return chat.username === username ? { ...chat, username: 'Me' } : chat;
  };

  useEffect(() => {
    const getChat = async () => {
      const getChatResponse = await readChatAPI(bottleID);
      const getChatSuccess = getChatResponse.success;
      const getChatMessage = getChatResponse.message;

      if (getChatSuccess) {
        onChangeChatList(
          getChatResponse.chats.map(chatRetrieved =>
            processMyChat(chatRetrieved),
          ),
        );
      } else {
        createChatAlert('Chat reading failed', getChatMessage);
      }
    };

    if (!isCreateBottle) {
      getChat();
    }

    if (isSendingMessage && !isCreateBottle) {
      chat_socket.emit('join-bottle', bottleID);

      chat_socket.on(
        'receive-chat',
        (isSentSuccess, feedback, sender, chatSent) => {
          isSentSuccess && getChat();
          // Inform sender message sending failed
          sender === username &&
            !isSentSuccess &&
            createChatAlert('Message failed to send', feedback);
        },
      );

      return () => {
        chat_socket.off('join-bottle');
        chat_socket.off('receive-chat');
      };
    }
  }, []);

  const collectBottleHandler = async () => {
    await collectBottleAPI(username, bottleID);
    navigation.navigate('OceanScreen');
  };

  const throwBottleHandler = ( username, bottleID ) => async () => {
    const throwBottleResponse = await throwBottleAPI(username, bottleID);
    const throwBottleSuccess = throwBottleResponse.success;
    const throwBottleMessage = throwBottleResponse.message;
    
    if (throwBottleSuccess) {
      navigation.navigate('OceanScreen');
    } else {
      createChatAlert('Throw bottle failed', throwBottleMessage);
    }
  };

  const createBottleHandler = async (username) => {
    const createBottleResponse = await createBottleAPI(username);
    const createBottleSuccess = createBottleResponse.success;
    const createBottleMessage = createBottleResponse.message;
    
    if (createBottleSuccess) {
      const newBottleID = createBottleResponse.bottleID;
      chat_socket.emit('join-bottle', newBottleID);
      chat_socket.emit('send-chat', newBottleID, username, newMessage);
    } else {
      createChatAlert('Create bottle failed', createBottleMessage);
    }
  };

  const sendMessageHandler = async () => {
    if (newMessage) {
      if (isCreateBottle) {
        createBottleHandler(username);
        navigation.navigate('OceanScreen');
      } else {
        chat_socket.emit('send-chat', bottleID, username, newMessage);
        onChangeNewMessage('');
      }
    }
  };

  return (
    // TODO: Change this with a better message UI (better layout)
    <View
      style={{
        flex: 1,
        display: 'flex',
      }}
      contentContainerStyle={{
        alignItems: 'flex-start',
      }}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ScrollView
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
          }}
          contentContainerStyle={{
            alignItems: 'flex-start',
          }}>
          {chatList.map(chat => {
            // TODO: Change this with a better message UI
            // If username does not match, put on the left, else right
            return (
              <View
                key={chat['_id']}
                style={{
                  alignSelf: chat.username === 'Me' ? 'flex-end' : 'flex-start',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                    }}>
                    {chat.text}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 10,
                  }}>
                  {chat.username}
                </Text>
                <Text>{'\n'}</Text>
              </View>
            );
          })}
        </ScrollView>
        {/* Render these two buttons only in Ocean screen */}
        {!isSendingMessage && (
          <View
            style={{
              alignItems: 'center',
              margin: 30,
              marginBottom: 60,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Button
                title="Collect Bottle"
                onPress={collectBottleHandler}
                color="black"
              />
              <Button
                title="Throw Bottle "
                onPress={throwBottleHandler(bottleOwner, bottleID)}
                color="red"
              />
            </View>
          </View>
        )}
        {/* Render this button only in Chat screen */}
        {isSendingMessage && (
          // TODO: Change this with a better message UI
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 30,
            }}>
            <Input
              flexDirection="row"
              onChangeText={onChangeNewMessage}
              value={newMessage}
              placeholder="Enter your message here..."
            />
            <View
              style={{
                margin: 15,
              }}>
              <Button
                title="Send"
                color="black"
                onPress={sendMessageHandler}
                disabled={!newMessage}
                style={{
                  padding: 300,
                }}
              />
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default BottleScreen;
