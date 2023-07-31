import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

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
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const { data, loading } = useQuery(CURRENT_USER);

  if (loading) {
    return null;
  }

  const user = data?.me;

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
  <View style={styles.container}>
    <ScrollView horizontal>
      <Link style={styles.link} to="/">
        <Text style={styles.tab}>Repositories</Text>
      </Link>
      {user && user.username && (
        <Link style={styles.link} to="/review">
          <Text style={styles.tab}>Create a review</Text>
        </Link>
      )}
      {user && user.username && (
        <Link style={styles.link} to="/myReviews">
          <Text style={styles.tab}>My Reviews</Text>
        </Link>
      )}
      {user && user.username ? (
        <Link style={styles.link} to="/" onPress={handleSignOut}>
          <Text style={styles.tab}>Sign Out</Text>
        </Link>
      ) : (
        <Link style={styles.link} to="/signIn">
          <Text style={styles.tab}>Sign In</Text>
        </Link>
      )}
    </ScrollView>
  </View>
  );
};

export default AppBar;