import { useQuery } from '@apollo/client';
import { QueryHook } from '../types';
import { QUERY_DISCUSSIONS } from '../Discussions';
import {
  DiscussionsResult as Result,
  DiscussionsVariables as Variables,
} from '../types/Discussions';

export const useDiscussions = ({
  username,
  limit = 100,
}: Partial<Variables>): Result => {
  const { data, ...rest } = useQuery<Result, Variables>(QUERY_DISCUSSIONS, {
    variables: { username, limit } as Variables,
  })
  return { userRecentTopics: data?.userRecentTopics, data, ...rest };
};
