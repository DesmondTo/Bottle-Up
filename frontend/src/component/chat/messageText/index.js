import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { getLatestChatAPI } from '../../../api/chat-api';
import io from 'socket.io-client';
import {
  URL_CHAT_SVC_SOCKET,
  PATH_CHAT_SVC_SOCKET,
} from '../../../api/constants';

const chat_socket = io(URL_CHAT_SVC_SOCKET, {
  path: PATH_CHAT_SVC_SOCKET,
  withCredentials: true,
});

function MessageText({ bottleID }) {
  const [latestChat, setLatestChat] = useState('');

  useEffect(() => {
    chat_socket.emit('join-bottle', bottleID);

    const getLatestChat = async bottleID => {
      const latestChatResponse = await getLatestChatAPI(bottleID);
      const latestChatSuccess = latestChatResponse.success;
      const latestChatMessage = latestChatResponse.message;

      if (latestChatSuccess) {
        const latestChat = latestChatResponse.chat;
        setLatestChat(latestChat);
      } else {
        createChatAlert('Latest chat not found', latestChatMessage);
      }
    };

    getLatestChat(bottleID);

    chat_socket.on(
      'receive-chat',
      (isSentSuccess, feedback, sender, chatSent) => {
        isSentSuccess && getLatestChat(bottleID);
      },
    );

    return () => {
      chat_socket.off('join-bottle');
      chat_socket.off('receive-chat');
    };
  }, []);
  return (
    <View>
      <Text style={{ ...styles.messageText }}>{latestChat.text}</Text>
      <Text>{latestChat.username}</Text>
      <Text>{latestChat.createdAt}</Text>
    </View>
  );
}

export default MessageText;
