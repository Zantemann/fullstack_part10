import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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

export const ME = gql`
  query {
    me {
      id
      username
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