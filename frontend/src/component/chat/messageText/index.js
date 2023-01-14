import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { getLatestChatAPI } from '../../../api/chat-api';

function MessageText({ bottleID }) {
  const [latestChat, setLatestChat] = useState('');

  useEffect(() => {
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
  }, []);
  return (
    <View>
      <Text style={{ ...styles.messageText }}>{latestChat.text}</Text>
    </View>
  );
}

export default MessageText;
