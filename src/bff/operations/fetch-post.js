import { getPostCommentWithAuthor as getPostCommentsWithAuthor } from "../../utils/get-comments-with-author";
import { getPost } from "../api";

export const fetchPost = async (postId) => {
  let post;
  let error;

  try {
    post = await getPost(postId);
  } catch (postError) {
    error = postError;
  }

  if (error) {
    return {
      error,
      res: null,
    };
  }

  const commentWidthAutor = await getPostCommentsWithAuthor(postId);

  return {
    error: null,
    res: { ...post, comments: commentWidthAutor },
  };
};

// let post;
//   let error;

//   try {
//     post = await getPost(postId);
//   } catch (postError) {
//     error = postError;
//   }

//   if (error) {
//     return {
//       error,
//       res: null,
//     };
