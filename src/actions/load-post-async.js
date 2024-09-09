import { setPostData } from "./set-post-data";

export const loadPostaAsync = (requestServer, postId) => (dispatch) => {
  return requestServer("fetchPost", postId).then((postData) => {
    if (postData.res) {
      dispatch(setPostData(postData.res));
    }
    return postData;
  });
};
