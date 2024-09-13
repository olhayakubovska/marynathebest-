import { transformPost } from "../transformers";

export const getPosts = (searchPhrase, page, limit) =>
  fetch(
    `http://localhost:3005/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`
  )
    .then((loadedData) => {
      // console.log(loadedData); // сюда приходят данные
      return Promise.all([loadedData.json(), loadedData.headers.get("Link")]);
      // console.log( loadedData.headers.get("Link")) // тут null
    })
    .then(([loadedPosts, links]) => ({
      posts: loadedPosts && loadedPosts.map(transformPost),
      links,
    }));
