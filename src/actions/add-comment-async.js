import { setPostData } from "./set-post-data";

export const addCommentAsync = (requestServer, postId, userId, content) => (dispatch) => {
  requestServer("addPostComment", postId, userId, content).then((postData) => {
    dispatch(setPostData(postData.res));
  });
};

