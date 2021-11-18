import React from 'react';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { WebSocketLink } from '@apollo/client/link/ws';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3030/subscriptions',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: `Bearer ${localStorage.getItem('token')}`,
    },
  }
});

const httpLink = createHttpLink({
  uri: 'http://localhost:3030/graphql',
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
