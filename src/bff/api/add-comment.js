import { generateDate } from "../utils";

export const addComment = (postId, userId, content) =>
  fetch("http://localhost:3005/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify({
      author_id: userId,
      post_id: postId,
      published_at: generateDate(),
      content
    }),
  });

