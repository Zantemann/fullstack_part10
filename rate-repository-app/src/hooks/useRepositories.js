import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({orderBy, orderDirection}, searchKeyword) => {
  console.log(orderBy, orderDirection)
  const { data, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy,
      orderDirection,
      searchKeyword
    }
  });

  return { repositories: data ? data.repositories : undefined, ...result };
};

export default useRepositories;