import { useMutation, useApolloClient } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useAuthStorage } from './useAuthStorage';

const useReview = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const review = async ({ repositoryName, ownerName, rating, text }) => {
    try {
      const token = await authStorage.getAccessToken();

      const headers = {
        Authorization: token ? `bearer ${token}` : '',
      };

      const { data } = await mutate({
        variables: { repositoryName, ownerName, rating, text },
        context: {
          headers,
        },
      });

      apolloClient.resetStore();
      return data;
      
    } catch (error) {
      return error;
    }
  };

  return [review, result];
};

export default useReview;