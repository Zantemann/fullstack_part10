import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handlePressRepository = (id) => {
    navigate(`/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePressRepository(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

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

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;