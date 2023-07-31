import React from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import Text from './Text';
import { View } from 'react-native';
import ReviewList from './ReviewList';

const MyReviews = () => {
  const { loading, error, data } = useQuery(CURRENT_USER, {
    variables: {
      includeReviews: true,
    },
  });

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View><Text>Error: {error.message}</Text></View>;
  }

  const user = data?.me;
  const reviews = user.reviews;
  return (
    <ReviewList reviews={reviews}/>
  );
};

export default MyReviews;