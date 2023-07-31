import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { useNavigate } from "react-router-native";
import { Menu } from 'react-native-paper';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    padding: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, setSearchKeyword, searchKeyword, selectedOrdering, setSelectedOrdering }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handlePressRepository = (id) => {
    navigate(`/${id}`);
  };

  const renderSearchBar = () => {
    const [currentText, setCurrentText] = useState(searchKeyword)
    const debounced = useDebouncedCallback(
      (text) => {
        setSearchKeyword(text);
      },
      1500
    );

    return (
      <TextInput
        style={styles.searchInput}
        placeholder="Search repositories..."
        onChangeText={(text) => {
          setCurrentText(text);
          return (
            debounced(text)
        )}}
        value={currentText}
      />
    );
  };

  const filterBar = () => {
    return (
      <OrderingSelection
        selectedOrdering={selectedOrdering}
        setSelectedOrdering={setSelectedOrdering}
    />
    )
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
      ListHeaderComponent={() => (
        <View>
          {renderSearchBar()}
          {filterBar()}
        </View>
      )}
    />
  );
};

const OrderingSelection = ({ selectedOrdering, setSelectedOrdering }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const orderingOptions = [
    { label: 'Latest repositories', value: { orderBy: 'CREATED_AT' } },
    { label: 'Highest rated repositories', value: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' } },
    { label: 'Lowest rated repositories', value: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' } },
  ];

  const handleOrderingChange = (value) => {
    setSelectedOrdering(value);
    setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Pressable onPress={() => setMenuVisible(true)}>
            <Text>Order by: {selectedOrdering.label}</Text>
          </Pressable>
        }
        styles={styles.menuButton}
      >
        {orderingOptions.map((option) => (
          <Menu.Item
            key={option.label}
            onPress={() => handleOrderingChange(option)}
            title={option.label}
          />
        ))}
      </Menu>
    </View>
  );
};

const RepositoryList = () => {
  const [selectedOrdering, setSelectedOrdering] = useState(
    { label: 'Latest repositories', value: { orderBy: 'CREATED_AT' } }
  );
  const [searchKeyword, setSearchKeyword] = useState('')

  const { repositories, loading, error } = useRepositories(selectedOrdering.value, searchKeyword);

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

  return (
  <>
    <RepositoryListContainer repositories={repositories} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} 
      selectedOrdering={selectedOrdering}  setSelectedOrdering={setSelectedOrdering}/>
  </>
  )
};

export default RepositoryList;