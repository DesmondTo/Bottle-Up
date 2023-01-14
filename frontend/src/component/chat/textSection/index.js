import { View } from 'react-native';
import styles from './styles';

const TextSection = props => {
  return (
    <View
      style={{ ...styles.textSection }}
      {...props}
    />
  );
};

export default TextSection;