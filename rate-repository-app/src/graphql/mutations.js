import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation signIn($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
  }
}
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
    createReview(repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text) {
      id
      text
      user {
        username
      }
    }
  }
`;