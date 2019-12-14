import React from "react";
import "./App.css";
import "./index.css";
import { ApolloProvider, Query } from "react-apollo";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "apollo-boost";
const link = new HttpLink({
  uri: "http://192.168.99.100:4488"
});
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
const getHomePagePosts = gql`
  query getHomepagePosts {
    posts {
      title
      body
      author {
        email
      }
    }
  }
`;
class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={getHomePagePosts}>
          {({ data, loading, error }) => {
            console.log("TCL: App -> render -> data", data);
            if (loading) return loading && <h2>Loading</h2>;
            return (
              <div className="App">
                {data.posts.map(el => (
                  <h2>{el.title}</h2>
                ))}
              </div>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
