import { transformComment } from "../transformers";

export const getComments = (postId) =>
  fetch(`http://localhost:3005/comments?post_id=${postId}`).then(
    (loadedComment) =>
      loadedComment
        .json()
        .then((loadedComment) => loadedComment.map(transformComment))
  );
