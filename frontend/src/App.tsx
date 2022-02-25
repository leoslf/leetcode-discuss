import React, { useState } from 'react';
import {
  Container,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useDebounce } from './hooks';
import { DiscussionList } from './containers/DiscussionList';

import logo from './logo.svg';
import './App.css';

function App() {
  const [username, setUsername] = useState<string>('');
  const usernameDebounced = useDebounce(username, 1000);

  const handleChange = (e: any) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  return (
    <Container className='App'>
      <Form>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={6}>Username</Form.Label>
          <Col sm={6}>
            <Form.Control type='text' value={username} onChange={handleChange} />
          </Col>
        </Form.Group>
      </Form>
      <Row>
        <Col sm={12}>
          {(username?.length ?? 0) > 0 && (
            <DiscussionList
              username={usernameDebounced!}
              tableProps={{
                striped: true,
                boardered: true,
                hover: true,
              }}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
