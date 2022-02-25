import React, { useMemo } from 'react';
import { useDiscussions } from '../gql/hooks/useDiscussions';
import { DiscussionsResult, Discussion } from '../gql/types/Discussions';
import Table from './TableContainer';

interface DiscussionListProps {
  username: string;
  tableProps?: any;
}

export const DiscussionList : React.FC<DiscussionListProps> = ({
  username,
  tableProps,
}) => {
  const columns = useMemo(() => [
    {
      Header: 'Discussions',
      Cell: ({ cell: { value }}: any) => (<td> {value ?? '-'}</td>),
      columns: [
        {
          Header: 'id',
          accessor: 'id',
        },
        {
          Header: 'title',
          accessor: 'title',
        },
        {
          Header: 'Comment Count',
          accessor: 'commentCount'
        },
        {
          Header: 'Created At',
          accessor: 'post.createDate',
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
