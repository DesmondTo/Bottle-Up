import { TextInput } from 'react-native';
import styles from './styles';

const Input = props => {
  return (
    <TextInput
      style={{ ...styles.input, flex: props.flexDirection === 'row' ? 1 : 0 }}
      {...props}
    />
  );
};

export default Input;
