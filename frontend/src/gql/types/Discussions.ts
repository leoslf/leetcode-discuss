import { QueryResult } from '@apollo/client';

export interface Post {
  creationDate: number;
  voteCount: number;
}

export interface Discussion {
  id: string;
  title: string;
  commentCount: number;
  post: Post;
}

export interface DiscussionsVariables {
  username: string;
  limit: number;
}


export interface DiscussionsResult extends QueryResult {
  userRecentTopics?: Discussion[];
}

