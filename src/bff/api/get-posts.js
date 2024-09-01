import { transformPost } from "../transformers";

export const getPosts = () =>
  fetch("http://localhost:3005/posts")
    .then((loadedData) => loadedData.json())
    .then((loadedPosts) => loadedPosts && loadedPosts.map(transformPost));
