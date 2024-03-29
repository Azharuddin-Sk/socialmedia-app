import React, { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

function postListReducer(currPostList, action) {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
}

function PostListProvider({ children }) {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  function addPost(userId, postTitle, postBody, likes, tags) {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        likes: likes,
        userId: userId,
        tags: tags,
      },
    });
  }

  function deletePost(postId) {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  }

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
}

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Thought of the day",
    body: "Don't worry, be Happy :)",
    likes: 1000,
    userId: "user-9",
    tags: ["#behappy"],
  },
  {
    id: "2",
    title: "Just Chill",
    body: " Life goes on, you need to just chill",
    likes: 500,
    userId: "user-12",
    tags: ["#chill"],
  },
];

export default PostListProvider;
