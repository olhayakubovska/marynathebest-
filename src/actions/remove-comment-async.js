import { setPostData } from "./set-post-data";

export const removeCommentAsync = (requestServer, postId, id) => (dispatch) => {
  requestServer("removeComment", postId, id).then((postData) => {
    dispatch(setPostData(postData.res));
  });
};
