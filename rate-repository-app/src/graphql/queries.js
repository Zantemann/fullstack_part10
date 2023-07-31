import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          description
          forksCount
          fullName
          language
          reviewCount
          ownerAvatarUrl
          stargazersCount
          ratingAverage
          id
        }
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query query($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query($repositoryId: ID!){
    repository(id: $repositoryId) {
      id
      description
      forksCount
      fullName
      language
      reviewCount
      ownerAvatarUrl
      stargazersCount
      ratingAverage
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`