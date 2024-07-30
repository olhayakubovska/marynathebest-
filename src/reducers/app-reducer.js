import { ACTION_TYPE } from "../actions/action-type";

const initialStateApp = {
  wasLogout: false,
};

export const appReducer = (state = initialStateApp, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGOUT:
      return {
        ...state,
        wasLogout: !state.wasLogout
      };

    default:
      return state;
  }
};
