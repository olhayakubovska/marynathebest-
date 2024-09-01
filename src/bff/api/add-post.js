import { generateDate } from "../utils";



  export const addPost = ({ imageUrl, title, content }) =>
    fetch("http://localhost:3005/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify({
        image_url: imageUrl,
        title,
        published_ad: generateDate(),
        content,
      }),
    }).then((createdPost)=> createdPost.json());;
  