// export const updatePost = ({ id, imageUrl, title, content }) => {
//   fetch(`http://localhost:3005/posts/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json;charset=UTF-8" },
//     body: JSON.stringify({
//       image_url: imageUrl,
//       title,
//       content,
//     }),
//   })
//     // .then((data) => data.json())
//     // .then((data) => console.log("update post", data));
// };

export const updatePost = ({ id, imageUrl, title, content }) =>
  fetch(`http://localhost:3005/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify({
      image_url: imageUrl,
      title,
      content,
    }),
  }).then((loadedPost) => loadedPost.json());
