import React, { useState } from "react";
import { GET_HOMEPAGE_POSTS } from "./queries";
import { useQuery } from "react-apollo";
export default function Home() {
  //   const [posts, setPosts] = useState([]);
  const { loading, error, data } = useQuery(GET_HOMEPAGE_POSTS);
  console.log("TCL: App -> render -> data", data);
  if (loading) return loading && <h2>Loading</h2>;
  if (error) return error && <h2>error</h2>;
  return (
    <div className="App">
      {data.posts.map(el => {
        return <h2 key={el.id}>{el.title}</h2>;
      })}
    </div>
  );
}
