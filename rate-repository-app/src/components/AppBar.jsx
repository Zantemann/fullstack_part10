import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme'
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
  },
  tab: {
    color: '#fff',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    paddingBottom: 10,
    paddingLeft: 10
  },
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <Pressable>
      <Text style={styles.tab}>Repositories</Text>
    </Pressable>
  </View>
  );
};

export default AppBar;