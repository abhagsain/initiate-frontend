import React from "react";
import "./App.css";
import "./index.css";
import { ApolloProvider, Query, useQuery } from "react-apollo";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "apollo-boost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Forms";
import Home from "./components/Home";
const link = new HttpLink({
  uri: "http://localhost:4000"
});
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
