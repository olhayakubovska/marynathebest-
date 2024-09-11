import { getPostCommentWithAuthor } from "../../utils/get-comments-with-author";
import { getPost, deleteComment } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const removeComment = async (hash, postId, id) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return { error: "Доспуп запрещен", res: null };
  }

  await deleteComment(id);

  const post = await getPost(postId);

  const commentWidthAutor = await getPostCommentWithAuthor(postId);

  return {
    error: null,
    res: { ...post, comments: commentWidthAutor },
  };
};
