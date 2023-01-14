import { Text } from 'react-native';
import styles from './styles';

const MessageText = props => {
  return (
    <Text
      style={{ ...styles.messageText }}
      {...props}
    />
  );
};

export default MessageText;