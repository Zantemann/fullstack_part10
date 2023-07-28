import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  fullName: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  language: {
    fontSize: theme.fontSizes.body,
    color: '#ffffff',
    backgroundColor: theme.colors.primary,
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  countText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  countContainer: {
    alignItems: 'center',
    flex: 1,
  },
});

const CountDisplay = ({ count, label }) => {
  if (count >= 1000) {
    const formattedCount = (count / 1000).toFixed(1) + 'k';
    return (
      <View style={styles.countContainer}>
        <Text fontWeight="bold" style={styles.countText}>
          {formattedCount}
        </Text>
        <Text style={styles.countText}>{label}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.countContainer}>
        <Text fontWeight="bold" style={styles.countText}>
          {count}
        </Text>
        <Text style={styles.countText}>{label}</Text>
      </View>
    );
  }
};

const RepositoryItem = ({ item }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = item;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text fontWeight="bold" style={styles.fullName}>{fullName}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.language}>{language}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <CountDisplay count={stargazersCount} label="Stars" />
        <CountDisplay count={forksCount} label="Forks" />
        <CountDisplay count={reviewCount} label="Reviews" />
        <CountDisplay count={ratingAverage} label="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;