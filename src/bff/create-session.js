import { removeComments } from "./session";
import { ROLE } from "../constants";
export const createSession = (roleId) => {
  const session = {
    logout() {
      Object.keys(session).forEach((key) => {
        delete session[key];
      });
    },
  };

  switch (roleId) {
    case ROLE.ADMIN: {
      session.removeComments = removeComments();
      break;
    }
    case ROLE.MODERATOR: {
      session.removeComments = removeComments();
      break;
    }
    case ROLE.READER: {
      break;
    }
    default: //
  }

  return session;
};
