import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
//import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;