import React from "react";
import {gql, useQuery} from "@apollo/client";

const POSTS_GQL = gql`
    query {
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

export const Home = () => {
  const { loading, error, data } = useQuery(POSTS_GQL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log('data',data)
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
