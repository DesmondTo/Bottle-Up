import { TouchableOpacity } from 'react-native';
import styles from './styles';

const Card = props => {
  return (
    <TouchableOpacity
      style={{ ...styles.card }}
      {...props}
    />
  );
};

export default Card;