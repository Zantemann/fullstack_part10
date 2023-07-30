import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../theme'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  username: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
  },
  date: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: 3,
  },
  reviewText: {
    marginBottom: 8,
  },
  reviewTextContainer: {
    flex: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const createdAt = new Date(review.createdAt);
  const formattedDate = format(createdAt, 'dd.MM.yyyy');
  console.log(review.rating)
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewTextContainer}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const ReviewList = ({ reviews }) => {
  return (
    <FlatList
      data={reviews.edges.map(edge => edge.node)}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={ItemSeparator}
      ListFooterComponent={ItemSeparator}
    />
  );
};

export default ReviewList;