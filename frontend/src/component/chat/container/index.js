import { View } from 'react-native';
import styles from './styles';

const Container = props => {
  return (
    <View
      style={{ ...styles.container }}
      {...props}
    />
  );
};

export default Container;