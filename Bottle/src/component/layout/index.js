import { SafeAreaView } from 'react-native';
import styles from './styles';

const Layout = ({ children }) => {
  return <SafeAreaView style={styles.layout}>{children}</SafeAreaView>;
};

export default Layout;
