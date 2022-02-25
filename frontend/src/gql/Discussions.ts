import { gql } from '@apollo/client';

export const QUERY_DISCUSSIONS = gql`
  query getRecentPosts($username: String!, $limit: Int) {
    userRecentTopics(username: $username, limit: $limit) {
      id
      title
      commentCount
      post {
        creationDate
        voteCount
      }
    }
  }
`;
