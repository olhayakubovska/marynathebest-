import { addUser, getUser } from "../api";
import { sessions } from "../sessions";

export const registration = async (regLogin, regPassord) => {
  const existedUser = await getUser(regLogin);

  if (existedUser) {
    return { error: "Такой логин уже занят ", res: null };
  }

  const user = await addUser(regLogin, regPassord);

  return {
    error: null,
    res: {
      id: user.id,
      login: user.login,
      roleId: user.role_id,
      session: sessions.create(user),
    },
  };
};
