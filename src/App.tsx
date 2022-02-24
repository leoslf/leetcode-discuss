import React from 'react';
import { gql, useQuery } from '@apollo/client';

import logo from './logo.svg';
import './App.css';
import { QUERY_DISCUSSION_LIST } from './components/DiscussionList';

function App() {
  const { data, error, loading } = useQuery(QUERY_DISCUSSION_LIST, {
    variables: {
      username: 'Leoslf',
      limit: 100
    },
    context: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        cookie: process.env.REACT_APP_COOKIE,
      },
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`Error! ${error}`}</div>;
  }

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
