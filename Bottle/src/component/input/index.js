import { TextInput } from 'react-native';
import styles from './styles';

const Input = props => {
  return <TextInput style={styles.input} {...props} />;
};

export default Input;
