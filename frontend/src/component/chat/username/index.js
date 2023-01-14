import { Text } from 'react-native';
import styles from './styles';

const Username = props => {
  return (
    <Text
      style={{ ...styles.username }}
      {...props}
    />
  );
};

export default Username;