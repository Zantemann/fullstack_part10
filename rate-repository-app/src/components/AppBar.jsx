import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 80,
  },
  link: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center'
  },
  tab: {
    color: '#fff',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
  },
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal>
      <Link style={styles.link} to="/">
        <Text style={styles.tab}>Repositories</Text>
      </Link>
      <Link style={styles.link} to="/signIn">
        <Text style={styles.tab}>Sign In</Text>
      </Link>
    </ScrollView>
  </View>
  );
};

export default AppBar;