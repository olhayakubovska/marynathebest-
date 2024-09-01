import { ACTION_TYPE } from "../actions/action-type";

const initialStatePost = {
  id: "",
  title: "",
  imageUrl: "",
  content: "",
  publishedAt: "",
  loading: true,

  comments: [],
};

export const postReducer = (state = initialStatePost, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_POST_DATA:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case ACTION_TYPE.RESET_POST_DATA:
      return initialStatePost;

    default:
      return state;
  }
};
