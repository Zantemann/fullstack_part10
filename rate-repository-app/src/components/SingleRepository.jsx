import { GET_REPOSITORY } from '../graphql/queries'
import RepositoryItem from './RepositoryItem'
import { useParams } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { View, Pressable, StyleSheet } from 'react-native'
import Text from './Text'
import * as Linking from 'expo-linking';
import theme from '../theme'
import ReviewList from './ReviewList';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 15,
    backgroundColor: '#ffffff'
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 5
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reviewList: {
    flex: 1
  }
});

const SingleRepository = () => {
  const { id } = useParams()
  const { data, loading, error } = useQuery(GET_REPOSITORY, { variables: { repositoryId:  id } })

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const repository = data.repository
  
  const handleOpenGitHub = () => {
    Linking.openURL(repository.url); 
  };

  return (
    <View style={styles.reviewList}>
      <View style={styles.container}>
        <RepositoryItem item={repository} />
        <Pressable style={styles.button} onPress={handleOpenGitHub}>
          <Text style={styles.text}>Open in GitHub</Text>
        </Pressable>
      </View>
      <ReviewList reviews={repository.reviews} />
    </View>
    
  )
}

export default SingleRepository