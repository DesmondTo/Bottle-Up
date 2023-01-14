import { View } from 'react-native';
import styles from './styles';

const UserInfoText = props => {
  return (
    <View
      style={{ ...styles.infoText }}
      {...props}
    />
  );
};

export default UserInfoText;