import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { HashRouter } from "react-router-dom";
import Mutations from './graphql/mutations';
import { setContext } from 'apollo-link-context';
const { VERIFY_USER } = Mutations;

const token = localStorage.getItem("auth-token");
const CurrentUserID = localStorage.getItem('currentUserID');
const CurrentUserName = localStorage.getItem('currentUserName');

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null,
  addTypename: false
});




// make sure we log any additional errors we receive
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
  if (networkError) console.log(networkError);
});

let uri;
if (process.env.NODE_ENV === "production") {
  uri = `https://elephantsurprise.com/graphql`;
} else {
  uri = "http://localhost:5000/graphql";
}

const httpLink = createHttpLink({
  uri
  // headers: {
  //   // heroku can get a little buggy with headers and
  //   // localStorage so we'll just ensure a value is always in the header
  //   authorization: localStorage.getItem("auth-token") || ""
  // }
});

const authLink = setContext((_, { headers }) => { //include setContext to create header with updated token
  const token = localStorage.getItem('auth-token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : ''
    }
  };
});

const client = new ApolloClient({
  // link: ApolloLink.from([errorLink, httpLink]),
  link: authLink.concat(httpLink, errorLink),
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }, 
  resolvers: {}
});

cache.writeData({
  data: {
    isLoggedIn: Boolean(localStorage.getItem("auth-token")),
    CurrentUserID,
    CurrentUserName
  }
});

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          CurrentUserName: data.verifyUser.name,
          CurrentUserID: data.verifyUser._id, 
          isLoggedIn: data.verifyUser.loggedIn
        }
        });
    });
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};


ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
