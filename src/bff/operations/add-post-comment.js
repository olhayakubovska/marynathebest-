import { addComment, getComments, getPost } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const addPostComment = async (hash, postId, userId, content) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

const access = await sessions.access(hash, accessRoles)

  if (!access) {
    return { error: "Доспуп запрещен", res: null };
  }

  await addComment(postId, userId, content);

  const post = await getPost(postId);
  const comments = await getComments(postId);

  return {
    error: null,
    res: { ...post, comments },
  };
};

// addPostComment