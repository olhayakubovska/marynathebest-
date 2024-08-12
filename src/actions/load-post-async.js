import { setPostData } from "./set-post-data";

export const loadPostaAsync = (requestServer, postId) => (dispatch) => {
  requestServer("fetchPost", postId).then((postData) => {
    dispatch(setPostData(postData.res));
  });
};
