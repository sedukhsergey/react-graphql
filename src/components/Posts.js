import React from "react";

import {gql, useQuery} from "@apollo/client";
import {Link, Route, Routes} from "react-router-dom";
import {Post} from "./Post";

const POSTS_GQL = gql`
    query getPosts {
        posts {
            id
            categories {
                id
            }
            author {
                id
            }
        }
    }
`;


export const Posts = () => {
  const { loading, error, data } = useQuery(POSTS_GQL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <h2>Posts</h2>
      {
        data.posts.map(i => {
          return (
            <div key={i.id}>
              <Link to={i.id}>{i.id}</Link>
            </div>
          )
        })
      }

      <Routes>
        <Route index element={<h3>Please select a post.</h3>} />
        <Route path={`:postId`} element={<Post />} />
      </Routes>
    </div>
  );
}
