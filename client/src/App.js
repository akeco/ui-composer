import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Homepage from './pages/Homepage';
import Header from './containers/Header';
import { Provider } from 'mobx-react';
import ScreensStore from './stores/ScreensStore';
import LayoutStore from './stores/LayoutStore';
import ColorsStore from './stores/ColorsStore';
import './App.scss';

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: new HttpLink({
    uri: 'http://localhost:1337/graphql',
  }),
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider
          ScreensStore={ScreensStore}
          LayoutStore={LayoutStore}
          ColorsStore={ColorsStore}
        >
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={Homepage} />
            </Switch>
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
