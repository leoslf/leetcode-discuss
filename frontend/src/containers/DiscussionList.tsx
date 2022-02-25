import React, { useMemo } from 'react';
import { formatISO, fromUnixTime } from 'date-fns';

import { useDiscussions } from '../gql/hooks/useDiscussions';
import { DiscussionsResult, Discussion } from '../gql/types/Discussions';
import Table from './TableContainer';

interface DiscussionListProps {
  username: string;
  limit?: number;
  tableProps?: any;
}

export const DiscussionList : React.FC<DiscussionListProps> = ({
  username,
  limit,
  tableProps,
}) => {
  const columns = useMemo(() => [
    {
      Header: 'Discussions',
      columns: [
        {
          Header: 'id',
          accessor: 'id',
        },
        {
          Header: 'title',
          accessor: 'title',
          Cell: ({ row, value }: any) => (
            <a href={`${process.env.REACT_APP_BASE_URL}/discuss/topic/${row.values.id}`}>{value}</a>
          ),
        },
        {
          Header: 'Comment Count',
          accessor: 'commentCount'
        },
        {
          Header: 'Created At',
          accessor: 'post.creationDate',
          Cell: ({ value }: any) => formatISO(fromUnixTime(value)),
        },
        {
          Header: 'Vote Count',
          accessor: 'post.voteCount',
        },
      ],
    },
  ], []);

  const { userRecentTopics, error, loading } = useDiscussions({
    username,
    limit,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`Error! ${error}`}</div>;
  }

  return (
    <Table<Discussion>
      columns={columns}
      data={userRecentTopics!}
      tableProps={tableProps}
    />
  );
};
