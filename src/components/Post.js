import {useParams} from "react-router-dom";
import {gql, useMutation, useQuery} from "@apollo/client";
import React, {useEffect, useState} from "react";

const POST_GQL = gql`
    query getPost($postId: ID!) {
        post(id: $postId) {
            id
            title
            content
            categories {
                id
            }
            author {
                id
            }
        }
    }
`;

// Define mutation
const UPDATE_POST_GQL = gql`
    mutation updatePost(
        $id: ID!
        $title: String!
        $content: String!
        $categories: [String!]
    ) {
        updatePost(
            updatePostInput: {
                id: $id
                title: $title
                content: $content
                categories: $categories
            }
        ) {
            id
        }
    }
`;

export const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [muattePost, { data: updatePostData }] = useMutation(UPDATE_POST_GQL);

  let { postId } = useParams();
  const { loading, error, data } = useQuery(POST_GQL, {
    variables: { postId },
  });

  useEffect(() => {
    if (data) {
      setTitle(data.post.title)
      setContent(data.post.content)
    }
  }, [data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log('post',data)
  return (
    <div>
      <h2>POST</h2>
      <p>
        <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
      </p>
      <p>
        <input type="text" name='content' value={content} onChange={(e) => setContent(e.target.value)}/>
      </p>
      <button onClick={() => {
        muattePost({variables: {
            id: postId,
            title,
            content,
            categories: data.post.categories.map(i => i.id)
          }})
      }}>Save</button>
    </div>
  )
}
